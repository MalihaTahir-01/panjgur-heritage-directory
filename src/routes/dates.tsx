import { createFileRoute } from "@tanstack/react-router";
import { DirectoryPage } from "@/components/directory/directory-page";
export const Route = createFileRoute("/dates")({
  head: () => ({
    meta: [
      { title: "Date Producers — Panjgur Heritage Directory" },
      {
        name: "description",
        content:
          "Explore the Panjgur date producer directory, including growers, processors and local date varieties.",
      },
      { property: "og:title", content: "Panjgur Date Directory" },
      {
        property: "og:description",
        content: "Discover local date growers, processors and suppliers in Panjgur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <DirectoryPage category="dates" />,
});
