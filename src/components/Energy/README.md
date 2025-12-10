# Energy Components

A collection of React components for creating stunning gallery-to-timeline transitions with scroll-based animations and interactive timelines.

## 📦 Components Overview

### 1. **GalleryToTimeline** (Main Component)
The hero component that creates a seamless transition from a gallery layout to a timeline hero section using scroll-based animations.

### 2. **TimelineHero**
Full-screen hero section with animated timeline navigation, background transitions, and interactive content cards.

### 3. **MasonryGallery**
Masonry-style gallery layout for displaying high-end interior portfolios with responsive design.

---

## ⚠️ Important Notes

> **Section Arrangement**: The sections in App.jsx are not yet arranged in their final order. They will be organized and positioned properly in the final implementation.

> **Footer Responsive Design**: The responsive footer design was specifically requested by Harsh Bhaiya to ensure optimal UX across all devices (mobile, tablet, and desktop).

---

## 🚀 Features

### GalleryToTimeline
- **Two-Phase Scroll Animation**:
  - **Phase 1 (0-60%)**: Gallery items fade out while center image expands to full screen
  - **Phase 2 (60-100%)**: Timeline fades in over the expanded image
- **GSAP ScrollTrigger Integration**: Smooth, performant scroll-based animations
- **Seamless Transition**: Expanded gallery image becomes timeline background
- **Customizable Content**: Configurable text, images, and labels

### TimelineHero
- **Animated Timeline Bar**: White progress bar that grows based on active section
- **Background Transitions**: Smooth image transitions with zoom animations
- **Auto-Play Feature**: Automatic cycling through timeline sections
- **Responsive Cards**: Desktop floating card and mobile bottom card
- **Interactive Grid**: 6-item grid showing related content for each section
- **Keyboard Navigation**: Accessible navigation controls
- **Framer Motion Animations**: Smooth, performant animations

### MasonryGallery
- **3-Row Layout**: Hero banner, middle row (3 columns), bottom row (2 columns)
- **PropTypes Validation**: Type-safe component props
- **Responsive Images**: Optimized image sizing for different screen sizes
- **CSS-Based Layout**: Clean, maintainable styling

---

## 📋 Installation

```bash
# Install required dependencies
npm install gsap framer-motion prop-types
```

---

## 🎯 Usage

### GalleryToTimeline Component

```jsx
import { GalleryToTimeline } from './components/Energy'

function App() {
  const galleryImages = [
    { src: '/image1.jpg', alt: 'Interior 1', sizeType: 'small' },
    { src: '/image2.jpg', alt: 'Interior 2', sizeType: 'medium' },
    { src: '/image3.jpg', alt: 'Hero Interior', sizeType: 'hero' }, // Center image
    { src: '/image4.jpg', alt: 'Interior 4', sizeType: 'medium' },
    { src: '/image5.jpg', alt: 'Interior 5', sizeType: 'small' },
  ]

  const timelineSections = [
    {
      sectionNumber: '01',
      label: 'ENERGY',
      titleText: 'ENERGY',
      backgroundImageUrl: '/energy-bg.jpg',
      cardTitle: 'Energy',
      cardSubtitle: 'Global Full-Line Energy Provider',
      cardDescription: 'We are developing environmentally friendly energy generation projects...',
      gridItems: [
        { imageUrl: '/renewable.jpg', label: 'Renewable Energy' },
        { imageUrl: '/palm.jpg', label: 'Palm Plantations' },
        // ... 4 more items
      ],
    },
    // ... more sections
  ]

  return (
    <GalleryToTimeline
      galleryImages={galleryImages}
      timelineSections={timelineSections}
      topRightText="We take pride in transforming spaces..."
      bottomLeftText="Our clients trust us to bring their vision to life..."
      bulletLabel="TRUSTED PARTNERS"
      autoPlayInterval={5000}
    />
  )
}
```

### TimelineHero Component

```jsx
import { TimelineHero } from './components/Energy'

function App() {
  const [activeSection, setActiveSection] = useState(0)

  const sections = [
    {
      sectionNumber: '01',
      label: 'ENERGY',
      titleText: 'ENERGY',
      backgroundImageUrl: '/energy-bg.jpg',
      cardTitle: 'Energy',
      cardSubtitle: 'Global Full-Line Energy Provider',
      cardDescription: 'Description text...',
      gridItems: [
        { imageUrl: '/item1.jpg', label: 'Label 1' },
        // ... 5 more items
      ],
    },
    // ... more sections
  ]

  return (
    <TimelineHero
      sections={sections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      autoPlay={true}
      autoPlayInterval={5000}
      enableAnimations={true}
    />
  )
}
```

### MasonryGallery Component

```jsx
import MasonryGallery from './components/Energy/MasonryGallery'

function App() {
  const masonryImages = {
    heroBanner: '/hero-banner.jpg',
    leftVertical: '/left-vertical.jpg',
    centerHero: '/center-hero.jpg',
    rightVertical: '/right-vertical.jpg',
    bottomLeft: '/bottom-left.jpg',
    bottomRight: '/bottom-right.jpg',
  }

  return <MasonryGallery images={masonryImages} />
}
```

---

## 📐 Props API

### GalleryToTimeline Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `galleryImages` | `Array<Object>` | Default images | Array of image objects with `src`, `alt`, and `sizeType` |
| `timelineSections` | `Array<Object>` | Required | Array of timeline section data |
| `topRightText` | `string` | Default text | Text displayed in top-right of gallery |
| `bottomLeftText` | `string` | Default text | Text displayed in bottom-left of gallery |
| `bulletLabel` | `string` | `'TRUSTED PARTNERS'` | Label for bullet point element |
| `autoPlayInterval` | `number` | `5000` | Interval for auto-play (milliseconds) |

### TimelineHero Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sections` | `Array<Object>` | Required | Array of section data objects |
| `activeSection` | `number` | `0` | Index of currently active section |
| `onSectionChange` | `function` | - | Callback fired when section changes |
| `enableAnimations` | `boolean` | `true` | Enable/disable animations |
| `autoPlay` | `boolean` | `false` | Enable auto-play functionality |
| `autoPlayInterval` | `number` | `5000` | Auto-play interval (milliseconds) |

### MasonryGallery Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `images` | `Object` | Yes | Object containing 6 image URLs (heroBanner, leftVertical, centerHero, rightVertical, bottomLeft, bottomRight) |

---

## 🎨 Section Data Structure

```javascript
{
  sectionNumber: '01',        // Section number (displayed large and faded)
  label: 'ENERGY',            // Section label (shown in navigation)
  titleText: 'ENERGY',        // Large title text
  backgroundImageUrl: '/bg.jpg', // Background image URL
  cardTitle: 'Energy',        // Card title
  cardSubtitle: 'Subtitle',   // Optional card subtitle
  cardDescription: 'Text...',  // Card description text
  gridItems: [                 // Array of 6 grid items
    {
      imageUrl: '/item.jpg',
      label: 'Item Label'
    },
    // ... 5 more items
  ]
}
```

---

## 🎬 Animation Details

### Scroll-Based Animation (GalleryToTimeline)
- **Phase 1 (0-60% scroll)**:
  - Gallery items fade out: `opacity: 1 → 0`
  - Center image scales up: `scale: 1 → targetScale`
  - Border radius reduces: `4px → 0px`

- **Phase 2 (60-100% scroll)**:
  - Image holds at full screen
  - Timeline fades in: `opacity: 0 → 1`
  - Pointer events enabled at 50% timeline fade

### Timeline Animations (TimelineHero)
- **Background**: 1.2s zoom-in animation (`scale: 1.3 → 1`)
- **Title**: 0.8s fade-in from bottom (`y: 60 → 0`)
- **Card**: 0.7s slide-in from right (`x: 100 → 0`)
- **Navigation**: 0.6s fade-in from bottom (`y: 20 → 0`)
- **Timeline Bar**: 0.8s width animation based on active section

---

## 📱 Responsive Design

### Desktop (lg and above)
- Floating white card on right side
- Large title (120px-140px)
- Full navigation bar with all sections visible
- 3x2 grid in card

### Tablet (md)
- Adjusted padding and spacing
- Medium title size
- Simplified navigation
- 3x2 grid maintained

### Mobile (sm and below)
- Bottom card instead of floating card
- Smaller title (48px-56px)
- Active section only in navigation
- 2x2 grid (first 4 items)
- Touch-optimized interactions

---

## 🔧 Customization

### Styling
- **CSS**: Modify `MasonryGallery.css` for gallery styling
- **Tailwind**: All other components use Tailwind CSS classes
- **Colors**: Update color values in component JSX
- **Fonts**: Modify `font-*` classes or add custom font families

### Animation Timing
```javascript
// Adjust scroll trigger durations
end: '+=250%' // Increase for slower scroll

// Modify animation speeds
transition={{ duration: 0.8 }} // Increase for slower animations

// Change auto-play interval
autoPlayInterval={7000} // 7 seconds
```

### Layout
```javascript
// Change phase breakpoint
const phase1End = 0.6 // Default: 60% for gallery, 40% for timeline
```

---

## 🛠️ Dependencies

- **React** 18+
- **GSAP** 3.x (with ScrollTrigger plugin)
- **Framer Motion** 10+
- **Prop Types** 15+
- **Tailwind CSS** 3+ (for styling)

---

## 📝 Best Practices

1. **Image Optimization**: Use optimized images with appropriate dimensions
   - Hero images: 1920px wide
   - Gallery images: 400-800px wide
   - Grid items: 400px wide

2. **Performance**:
   - Lazy load images when possible
   - Use `will-change` CSS property for animated elements
   - Keep section data minimal (6 grid items max)

3. **Accessibility**:
   - Provide descriptive alt text for all images
   - Ensure keyboard navigation works
   - Test with screen readers

4. **Content**:
   - Keep descriptions concise (2-3 lines)
   - Use high-contrast text on background images
   - Maintain consistent image aspect ratios

---

## 📁 File Structure

```
Energy/
├── GalleryToTimeline.jsx          # Main transition component
├── TimelineHero.jsx                # Timeline hero section
├── MasonryGallery.jsx              # Masonry gallery layout
├── MasonryGallery.css              # Gallery styles
├── MasonryGalleryExample.jsx       # Usage example
├── GalleryToTimelineTransition.jsx # Legacy/alternative version
├── index.js                        # Export barrel
└── README.md                       # This file
```

---

## 🐛 Troubleshooting

### Animations not working
- Ensure GSAP and ScrollTrigger are installed: `npm install gsap`
- Check that GSAP is registered: `gsap.registerPlugin(ScrollTrigger)`
- Verify Framer Motion is installed: `npm install framer-motion`

### Images not displaying
- Check image URLs are accessible
- Verify correct image structure for each component
- Ensure images are properly imported/referenced

### Scroll behavior issues
- Adjust `scrub` value in ScrollTrigger (0.5 = smoother)
- Increase `end` value for longer scroll distance
- Check for conflicting scroll-based libraries

### Mobile responsiveness
- Test on actual devices, not just browser resize
- Verify Tailwind responsive classes are working
- Check viewport meta tag in HTML

---

## 📄 License

This component library is part of the AIB Innovations project.

---

## 🤝 Contributing

When modifying these components:
1. Maintain backward compatibility
2. Update PropTypes for new props
3. Test on all breakpoints
4. Document animation changes
5. Optimize for performance

---

## 📞 Support

For issues or questions, please refer to the main project documentation or contact the development team.

---

**Built with ❤️ by AIB Innovations**
