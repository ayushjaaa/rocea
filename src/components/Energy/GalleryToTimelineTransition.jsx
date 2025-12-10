import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomerGallery from '../CustomerGallery'
import TimelineHero from './TimelineHero'

gsap.registerPlugin(ScrollTrigger)

/**
 * GalleryToTimelineTransition
 *
 * Seamlessly transitions from CustomerGallery expansion to TimelineHero
 *
 * Flow:
 * 1. CustomerGallery with 5 images
 * 2. Center image scales up on scroll
 * 3. When fully expanded, reveal TimelineHero with same background
 * 4. TimelineHero continues with auto-play
 */
const GalleryToTimelineTransition = ({
  galleryImages,
  timelineSections,
  topRightText,
  bottomLeftText,
  bulletLabel,
  autoPlayInterval = 5000,
}) => {
  const containerRef = useRef(null)
  const timelineRef = useRef(null)
  const [showTimeline, setShowTimeline] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const timeline = timelineRef.current

    if (!container || !timeline) return

    // ScrollTrigger to detect when gallery is fully expanded
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=200%', // Extended scroll distance for smooth transition
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress

        // At 50% scroll progress, start fading in timeline
        if (progress >= 0.5) {
          const fadeProgress = (progress - 0.5) * 2 // 0 to 1 mapping
          setShowTimeline(true)
          gsap.set(timeline, {
            opacity: fadeProgress,
            pointerEvents: fadeProgress > 0.9 ? 'auto' : 'none',
          })
        } else {
          setShowTimeline(false)
          gsap.set(timeline, {
            opacity: 0,
            pointerEvents: 'none',
          })
        }
      },
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Customer Gallery - Expands on scroll */}
      <div className="relative">
        <CustomerGallery
          images={galleryImages}
          topRightText={topRightText}
          bottomLeftText={bottomLeftText}
          bulletLabel={bulletLabel}
          mobileLayout="stack"
        />
      </div>

      {/* Timeline Hero - Fades in when gallery is fully expanded */}
      <div
        ref={timelineRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{ zIndex: 100 }}
      >
        {showTimeline && (
          <TimelineHero
            autoPlay={true}
            autoPlayInterval={autoPlayInterval}
            sections={timelineSections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            enableAnimations={true}
          />
        )}
      </div>
    </div>
  )
}

export default GalleryToTimelineTransition
