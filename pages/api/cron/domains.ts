import type { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import { handleDomainUpdates } from "#/lib/cron/domains";
import {
  getConfigResponse,
  getDomainResponse,
  verifyDomain,
} from "#/lib/api/domains";
import prisma from "#/lib/prisma";
import { log } from "#/lib/utils";

/**
 * Cron to check if domains are verified.
 * Runs every 3 hours
 * If a domain is invalid for more than 14 days, we send a reminder email to the project owner.
 * If a domain is invalid for more than 28 days, we send a second and final reminder email to the project owner.
 * If a domain is invalid for more than 30 days, we delete it from the database.
 **/

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const domains = await prisma.domain.findMany({
      where: {
        slug: {
          // exclude domains that belong to us
          notIn: [
            "go.shopmy.top",
            "shopmy.top",
            "redirect-app.shopmy.top",
            "vercel.fyi",
            "vercel.link",
            "owd.li",
            "chatg.pt",
            "elegance.ai",
          ],
        },
      },
      select: {
        slug: true,
        verified: true,
        createdAt: true,
        projectId: true,
        _count: {
          select: {
            links: true,
          },
        },
      },
      orderBy: {
        lastChecked: "asc",
      },
      take: 100,
    });

    const results = await Promise.allSettled(
      domains.map(async (domain) => {
        const { slug, verified, createdAt, _count } = domain;
        const [domainJson, configJson] = await Promise.all([
          getDomainResponse(slug),
          getConfigResponse(slug),
        ]);

        let newVerified;

        if (domainJson?.error?.code === "not_found") {
          newVerified = false;
        } else if (!domainJson.verified) {
          const verificationJson = await verifyDomain(slug);
          if (verificationJson && verificationJson.verified) {
            newVerified = true;
          } else {
            newVerified = false;
          }
        } else if (!configJson.misconfigured) {
          newVerified = true;
        } else {
          newVerified = false;
        }

        const prismaResponse = await prisma.domain.update({
          where: {
            slug,
          },
          data: {
            verified: newVerified,
            lastChecked: new Date(),
          },
        });

        const changed = newVerified !== verified;

        const updates = await handleDomainUpdates({
          domain: slug,
          createdAt,
          verified: newVerified,
          changed,
          linksCount: _count.links,
        });

        return {
          domain,
          previousStatus: verified,
          currentStatus: newVerified,
          changed,
          updates,
          prismaResponse,
        };
      }),
    );
    res.status(200).json(results);
  } catch (error) {
    await log("Domains cron failed. Error: " + error.message, "cron", true);
    res.status(500).json({ error: error.message });
  }
}

/**
 * verifySignature will try to load `QSTASH_CURRENT_SIGNING_KEY` and `QSTASH_NEXT_SIGNING_KEY` from the environment.

 * This will only run in production. In development, it will return the handler without verifying the signature.
 */
const Cron = () => {
  if (process.env.NODE_ENV === "development") {
    return handler;
  } else {
    return verifySignature(handler);
  }
};

export default Cron();

export const config = {
  api: {
    bodyParser: false,
  },
};
