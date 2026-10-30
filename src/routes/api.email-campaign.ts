import { createFileRoute } from "@tanstack/react-router";
import { handleEmailCampaign } from "@/lib/email-campaign.server";

export const Route = createFileRoute("/api/email-campaign")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: ({ request }) => handleEmailCampaign(request),
      POST: ({ request }) => handleEmailCampaign(request),
    },
  },
});
