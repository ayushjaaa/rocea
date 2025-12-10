import React, { useState, useEffect, useRef } from 'react'
import './FurnitureShowcase.css'

/**
 * FurnitureShowcase - A hero section displaying furniture products
 * Layout: 3-column flex (Left Rail, Center Card, Right Rail) with floating top tabs
 *
 * Props:
 * - views: Array of { id, label } for top tab bar
 * - categories: Array of { id, label, icon } for left rail
 * - products: Array of { id, name } for right rail thumbnails
 * - tags: Array of strings for tag buttons
 * - backgroundImage: URL for background image
 * - brandTitle: Main title text (e.g., "Casa")
 * - productTitle: Product name text (e.g., "Armchair")
 * - productImage: URL for main product image
 * - defaultView: Initial active view id
 * - defaultCategory: Initial active category id
 * - defaultProduct: Initial active product id
 * - onViewChange: Callback when view changes
 * - onCategoryChange: Callback when category changes
 * - onProductChange: Callback when product changes
 * - categories: Array with color themes { id, label, icon, primaryBgColor, secondaryBgColor, textColor }
 */
const FurnitureShowcase = ({
  views = [
    { id: 'front', label: 'Front View' },
    { id: 'bottom', label: 'Bottom View' },
    { id: 'top', label: 'Top View' },
  ],
  categories = [
    {
      id: 'casa',
      label: 'Casa',
      icon: <CasaIcon />,
      primaryBgColor: '#9A9286',
      secondaryBgColor: '#A8A196',
      textColor: '#FFFFFF',
      backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074&auto=format&fit=crop'
    },
    {
      id: 'bagno',
      label: 'Bagno',
      icon: <BagnoIcon />,
      primaryBgColor: '#D4C4B0',
      secondaryBgColor: '#E8DDD0',
      textColor: '#5C4A3D',
      backgroundImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2187&auto=format&fit=crop'
    },
    {
      id: 'luce',
      label: 'Luce',
      icon: <LuceIcon />,
      primaryBgColor: '#8B2332',
      secondaryBgColor: '#A03040',
      textColor: '#FFFFFF',
      backgroundImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop'
    },
  ],
  products = [
    { id: 0, name: 'Side Table' },
    { id: 1, name: 'Bust Statue' },
    { id: 2, name: 'Hex Clock 1' },
    { id: 3, name: 'Hex Clock 2' },
  ],
  tags = ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  backgroundImage = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074&auto=format&fit=crop',
  brandTitle = 'Casa',
  productTitle = 'Armchair',
  productImage = '/images/armchair.png',
  defaultView = 'front',
  defaultCategory = 'casa',
  defaultProduct = 0,
  onViewChange,
  onCategoryChange,
  onProductChange,
}) => {
  const [activeView, setActiveView] = useState(defaultView)
  const [activeCategory, setActiveCategory] = useState(defaultCategory)
  const [activeProduct, setActiveProduct] = useState(defaultProduct)
  const [imageZoomed, setImageZoomed] = useState(false)
  const sectionRef = useRef(null)

  // Trigger zoom animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageZoomed(true)
    }, 300) // Delay before zoom starts

    return () => clearTimeout(timer)
  }, [])

  // Scroll-based category switching
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const sectionTop = section.offsetTop
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      // Calculate scroll progress within the section (0 to 1 for each category)
      const scrollWithinSection = scrollY - sectionTop
      const totalScrollDistance = viewportHeight * (categories.length - 1)

      if (scrollWithinSection < 0) {
        // Before section - show first category
        if (activeCategory !== categories[0].id) {
          setActiveCategory(categories[0].id)
        }
      } else if (scrollWithinSection >= totalScrollDistance) {
        // After all categories - show last category
        if (activeCategory !== categories[categories.length - 1].id) {
          setActiveCategory(categories[categories.length - 1].id)
        }
      } else {
        // Within section - calculate which category based on scroll
        const categoryIndex = Math.floor(scrollWithinSection / viewportHeight)
        const clampedIndex = Math.min(Math.max(categoryIndex, 0), categories.length - 1)
        const targetCategory = categories[clampedIndex].id

        if (activeCategory !== targetCategory) {
          setActiveCategory(targetCategory)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [categories, activeCategory])

  // Get active category's color theme and background
  const activeCategoryData = categories.find(cat => cat.id === activeCategory) || categories[0]
  const { primaryBgColor, secondaryBgColor, textColor, backgroundImage: categoryBgImage } = activeCategoryData
  const currentBgImage = categoryBgImage || backgroundImage

  const handleViewChange = (viewId) => {
    setActiveView(viewId)
    onViewChange?.(viewId)
  }

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    onCategoryChange?.(categoryId)
  }

  const handleProductChange = (productId) => {
    setActiveProduct(productId)
    onProductChange?.(productId)
  }

  // Height for scroll container = (number of categories + 1) * 100vh
  // Each category gets 100vh of scroll time, including the last one
  const scrollContainerHeight = `${(categories.length + 1) * 100}vh`

  return (
    <div
      ref={sectionRef}
      className="scroll-container relative"
      style={{ height: scrollContainerHeight }}
    >
      <section
        className="furniture-showcase"
        style={{
          backgroundImage: `url('${currentBgImage}')`,
        }}
      >
      {/* Subtle overlay */}
      <div className="overlay" />

      {/* Main content wrapper */}
      <div className="content-wrapper">
        <div className="content-container">

          {/* Three-column layout - aligned at top */}
          <div className="three-column-layout">

            {/* LEFT RAIL - Category navigation */}
            <div
              className="left-rail"
              style={{
                backgroundColor: primaryBgColor,
              }}
            >
              {categories.map((category) => {
                const isSelected = activeCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`category-card ${isSelected ? 'active' : ''}`}
                    style={{
                      backgroundColor: isSelected ? secondaryBgColor : 'transparent',
                    }}
                  >
                    <div
                      className="icon-wrapper"
                      style={{ color: textColor, opacity: isSelected ? 1 : 0.7 }}
                    >
                      {category.icon}
                    </div>
                    <span
                      className="category-label"
                      style={{
                        color: textColor,
                        opacity: isSelected ? 1 : 0.7,
                      }}
                    >
                      {category.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* CENTER COLUMN - Tab bar + Main product card */}
            <div className="center-column">
              {/* Top Tab Bar - aligned with center card */}
              <div
                className="tab-bar"
                style={{
                  backgroundColor: primaryBgColor,
                }}
              >
                {views.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => handleViewChange(view.id)}
                    className="tab-button"
                    style={{
                      backgroundColor: activeView === view.id
                        ? secondaryBgColor
                        : 'transparent',
                      color: textColor,
                      opacity: activeView === view.id ? 1 : 0.7,
                    }}
                  >
                    {view.label}
                  </button>
                ))}
              </div>

              {/* CENTER CARD - Main product display */}
              <div
                className="center-card"
                style={{
                  backgroundColor: primaryBgColor,
                }}
              >
              {/* Header */}
              <div className="card-header">
                <h2
                  className="brand-title"
                  style={{
                    color: textColor,
                  }}
                >
                  {brandTitle}
                </h2>
                <span
                  className="product-title"
                  style={{ color: textColor }}
                >
                  {productTitle}
                </span>
              </div>

              {/* Product image container */}
              <div className="product-image-container">
                <img
                  src={productImage}
                  alt={productTitle}
                  className={`product-image ${imageZoomed ? 'zoomed' : 'initial'}`}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="placeholder-container hidden">
                  <ArmchairPlaceholder />
                </div>
              </div>

              {/* Product property tags */}
              <div className="tags-container">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="property-tag"
                    style={{
                      color: textColor,
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            </div>

            {/* RIGHT RAIL - Product thumbnails (portrait, scrollable) */}
            <div
              className="right-rail"
              style={{
                backgroundColor: primaryBgColor,
              }}
            >
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductChange(product.id)}
                  className={`thumbnail-card ${activeProduct === product.id ? 'active' : ''}`}
                  style={{
                    backgroundColor: activeProduct === product.id ? 'rgba(255,255,255,0.35)' : secondaryBgColor,
                  }}
                >
                  <div className="thumbnail-image-container">
                    <ProductThumbnail type={product.id} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

// ============ SVG ICON COMPONENTS ============

const CasaIcon = () => (
  <svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="36" height="36" rx="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M13 15C13 11 17 8 21 8C25 8 29 11 29 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="21" cy="11" r="1.8" stroke="currentColor" strokeWidth="1.3" fill="none"/>
    <rect x="16" y="14" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" fill="none"/>
    <rect x="22" y="14" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" fill="none"/>
    <path d="M9 25C9 25 12 23 16 23C20 23 21 25 21 25C21 25 22 23 26 23C30 23 33 25 33 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M9 30C9 30 12 28 16 28C20 28 21 30 21 30C21 30 22 28 26 28C30 28 33 30 33 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
)

const BagnoIcon = () => (
  <svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="36" height="36" rx="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <ellipse cx="15" cy="21" rx="5" ry="11" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <ellipse cx="27" cy="21" rx="5" ry="11" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <line x1="15" y1="10" x2="15" y2="32" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="27" y1="10" x2="27" y2="32" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M10 17H20" stroke="currentColor" strokeWidth="1.1"/>
    <path d="M10 25H20" stroke="currentColor" strokeWidth="1.1"/>
    <path d="M22 17H32" stroke="currentColor" strokeWidth="1.1"/>
    <path d="M22 25H32" stroke="currentColor" strokeWidth="1.1"/>
  </svg>
)

const LuceIcon = () => (
  <svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="36" height="36" rx="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="21" cy="15" r="5.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <line x1="21" y1="6" x2="21" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="28" y1="9" x2="26.5" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="9" x2="15.5" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="30" y1="15" x2="28" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="15" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 27C9 27 13 24 21 24C29 24 33 27 33 27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M9 32C9 32 13 29 21 29C29 29 33 32 33 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
)

const ArmchairPlaceholder = () => (
  <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M65 190 L65 95 Q65 45 130 45 Q195 45 195 95 L195 190"
      fill="#f5f5f5"
      stroke="#e0e0e0"
      strokeWidth="2"
    />
    <path
      d="M55 190 Q55 225 95 235 L165 235 Q205 225 205 190 L205 170 Q165 180 130 180 Q95 180 55 170 Z"
      fill="#ebebeb"
      stroke="#d5d5d5"
      strokeWidth="2"
    />
    <path d="M85 75 Q115 115 95 155" stroke="#d0d0d0" strokeWidth="1" fill="none"/>
    <path d="M150 65 Q170 105 160 145" stroke="#d0d0d0" strokeWidth="1" fill="none"/>
    <path d="M110 190 Q130 210 150 200" stroke="#c5c5c5" strokeWidth="1" fill="none"/>
  </svg>
)

const ProductThumbnail = ({ type }) => {
  switch(type) {
    case 0:
      return (
        <svg width="55" height="65" viewBox="0 0 55 65" fill="none">
          <ellipse cx="27.5" cy="12" rx="20" ry="7" fill="#e8e4de" stroke="#d5d0c8" strokeWidth="1"/>
          <path d="M21 12 L19 50 Q19 55 27.5 55 Q36 55 36 50 L34 12" fill="#f0ece6" stroke="#d5d0c8" strokeWidth="1"/>
          <ellipse cx="27.5" cy="55" rx="10" ry="3.5" fill="#e0dcd5" stroke="#ccc8c0" strokeWidth="1"/>
          <line x1="25" y1="17" x2="23" y2="46" stroke="#d8d4cc" strokeWidth="0.5"/>
          <line x1="30" y1="17" x2="32" y2="46" stroke="#d8d4cc" strokeWidth="0.5"/>
        </svg>
      )
    case 1:
      return (
        <svg width="50" height="65" viewBox="0 0 50 65" fill="none">
          <rect x="13" y="52" width="24" height="10" rx="2" fill="#e5e0d8" stroke="#d0cbc0" strokeWidth="1"/>
          <path d="M10 52 Q10 43 18 40 L32 40 Q40 43 40 52" fill="#f0ebe3" stroke="#d5d0c5" strokeWidth="1"/>
          <rect x="20" y="33" width="10" height="9" rx="2" fill="#ece7df" stroke="#d5d0c5" strokeWidth="1"/>
          <ellipse cx="25" cy="22" rx="11" ry="13" fill="#f5f0e8" stroke="#d5d0c5" strokeWidth="1"/>
          <path d="M16 18 Q18 9 25 7 Q32 9 34 18" stroke="#d5d0c5" strokeWidth="1" fill="none"/>
          <ellipse cx="21" cy="21" rx="1.3" ry="0.9" fill="#c5c0b5"/>
          <ellipse cx="29" cy="21" rx="1.3" ry="0.9" fill="#c5c0b5"/>
          <path d="M23 27 Q25 29 27 27" stroke="#c5c0b5" strokeWidth="0.7" fill="none"/>
          <path d="M18 33 Q23 36 20 42" stroke="#d0cbc0" strokeWidth="0.5" fill="none"/>
          <path d="M32 28 Q35 33 33 40" stroke="#d0cbc0" strokeWidth="0.5" fill="none"/>
        </svg>
      )
    case 2:
      return (
        <svg width="65" height="65" viewBox="0 0 65 65" fill="none">
          <polygon
            points="32.5,4 57,16 57,49 32.5,61 8,49 8,16"
            fill="#e8e5e0"
            stroke="#d0ccc5"
            strokeWidth="1.3"
          />
          <polygon
            points="32.5,9 52,19 52,46 32.5,56 13,46 13,19"
            fill="none"
            stroke="#d8d5d0"
            strokeWidth="0.5"
          />
          <circle cx="32.5" cy="32.5" r="1.8" fill="#a09080"/>
          <line x1="32.5" y1="32.5" x2="23" y2="20" stroke="#8b8070" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="32.5" y1="32.5" x2="45" y2="26" stroke="#9a9080" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M18 23 Q28 28 23 42" stroke="#d5d2cc" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <path d="M42 18 Q47 32 42 46" stroke="#d5d2cc" strokeWidth="0.5" fill="none" opacity="0.6"/>
        </svg>
      )
    case 3:
      return (
        <svg width="65" height="65" viewBox="0 0 65 65" fill="none">
          <polygon
            points="32.5,4 57,16 57,49 32.5,61 8,49 8,16"
            fill="#e8e5e0"
            stroke="#d0ccc5"
            strokeWidth="1.3"
          />
          <polygon
            points="32.5,9 52,19 52,46 32.5,56 13,46 13,19"
            fill="none"
            stroke="#d8d5d0"
            strokeWidth="0.5"
          />
          <circle cx="32.5" cy="32.5" r="1.8" fill="#a09080"/>
          <line x1="32.5" y1="32.5" x2="42" y2="45" stroke="#8b8070" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="32.5" y1="32.5" x2="20" y2="28" stroke="#9a9080" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M16 28 Q26 33 20 45" stroke="#d5d2cc" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <path d="M45 20 Q49 35 44 48" stroke="#d5d2cc" strokeWidth="0.5" fill="none" opacity="0.6"/>
        </svg>
      )
    default:
      return null
  }
}

export default FurnitureShowcase
export { CasaIcon, BagnoIcon, LuceIcon, ProductThumbnail, ArmchairPlaceholder }
