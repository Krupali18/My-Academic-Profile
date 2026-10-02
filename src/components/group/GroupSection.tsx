import React from 'react';

// Exact data from group.html

// ── Principal Investigator ────────────────────────────────────────────────────

// ── Current B.Tech Students (exactly from group.html lines 118–220) ──────────
interface BTechStudent {
  name: string;
  img: string;
  imgStyle?: React.CSSProperties;
  role: string;
  desc: string;
  linkedin: string;
}

const btechStudents: BTechStudent[] = [
  {
    name: 'Vatsal Patel',
    img: '/assets/vatsal-patel.jpg',
    role: 'Pre-Final Year B.Tech Student\n(ICT Department)',
    desc: 'Conditional Diffusion Modeling for Low-Frequency Underwater Acoustic Absorber Design, Computational modelling with a focus on open-source numerical simulations using FeniCS.',
    linkedin: 'https://www.linkedin.com/in/vatsalpatel09/',
  },
  {
    name: 'Yash Shah',
    img: '/assets/yash-shah.jpeg',
    role: 'Pre-Final Year B.Tech Student\n(ICT Department)',
    desc: 'Physics-Validated Inverse Design of Broadband Low-Frequency Underwater Acoustic Metamaterials, Computational modelling with a focus on open-source numerical simulations using FeniCS.',
    linkedin: 'https://www.linkedin.com/in/yash-shah-997323285/',
  },
  {
    name: 'Ashish Shrivastav',
    img: '/assets/ashish.png',
    imgStyle: { objectPosition: 'center 20%' },
    role: 'Pre-Final Year B.Tech Student\n(ICT Department)',
    desc: 'Temperature dependent inverse metasurface design, and financial question answering using VectorRAG and Knowledge Graphs (In collaboration with Prof. Erik Cambria, SenticNet Lab)',
    linkedin: 'https://www.linkedin.com/in/ashish-k-shrivastav/',
  },
  {
    name: 'Priya Shah',
    img: '/assets/priya shah.jpeg',
    imgStyle: { objectPosition: 'center 25%' },
    role: 'Pre-Final Year B.Tech Student\n(ICT Department)',
    desc: 'Studied LLM reasoning and information retrieval (In collaboration with Prof. Erik Cambria, SenticNet Lab)',
    linkedin: 'https://www.linkedin.com/in/priya-shah-615941307/',
  },
  {
    name: 'Mann Alpahara',
    img: '/assets/mann alpahara.jpeg',
    imgStyle: { objectPosition: 'center 20%' },
    role: 'Pre-Final Year B.Tech Student\n(ICT Department)',
    desc: 'Long term emotional support systems based on conversational memory (In collaboration with Prof. Erik Cambria, SenticNet Lab)',
    linkedin: 'https://www.linkedin.com/in/mannahalpara/',
  },
  {
    name: 'Moksh Shah',
    img: '/assets/moksh shah.jpeg',
    imgStyle: { objectPosition: 'center 30%' },
    role: 'B.Tech Student\n(ICT Department)',
    desc: 'Intelligent Metamaterials',
    linkedin: 'https://www.linkedin.com/in/mokshshahh/',
  },
];

// ── Interns (exactly from group.html lines 237–304) ──────────────────────────
interface Intern {
  name: string;
  img: string;
  imgStyle?: React.CSSProperties;
  role: string;
  desc: string;
  linkedin: string;
}

const interns: Intern[] = [
  {
    name: 'Kishlay Ojha',
    img: '/assets/kishlay ojha.jpeg',
    imgStyle: { objectPosition: '45% 22%' },
    role: 'B.Tech CSE\nTechno India University',
    desc: 'Topology optimisation and broadband metasurface for low frequency',
    linkedin: 'https://www.linkedin.com/in/kishlay-ojha/',
  },
  {
    name: 'Priya Shivani Narain',
    img: '/assets/priya narein.jpeg',
    imgStyle: { objectPosition: 'center 20%' },
    role: 'BS Chemistry \nIIT Delhi',
    desc: 'Temperature sensitivity of acoustic metasurface absorption and the robust design of metamaterials for temperature-resilient performance.',
    linkedin: 'https://www.linkedin.com/in/priya-n-1990173a4/',
  },
  {
    name: 'Rudrani Joshi',
    img: '/assets/rudrani joshi.jpeg',
    imgStyle: { objectPosition: 'center 15%' },
    role: 'Computer Engineering \nPDEU',
    desc: 'Deep learning based robust design of metasurface for temperature-resilient performance.',
    linkedin: 'https://www.linkedin.com/in/rudrani-j-69a55a398/',
  },
  {
    name: 'Vansh Sharma',
    img: '/assets/vansh-sharma.jpeg',
    imgStyle: { objectPosition: 'center 20%' },
    role: 'B.Tech CSE\nJaypee Institute of Information Technology',
    desc: 'Intelligent Metamaterials & Artificial Neural Networks',
    linkedin: 'https://www.linkedin.com/in/vanshcodes/',
  },
];

// ── Group Alumni (exactly from group.html lines 321–404) ────────────────────
interface Alumnus {
  name: string;
  img: string;
  topic: string;
  current: string;
  linkedin: string;
}

const alumni: Alumnus[] = [
  {
    name: 'Pankit Brahmkhatri',
    img: '/assets/pankit-brahmkhatri.png',
    topic: 'Machine learning for inverse design of acoustic and elastic metamaterials',
    current: 'Currently: MS Computer Science, Technische Universität Dresden, Germany',
    linkedin: 'https://www.linkedin.com/in/pankitrb/',
  },
  {
    name: 'Dev Sanghvi',
    img: '/assets/dev-sanghvi.jfif',
    topic: 'Accelerating Meta-Absorber Design via Transformers',
    current: 'Currently: Founder @Dhi • MS in Computer Science, Rice University, USA',
    linkedin: 'https://www.linkedin.com/in/dev-sanghvi-616843128/',
  },
  {
    name: 'Heet Vekariya',
    img: '/assets/hit-vekariya.jpg',
    topic: 'Accelerating Meta-Absorber Design via Transformers',
    current: 'Currently: Founding AI Engineer at Ontio AI',
    linkedin: 'https://www.linkedin.com/in/heet-vekariya-16326024b/',
  },
  {
    name: 'Naimish Bhuva',
    img: '/assets/naimish-bhuva.jpg',
    topic: 'Accelerating Meta-Absorber Design via Transformers',
    current: 'Currently: Co-Founder, GoofyDesign — Building SaaS & AI-driven Products',
    linkedin: 'https://www.linkedin.com/in/naimishbhuva/',
  },
  {
    name: 'Vimi Patel',
    img: '/assets/vimi-patel.jpg',
    topic: 'Physics-Validated Inverse Design of Broadband Low-Frequency Underwater Acoustic Metamaterials',
    current: '',
    linkedin: 'https://www.linkedin.com/in/vimi-patel-487020252/',
  },
];

// ── Shared arrow icon ────────────────────────────────────────────────────────
const ExternalLinkIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="member-link-icon"
    aria-hidden="true"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export const GroupSection: React.FC = () => {
  return (
    <div className="group-page-content">

      {/* ── Principal Investigator ──────────────────────────────────── */}
      <div className="google-site-section gs-pi-section">
        <div className="gs-title-band reveal">
          <div className="gs-container">
            <h2>Principal Investigator</h2>
          </div>
        </div>
        <div className="gs-content-band gs-pi-content">
          <div className="gs-container fac-layout reveal">
            <div className="fac-image">
              <img
                src="/assets/faculty-mentor-cropped.jpg"
                alt="Dr. Krupali Donda, Principal Investigator"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={280}
                height={280}
              />
            </div>
            <div className="fac-info">
              <div className="fac-name-wrapper">
                <h3 className="fac-name">Dr. Krupali Donda</h3>
                <span className="fac-cred">(Ph.D. Institut Jean Lamour, France)</span>
              </div>
              <p className="fac-text">
                My research focuses on metamaterials and acoustic metasurfaces, wave propagation, and machine learning for
                intelligent design and optimization of engineered wave systems. My current work particularly explores
                low-frequency acoustic absorption, inverse metamaterial design, and deep-learning-based development of
                advanced metasurface structures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Current B.Tech Students ─────────────────────────────────── */}
      <div className="google-site-section">
        <div className="gs-title-band reveal">
          <div className="gs-container">
            <h2>Current B.Tech Students</h2>
          </div>
        </div>
        <div className="gs-content-band" style={{ backgroundColor: '#f9f9f9' }}>
          <div className="gs-container">
            <div className="gs-members-grid">
              {btechStudents.map((member) => (
                <article key={member.name} className="gs-member-card stagger-item">
                  <div className="gs-member-img">
                    <img
                      src={member.img}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      style={member.imgStyle}
                    />
                  </div>
                  <h3 className="gs-member-name">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      {member.name} <ExternalLinkIcon />
                    </a>
                  </h3>
                  <p className="gs-member-date">
                    <strong>
                      {member.role.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < member.role.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </strong>
                  </p>
                  <div className="gs-member-desc">
                    <p>{member.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Interns ─────────────────────────────────────────────────── */}
      <div className="google-site-section">
        <div className="gs-title-band reveal">
          <div className="gs-container">
            <h2>Interns</h2>
          </div>
        </div>
        <div className="gs-content-band" style={{ backgroundColor: '#fafafa' }}>
          <div className="gs-container">
            <div className="gs-members-grid">
              {interns.map((member) => (
                <article key={member.name} className="gs-member-card stagger-item">
                  <div className="gs-member-img">
                    <img
                      src={member.img}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      style={member.imgStyle}
                    />
                  </div>
                  <h3 className="gs-member-name">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      {member.name} <ExternalLinkIcon />
                    </a>
                  </h3>
                  <p className="gs-member-date">
                    <strong>
                      {member.role.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < member.role.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </strong>
                  </p>
                  <div className="gs-member-desc">
                    <p>{member.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Group Alumni ────────────────────────────────────────────── */}
      <div className="google-site-section">
        <div className="gs-title-band reveal">
          <div className="gs-container">
            <h2>Group Alumni</h2>
          </div>
        </div>
        <div className="gs-content-band">
          <div className="gs-container">
            <div className="gs-members-grid">
              {alumni.map((member) => (
                <article key={member.name} className="gs-member-card stagger-item">
                  <div className="gs-member-img">
                    <img
                      src={member.img}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="gs-member-name">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      {member.name} <ExternalLinkIcon />
                    </a>
                  </h3>
                  <div className="gs-member-desc">
                    <p className="member-topic">{member.topic}</p>
                    {member.current && (
                      <p className="member-current">{member.current}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GroupSection;
