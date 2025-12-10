import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

/**
 * TimelineHero - Full-screen hero section with timeline navigation
 *
 * Features:
 * - Animated white timeline bar that grows based on active section
 * - Background image transitions when section changes
 * - Smooth animations and transitions
 * - Auto-play feature that cycles through sections
 */
const TimelineHero = ({
  sections,
  activeSection,
  onSectionChange,
  enableAnimations = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}) => {
  const [backgroundZoomed, setBackgroundZoomed] = useState(false)
  const [currentSectionData, setCurrentSectionData] = useState(sections[activeSection])

  // Trigger UI elements after background zoom completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setBackgroundZoomed(true)
    }, enableAnimations ? 1400 : 100)

    return () => clearTimeout(timer)
  }, [enableAnimations])

  // Update current section data when activeSection changes
  useEffect(() => {
    setCurrentSectionData(sections[activeSection])
  }, [activeSection, sections])

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !backgroundZoomed) return

    const autoPlayTimer = setInterval(() => {
      const nextIndex = (activeSection + 1) % sections.length
      onSectionChange?.(nextIndex)
    }, autoPlayInterval)

    return () => clearInterval(autoPlayTimer)
  }, [autoPlay, activeSection, sections.length, autoPlayInterval, onSectionChange, backgroundZoomed])

  // Animation variants
  const backgroundVariants = {
    initial: { scale: 1.3, opacity: 0 },
    zoomed: { scale: 1, opacity: 1 },
    exit: { opacity: 0 },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  }

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  }

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      y: [0, -8, 0],
      transition: {
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        y: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }
      }
    },
  }

  const navVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Calculate timeline progress percentage
  const calculateProgress = () => {
    return ((activeSection + 1) / sections.length) * 100
  }

  const handleSectionClick = (index) => {
    onSectionChange?.(index)
  }

  const handleNextSection = () => {
    const nextIndex = (activeSection + 1) % sections.length
    handleSectionClick(nextIndex)
  }

  return (
    <section
      className="relative h-screen w-screen overflow-hidden"
      aria-label={`${currentSectionData.label} section hero`}
    >
      {/* Background Image with Zoom Animation and Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          className="absolute inset-0"
          initial={enableAnimations ? "initial" : "zoomed"}
          animate="zoomed"
          exit="exit"
          variants={backgroundVariants}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <img
            src={currentSectionData.backgroundImageUrl}
            alt={`${currentSectionData.label} background`}
            className="h-full w-full object-cover object-center"
          />
          <div className="background-overlay absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="main-content-container relative z-10 flex h-full w-full items-start justify-between px-5 pb-32 pt-6 sm:px-8 sm:pt-10 md:items-center md:px-12 md:pb-36 md:pt-12 lg:px-16 lg:pb-20 xl:px-20 xl:mr-20">

        {/* LEFT SECTION - Title */}
        <div className="title-section flex flex-col items-start justify-start w-full space-y-4 pb-4 md:justify-center md:space-y-8 md:w-auto lg:pb-8">
          {/* Large Title */}
          <AnimatePresence mode="wait">
            {backgroundZoomed && (
              <motion.h1
                key={currentSectionData.label}
                initial={enableAnimations ? "hidden" : "visible"}
                animate="visible"
                exit="hidden"
                variants={titleVariants}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[120px] xl:text-[140px]"
                style={{ lineHeight: 1 }}
              >
                {currentSectionData.titleText}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SECTION - White Floating Card */}
        <AnimatePresence mode="wait">
          {backgroundZoomed && (
            <motion.div
              key={activeSection}
              initial={enableAnimations ? "hidden" : "visible"}
              animate="visible"
              exit="hidden"
              variants={cardVariants}
              transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
              className="hidden bg-white  p-40 flex-col w-[23.22916666] max-w-[23.2291666667vw] h-[calc(100vh-10rem)] rounded-2xl  shadow-2xl lg:flex xl:max-w-[340px] xl:p-5 mr-64"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                padding:'20px',
                marginRight:'30px',
                marginBottom:'30px'
              }}
            >
              {/* Section Number - Very Large and Light */}
              <p className="text-[45px] font-semibold font-light leading-none" style={{ color: 'rgba(0, 0, 0, 0.08)' }}>
                {currentSectionData.sectionNumber}
              </p>

              {/* Card Title */}
              <h2 className="-mt-3 text-[32px] leading-none text-gray-900">
                {currentSectionData.cardTitle}
              </h2>

              {/* Spacer for breathing room */}
              <div className="card-spacer flex-1" />

              {/* Card Subtitle */}
              {currentSectionData.cardSubtitle && (
                <h3 className="text-[18px] font-bold leading-tight text-gray-900">
                  {currentSectionData.cardSubtitle}
                </h3>
              )}

              {/* Description Paragraph */}
              <p className="mt-3 text-[14px] leading-relaxed text-gray-800" style={{ lineHeight: '1.6' }}>
                {currentSectionData.cardDescription}
              </p>

              {/* Grid of 6 Mini Cards */}
              {currentSectionData.gridItems && (
                <div className="grid-items-container mt-4 px-1 grid grid-cols-2 gap-2.5 sm:mt-5 sm:px-2 sm:grid-cols-3 sm:gap-3 lg:mt-6 lg:px-0 lg:gap-3">
                  {currentSectionData.gridItems.map((item, index) => (
                    <div
                      key={index}
                      className="grid-item group relative overflow-hidden rounded-lg aspect-5/4 h-auto min-h-[60px] sm:min-h-[70px] lg:min-h-[80px] cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.label}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="image-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity group-hover:from-black/50" />
                      <div className="image-label-container absolute inset-0 flex items-end p-1.5 sm:p-2">
                        <p className="text-[9px] font-semibold leading-tight text-white drop-shadow-lg sm:text-[10px] lg:text-xs">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM NAVIGATION BAR WITH TIMELINE */}
      <AnimatePresence>
        {backgroundZoomed && (
          <motion.nav
            initial={enableAnimations ? "hidden" : "visible"}
            animate="visible"
            variants={navVariants}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-sm md:from-black/30"
            aria-label="Section navigation"
          >
            {/* Animated White Timeline Bar */}
            <div className="timeline-track relative w-full h-0.5 md:h-1 bg-white/20">
              <motion.div
                className="timeline-progress absolute top-0 left-0 h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              />
            </div>

            {/* Navigation Items */}
            <div className="nav-buttons-container flex items-center justify-center px-3 h-14 sm:h-16 sm:px-4 md:justify-around md:px-6 md:h-[68px]">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => handleSectionClick(index)}
                  className={`group relative text-[11px] font-medium tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-white/50 sm:text-xs md:text-sm px-2 sm:px-3 ${
                    index === activeSection
                      ? 'text-white block font-semibold'
                      : 'text-white/60 hover:text-white/90 hidden md:block'
                  }`}
                  aria-current={index === activeSection ? 'page' : undefined}
                >
                  <span className="uppercase whitespace-nowrap">
                    <span className="hidden md:inline">{section.sectionNumber} </span>
                    {section.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Card */}
      <AnimatePresence mode="wait">
        {backgroundZoomed && (
          <motion.div
            key={activeSection}
            initial={enableAnimations ? { opacity: 0, y: 100 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mobile-card absolute bottom-[68px] left-4 right-4 rounded-2xl bg-white/98 backdrop-blur-md p-4 shadow-2xl sm:bottom-20 sm:left-6 sm:right-6 sm:p-6 md:bottom-24 md:p-7 lg:hidden max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide"
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.15)',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Section Number */}
            <p className="text-2xl font-light text-gray-300 sm:text-3xl md:text-4xl leading-none">
              {currentSectionData.sectionNumber}
            </p>

            {/* Card Title */}
            <h2 className="mt-0.5 text-lg font-semibold leading-tight text-gray-900 sm:text-xl md:text-2xl">
              {currentSectionData.cardTitle}
            </h2>

            {/* Description */}
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-700 sm:mt-3 sm:line-clamp-3 sm:text-sm md:text-base">
              {currentSectionData.cardDescription}
            </p>

            {/* Grid Items */}
            {currentSectionData.gridItems && (
              <div className="mobile-grid-items-container mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:grid-cols-3 sm:gap-3 md:mt-5 md:gap-4">
                {currentSectionData.gridItems.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className="mobile-grid-item group relative overflow-hidden rounded-lg aspect-4/3 shadow-md transition-transform duration-300 active:scale-95 sm:rounded-xl"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.label}
                      className="h-full w-full object-cover"
                    />
                    <div className="mobile-image-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="mobile-image-label-container absolute inset-0 flex items-end p-2 sm:p-2.5">
                      <p className="text-[9px] font-semibold leading-tight text-white drop-shadow-lg sm:text-[10px]">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

TimelineHero.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionNumber: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      titleText: PropTypes.string.isRequired,
      backgroundImageUrl: PropTypes.string.isRequired,
      cardTitle: PropTypes.string.isRequired,
      cardSubtitle: PropTypes.string,
      cardDescription: PropTypes.string.isRequired,
      gridItems: PropTypes.arrayOf(
        PropTypes.shape({
          imageUrl: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  activeSection: PropTypes.number,
  onSectionChange: PropTypes.func,
  enableAnimations: PropTypes.bool,
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
}

TimelineHero.defaultProps = {
  activeSection: 0,
  enableAnimations: true,
  autoPlay: false,
  autoPlayInterval: 5000,
}

export default TimelineHero
