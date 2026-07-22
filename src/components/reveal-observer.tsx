'use client'

import { useEffect } from 'react'

type RevealConfig = {
  selector: string
  visibleClass: string
  threshold: number
  rootMargin: string
}

const revealConfigs: RevealConfig[] = [
  {
    selector: '[data-journey-reveal]',
    visibleClass: 'journey-reveal-visible',
    threshold: 0.16,
    rootMargin: '0px 0px -7% 0px',
  },
  {
    selector: '[data-benefit-reveal]',
    visibleClass: 'benefit-reveal-visible',
    threshold: 0.1,
    rootMargin: '0px 0px -8% 0px',
  },
]

export function RevealObserver() {
  useEffect(() => {
    const revealImmediately = () => {
      document.querySelectorAll<HTMLElement>('.problem-reveal').forEach((item) => {
        item.classList.remove('problem-reveal-wait')
        item.classList.add('problem-reveal-in')
      })

      revealConfigs.forEach(({ selector, visibleClass }) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((item) => {
          item.classList.add(visibleClass)
        })
      })
    }

    if (typeof IntersectionObserver === 'undefined') {
      revealImmediately()
      return
    }

    const observers: IntersectionObserver[] = []
    const problemSection = document.getElementById('problem')

    if (problemSection) {
      const problemObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return

          problemSection.querySelectorAll<HTMLElement>('.problem-reveal').forEach((item) => {
            item.classList.remove('problem-reveal-wait')
            item.classList.add('problem-reveal-in')
          })
          problemObserver.disconnect()
        },
        { threshold: 0.25 }
      )

      problemObserver.observe(problemSection)
      observers.push(problemObserver)
    }

    revealConfigs.forEach(({ selector, visibleClass, threshold, rootMargin }) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            entry.target.classList.add(visibleClass)
            observer.unobserve(entry.target)
          })
        },
        { threshold, rootMargin }
      )

      document.querySelectorAll<HTMLElement>(selector).forEach((item) => observer.observe(item))
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return null
}
