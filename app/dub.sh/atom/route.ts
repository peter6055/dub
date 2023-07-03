import { allChangelogPosts } from "contentlayer/generated";

export async function GET() {
  return new Response(
    `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
        <title>Dub</title>
        <subtitle>Changelog</subtitle>
        <link href="https://internal-short.shopmy.com.au/atom" rel="self"/>
        <link href="https://internal-short.shopmy.com.au/"/>
        <updated>${allChangelogPosts[0].publishedAt}</updated>
        <id>https://internal-short.shopmy.com.au/</id>${allChangelogPosts.map((post) => {
          return `
        <entry>
            <id>https://internal-short.shopmy.com.au/changelog/${post.slug}</id>
            <title>${post.title}</title>
            <link href="https://internal-short.shopmy.com.au/changelog/${post.slug}"/>
            <updated>${post.publishedAt}</updated>
            <author><name>${post.author}</name></author>
        </entry>`;
        }).join("")}
    </feed>`,
    {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    },
  );
}
