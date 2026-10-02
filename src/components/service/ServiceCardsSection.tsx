import React from 'react';

export const ServiceCardsSection: React.FC = () => {
  return (
    <section className="content-section" aria-labelledby="committees-heading">
      <h2 id="committees-heading" className="section-title reveal active">
        University Committees
      </h2>
      <div className="cards-grid">
        <div className="card reveal active stagger-item">
          <div className="card-accent" aria-hidden="true" />
          <span className="card-tag">Committee</span>
          <h3>Board of Studies — ICT Department</h3>
          <p>
            Active member of the Board of Studies, contributing to curriculum design and academic programme development
            for undergraduate and postgraduate ICT courses at Adani University.
          </p>
        </div>
        <div className="card reveal active stagger-item">
          <div className="card-accent" aria-hidden="true" />
          <span className="card-tag">Committee</span>
          <h3>Research &amp; Innovation Cell</h3>
          <p>
            Member of the university's Research &amp; Innovation Cell, facilitating research proposals, grant
            applications, and fostering collaboration between departments.
          </p>
        </div>
        <div className="card reveal active stagger-item">
          <div className="card-accent" aria-hidden="true" />
          <span className="card-tag">Committee</span>
          <h3>Examination &amp; Assessment</h3>
          <p>
            Serving as a question paper setter and examiner for university semester examinations in electromagnetic theory
            and related courses.
          </p>
        </div>
      </div>

      <h2 className="section-title section-title--spaced reveal active" id="conf-org-heading">
        Conference Organisation
      </h2>
      <div className="cards-grid" aria-labelledby="conf-org-heading">
        <div className="card reveal active stagger-item">
          <div className="card-accent" aria-hidden="true" />
          <span className="card-tag">Organiser</span>
          <h3>ICMM 2025 — Technical Programme Committee</h3>
          <p>
            Served on the Technical Programme Committee for the International Conference on Metamaterials and Metasurfaces
            (ICMM 2025), reviewing and selecting papers for oral and poster sessions.
          </p>
        </div>
        <div className="card reveal active stagger-item">
          <div className="card-accent" aria-hidden="true" />
          <span className="card-tag">Session Chair</span>
          <h3>IEEE AP-S Symposium 2024</h3>
          <p>
            Chaired the "Metasurface Applications" session at the IEEE Antennas &amp; Propagation Society International
            Symposium 2024, moderating presentations and discussions.
          </p>
        </div>
      </div>

      <h2 className="section-title section-title--spaced reveal active" id="community-heading">
        Community Service
      </h2>
      <div className="cards-grid" aria-labelledby="community-heading">
        <div className="card reveal active stagger-item">
          <div className="card-accent" aria-hidden="true" />
          <span className="card-tag">Volunteer</span>
          <h3>Science Olympiad Judging Panel</h3>
          <p>
            Volunteered as a judge for the Gujarat State Science Olympiad (2024-25), evaluating student projects in
            physics and electronics categories.
          </p>
        </div>
        <div className="card reveal active stagger-item">
          <div className="card-accent" aria-hidden="true" />
          <span className="card-tag">Volunteer</span>
          <h3>Career Guidance for Rural Students</h3>
          <p>
            Organised and delivered career guidance sessions for students from rural schools in Gujarat, encouraging STEM
            education and awareness of research career pathways.
          </p>
        </div>
        <div className="card reveal active stagger-item">
          <div className="card-accent" aria-hidden="true" />
          <span className="card-tag">Mentor</span>
          <h3>IEEE Student Branch Advisor</h3>
          <p>
            Faculty advisor for the IEEE Student Branch at Adani University, guiding student-led technical events,
            hackathons, and paper presentation competitions.
          </p>
        </div>
      </div>
    </section>
  );
};
