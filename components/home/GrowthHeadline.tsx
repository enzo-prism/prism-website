"use client"

export default function GrowthHeadline() {
  return (
    <section className="bg-white py-16 text-center dark:bg-neutral-950 sm:py-20 md:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 sm:gap-8 sm:px-6">
        <ul className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-600 sm:flex-row sm:gap-4 dark:text-neutral-300">
          <li className="flex items-center gap-2">
            <span aria-hidden className="text-base">📱</span>
            <span className="font-semibold lowercase text-neutral-800 dark:text-neutral-100">websites</span>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="text-base">⚙️</span>
            <span className="font-semibold lowercase text-neutral-800 dark:text-neutral-100">content systems</span>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="text-base">📣</span>
            <span className="font-semibold lowercase text-neutral-800 dark:text-neutral-100">ads</span>
          </li>
        </ul>

        <h2 className="text-balance text-3xl font-semibold leading-[1.3] tracking-tight text-neutral-900 lowercase sm:text-4xl md:text-[clamp(2.5rem,4vw,3.5rem)] dark:text-neutral-50 max-w-3xl mx-auto">
          websites, content systems, and ads that grow your business.
        </h2>

        <p className="max-w-2xl text-balance text-base text-neutral-500 lowercase md:text-lg dark:text-neutral-300">
          design and engineering that boosts impressions, conversions, and referrals.
        </p>
      </div>
    </section>
  )
}
