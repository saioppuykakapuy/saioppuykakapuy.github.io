import { useMemo, useState } from 'react';
import { Award, Filter, Trophy } from 'lucide-react';
import ImageModal from './ImageModal.jsx';
import SmartImage from './SmartImage.jsx';

export default function Honors({ profile, lang }) {
  const [category, setCategory] = useState('all');
  const [active, setActive] = useState(null);
  const honorImages = useMemo(() => {
    if (category === 'all') {
      return profile.honorImages;
    }

    return profile.honorImages.filter((item) => item.category === category);
  }, [category, profile.honorImages]);
  const categoryLabels = useMemo(
    () => Object.fromEntries(profile.honorCategories.map((item) => [item.id, item[lang]])),
    [lang, profile.honorCategories],
  );

  return (
    <section className="section-pad" id="honors">
      <div className="section-heading reveal">
        <span className="eyebrow">Personal Honors</span>
        <h2>{lang === 'zh' ? '个人荣誉' : 'Personal Honors'}</h2>
        <p>
          {lang === 'zh'
            ? '荣誉、团队、社交平台和学习记录统一收纳在这里，图片位置已预留，后续替换即可。'
            : 'Honors, team photos, social media records, and learning moments are now collected in one place.'}
        </p>
      </div>

      <div className="honor-timeline">
        {profile.honors.map((honor) => (
          <article className="honor-text-card reveal" key={honor.id}>
            <span className="timeline-index">{String(honor.id).padStart(2, '0')}</span>
            <div>
              <span className="status-pill">
                <Trophy size={14} />
                {lang === 'zh' ? honor.awardZh : honor.awardEn}
              </span>
              <h3>{lang === 'zh' ? honor.titleZh : honor.titleEn}</h3>
              <p>{lang === 'zh' ? honor.descZh : honor.descEn}</p>
            </div>
            <Award className="honor-mark" size={78} aria-hidden="true" />
          </article>
        ))}
      </div>

      <div className="honor-media-head reveal">
        <div>
          <span className="eyebrow">
            <Filter size={14} />
            {lang === 'zh' ? '图片分类' : 'Media Filters'}
          </span>
          <h3>{lang === 'zh' ? '荣誉图片墙' : 'Honors Media Wall'}</h3>
        </div>
        <div className="filter-bar honor-filter" role="tablist" aria-label="Honor media categories">
          {profile.honorCategories.map((item) => (
            <button
              className={category === item.id ? 'is-active' : ''}
              type="button"
              key={item.id}
              onClick={() => setCategory(item.id)}
              role="tab"
              aria-selected={category === item.id}
            >
              {item[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="honor-media-grid" key={category}>
        {honorImages.map((honor) => (
          <article className="honor-card" key={honor.id}>
            <button className="image-button" type="button" onClick={() => setActive(honor)}>
              <SmartImage
                src={honor.image}
                alt={lang === 'zh' ? honor.titleZh : honor.titleEn}
                title={lang === 'zh' ? '图片待添加' : 'Image Coming Soon'}
                subtitle={lang === 'zh' ? 'Image Coming Soon' : '图片待添加'}
              />
            </button>
            <div className="honor-copy">
              <span className="status-pill">
                {categoryLabels[honor.category]}
              </span>
              <h3>{lang === 'zh' ? honor.titleZh : honor.titleEn}</h3>
              <p>{lang === 'zh' ? honor.descZh : honor.descEn}</p>
            </div>
          </article>
        ))}
      </div>

      <ImageModal item={active} lang={lang} onClose={() => setActive(null)} />
    </section>
  );
}
