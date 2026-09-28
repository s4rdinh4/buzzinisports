export const GTM_ID = import.meta.env.VITE_GTM_ID || "GTM-P69LMTGG";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Envia um evento customizado para o Google Tag Manager (dataLayer).
 */
export function sendGTMEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
  });
}

/**
 * Dispara evento de visualização de página virtual para SPAs no GTM.
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];

  // Permite que o document.title seja atualizado pelo roteador antes de registrar
  if (typeof requestAnimationFrame !== "undefined") {
    requestAnimationFrame(() => {
      window.dataLayer?.push({
        event: "virtual_page_view",
        page_path: path,
        page_location: window.location.href,
        page_title: title || document.title,
      });
    });
  } else {
    window.dataLayer.push({
      event: "virtual_page_view",
      page_path: path,
      page_location: window.location.href,
      page_title: title || document.title,
    });
  }
}
