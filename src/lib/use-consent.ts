"use client"

import { useSyncExternalStore } from "react"
import {
  CONSENT_COOKIE_NAME,
  CONSENT_EVENT_NAME,
  readBrowserCookie,
  readBrowserConsent,
  type ConsentPreferences,
} from "@/lib/consent"

let cachedCookie: string | undefined
let cachedConsent: ConsentPreferences | null = null

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CONSENT_EVENT_NAME, onStoreChange)
  return () => window.removeEventListener(CONSENT_EVENT_NAME, onStoreChange)
}

function getSnapshot() {
  const currentCookie = readBrowserCookie(CONSENT_COOKIE_NAME)
  if (currentCookie !== cachedCookie) {
    cachedCookie = currentCookie
    cachedConsent = readBrowserConsent()
  }
  return cachedConsent
}

function getServerSnapshot() {
  return null
}

function subscribeToHydration() {
  return () => undefined
}

function getClientReadySnapshot() {
  return true
}

function getServerReadySnapshot() {
  return false
}

export function useConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const isReady = useSyncExternalStore(
    subscribeToHydration,
    getClientReadySnapshot,
    getServerReadySnapshot,
  )

  return { consent, isReady }
}
