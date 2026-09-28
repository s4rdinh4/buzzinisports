export interface TrafficSource {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  initial_landing_page?: string;
}

const STORAGE_KEY = "buzzini_traffic_source";

/**
 * Captura e armazena os parâmetros de tráfego (UTMs, referrer e IDs de anúncio)
 * na primeira visita da sessão para garantir a atribuição de origem.
 */
export function initTrafficSource(): TrafficSource {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as TrafficSource;
    }

    const params = new URLSearchParams(window.location.search);
    const traffic: TrafficSource = {};

    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");
    const utmTerm = params.get("utm_term");
    const utmContent = params.get("utm_content");
    const gclid = params.get("gclid");
    const fbclid = params.get("fbclid");

    if (utmSource) traffic.utm_source = utmSource;
    if (utmMedium) traffic.utm_medium = utmMedium;
    if (utmCampaign) traffic.utm_campaign = utmCampaign;
    if (utmTerm) traffic.utm_term = utmTerm;
    if (utmContent) traffic.utm_content = utmContent;
    if (gclid) traffic.gclid = gclid;
    if (fbclid) traffic.fbclid = fbclid;

    const ref = document.referrer;
    if (ref) {
      traffic.referrer = ref;
      // Se não houver UTM de origem explícita, inferir pelo referrer
      if (!traffic.utm_source) {
        try {
          const refUrl = new URL(ref);
          const hostname = refUrl.hostname.toLowerCase();
          if (hostname.includes("instagram.com") || hostname.includes("l.instagram.com")) {
            traffic.utm_source = "instagram";
            traffic.utm_medium = "social";
          } else if (hostname.includes("facebook.com") || hostname.includes("l.facebook.com")) {
            traffic.utm_source = "facebook";
            traffic.utm_medium = "social";
          } else if (hostname.includes("google.")) {
            traffic.utm_source = "google";
            traffic.utm_medium = "organic";
          } else if (hostname.includes("strava.com")) {
            traffic.utm_source = "strava";
            traffic.utm_medium = "social";
          } else if (hostname !== window.location.hostname) {
            traffic.utm_source = hostname;
            traffic.utm_medium = "referral";
          }
        } catch {
          // Ignora se o referrer não for uma URL válida
        }
      }
    } else if (!traffic.utm_source) {
      traffic.utm_source = "direct";
      traffic.utm_medium = "none";
    }

    traffic.initial_landing_page = window.location.pathname + window.location.search;

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(traffic));
    return traffic;
  } catch {
    return {};
  }
}

/**
 * Obtém os dados de origem da sessão atual.
 */
export function getTrafficSource(): TrafficSource {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as TrafficSource;
    }
    return initTrafficSource();
  } catch {
    return {};
  }
}
