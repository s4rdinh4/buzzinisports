export const GTM_ID = import.meta.env.VITE_GTM_ID || "GTM-P69LMTGG";
export const GA_ID = import.meta.env.VITE_GA_ID || "G-R8NQ50ZW99";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Envia um evento customizado para o Google Tag Manager (dataLayer) e Google Analytics 4 (gtag).
 */
export function sendGTMEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }
}

/**
 * Dispara evento de visualização de página virtual para SPAs no GTM e no GA4.
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
  };

  // Permite que o document.title seja atualizado pelo roteador antes de registrar
  if (typeof requestAnimationFrame !== "undefined") {
    requestAnimationFrame(send);
  } else {
    send();
  }
}
