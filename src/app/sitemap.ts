import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap Generator for Botifiy Marketing Website
 *
 * Dates below reflect meaningful content updates, not build time.
 *
 * Generated at build time and served at /sitemap.xml
 */

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for all pages
  const baseUrl = 'https://botifiy.com'

  const homePageLastModified = new Date('2026-07-22')
  const legalPagesLastModified = new Date('2025-07-07')

  return [
    {
      url: baseUrl,
      lastModified: homePageLastModified,
    },

    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: legalPagesLastModified,
    },

    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: legalPagesLastModified,
    },
  ]
}
