import React from 'react';

// Exact data from talks.html — 10 entries, in chronological order (newest first)
interface Talk {
  month: string;
  year: string;
  title: string;
  venue: string;
  type: string;
}

const talks: Talk[] = [
  {
    month: 'Mar',
    year: '2026',
    title: 'Artificial Intelligence and Machine Learning in Laboratory Medicine',
    venue: 'Indian Council of Medical Research (ICMR) • Organized by Quality Council of India (QCI)',
    type: 'Invited Talk',
  },
  {
    month: 'Feb',
    year: '2026',
    title: 'Your Journey Starts Here: From Classroom to World-Class Lab',
    venue: 'Capestone Connect 6.0 • RIAC, SVNIT Surat, Gujarat, India',
    type: 'Invited Expert Lecture • Mentorship',
  },
  {
    month: 'Jan',
    year: '2026',
    title: 'Deep Learning for Acoustic Metamaterial Design',
    venue: 'Department of Applied Physics, IIT Delhi, New Delhi, India',
    type: 'Invited Lecture',
  },
  {
    month: 'Dec',
    year: '2025',
    title: 'Labyrinthine Acoustic Absorbers: From Theory to Fabrication',
    venue: 'META 2025 — International Conference on Metamaterials, Paris, France',
    type: 'Conference Paper',
  },
  {
    month: 'Sep',
    year: '2025',
    title: 'Silicon Metasurfaces for Visible-Light Wavefront Engineering',
    venue: 'SPIE Photonics Europe 2025, Barcelona, Spain',
    type: 'Invited Talk',
  },
  {
    month: 'Jul',
    year: '2025',
    title: 'Computational Methods for Electromagnetic Metasurface Design',
    venue: 'IEEE AP-S International Symposium 2025, Florence, Italy',
    type: 'Conference Paper',
  },
  {
    month: 'Mar',
    year: '2025',
    title: 'Introduction to Metamaterials and Their Applications',
    venue: 'Faculty Development Programme, Gujarat Technological University, India',
    type: 'Guest Lecture',
  },
  {
    month: 'Nov',
    year: '2024',
    title: 'FEM-Based Simulation of Pentamode Acoustic Cloaking',
    venue: 'URSI General Assembly 2024, Sapporo, Japan',
    type: 'Conference Paper',
  },
  {
    month: 'Jun',
    year: '2024',
    title: 'Women in Physics: Inspiring the Next Generation',
    venue: 'National Science Conclave, Adani University, Ahmedabad, India',
    type: 'Keynote',
  },
  {
    month: 'May',
    year: '2017',
    title: 'Bilayered Nanoantenna Designs for High-Efficiency Silicon Metasurfaces',
    venue: 'CLEO 2017, San Jose, California, USA',
    type: 'Conference Paper',
  },
];

export const TalksTimelineSection: React.FC = () => {
  return (
    <section className="content-section" aria-labelledby="talks-heading">
      <h2 id="talks-heading" className="section-title reveal">
        Recent &amp; Upcoming Talks
      </h2>
      <ol className="talks-list reveal" aria-label="List of talks and seminars">
        {talks.map((talk, idx) => (
          <li key={idx} className="talk-item stagger-item">
            <div className="talk-date-box" aria-label={`${talk.month} ${talk.year}`}>
              <p className="talk-month">{talk.month}</p>
              <p className="talk-year">{talk.year}</p>
            </div>
            <div className="talk-details">
              <h3 className="talk-title">{talk.title}</h3>
              <p className="talk-venue">{talk.venue}</p>
              <span className="talk-type">{talk.type}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TalksTimelineSection;
