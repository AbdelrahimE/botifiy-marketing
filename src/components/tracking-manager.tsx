"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"
import {
  captureAttribution,
  readBrowserAttribution,
  writeBrowserAttribution,
} from "@/lib/attribution"
import {
  allowsAnalyticsMeasurement,
  allowsMarketingMeasurement,
} from "@/lib/consent"
import { trackMetaPage } from "@/lib/meta-pixel"
import { useConsent } from "@/lib/use-consent"

const GTM_ID = "GTM-5WFNXVRS"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function TrackingManager() {
  const { consent, isReady } = useConsent()
  const pathname = usePathname()
  const lastMetaPage = useRef("")
  const analyticsAllowed = allowsAnalyticsMeasurement(consent)
  const marketingAllowed = allowsMarketingMeasurement(consent)

  useEffect(() => {
    if (!isReady) return

    const attribution = captureAttribution(
      window.location.href,
      document.referrer,
      readBrowserAttribution(),
      marketingAllowed,
    )
    writeBrowserAttribution(attribution)
  }, [isReady, marketingAllowed, pathname])

  useEffect(() => {
    if (!isReady) return

    window.gtag?.("consent", "update", {
      analytics_storage: analyticsAllowed ? "granted" : "denied",
      ad_storage: marketingAllowed ? "granted" : "denied",
      ad_user_data: marketingAllowed ? "granted" : "denied",
      ad_personalization: marketingAllowed ? "granted" : "denied",
      functionality_storage: "granted",
      security_storage: "granted",
    })
  }, [analyticsAllowed, isReady, marketingAllowed])

  useEffect(() => {
    if (!isReady || !marketingAllowed) return

    const pageKey = `${pathname}${window.location.search}`
    if (pageKey === lastMetaPage.current) return
    lastMetaPage.current = pageKey
    trackMetaPage(pathname)
  }, [isReady, marketingAllowed, pathname])

  return analyticsAllowed ? (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `,
      }}
    />
  ) : null
}
