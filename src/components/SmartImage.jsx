import { memo, useState } from 'react';
import { Image, Sparkles } from 'lucide-react';
import { assetPath } from '../utils/animations.js';

const failedImages = new Set();

function SmartImage({ src, alt, className = '', title, subtitle }) {
  const resolvedSrc = assetPath(src);
  const [failed, setFailed] = useState(!src || failedImages.has(resolvedSrc));

  const handleError = () => {
    failedImages.add(resolvedSrc);
    setFailed(true);
  };

  if (failed) {
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={alt || title}>
        <Sparkles size={22} />
        <Image size={38} />
        <strong>{title || '图片待添加'}</strong>
        <span>{subtitle || 'Image Coming Soon'}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={resolvedSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      width="640"
      height="420"
      onError={handleError}
    />
  );
}

export default memo(SmartImage);
