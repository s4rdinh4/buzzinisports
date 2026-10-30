import { createFileRoute } from "@tanstack/react-router";
import { handleEmailCampaign } from "@/lib/email-campaign.server";

export const Route = createFileRoute("/api/email-campaign/logout")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: ({ request }) => handleEmailCampaign(request),
    },
  },
});
