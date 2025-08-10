"use client"


export default function WhatWeDo({ className = "" }: { className?: string }) {
  return (
    <section className={`px-4 pt-6 ${className}`}>
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="prose prose-neutral max-w-none mb-6">
          <h2 className="text-xl font-semibold lowercase">what we do</h2>
          <p>
            prism builds websites, apps, and content systems that convert. we pair clean design with
            robust engineering and ai automation to turn traffic into revenue—for startups, practices,
            and local brands.
          </p>
        </div>
      </div>
    </section>
  )
}


