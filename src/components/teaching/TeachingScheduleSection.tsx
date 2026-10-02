import React from 'react';

interface Course {
  code: string;
  title: string;
}

interface Term {
  term: string;
  courses: Course[];
}

const SCHEDULE_DATA: Term[] = [
  {
    term: 'Monsoon 2026',
    courses: [
      { code: 'ECSDI24401', title: 'Computational Linguistics and Natural Language Processing' },
      { code: 'EICDI243035', title: 'Generative AI and its Application' },
    ],
  },
  {
    term: 'Winter 2026',
    courses: [
      { code: 'EICD124305', title: 'Artificial Intelligence' },
      { code: 'EICB124101', title: 'Basic Electronics' },
    ],
  },
  {
    term: 'Monsoon 2025',
    courses: [
      { code: 'EICCCI24303', title: 'Machine Learning' },
      { code: 'ECSDI24402', title: 'Generative AI and its Applications' },
      { code: 'ECSCT24301', title: 'Foundation of AI' },
    ],
  },
  {
    term: 'Winter 2025',
    courses: [{ code: 'EICCCI24303', title: 'Machine Learning' }],
  },
  {
    term: 'Monsoon 2024',
    courses: [{ code: 'EICCI24304', title: 'Analog & Digital Communication' }],
  },
];

export const TeachingScheduleSection: React.FC = () => {
  const terms = SCHEDULE_DATA;

  return (
    <section className="content-section teaching-page" aria-label="Course schedule">
      <div className="teaching-schedule reveal active">
        {terms.map((item) => (
          <div key={item.term} className="teaching-term">
            <h2>{item.term}</h2>
            <ul className="teaching-course-list">
              {item.courses.map((course) => (
                <li key={course.code + course.title}>
                  <span className="course-code">{course.code}</span>
                  <span className="course-title">{course.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeachingScheduleSection;
