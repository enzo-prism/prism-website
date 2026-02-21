export default function PrismEcosystemAnimation() {
  const nodeSize = 150
  const centerSize = 190
  const nodeRadius = 22
  const centerRadius = 28
  const nodes = [
    { id: "apple", cx: 200, cy: 200, href: "/home-ecosystem/apple.svg", label: "Apple" },
    { id: "gpt", cx: 400, cy: 150, href: "/home-ecosystem/gpt.svg", label: "GPT" },
    { id: "google", cx: 600, cy: 200, href: "/home-ecosystem/google.svg", label: "Google" },
    { id: "facebook", cx: 200, cy: 600, href: "/home-ecosystem/facebook.svg", label: "Facebook" },
    { id: "instagram", cx: 400, cy: 650, href: "/home-ecosystem/instagram.svg", label: "Instagram" },
    { id: "linkedin", cx: 600, cy: 600, href: "/home-ecosystem/linkedin.svg", label: "LinkedIn" },
  ]

  return (
    <div role="presentation" className="w-full overflow-hidden rounded-xl border border-border/40 bg-muted/20 p-2">
      <svg
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        aria-hidden="true"
        focusable={false}
      >
        <style>
          {`
            .connector {
              fill: none;
              stroke: #2f2f35;
              stroke-width: 2;
              stroke-linecap: round;
            }

            @keyframes pulse {
              0%,
              100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
            }
            .hub-anim {
              transform-origin: center;
              animation: pulse 3s ease-in-out infinite;
            }

            .flow {
              fill: none;
              stroke: rgba(255, 255, 255, 0.95);
              stroke-width: 3;
              stroke-linecap: round;
              stroke-dasharray: 4 250;
              animation: moveFlow 3s linear infinite;
            }

            .logo-node {
              filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.35));
            }

            .logo-outline {
              fill: none;
              stroke: rgba(255, 255, 255, 0.22);
              stroke-width: 1.2;
              pointer-events: none;
            }

            @keyframes moveFlow {
              from {
                stroke-dashoffset: 254;
              }
              to {
                stroke-dashoffset: 0;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .hub-anim {
                animation: none;
              }
              .flow {
                animation: none;
                stroke-dasharray: none;
              }
            }
          `}
        </style>

        <g id="lines">
          <path className="connector" d="M200,200 Q300,350 400,400" />
          <path className="flow" d="M200,200 Q300,350 400,400" />

          <path className="connector" d="M400,150 Q410,300 400,400" />
          <path
            className="flow"
            d="M400,150 Q410,300 400,400"
            style={{ animationDelay: "0.5s" }}
          />

          <path className="connector" d="M600,200 Q500,350 400,400" />
          <path
            className="flow"
            d="M600,200 Q500,350 400,400"
            style={{ animationDelay: "1s" }}
          />

          <path className="connector" d="M200,600 Q300,450 400,400" />
          <path
            className="flow"
            d="M200,600 Q300,450 400,400"
            style={{ animationDelay: "0.3s" }}
          />

          <path className="connector" d="M400,650 Q390,500 400,400" />
          <path
            className="flow"
            d="M400,650 Q390,500 400,400"
            style={{ animationDelay: "0.8s" }}
          />

          <path className="connector" d="M600,600 Q500,450 400,400" />
          <path
            className="flow"
            d="M600,600 Q500,450 400,400"
            style={{ animationDelay: "1.2s" }}
          />
        </g>

        {nodes.map((node) => (
          <g key={node.id} className="logo-node">
            <title>{node.label}</title>
            <image
              href={node.href}
              x={node.cx - nodeSize / 2}
              y={node.cy - nodeSize / 2}
              width={nodeSize}
              height={nodeSize}
              preserveAspectRatio="xMidYMid meet"
            />
            <rect
              className="logo-outline"
              x={node.cx - nodeSize / 2}
              y={node.cy - nodeSize / 2}
              width={nodeSize}
              height={nodeSize}
              rx={nodeRadius}
              ry={nodeRadius}
            />
          </g>
        ))}

        <g className="hub-anim logo-node">
          <title>Prism</title>
          <image
            href="/home-ecosystem/prism.svg"
            x={400 - centerSize / 2}
            y={400 - centerSize / 2}
            width={centerSize}
            height={centerSize}
            preserveAspectRatio="xMidYMid meet"
          />
          <rect
            className="logo-outline"
            x={400 - centerSize / 2}
            y={400 - centerSize / 2}
            width={centerSize}
            height={centerSize}
            rx={centerRadius}
            ry={centerRadius}
          />
        </g>
      </svg>
    </div>
  )
}
