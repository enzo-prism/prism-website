import type { ScholarshipRound } from '@/lib/scholarships'
import { cn } from '@/lib/utils'

import styles from './scholarship-graphics.module.css'

type GraphicProps = { className?: string; idPrefix?: string }

/** Decorative, finished server frame. No defs or IDs can collide across instances. */
export function OpportunityGraphic({ className }: GraphicProps) {
  return (
    <div
      className={cn(styles.graphic, styles.opportunity, className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 640 512"
        fill="none"
        focusable="false"
        className={styles.svg}
        aria-hidden="true"
      >
        <title>A path to possibility</title>
        <desc>
          An idea climbs a stepped path through website and conversation markers
          to a Prism crest.
        </desc>
        <g className={styles.structure}>
          <path d="M36 470H604M60 446H580M90 422H556" />
          <path d="M78 446V422H172V338H310V250H450V162H564" />
          <path d="M98 460V436H190V352H328V264H468V176H582" />
          <path d="M78 422L98 436M172 338L190 352M310 250L328 264M450 162L468 176M564 162L582 176" />
          <path d="M172 422L190 436M310 338L328 352M450 250L468 264" />
        </g>
        <path
          className={styles.stepSurface}
          d="M78 422H172V338H310V250H450V162H564L582 176H468V264H328V352H190V436H98Z"
        />
        <path
          className={styles.stairLine}
          d="M78 422H172V338H310V250H450V162H564"
        />
        <path
          className={cn(styles.trail, styles.heroTrail)}
          pathLength="100"
          d="M78 422H172V338H310V250H450V162H564"
        />

        <g className={cn(styles.node, styles.ideaNode)}>
          <path
            className={styles.inkLine}
            d="M69 376H89V384H97V400H89V408H69V400H61V384H69ZM69 408H89V416H69ZM73 416V421H85V416"
          />
          <path
            className={styles.goldLine}
            d="M79 353V363M39 397H49M109 397H119M48 366L55 373"
          />
          <path
            className={styles.goldLine}
            d="M71 388L79 397L87 388M79 397V408"
          />
        </g>

        <g className={cn(styles.node, styles.websiteNode)}>
          <path
            className={styles.surfaceFill}
            d="M132 285H198V295H208V325H132Z"
          />
          <path
            className={styles.inkLine}
            d="M132 285H198V295H208V325H132ZM132 297H208M140 291H142M148 291H150"
          />
          <path
            className={styles.mutedLine}
            d="M142 307H174M142 315H163M188 307H198V317H188Z"
          />
          <path className={styles.connector} d="M170 325V338" />
        </g>

        <g className={cn(styles.node, styles.chatNode)}>
          <path
            className={styles.surfaceFill}
            d="M277 185H343V195H353V225H321L307 239V225H277Z"
          />
          <path
            className={styles.inkLine}
            d="M277 185H343V195H353V225H321L307 239V225H277Z"
          />
          <path className={styles.mutedLine} d="M289 197H331M289 207H319" />
          <rect
            className={cn(styles.goldFill, styles.chatSignal)}
            x="334"
            y="207"
            width="6"
            height="6"
          />
          <path className={styles.connector} d="M310 239V250" />
        </g>

        <g className={cn(styles.node, styles.awardNode)}>
          <path className={styles.crestAura} d="M516 41L588 165H444Z" />
          <path className={styles.crestFill} d="M516 66L562 146H470Z" />
          <path
            className={styles.goldLine}
            d="M516 66L562 146H470ZM516 66V118M470 146L516 118L562 146"
          />
          <path className={styles.inkLine} d="M498 106L516 138L534 106" />
          <path
            className={styles.goldLine}
            d="M516 20V30M585 72L594 67M438 73L429 68M516 146V162"
          />
          <circle
            className={cn(styles.goldFill, styles.pulse)}
            cx="516"
            cy="118"
            r="4"
          />
        </g>
        <g className={styles.registrationMarks}>
          <path d="M38 48V32H54M586 32H602V48M38 476V492H54M586 492H602V476" />
          <path d="M118 468V472M258 468V472M398 468V472M538 468V472" />
        </g>
      </svg>
    </div>
  )
}

export function QuarterGraphic({
  initialRound,
  className,
}: GraphicProps & { initialRound: ScholarshipRound }) {
  const activeQuarter = Number(
    /Q([1-4])/.exec(initialRound.id)?.[1] ??
      /Q([1-4])/.exec(initialRound.label)?.[1] ??
      4,
  )
  return (
    <div
      className={cn(styles.graphic, styles.quarter, className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 320"
        fill="none"
        focusable="false"
        className={styles.svg}
        aria-hidden="true"
      >
        <title>A quarterly opportunity</title>
        <desc>
          Four quarter milestones form a cycle, with the current scholarship
          round highlighted.
        </desc>
        <path
          className={styles.orbit}
          d="M68 192C68 80 532 80 532 192C532 276 68 276 68 192Z"
        />
        <path className={styles.mutedLine} d="M60 192H540" />
        <path
          className={cn(styles.trail, styles.quarterTrail)}
          pathLength="100"
          d="M60 192H540"
        />
        {[1, 2, 3, 4].map((quarter) => {
          const x = 120 + (quarter - 1) * 120
          const active = quarter === activeQuarter
          return (
            <g
              key={quarter}
              className={cn(styles.quarterNode, active && styles.activeQuarter)}
            >
              <path
                className={active ? styles.goldLine : styles.mutedLine}
                d={`M${x - 14} 178H${x + 14}V206H${x - 14}Z`}
              />
              <rect
                className={active ? styles.goldFill : styles.mutedFill}
                x={x - 4}
                y="188"
                width="8"
                height="8"
              />
              <path className={styles.mutedLine} d={`M${x} 218V232`} />
              <text
                className={styles.quarterLabel}
                x={x}
                y="262"
                textAnchor="middle"
              >
                Q{quarter}
              </text>
              {active ? (
                <>
                  <circle
                    className={cn(styles.goldLine, styles.pulse)}
                    cx={x}
                    cy="192"
                    r="26"
                  />
                  <path
                    className={styles.goldLine}
                    d={`M${x} 80L${x + 24} 122H${x - 24}ZM${x} 80V107L${x + 24} 122M${x} 107L${x - 24} 122M${x} 133V151`}
                  />
                  <rect
                    className={styles.goldFill}
                    x={x - 3}
                    y="148"
                    width="6"
                    height="6"
                  />
                </>
              ) : (
                <path
                  className={styles.structureLine}
                  d={`M${x} 132V154M${x - 6} 143H${x + 6}`}
                />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function OfficeHoursGraphic({ className }: GraphicProps) {
  return (
    <div
      className={cn(styles.graphic, styles.officeHours, className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 390"
        fill="none"
        focusable="false"
        className={styles.svg}
        aria-hidden="true"
      >
        <title>Sunday conversations</title>
        <desc>
          A Sunday calendar marker connects conversation bubbles to a one-hour
          clock dial.
        </desc>
        <g className={styles.calendar}>
          <path className={styles.inkLine} d="M40 62H560V148H40ZM40 92H560" />
          <path
            className={styles.mutedLine}
            d="M114 62V148M188 62V148M262 62V148M336 62V148M410 62V148M484 62V148"
          />
          <path className={styles.goldWash} d="M41 63H113V147H41Z" />
          <path
            className={styles.goldLine}
            d="M40 62H114V148H40ZM58 48V72M542 48V72"
          />
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
            (day, index) => (
              <text
                key={day}
                className={cn(
                  styles.dayLabel,
                  index === 0 && styles.sundayLabel,
                )}
                x={77 + index * 74}
                y="83"
                textAnchor="middle"
              >
                {day}
              </text>
            ),
          )}
          <path
            className={styles.goldLine}
            d="M63 114H73V104H83V114H93V124H83V134H73V124H63Z"
          />
          {[151, 225, 299, 373, 447, 521].map((x) => (
            <path
              className={styles.structureLine}
              key={x}
              d={`M${x - 6} 119H${x + 6}`}
            />
          ))}
        </g>
        <path
          className={styles.connector}
          d="M77 148V184H174V254H244M244 254H324"
        />
        <path
          className={cn(styles.trail, styles.officeTrail)}
          pathLength="100"
          d="M77 148V184H174V254H324"
        />
        <g className={cn(styles.node, styles.officeChatNode)}>
          <path
            className={styles.surfaceFill}
            d="M85 235H159V245H169V285H121L107 299V285H85Z"
          />
          <path
            className={styles.inkLine}
            d="M85 235H159V245H169V285H121L107 299V285H85Z"
          />
          <circle className={styles.goldFill} cx="104" cy="260" r="3" />
          <circle
            className={cn(styles.goldFill, styles.chatSignal)}
            cx="126"
            cy="260"
            r="3"
          />
          <circle className={styles.goldFill} cx="148" cy="260" r="3" />
          <path
            className={styles.mutedLine}
            d="M174 312H214V322H224V354H211L201 364V354H174Z"
          />
        </g>
        <g className={styles.clock}>
          <circle className={styles.orbit} cx="430" cy="256" r="108" />
          <circle className={styles.inkLine} cx="430" cy="256" r="86" />
          <path
            className={styles.goldArc}
            d="M355.52 213A86 86 0 0 1 387 181.52"
          />
          <path
            className={styles.mutedLine}
            d="M430 179V188M507 256H498M430 333V324M353 256H362M468.5 189.31L464 197.1M496.69 217.5L488.9 222M496.69 294.5L488.9 290M468.5 322.69L464 314.9M391.5 322.69L396 314.9M363.31 294.5L371.1 290M363.31 217.5L371.1 222M391.5 189.31L396 197.1"
          />
          <path className={styles.inkLine} d="M430 256V200" />
          <path className={styles.goldLine} d="M430 256L383.23 229" />
          <circle className={styles.surfaceFill} cx="430" cy="256" r="7" />
          <circle className={styles.goldLine} cx="430" cy="256" r="7" />
          <circle
            className={cn(styles.goldFill, styles.pulse)}
            cx="387"
            cy="181.52"
            r="4"
          />
        </g>
      </svg>
    </div>
  )
}
