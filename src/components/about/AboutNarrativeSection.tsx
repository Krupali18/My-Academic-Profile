import React from 'react';

export const AboutNarrativeSection: React.FC = () => {
  return (
    <section className="about-narrative-section" aria-label="Personal journey and milestones">
      <div className="about-narrative-container">
        <ul className="about-points-list">
          <li className="about-point-item">
            <span className="about-point-dot" aria-hidden="true" />
            <div className="about-point-text">
              <strong>18 years in Bhavnagar:</strong> parents, brother, grandma, CSMCRI, Dakshinamurti, Takhteshwar Tekri, school days, Prasar, Pappubhai ni panipuri, and the first little dreams of what life could become…
            </div>
          </li>
          <li className="about-point-item">
            <span className="about-point-dot" aria-hidden="true" />
            <div className="about-point-text">
              <strong>10 years in Gandhinagar:</strong> new friends, college life, long conversations, discovering independence, first introduction to research
            </div>
          </li>
          <li className="about-point-item">
            <span className="about-point-dot" aria-hidden="true" />
            <div className="about-point-text">
              <strong>3 years in Nancy:</strong> French life, a three-century-old French home, CNRS, new friends, long walks through streets that had witnessed both World Wars, the countryside, hiking in the Vosges Mountains, and perhaps the three years that shaped the person I am more than any other place.
            </div>
          </li>
          <li className="about-point-item">
            <span className="about-point-dot" aria-hidden="true" />
            <div className="about-point-text">
              <strong>Now, back in Gandhinagar…</strong>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AboutNarrativeSection;
