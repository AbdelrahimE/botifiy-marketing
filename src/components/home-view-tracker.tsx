'use client'

import { useEffect } from 'react'
import { trackViewHome } from '@/lib/gtm'

export function HomeViewTracker() {
  useEffect(() => {
    trackViewHome()
  }, [])

  return null
}
