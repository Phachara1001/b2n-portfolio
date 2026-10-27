/**
 * Utilities for Website Live Preview Generation
 */

export function getWebsitePreviewUrl(url) {
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return ''
  
  // WordPress mShots: high-resolution, reliable, free website snapshot service
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(trimmed)}?w=1280&h=800`
}

export function getDomain(url) {
  if (!url) return 'preview'
  try {
    const parsed = new URL(url)
    return parsed.hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//, '').split('/')[0] || 'preview'
  }
}

export function getFaviconUrl(url) {
  const domain = getDomain(url)
  if (!domain || domain === 'preview') return ''
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`
}
