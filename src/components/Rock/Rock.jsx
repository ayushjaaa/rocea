import React, { useState, useEffect, useRef } from 'react'

const Rock = () => {
  const [fillProgress, setFillProgress] = useState(0)
  const [isPinned, setIsPinned] = useState(false)
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const scrollDistance = 1500 // Scroll distance while pinned (in pixels)

  // Content for each letter
  const letterContent = {
    R: {
      heading: "REFINED",
      text: "Precision carved from the finest materials, each piece tells a story of craftsmanship."
    },
    O: {
      heading: "ORGANIC",
      text: "Natural beauty meets modern design in every curve and contour of stone."
    },
    C: {
      heading: "CRAFTED",
      text: "Handmade with dedication, transforming raw marble into timeless art."
    },
    K: {
      heading: "KINETIC",
      text: "Living sculptures that bring movement and energy to any space."
    }
  }

  // Determine current letter based on fill progress
  const getCurrentLetter = () => {
    if (fillProgress < 25) return 'R'
    if (fillProgress < 50) return 'O'
    if (fillProgress < 75) return 'C'
    return 'K'
  }

  const currentLetter = getCurrentLetter()
  const content = letterContent[currentLetter]

  useEffect(() => {
    let rafId = null
    let ticking = false

    const updateProgress = () => {
      if (!wrapperRef.current) return

      const wrapper = wrapperRef.current
      const scrollY = window.scrollY

      // Get wrapper's position in document
      const wrapperTop = wrapper.offsetTop
      const pinStart = wrapperTop
      const pinEnd = wrapperTop + scrollDistance

      if (scrollY >= pinStart && scrollY < pinEnd) {
        // Section should be pinned
        setIsPinned(true)

        // Calculate fill progress based on scroll distance while pinned
        const scrollProgress = scrollY - pinStart
        const progress = (scrollProgress / scrollDistance) * 100
        setFillProgress(Math.min(100, Math.max(0, progress)))
      } else if (scrollY >= pinEnd) {
        // Scrolled past - unpin and keep at 100%
        setIsPinned(false)
        setFillProgress(100)
      } else {
        // Before pin start
        setIsPinned(false)
        setFillProgress(0)
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateProgress() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `calc(100vh + ${scrollDistance}px)`,
        position: 'relative'
      }}
    >
      <section
        ref={sectionRef}
        className="w-full h-screen overflow-hidden flex justify-center items-center"
        style={{
          backgroundColor: '#EFE9E1',
          position: isPinned ? 'fixed' : fillProgress === 100 ? 'absolute' : 'relative',
          top: isPinned ? 0 : fillProgress === 100 ? 'auto' : 'auto',
          bottom: fillProgress === 100 ? 0 : 'auto',
          left: isPinned || fillProgress === 100 ? 0 : 'auto',
          right: isPinned || fillProgress === 100 ? 0 : 'auto'
        }}
      >
      {/* Giant "ROCK" Typography - Layer 2 */}
      <div className="relative">
        {/* Base text - subtle beige */}
        <h1
          className="select-none uppercase tracking-tight"
          style={{
            fontSize: 'clamp(200px, 40vw, 500px)',
            fontWeight: 900,
            color: '#D4C4B0',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}
        >
          ROCK
        </h1>

        {/* Filled text - darker color - animates with scroll */}
        <h1
          className="select-none uppercase tracking-tight absolute top-0 left-0"
          aria-hidden="true"
          style={{
            fontSize: 'clamp(200px, 40vw,  500px)',
            fontWeight: 900,
            color: '#8B6F47', // Darker gold/brown fill color
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            clipPath: `inset(0 ${100 - fillProgress}% 0 0)`,
            willChange: 'clip-path',
          }}
        >
          ROCK
        </h1>
      </div>

      {/* Floating Marble Stones - Layer 3 */}

      {/* Stone 1 - Top Left (above R) */}
      <img
        src="/assets/images/rock.png"
        alt="Marble stone"
        className="absolute pointer-events-none"
        style={{
          top: '15%',
          left: '12%',
          width: '170px',
          height: 'auto',
          transform: 'rotate(-22deg)',
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))'
        }}
      />

      {/* Stone 2 - Top Right Large (above K) */}
      <img
        src="/assets/images/rock.png"
        alt="Marble stone"
        className="absolute pointer-events-none"
        style={{
          top: '11%',
          right: '15%',
          width: '180px',
          height: 'auto',
          transform: 'rotate(28deg)',
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))'
        }}
      />

      {/* Stone 3 - Center Small (on first O) */}
      <img
        src="/assets/images/rock.png"
        alt="Marble stone"
        className="absolute pointer-events-none"
        style={{
          top: '36%',
          left: '50%',
          width: '100px',
          height: 'auto',
          transform: 'rotate(-18deg)',
          filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.08))'
        }}
      />

      {/* Stone 4 - Bottom Left Small (lower R) */}
      <img
        src="/assets/images/rock.png"
        alt="Marble stone"
        className="absolute pointer-events-none"
        style={{
          top: '57%',
          left: '27%',
          width: '80px',
          height: 'auto',
          transform: 'rotate(-12deg)',
          filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.08))'
        }}
      />

      {/* Stone 5 - Bottom Right (near CARVED text) */}
      <img
        src="/assets/images/rock.png"
        alt="Marble stone"
        className="absolute pointer-events-none"
        style={{
          top: '68%',
          right: '10%',
          width: '200px',
          height: 'auto',
          transform: 'rotate(-35deg)',
          filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))'
        }}
      />

      {/* Bottom-Right Content Block - Layer 4 */}
      <div
        className="absolute"
        style={{
          bottom: '10%',
          right: '25%',
          maxWidth: '320px',
          zIndex: 10,
          opacity: fillProgress / 100,
          transform: `translateY(${20 - (fillProgress / 100) * 20}px)`,
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
        }}
      >
        <div
          key={currentLetter}
          style={{
            animation: 'rockContentFade 0.6s ease-in-out'
          }}
        >
          {/* Dynamic Heading */}
          <h2
            className="uppercase mb-3"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
              fontSize: 'clamp(42px, 4vw, 52px)',
              fontWeight: 400,
              color: '#7D1F1F',
              letterSpacing: '0.15em',
              lineHeight: 1.2
            }}
          >
            {content.heading}
          </h2>

          {/* Dynamic Body Text */}
          <p
            className="max-w-[280px]"
            style={{
              fontFamily: "'Cormorant Garamond', 'Lora', serif",
              fontSize: '15px',
              fontWeight: 300,
              color: '#2C2C2C',
              lineHeight: 1.6,
              letterSpacing: '0.02em'
            }}
          >
            {content.text}
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rockContentFade {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
    </section>
    </div>
  )
}

export default Rock
