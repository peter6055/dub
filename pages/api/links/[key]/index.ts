import { withLinksAuth } from "#/lib/auth";
import { deleteLink, editLink, processKey } from "#/lib/api/links";
import { isBlacklistedDomain, isBlacklistedKey, log } from "#/lib/utils";
import { GOOGLE_FAVICON_URL } from "#/lib/constants";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1500kb",
    },
  },
};

export default withLinksAuth(
  async (req, res, session, project, domain, link) => {
    const { key: oldKey, domain: oldDomain } = req.query as {
      key: string;
      domain: string;
    };

    console.log(req.method)

    // GET /api/links/:key – get a link
    if (req.method === "GET") {
      return res.status(200).json(link);

      // PUT /api/links/:key – edit a link
    } else if (req.method === "PUT") {
      let { domain, key, url } = req.body;
      if (!domain || !key || !url) {
        return res.status(400).end("Missing domain or key or url.");
      }

      if (!project) {
        if (key.includes("/")) {
          return res.status(422).end("Key cannot contain '/'.");
        }
        const keyBlacklisted = await isBlacklistedKey(key);
        if (keyBlacklisted) {
          return res.status(422).end("Invalid key.");
        }
        const domainBlacklisted = await isBlacklistedDomain(url);
        if (domainBlacklisted) {
          return res.status(422).end("Invalid url.");
        }
      }

      key = processKey(key);
      if (!key) {
        return res.status(422).end("Invalid key.");
      }

      const [response, invalidFavicon] = await Promise.allSettled([
        editLink(
          {
            ...req.body,
            key,
            domain: req.body.domain || "internal-short.shopmy.com.au",
            userId: session.user.id,
          },
          {
            oldDomain: oldDomain || "internal-short.shopmy.com.au",
            oldKey,
          },
        ),
        ...(!project
          ? [fetch(`${GOOGLE_FAVICON_URL}${url}`).then((res) => !res.ok)]
          : []),
        // @ts-ignore
      ]).then((results) => results.map((result) => result.value));

      if (response === null) {
        return res.status(409).end("Key already exists.");
      }

      if (!project && invalidFavicon) {
        await log(
          `*${
            session.user.email
          }* edited a link (internal-short.shopmy.com.au/${key}) to the ${url} ${
            invalidFavicon
              ? " but it has an invalid favicon :thinking_face:"
              : ""
          }`,
          "links",
          invalidFavicon ? true : false,
        );
      }
      return res.status(200).json(response);

      // DELETE /api/links/:key – delete a link
    } else if (req.method === "DELETE") {
      const response = await deleteLink(domain || "internal-short.shopmy.com.au", oldKey);
      return res.status(200).json(response);
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  },
  {
    needNotExceededUsage: true,
  },
);
