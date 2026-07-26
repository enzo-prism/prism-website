import { isAnalyticsReportingHost } from '@/lib/constants'

/**
 * A local `pnpm build && pnpm start` is a production build, so the build-time
 * env gate says "report". Only the request hostname can distinguish it from the
 * real site, and without that gate localhost accounted for ~30% of pageviews on
 * the live Prism property.
 */
describe('analytics host gate', () => {
  it('reports on the real site', () => {
    expect(isAnalyticsReportingHost('www.design-prism.com')).toBe(true)
    expect(isAnalyticsReportingHost('design-prism.com')).toBe(true)
  })

  it('never reports from local development hosts', () => {
    for (const host of ['localhost', '127.0.0.1', '0.0.0.0', '::1', 'LOCALHOST']) {
      expect(isAnalyticsReportingHost(host)).toBe(false)
    }
  })

  it('never reports from LAN addresses used for on-device testing', () => {
    for (const host of ['192.168.1.24', '10.0.0.7', '172.16.4.2', '172.31.255.1']) {
      expect(isAnalyticsReportingHost(host)).toBe(false)
    }
  })

  it('never reports from .local mDNS hostnames', () => {
    expect(isAnalyticsReportingHost('enzos-macbook.local')).toBe(false)
  })

  it('treats an empty or missing hostname as non-reporting', () => {
    expect(isAnalyticsReportingHost('')).toBe(false)
    expect(isAnalyticsReportingHost('   ')).toBe(false)
  })

  it('does not accidentally block public hosts that merely start with a digit', () => {
    expect(isAnalyticsReportingHost('1password.com')).toBe(true)
    expect(isAnalyticsReportingHost('172.217.14.206')).toBe(true)
  })
})
