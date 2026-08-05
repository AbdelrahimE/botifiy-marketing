import { allowsMarketingMeasurement, readBrowserConsent } from "@/lib/consent"

type Fbq = {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  push: Fbq
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1387649563296613"

export function initializeMetaPixel() {
  if (
    typeof window === "undefined" ||
    !allowsMarketingMeasurement(readBrowserConsent())
  ) return null
  if (window.fbq) return window.fbq

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  } as Fbq

  window.fbq = fbq
  window._fbq = fbq
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = "2.0"
  fbq.queue = []

  const script = document.createElement("script")
  script.async = true
  script.src = "https://connect.facebook.net/en_US/fbevents.js"
  const firstScript = document.getElementsByTagName("script")[0]
  firstScript?.parentNode?.insertBefore(script, firstScript)

  fbq("init", META_PIXEL_ID)
  return fbq
}

export function trackMetaPage(pathname: string) {
  const fbq = initializeMetaPixel()
  if (!fbq) return

  fbq("track", "PageView")
  if (pathname === "/activate") {
    fbq("track", "ViewContent", {
      content_name: "Botifiy activation form",
      content_category: "lead_form",
    })
  }
}

export function trackMetaLead(input: {
  eventId: string
  selectedPlan: string
  source: string
}) {
  const fbq = initializeMetaPixel()
  if (!fbq) return false

  fbq(
    "track",
    "Lead",
    {
      content_name: "Botifiy activation request",
      content_category: "lead",
      selected_plan: input.selectedPlan,
      source: input.source,
    },
    { eventID: input.eventId },
  )

  return true
}
