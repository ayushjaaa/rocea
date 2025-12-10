import React from 'react'

const GalleryItem = ({ src, alt, sizeType = 'medium', isActive = false }) => {
  const sizeClasses = {
    small: 'customer-gallery__item--small',
    medium: 'customer-gallery__item--medium',
    hero: 'customer-gallery__item--hero',
  }

  const classNames = [
    'customer-gallery__item',
    sizeClasses[sizeType] || sizeClasses.medium,
    isActive ? 'customer-gallery__item--active' : '',
  ].filter(Boolean).join(' ')

  return (
    <figure
      className={classNames}
      role="listitem"
    >
      <img
        src={src}
        alt={alt}
        loading={sizeType === 'hero' ? 'eager' : 'lazy'}
        className="customer-gallery__image"
      />
    </figure>
  )
}

export default GalleryItem
