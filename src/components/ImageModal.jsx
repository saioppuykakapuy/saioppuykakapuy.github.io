import { useEffect } from 'react';
import { X } from 'lucide-react';
import SmartImage from './SmartImage.jsx';

export default function ImageModal({ item, lang, onClose }) {
  useEffect(() => {
    if (!item) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  const title = lang === 'zh' ? item.titleZh : item.titleEn;
  const secondaryTitle = lang === 'zh' ? item.titleEn : item.titleZh;
  const desc = lang === 'zh' ? item.descZh : item.descEn;
  const secondaryDesc = lang === 'zh' ? item.descEn : item.descZh;
  const award = lang === 'zh' ? item.awardZh : item.awardEn;

  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <div className="image-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <button className="icon-button modal-close" type="button" aria-label="Close preview" onClick={onClose}>
          <X size={19} />
        </button>
        <SmartImage src={item.image} alt={title} className="modal-image" title="图片待添加" subtitle="Image Coming Soon" />
        <div className="modal-copy">
          {award ? <span className="status-pill">{award}</span> : null}
          <h3>{title}</h3>
          {secondaryTitle ? <strong className="modal-subtitle">{secondaryTitle}</strong> : null}
          <p>{desc}</p>
          {secondaryDesc ? <p className="modal-secondary">{secondaryDesc}</p> : null}
        </div>
      </div>
    </div>
  );
}
