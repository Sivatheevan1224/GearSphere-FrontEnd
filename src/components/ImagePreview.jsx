import React from 'react';

const ImagePreview = ({ 
  src, 
  alt, 
  width = '100%', 
  height = 'auto', 
  className = '', 
  style = {},
  fallbackSrc = '/placeholder.svg?height=200&width=200'
}) => {
  const handleError = (e) => {
    e.target.src = fallbackSrc;
  };

  return (
    <img
      src={src || fallbackSrc}
      alt={alt || 'Product image'}
      style={{ width, height, objectFit: 'cover', ...style }}
      className={className}
      onError={handleError}
    />
  );
};

export default ImagePreview; 