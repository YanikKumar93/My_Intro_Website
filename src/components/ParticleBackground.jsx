import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const isLightMode = () => {
      return (
        document.documentElement.classList.contains('light') ||
        document.body.classList.contains('theme-light') ||
        document.querySelector('.theme-light') !== null
      );
    };

    // Responsive particle count
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    let particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.55;
        this.vy = (Math.random() - 0.5) * 0.55;
        this.radius = Math.random() * 1.8 + 1.2;
        this.colorIndex = Math.floor(Math.random() * 4);
      }

      getColor(light) {
        if (light) {
          const lightColors = [
            'rgba(2, 132, 199, 0.55)', // Deep Cyan/Sky
            'rgba(99, 102, 241, 0.5)',  // Indigo
            'rgba(13, 148, 136, 0.5)',  // Teal
            'rgba(100, 116, 139, 0.4)'  // Slate
          ];
          return lightColors[this.colorIndex];
        } else {
          const darkColors = [
            'rgba(34, 211, 238, 0.9)',
            'rgba(96, 165, 250, 0.78)',
            'rgba(167, 139, 250, 0.78)',
            'rgba(52, 211, 153, 0.72)'
          ];
          return darkColors[this.colorIndex];
        }
      }

      draw(light) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const col = this.getColor(light);
        ctx.fillStyle = col;
        if (!light) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = col;
        } else {
          ctx.shadowBlur = 2;
          ctx.shadowColor = 'rgba(2, 132, 199, 0.2)';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update(light) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce from walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse gentle interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const forceDirectionX = dx / dist;
            const forceDirectionY = dy / dist;
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= forceDirectionX * force * 1.5;
            this.y -= forceDirectionY * force * 1.5;
          }
        }

        this.draw(light);
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectLines(light) {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            const opacity = 1 - distance / 130;
            if (light) {
              ctx.strokeStyle = `rgba(2, 132, 199, ${opacity * 0.16})`;
              ctx.lineWidth = 0.9;
            } else {
              ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.34})`;
              ctx.lineWidth = 1;
            }
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }

        // Connect to mouse if close
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[a].x - mouse.x;
          const dy = particles[a].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const opacity = 1 - distance / mouse.radius;
            if (light) {
              ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.3})`;
              ctx.lineWidth = 1.1;
            } else {
              ctx.strokeStyle = `rgba(192, 132, 252, ${opacity * 0.5})`;
              ctx.lineWidth = 1.2;
            }
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    }

    initParticles();

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const light = isLightMode();
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(light);
      }
      connectLines(light);
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
