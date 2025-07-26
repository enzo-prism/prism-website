'use client';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import { trackNavigation } from '@/utils/analytics';

const items = [
  { emoji: '🪥', label: 'cosmetic dentist' },
  { emoji: '🦷', label: 'general dentist' },
  { emoji: '👨‍👩‍👧', label: 'family dentist' },
  { emoji: '🩻', label: 'endodontist' },
  { emoji: '🦷', label: 'periodontist' },
  { emoji: '🎓', label: 'alumni programs' },
  { emoji: '🧘‍♀️', label: 'wellness communities' },
  { emoji: '🎿', label: 'ski shops' },
  { emoji: '🚴‍♂️', label: 'bike shops' },
  { emoji: '💻', label: 'software startups' },
  { emoji: '🤖', label: 'ai startups' },
  { emoji: '📦', label: 'e-commerce brands' },
];

export default function WhoWeBuildForCarousel() {
  const { elementRef, isVisible } = useRevealAnimation({ threshold: 0.2, delay: 100 });
  
  return (
    <section id="who-we-build-for" ref={elementRef} className={`py-16 md:py-20 bg-white dark:bg-neutral-900 ${isVisible ? 'reveal-up visible' : 'reveal-up'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter lowercase sm:text-4xl gpu-accelerated">who we build for</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400 lowercase">trusted by diverse industries</p>
        </div>
        <div
          className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-4 md:gap-6 pb-4 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          role="list"
          aria-label="Industries we serve"
        >
          {items.map(({ emoji, label }) => (
            <div
              key={label}
              className="group shrink-0 snap-start flex flex-col items-center gap-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-6 py-5 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm cursor-pointer touch-feedback hardware-hover"
              role="listitem"
              aria-label={label}
              onClick={() => trackNavigation(`Industry clicked: ${label}`, 'who-we-build-for-carousel')}
            >
              <span aria-hidden="true" className="text-3xl md:text-4xl transition-transform duration-200 group-hover:scale-110">
                {emoji}
              </span>
              <span className="text-sm text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 lowercase whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 