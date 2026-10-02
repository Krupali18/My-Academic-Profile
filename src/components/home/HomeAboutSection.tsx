import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const HomeAboutSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div
        ref={ref}
        className={`about-container reveal ${isVisible ? 'active' : ''}`}
      >
        <h2 id="about-heading" className="sr-only">
          About Dr. Krupali Donda
        </h2>
        <p>
          Dr. Krupali Donda is currently serving as an Assistant Professor in the Department of Information and
          Communication Technology at Adani University since February 2025. She earned her Ph.D. in Acoustic
          metasurfaces from the Institute Jean Lamour, CNRS, France, in 2022. Her doctoral research focused on
          low-frequency acoustic absorbing metasurfaces using deep learning approaches, combining computational
          intelligence with experimental validation. She completed her M.E. in Electronics and Communication Engineering
          from Gujarat Technological University.
        </p>
        <p>
          Her research lies at the intersection of machine learning, metamaterials, metasurfaces, and wave propagation,
          with a strong emphasis on data-driven inverse design and experimental realization. Dr. Donda has contributed
          extensively to the development of ultrathin acoustic metasurfaces capable of efficient low-frequency sound
          absorption. Her work integrates deep learning techniques to enable high-dimensional design optimization,
          accelerating the discovery of advanced functional materials.
        </p>
        <p className="about-list-intro">Dr. Donda's research contributions include:</p>
        <ul>
          <li>Deep learning–based inverse design of acoustic and phononic metamaterials</li>
          <li>Development of ultrathin, broadband acoustic absorbers</li>
          <li>Exploration of wave manipulation using metasurfaces</li>
          <li>Application of AI techniques such as Vision Transformers for accelerated material design</li>
        </ul>
        <p>
          Her work has been published in reputed journals such as Extreme Mechanics Letters, Applied Physics Letters,
          Smart Materials and Structures, and Physical Review B, making impactful contributions to the field of acoustic
          metamaterials and computational material design.
        </p>
        <p>
          Dr. Donda has received several prestigious recognitions, including the Visiting Scientist Fellowship by the
          Indian National Science Academy (2025) and the Women in Acoustics Emerging Investigator Award. She has
          presented her research at leading international conferences, including ASA–ASJ joint meetings and IISc
          Bangalore, demonstrating global academic engagement.
        </p>
      </div>
    </section>
  );
};
