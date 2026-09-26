import { createFileRoute } from "@tanstack/react-router";
import { DirectoryPage } from "@/components/directory/directory-page";
export const Route = createFileRoute("/crafts")({
  head: () => ({
    meta: [
      { title: "Craft Artisans — Panjgur Heritage Directory" },
      {
        name: "description",
        content:
          "Explore the Panjgur crafts directory, from traditional embroidery to palm and natural-fiber crafts.",
      },
      { property: "og:title", content: "Panjgur Crafts Directory" },
      {
        property: "og:description",
        content: "Discover local artisans and traditional workmanship in Panjgur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <DirectoryPage category="crafts" />,
});
