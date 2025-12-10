import React from 'react'
import FurnitureShowcase from './components/FurnitureShowcase'

import Rock from './components/Rock/Rock'
import ReviewSection from './components/ReviewSection/ReviewSection'
import CustomerGallery from "../src/components/CustomerGallery/CustomerGallery"
import { GalleryToTimeline } from './components/Energy' // ✅ FIX: Only import existing component
import Footer from './components/LuxuryMarble/Footer'


const App = () => {
  // Gallery images - hero image matches first timeline section background
  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop', alt: 'Interior 1', sizeType: 'small' },
    { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=800&fit=crop', alt: 'Interior 2', sizeType: 'medium' },
    { src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920', alt: 'Solar Energy Field', sizeType: 'hero' },
    { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=800&fit=crop', alt: 'Interior 4', sizeType: 'medium' },
    { src: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&h=600&fit=crop', alt: 'Interior 5', sizeType: 'small' },
  ]

  // Masonry Gallery Images - High-end interior portfolio
  const masonryImages = {
    heroBanner: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=2520&h=1080&fit=crop',
    leftVertical: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=1500&fit=crop',
    centerHero: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1800&h=1200&fit=crop',
    rightVertical: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=1600&fit=crop',
    bottomLeft: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1920&h=1080&fit=crop',
    bottomRight: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1920&h=1080&fit=crop',
  }

  // ✅ FIX: Added timeline sections data (was missing!)
  const timelineSections = [
    {
      sectionNumber: '01',
      label: 'CASA',
      titleText: 'Living',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&h=1080&fit=crop',
      cardTitle: 'Modern Living Spaces',
      cardSubtitle: 'Comfort & Elegance',
      cardDescription: 'Experience the perfect blend of contemporary design and timeless comfort in our curated living room collections.',
      gridItems: [
        { imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', label: 'Sofa Collection' },
        { imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop', label: 'Coffee Tables' },
        { imageUrl: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&h=300&fit=crop', label: 'Accent Chairs' },
        { imageUrl: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop', label: 'Lighting' },
        { imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop', label: 'Shelving' },
        { imageUrl: 'https://images.unsplash.com/photo-1558211583-803a0af1bb5e?w=400&h=300&fit=crop', label: 'Rugs' },
      ]
    },
    {
      sectionNumber: '02',
      label: 'BAGNO',
      titleText: 'Bathroom',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&h=1080&fit=crop',
      cardTitle: 'Spa-Like Retreats',
      cardSubtitle: 'Luxury & Serenity',
      cardDescription: 'Transform your bathroom into a personal sanctuary with our premium fixtures and elegant design solutions.',
      gridItems: [
        { imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', label: 'Vanities' },
        { imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop', label: 'Faucets' },
        { imageUrl: 'https://images.unsplash.com/photo-1604014237744-ce0d6bf00d10?w=400&h=300&fit=crop', label: 'Bathtubs' },
        { imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&h=300&fit=crop', label: 'Showers' },
        { imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop', label: 'Mirrors' },
        { imageUrl: 'https://images.unsplash.com/photo-1600566752729-f73bbbfe8475?w=400&h=300&fit=crop', label: 'Accessories' },
      ]
    },
    {
      sectionNumber: '03',
      label: 'LUCE',
      titleText: 'Lighting',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=1080&fit=crop',
      cardTitle: 'Illuminated Elegance',
      cardSubtitle: 'Light & Ambiance',
      cardDescription: 'Set the perfect mood with our designer lighting collections that blend functionality with artistic expression.',
      gridItems: [
        { imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=300&fit=crop', label: 'Chandeliers' },
        { imageUrl: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop', label: 'Pendants' },
        { imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', label: 'Floor Lamps' },
        { imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop', label: 'Table Lamps' },
        { imageUrl: 'https://images.unsplash.com/photo-1534105615256-13940a4e165c?w=400&h=300&fit=crop', label: 'Sconces' },
        { imageUrl: 'https://images.unsplash.com/photo-1536585674063-ee801bb028e0?w=400&h=300&fit=crop', label: 'LED Strips' },
      ]
    },
  ]

  return (
    <div>
      <FurnitureShowcase />

      {/* ========================================
          CHOOSE ONE OF THE TWO OPTIONS BELOW:
          ======================================== */}

      {/* ✅ OPTION 1: Gallery to Masonry (Static Portfolio) */}
      {/* UNCOMMENT THIS TO USE MASONRY VERSION */}
      {/*
      <GalleryToMasonry
        galleryImages={galleryImages}
        masonryImages={masonryImages}
        topRightText="We take pride in transforming spaces into personal sanctuaries. Each project reflects our commitment to timeless elegance and meticulous craftsmanship."
        bottomLeftText="Our clients trust us to bring their vision to life with furniture that combines artistry and function. From classic pieces to contemporary designs, every creation tells a unique story of refined living."
        bulletLabel="OUR PORTFOLIO"
      />
      */}

      {/* ✅ OPTION 2: Gallery to Timeline (Interactive Collections) */}
      {/* UNCOMMENT THIS TO USE TIMELINE VERSION */}
      <GalleryToTimeline
        galleryImages={galleryImages}
        timelineSections={timelineSections}
        topRightText="We take pride in transforming spaces into personal sanctuaries. Each project reflects our commitment to timeless elegance and meticulous craftsmanship."
        bottomLeftText="Our clients trust us to bring their vision to life with furniture that combines artistry and function."
        bulletLabel="OUR COLLECTIONS"
        autoPlay={true}
        autoPlayInterval={6000}
      />



<Rock/>
<ReviewSection/>
{/* <MasonryGallery images={masonryImages} enableAnimations={true} /> */}

      <Footer />
    </div>
  )
}

export default App
