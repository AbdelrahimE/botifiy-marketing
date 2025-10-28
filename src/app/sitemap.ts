import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap Generator for Botifiy Marketing Website
 *
 * This sitemap automatically includes all pages with their proper:
 * - URLs
 * - Last modification dates
 * - Change frequencies
 * - Priorities for SEO
 *
 * Generated at build time and served at /sitemap.xml
 */

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for all pages
  const baseUrl = 'https://botifiy.com'

  // Get current date for dynamic pages
  const currentDate = new Date()

  // Static dates for legal pages (last updated July 7, 2025)
  const legalPagesDate = new Date('2025-10-27')

  return [
    // Home Page - Highest priority, updated daily
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // Pricing Page - High priority, updated weekly
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Privacy Policy - Low priority, rarely updated
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: legalPagesDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },

    // Terms of Use - Low priority, rarely updated
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: legalPagesDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
