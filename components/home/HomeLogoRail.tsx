import { HOMEPAGE_HERO } from '@/components/home/homepage-content'
import { ClientLogoRail } from '@/components/prism/client-logo-rail'

/** The client logo rail that closes the homepage hero, riding up into the
 * fading bottom of the refraction scene. */
export default function HomeLogoRail() {
  return (
    <ClientLogoRail
      id="clients"
      label={HOMEPAGE_HERO.logosLabel}
      className="relative -mt-2 pb-6 sm:-mt-14 lg:-mt-24"
    />
  )
}
