import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GalleryItem from '../CustomerGallery/GalleryItem'
import TimelineHero from './TimelineHero'
import '../CustomerGallery/CustomerGallery.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * GalleryToTimeline - Combined Gallery expansion to Timeline transition
 *
 * Flow:
 * Phase 1 (0-60%): Gallery items fade out as center image grows to full screen
 * Phase 2 (60-100%): Image stays at full screen, timeline fades in on top
 * Creates seamless effect where the expanded image becomes the timeline background
 */
const GalleryToTimeline = ({
  galleryImages = [
    { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop', alt: 'Interior 1', sizeType: 'small' },
    { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=800&fit=crop', alt: 'Interior 2', sizeType: 'medium' },
    { src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920', alt: 'Hero Interior', sizeType: 'hero' },
    { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=800&fit=crop', alt: 'Interior 4', sizeType: 'medium' },
    { src: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&h=600&fit=crop', alt: 'Interior 5', sizeType: 'small' },
  ],
  timelineSections,
  topRightText = 'We take pride in transforming spaces into personal sanctuaries.',
  bottomLeftText = 'Our clients trust us to bring their vision to life.',
  bulletLabel = 'TRUSTED PARTNERS',
  autoPlayInterval = 5000,
}) => {
  const sectionRef = useRef(null)
  const galleryRowRef = useRef(null)
  const timelineContainerRef = useRef(null)
  const [activeIndex] = useState(2) // Hero image is at index 2
  const [activeSection, setActiveSection] = useState(0)
  const [timelineVisible, setTimelineVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const galleryRow = galleryRowRef.current
    const timelineContainer = timelineContainerRef.current

    if (!section || !galleryRow || !timelineContainer) return

    const activeItem = galleryRow.querySelector('.customer-gallery__item--active')
    const activeImg = activeItem?.querySelector('img')
    const otherItems = galleryRow.querySelectorAll('.customer-gallery__item:not(.customer-gallery__item--active)')
    const galleryContent = section.querySelector('.gallery-content')

    if (!activeItem || !activeImg) return

    // ScrollTrigger for unified expansion + timeline reveal
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=120%', // Reduced from 200% to prevent overlap with WhySection
      scrub: 0.5,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress

        // Phase 1: Gallery fade out and image expansion (0% - 60%)
        // Phase 2: Image reaches full screen and timeline fades in (60% - 100%)
        const phase1End = 0.6

        if (activeItem && activeImg) {
          // Calculate how much to expand to fill the screen
          const targetWidth = window.innerWidth
          const targetHeight = window.innerHeight

          // Get current dimensions
          const currentRect = activeItem.getBoundingClientRect()
          const scaleX = targetWidth / currentRect.width
          const scaleY = targetHeight / currentRect.height

          // Use the larger scale to ensure full coverage
          const targetScale = Math.max(scaleX, scaleY)

          // Image should reach full scale by phase1End (60%), not at 100%
          const scaleProgress = Math.min(progress / phase1End, 1)
          const currentScale = 1 + (scaleProgress * (targetScale - 1))

          const borderRadius = Math.max(0, 4 - (scaleProgress * 4))

          gsap.set(activeItem, {
            scale: currentScale,
            borderRadius: borderRadius,
            zIndex: progress <= phase1End ? 100 : 1, // High z-index during scaling, then behind timeline
            transformOrigin: 'center center', // Scale from center
          })

          // Set object-fit cover on the image to fill screen edge to edge
          gsap.set(activeImg, {
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          })
        }

        // Phase 1: Fade out other items and gallery content (0% - 60%)
        if (progress <= phase1End) {
          const fadeProgress = progress / phase1End
          otherItems.forEach((item) => {
            gsap.set(item, {
              opacity: 1 ,
            })
          })

          gsap.set(galleryContent, {
            opacity: 1 ,
          })

          // Keep timeline hidden
          gsap.set(timelineContainer, {
            opacity: 0,
            pointerEvents: 'none',
          })
        }
        // Phase 2: Timeline fades in (60% - 100%)
        else {
          const timelineProgress = (progress - phase1End) / (1 - phase1End)

          // Gallery completely hidden
          otherItems.forEach((item) => {
            gsap.set(item, {
              opacity: 0,
            })
          })

          gsap.set(galleryContent, {
            opacity: 0,
          })

          // Fade in timeline
          gsap.set(timelineContainer, {
            opacity: 1,
            pointerEvents: timelineProgress > 0.5 ? 'auto' : 'none',
          })

          if (!timelineVisible) {
            setTimelineVisible(true)
          }
        }
      },
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [activeIndex, timelineVisible])

  return (
    <section
      ref={sectionRef}
      className="customer-gallery"
      aria-label="Gallery to Timeline Transition"
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        background: 'none'
      }}
    >
      {/* Gallery Content */}
      <div className="gallery-content" style={{ background: 'transparent', backgroundColor: 'transparent' }}>
        {/* Top Row */}
        <div className="customer-gallery__top-row">
          <header className="customer-gallery__label">
            <h2>Our Customers</h2>
          </header>

          <div className="customer-gallery__top-text">
            <p>{topRightText}</p>
            <div className="customer-gallery__bullet">
              <span className="customer-gallery__bullet-dot" aria-hidden="true" />
              <span className="customer-gallery__bullet-label">{bulletLabel}</span>
            </div>
          </div>
        </div>

        {/* Gallery Row */}
        <div
          ref={galleryRowRef}
          className="customer-gallery__row"
          role="list"
          style={{ background: 'transparent', position: 'relative', zIndex: 10 }}
        >
          {galleryImages.map((image, index) => (
            <GalleryItem
              key={index}
              src={image.src}
              alt={image.alt}
              sizeType={image.sizeType}
              isActive={index === activeIndex}
            />
          ))}
        </div>

        {/* Bottom Text */}
        <div className="customer-gallery__bottom-text">
          <p>{bottomLeftText}</p>
        </div>
      </div>

      {/* Timeline Hero - Fades in on top as image grows */}
      <div
        ref={timelineContainerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        {timelineVisible && (
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
    </section>
  )
}

export default GalleryToTimeline
