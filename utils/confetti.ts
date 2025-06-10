// Simple confetti animation utility
// We'll create a lightweight implementation without external dependencies

interface ConfettiParticle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  angle: number
  angularVelocity: number
  size: number
  life: number
}

function createConfetti(): void {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "9999"
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)

  const particles: ConfettiParticle[] = []
  const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"]
  
  // Create particles
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * 3 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 360,
      angularVelocity: (Math.random() - 0.5) * 15,
      size: Math.random() * 10 + 5,
      life: 1,
    })
  }

  function draw() {
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    let hasLiveParticles = false
    
    particles.forEach((particle) => {
      if (particle.life <= 0) return
      
      hasLiveParticles = true
      
      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate((particle.angle * Math.PI) / 180)
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.life
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
      ctx.restore()
      
      // Update particle
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vy += 0.5 // gravity
      particle.angle += particle.angularVelocity
      particle.life -= 0.02
      
      // Bounce off walls
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -0.8
      }
    })
    
    if (hasLiveParticles) {
      requestAnimationFrame(draw)
    } else {
      document.body.removeChild(canvas)
    }
  }
  
  draw()
}

export default createConfetti