import React from 'react';
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed';

export const ResearchGallerySection: React.FC = () => {
  return (
    <section className="content-section research-gallery-section" aria-label="Research highlights">
      <p className="subtitle dark-subtitle reveal active">Selected research highlights</p>
      <div className="research-gallery">
        <article className="research-item reveal active stagger-item">
          <div className="research-media image-media">
            <img
              src="/assets/image-to-response-learningdiagram.webp"
              alt="Diagram showing image-to-response learning pipeline for accelerating meta-absorber design via transformers"
              loading="lazy"
              decoding="async"
              draggable="false"
              width={600}
              height={400}
            />
          </div>
          <div className="research-caption">
            <span className="research-kicker">Research highlight</span>
            <h3>Image-to-Response Learning: Accelerating Meta-Absorber Design via Transformers</h3>
            <a
              href="https://scholar.google.com/citations?view_op=view_citation&hl=fr&user=JRLRYokAAAAJ&citation_for_view=JRLRYokAAAAJ:mVmsd5A6BfQC"
              target="_blank"
              rel="noopener noreferrer"
              className="research-link read-more-link"
            >
              Read more <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </article>

        <article className="research-item reveal active stagger-item">
          <div className="research-media image-media">
            <img
              src="/assets/extreme-low-frequency.webp"
              alt="Schematic of extreme low-frequency ultrathin acoustic absorbing metasurface"
              loading="lazy"
              decoding="async"
              draggable="false"
              width={600}
              height={400}
            />
          </div>
          <div className="research-caption">
            <span className="research-kicker">Publication</span>
            <h3>Extreme low-frequency ultrathin acoustic absorbing metasurface</h3>
            <a
              href="https://pubs.aip.org/aip/apl/article/115/17/173506/37861"
              target="_blank"
              rel="noopener noreferrer"
              className="research-link read-more-link"
            >
              Read more <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </article>

        <article className="research-item reveal active stagger-item">
          <div className="research-media image-media">
            <img
              src="/assets/deep-learning-approach.webp"
              alt="Deep learning approach architecture for designing acoustic absorbing metasurfaces with high degrees of freedom"
              loading="lazy"
              decoding="async"
              draggable="false"
              width={600}
              height={400}
            />
          </div>
          <div className="research-caption">
            <span className="research-kicker">Research highlight</span>
            <h3>Deep learning approach for designing acoustic absorbing metasurfaces with high degrees of freedom</h3>
            <a
              href="https://www.sciencedirect.com/science/article/abs/pii/S2352431622001614"
              target="_blank"
              rel="noopener noreferrer"
              className="research-link read-more-link"
            >
              Read more <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </article>

        {/* C5 FIX: Facade pattern — thumbnail shown first; iframe only loads on user click.
            Raw iframe was loading ~500KB of YouTube scripts unconditionally on page load.
            className makes the facade fill .video-media exactly as the original iframe did
            (the container uses a padding-top::before spacer + absolute child pattern). */}
        <article className="research-item research-item-video reveal active stagger-item">
          <div className="research-media video-media">
            <YouTubeEmbed
              url="https://www.youtube.com/watch?v=TrJuZobjrWE&t=3371s"
              title="Ph.D. Defense Ceremony : CNRS, France"
              className="!absolute !inset-0 !w-full !h-full !aspect-auto"
            />
          </div>
          <div className="research-caption">
            <span className="research-kicker">Featured video</span>
            <h3>Ph.D. Defense Ceremony : CNRS, France</h3>
            <a
              href="https://www.youtube.com/watch?v=TrJuZobjrWE&t=3371s"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube video
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ResearchGallerySection;
