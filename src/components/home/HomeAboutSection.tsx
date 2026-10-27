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
          Dr. Krupali Donda is an Assistant Professor in the Department of Information and Communication Technology at Adani University, where she has been serving since February 2025. In 2025, she also served as a Visiting Scientist at the Indian Institute of Technology Delhi (IIT Delhi).
        </p>
        <p>
          She received her Ph.D. in acoustic metasurfaces from the Institute Jean Lamour, CNRS, France, in 2022. Her doctoral research, funded by the U.S. Air Force Office of Scientific Research (AFOSR), USA focused on designing and experimentally validating ultrathin acoustic metasurfaces for efficient low-frequency sound absorption. Her work integrated computational modeling, deep learning, and experimental investigations to address challenges in acoustic wave manipulation and functional material design.
        </p>
        <p>
          Prior to her doctoral studies in France, Dr. Donda worked as a Research Fellow at IIT Gandhinagar, where she explored optical metasurface. Her research journey began with a Master’s internship at ITER-India, Institute for Plasma Research, where she gained experience in experimental and applied scientific research.
        </p>
        <p>
          Dr. Donda’s research lies at the intersection of scientific machine learning, artificial intelligence, metamaterials, metasurfaces, and wave propagation. Her primary research interests include deep learning–based inverse design of acoustic and phononic metamaterials, the development of ultrathin and broadband acoustic absorbers, and the application of AI-driven approaches to wave manipulation and functional material optimization.
        </p>
        <p>
          She has delivered invited talks at scientific forums like the Acoustical Society of America (ASA), Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat. Her recognitions include the Indian National Science Academy (INSA) Visiting Scientist Fellowship in 2025 and the Women in Acoustics Emerging Investigator Award by Acoustic Society of America.
        </p>
        <p>
          Dr. Donda believes that education, both formal and informal, is a powerful catalyst for positive societal change. Through her research, teaching, and academic collaborations, she aims to advance scientific understanding, contribute to the development of intelligent functional materials, and inspire the next generation of researchers.
        </p>
      </div>
    </section>
  );
};
