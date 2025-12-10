import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GalleryItem from './GalleryItem'
import './CustomerGallery.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const CustomerGallery = ({
  images = [
    { src: '/images/customer-1.jpg', alt: 'Customer interior 1', sizeType: 'small' },
    { src: '/images/customer-2.jpg', alt: 'Customer interior 2', sizeType: 'medium' },
    { src: '/images/customer-3.jpg', alt: 'Customer interior 3', sizeType: 'hero' },
    { src: '/images/customer-4.jpg', alt: 'Customer interior 4', sizeType: 'medium' },
    { src: '/images/customer-5.jpg', alt: 'Customer interior 5', sizeType: 'small' },
  ],
  topRightText = 'We take pride in transforming spaces into personal sanctuaries. Each project reflects our commitment to timeless elegance and meticulous craftsmanship.',
  bottomLeftText = 'Our clients trust us to bring their vision to life with furniture that combines artistry and function. From classic pieces to contemporary designs, every creation tells a unique story of refined living.',
  bulletLabel = 'LOREM IPSUM',
  mobileLayout = 'stack', // 'stack' | 'carousel'
  autoPlayInterval = 5000, // Time in ms for each image
}) => {
  const sectionRef = useRef(null)
  const galleryRowRef = useRef(null)

  // Start with first image on mobile, center image on desktop
  const getInitialIndex = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 0 : 2
    }
    return 2
  }

  const [activeIndex, setActiveIndex] = useState(getInitialIndex())
  const [progress, setProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)

  const progressAnimationRef = useRef(null)
  const startTimeRef = useRef(null)
  const intervalRef = useRef(null)

  // GSAP ScrollTrigger for center image expansion
  useEffect(() => {
    const section = sectionRef.current
    const galleryRow = galleryRowRef.current

    if (!section || !galleryRow) return

    // Check if mobile (disable pin on mobile to avoid excessive scrolling)
    const isMobile = window.innerWidth < 768

    // Skip ScrollTrigger animation on mobile - layout is already stacked
    if (isMobile) {
      setIsInView(true)
      return
    }

    // Get gallery items
    const activeItem = galleryRow.querySelector('.customer-gallery__item--active')
    const otherItems = galleryRow.querySelectorAll('.customer-gallery__item:not(.customer-gallery__item--active)')
    const galleryContent = section.querySelector('.customer-gallery__top-row') // ✅ FIX: Define galleryContent

    // Create ScrollTrigger for the expansion effect (desktop/tablet only)
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top', // Start when section top hits viewport top
      end: 'bottom bottom', // End when section bottom hits bottom
      scrub: 0.5, // Smooth scrubbing
      pin: galleryRow.parentElement, // Pin the gallery content wrapper
      pinSpacing: true,
      onEnter: () => setIsInView(true),
      onLeave: () => setIsInView(false),
      onEnterBack: () => setIsInView(true),
      onLeaveBack: () => setIsInView(false),
      onUpdate: (self) => {
        const progress = self.progress
   
        console.log(progress)

        // Animate active image scale (from 1 to 2.8 to cover full width)
        if (activeItem) {
          const scale = 1 + (progress * 1.8)
          const borderRadius = Math.max(0, 4 - (progress * 4))

          gsap.set(activeItem, {
            scale: scale,
            borderRadius: borderRadius,
            zIndex: progress > 0.1 ? 100 : 10,
          })
        }

        // Fade out other items
        otherItems.forEach((item) => {
          gsap.set(item, { opacity: 1 })
        })
        
        gsap.set(galleryContent, { opacity: 1 })
        
      },
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [activeIndex])

  // Auto-rotate images with timeline progress
  useEffect(() => {
    if (!isInView) {
      setProgress(0)
      startTimeRef.current = null
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (progressAnimationRef.current) {
        cancelAnimationFrame(progressAnimationRef.current)
      }
      return
    }

    startTimeRef.current = Date.now()

    const animateProgress = () => {
      if (!startTimeRef.current) return

      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.min((elapsed / autoPlayInterval) * 100, 100)
      setProgress(newProgress)

      if (newProgress < 100) {
        progressAnimationRef.current = requestAnimationFrame(animateProgress)
      }
    }

    progressAnimationRef.current = requestAnimationFrame(animateProgress)

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
      setProgress(0)
      startTimeRef.current = Date.now()
    }, autoPlayInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (progressAnimationRef.current) {
        cancelAnimationFrame(progressAnimationRef.current)
      }
    }
  }, [isInView, autoPlayInterval, images.length])

  // Handle timeline click
  const handleTimelineClick = (index) => {
    setActiveIndex(index)
    setProgress(0)
    startTimeRef.current = Date.now()

    // Refresh ScrollTrigger to update active element
    ScrollTrigger.refresh()
  }

  const sectionClassName = [
    'customer-gallery',
    mobileLayout === 'carousel' ? 'customer-gallery--carousel' : '',
    isInView ? 'customer-gallery--in-view' : '',
  ].filter(Boolean).join(' ')

  return (
    <section
      ref={sectionRef}
      className={sectionClassName}
      aria-label="Our Customers Gallery"
      style={{ height: '200vh' }}
    >
      {/* Top Row - Label Left, Text Right */}
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
      >
        {images.map((image, index) => (
          <GalleryItem
            key={index}
            src={image.src}
            alt={image.alt}
            sizeType={image.sizeType}
            isActive={index === activeIndex}
          />
        ))}
      </div>

      {/* Timeline Progress Indicator */}
      <div className="customer-gallery__timeline" role="tablist" aria-label="Image timeline">
        {images.map((_, index) => (
          <button
            key={index}
            className={`customer-gallery__timeline-item ${index === activeIndex ? 'customer-gallery__timeline-item--active' : ''}`}
            onClick={() => handleTimelineClick(index)}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`View image ${index + 1}`}
          >
            <span className="customer-gallery__timeline-track">
              <span
                className="customer-gallery__timeline-progress"
                style={{
                  width: index === activeIndex ? `${progress}%` : index < activeIndex ? '100%' : '0%'
                }}
              />
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Left Paragraph */}
      <div className="customer-gallery__bottom-text">
        <p>{bottomLeftText}</p>
      </div>
    </section>
  )
}

export default CustomerGallery
