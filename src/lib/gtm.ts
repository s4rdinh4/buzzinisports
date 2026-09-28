import { getTrafficSource, initTrafficSource } from "./traffic";

export const GTM_ID = import.meta.env.VITE_GTM_ID || "GTM-P69LMTGG";
export const GA_ID = import.meta.env.VITE_GA_ID || "G-R8NQ50ZW99";
export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "1571381581401643";

export { initTrafficSource, getTrafficSource };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: unknown;
  }
}

/**
 * Envia um evento customizado para o Google Tag Manager (dataLayer),
 * Google Analytics 4 (gtag) e Meta Pixel (fbq).
 * Anexa automaticamente os dados de atribuição de tráfego (UTMs, referrer).
 */
export function sendGTMEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const traffic = getTrafficSource();
  const fullPayload = {
    ...traffic,
    ...payload,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...fullPayload,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, fullPayload);
  }

  if (typeof window.fbq === "function") {
    if (event === "whatsapp_click") {
      window.fbq("track", "Lead", fullPayload);
    } else if (event === "select_plan_cta") {
      window.fbq("trackCustom", "SelectPlan", fullPayload);
    } else {
      window.fbq("trackCustom", event, fullPayload);
    }
  }
}

/**
 * Dispara evento de visualização de página virtual para SPAs no GTM, no GA4 e no Meta Pixel.
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];

  const send = () => {
    const pageTitle = title || document.title;
    const pageLocation = window.location.href;

    window.dataLayer?.push({
      event: "virtual_page_view",
      page_path: path,
      page_location: pageLocation,
      page_title: pageTitle,
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: path,
        page_location: pageLocation,
        page_title: pageTitle,
      });
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  };

  // Permite que o document.title seja atualizado pelo roteador antes de registrar
  if (typeof requestAnimationFrame !== "undefined") {
    requestAnimationFrame(send);
  } else {
    send();
  }
}
