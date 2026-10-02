export interface PageSeoConfig {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robots?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export const seoConfig: Record<string, PageSeoConfig> = {
  home: {
    title: 'Dr. Krupali Donda | Metamaterials & AI Research — Adani University',
    description:
      'Dr. Krupali Donda is an Assistant Professor at Adani University, Ahmedabad. Expert in Metasurfaces, Nanophotonics, Acoustic Metamaterials, and Deep Learning for inverse material design. INSA Visiting Scientist Fellow 2025.',
    canonical: 'https://krupalidonda.com/',
    ogTitle: 'Dr. Krupali Donda | Metamaterials & AI Research — Adani University',
    ogDescription:
      'Assistant Professor at Adani University specialising in Metasurfaces, Nanophotonics, and Deep Learning-driven material design. INSA Visiting Scientist Fellow 2025.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    ogUrl: 'https://krupalidonda.com/',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Dr. Krupali Donda | Metamaterials & AI Research',
    twitterDescription:
      'Assistant Professor at Adani University specialising in Metasurfaces, Nanophotonics, and Deep Learning-driven material design.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Krupali Donda',
      honorificPrefix: 'Dr.',
      jobTitle: 'Assistant Professor',
      affiliation: {
        '@type': 'EducationalOrganization',
        name: 'Adani University',
        url: 'https://www.adaniuniversity.edu.in/',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ahmedabad',
          addressRegion: 'Gujarat',
          postalCode: '382421',
          addressCountry: 'IN',
        },
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Institut Jean Lamour, CNRS',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'FR',
        },
      },
      knowsAbout: [
        'Metamaterials',
        'Metasurfaces',
        'Deep Learning',
        'Wave Propagation',
        'Nanophotonics',
        'Acoustic Absorbers',
        'Inverse Design',
        'Machine Learning for Materials',
      ],
      award: [
        'Visiting Scientist Fellowship, Indian National Science Academy (2025)',
        'Women in Acoustics Emerging Investigator Award',
        'ANRF International Travel Support Grant (2026)',
      ],
      url: 'https://krupalidonda.com',
      image: 'https://krupalidonda.com/assets/genratedd-2.png',
      sameAs: [
        'https://www.linkedin.com/in/krupalidonda/',
        'https://scholar.google.com/citations?user=JRLRYokAAAAJ',
        'https://www.researchgate.net/profile/Krupali-Donda-2',
        'https://www.youtube.com/@humansineducation4511',
      ],
    },
  },
  about: {
    title: 'About Dr. Krupali Donda | Physicist, Engineer & Academic — Adani University',
    description:
      'Dr. Krupali Donda — Assistant Professor at Adani University, Ahmedabad. Physicist and engineer specialising in Metamaterials, Metasurfaces, Nanophotonics, and AI-driven inverse material design. Ph.D. CNRS, France.',
    canonical: 'https://krupalidonda.com/about',
    ogTitle: 'About Dr. Krupali Donda | Adani University',
    ogDescription:
      'Physicist and engineer specialising in Metamaterials, Metasurfaces, Nanophotonics, and AI-driven inverse design. Ph.D. from Institut Jean Lamour, CNRS, France.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    ogUrl: 'https://krupalidonda.com/about',
    twitterCard: 'summary_large_image',
    twitterTitle: 'About Dr. Krupali Donda | Adani University',
    twitterDescription:
      'Physicist and engineer specialising in Metamaterials, Metasurfaces, Nanophotonics, and AI-driven inverse material design.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: 'About Dr. Krupali Donda',
      description:
        'Academic profile and personal journey of Dr. Krupali Donda, Assistant Professor at Adani University.',
      url: 'https://krupalidonda.com/about',
      mainEntity: {
        '@type': 'Person',
        name: 'Krupali Donda',
        honorificPrefix: 'Dr.',
        jobTitle: 'Assistant Professor',
        url: 'https://krupalidonda.com',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
          { '@type': 'ListItem', position: 2, name: 'About', item: 'https://krupalidonda.com/about' },
        ],
      },
    },
  },
  research: {
    title: 'Research — Metamaterials, Metasurfaces & AI | Dr. Krupali Donda, Adani University',
    description:
      'Research projects, metasurface design, and deep learning inverse design by Dr. Krupali Donda at Adani University. Specialising in acoustic metamaterials, nanophotonics, and wave propagation for low-frequency sound absorption.',
    canonical: 'https://krupalidonda.com/research',
    ogTitle: 'Research — Metamaterials & AI | Dr. Krupali Donda',
    ogDescription:
      'Metasurfaces, Nanophotonics, Wave Propagation, and Deep Learning for materials discovery — Adani University.',
    ogImage: 'https://krupalidonda.com/assets/research%20meta.jpg',
    ogUrl: 'https://krupalidonda.com/research',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Research | Dr. Krupali Donda',
    twitterDescription: 'Research projects and grants in metamaterials and machine intelligence.',
    twitterImage: 'https://krupalidonda.com/assets/research%20meta.jpg',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ResearchProject',
        name: 'Acoustic Metamaterials & Deep Learning Research',
        description:
          'Research on acoustic absorbing metasurfaces using deep learning for inverse material design at Adani University.',
        url: 'https://krupalidonda.com/research',
        member: {
          '@type': 'Person',
          name: 'Krupali Donda',
          honorificPrefix: 'Dr.',
          url: 'https://krupalidonda.com',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
          { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://krupalidonda.com/research' },
        ],
      },
    ],
  },
  teaching: {
    title: 'Teaching — AI, Machine Learning & Physics Courses | Dr. Krupali Donda, Adani University',
    description:
      'Courses taught by Dr. Krupali Donda at Adani University including Machine Learning, Generative AI, Artificial Intelligence, Natural Language Processing, and Analog & Digital Communication.',
    canonical: 'https://krupalidonda.com/teaching',
    ogTitle: 'Teaching | Dr. Krupali Donda — Adani University',
    ogDescription: 'Courses in AI, Machine Learning, Generative AI, NLP and Physics taught at Adani University by Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    ogUrl: 'https://krupalidonda.com/teaching',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Teaching | Dr. Krupali Donda',
    twitterDescription: 'AI, Machine Learning and Physics courses taught at Adani University.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
        { '@type': 'ListItem', position: 2, name: 'Teaching', item: 'https://krupalidonda.com/teaching' },
      ],
    },
  },
  group: {
    title: 'Research Group — Students, Interns & Alumni | Dr. Krupali Donda, Adani University',
    description:
      'Meet the research group of Dr. Krupali Donda at Adani University — current B.Tech students, summer interns, and alumni working on metamaterials, metasurfaces, and deep learning for intelligent material design.',
    canonical: 'https://krupalidonda.com/group',
    ogTitle: 'Research Group | Dr. Krupali Donda — Adani University',
    ogDescription:
      'B.Tech students, interns, and alumni in Dr. Krupali Donda\'s group working on metamaterials, metasurfaces, and deep learning.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    ogUrl: 'https://krupalidonda.com/group',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Research Group | Dr. Krupali Donda',
    twitterDescription: 'Students, interns and alumni working on metamaterials, metasurfaces, and deep learning.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
        { '@type': 'ListItem', position: 2, name: 'Research Group', item: 'https://krupalidonda.com/group' },
      ],
    },
  },
  honors: {
    title: 'Honours & Awards — INSA Fellowship, Women in Acoustics | Dr. Krupali Donda',
    description:
      'Honours, awards, fellowships and travel grants awarded to Dr. Krupali Donda: INSA Visiting Scientist Fellowship (2025), Women in Acoustics Emerging Investigator Award, ANRF International Travel Grant (2026).',
    canonical: 'https://krupalidonda.com/honors',
    ogTitle: 'Honours & Awards | Dr. Krupali Donda',
    ogDescription:
      'INSA Visiting Scientist Fellowship (2025), Women in Acoustics Award, ANRF International Travel Grant — Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    ogUrl: 'https://krupalidonda.com/honors',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Honours & Awards | Dr. Krupali Donda',
    twitterDescription: 'INSA Fellowship, Women in Acoustics Award, ANRF Travel Grant — academic recognitions.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
        { '@type': 'ListItem', position: 2, name: 'Honours', item: 'https://krupalidonda.com/honors' },
      ],
    },
  },
  publications: {
    title: 'Publications — Peer-Reviewed Journals & Conferences | Dr. Krupali Donda',
    description:
      'Peer-reviewed journal articles and international conference proceedings by Dr. Krupali Donda. Published in Applied Physics Letters, Extreme Mechanics Letters, Physical Review B, Smart Materials and Structures, and more.',
    canonical: 'https://krupalidonda.com/publications',
    ogTitle: 'Publications | Dr. Krupali Donda',
    ogDescription:
      'High-impact journal articles in Applied Physics Letters, Extreme Mechanics Letters, PRB — Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    ogUrl: 'https://krupalidonda.com/publications',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Publications | Dr. Krupali Donda',
    twitterDescription: 'Scientific publications in metamaterials, acoustic metasurfaces, and deep learning.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
        { '@type': 'ListItem', position: 2, name: 'Publications', item: 'https://krupalidonda.com/publications' },
      ],
    },
  },
  talks: {
    title: 'Invited Talks & Seminars — International & National | Dr. Krupali Donda',
    description:
      'Invited talks, keynote seminars, and academic lectures by Dr. Krupali Donda at IIT Delhi, SVNIT Surat, ASA Honolulu, META 2025, SPIE Photonics Europe, URSI, and more national and international forums.',
    canonical: 'https://krupalidonda.com/talks',
    ogTitle: 'Invited Talks & Seminars | Dr. Krupali Donda',
    ogDescription: 'Keynote and invited presentations at national and international forums — Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    ogUrl: 'https://krupalidonda.com/talks',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Invited Talks | Dr. Krupali Donda',
    twitterDescription: 'Invited talks and academic seminar presentations at international conferences.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
        { '@type': 'ListItem', position: 2, name: 'Talks', item: 'https://krupalidonda.com/talks' },
      ],
    },
  },
  service: {
    title: 'Volunteering & Service — Academic Leadership & Community | Dr. Krupali Donda',
    description:
      'Academic community service, committee roles, conference organisation, peer review, and volunteering by Dr. Krupali Donda at Adani University — Board of Studies, Research & Innovation Cell, IEEE Student Branch Advisor.',
    canonical: 'https://krupalidonda.com/service',
    ogTitle: 'Volunteering & Service | Dr. Krupali Donda',
    ogDescription: 'Institutional contributions, peer review, conference organisation, and academic leadership — Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    ogUrl: 'https://krupalidonda.com/service',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Service & Volunteering | Dr. Krupali Donda',
    twitterDescription: 'Academic community service, committee roles, and volunteering at Adani University.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
        { '@type': 'ListItem', position: 2, name: 'Service', item: 'https://krupalidonda.com/service' },
      ],
    },
  },
  newsOutreach: {
    title: 'News & Outreach — META 2026, ICMR Talk, SVNIT | Dr. Krupali Donda',
    description:
      'Latest news, conference presentations at META 2026 Trinity College Dublin, invited expert talk on AI for ICMR (QCI), and academic mentorship at SVNIT Surat — Dr. Krupali Donda, Adani University.',
    canonical: 'https://krupalidonda.com/news-outreach',
    ogTitle: 'News & Outreach | Dr. Krupali Donda',
    ogDescription: 'META 2026 research presentations, AI invited talk for ICMR, and mentorship outreach — Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/research%20meta.jpg',
    ogUrl: 'https://krupalidonda.com/news-outreach',
    twitterCard: 'summary_large_image',
    twitterTitle: 'News & Outreach | Dr. Krupali Donda',
    twitterDescription: 'Research highlights, invited talks, and academic outreach activities.',
    twitterImage: 'https://krupalidonda.com/assets/research%20meta.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
        { '@type': 'ListItem', position: 2, name: 'News & Outreach', item: 'https://krupalidonda.com/news-outreach' },
      ],
    },
  },
  gallery: {
    title: 'Photos & Video Gallery — Conferences, Lab & Research Milestones | Dr. Krupali Donda',
    description:
      'Explore photo gallery, workshops, invited talks at META 2026 Trinity College Dublin, international conference presentations, research milestones and lab moments of Dr. Krupali Donda.',
    canonical: 'https://krupalidonda.com/gallery',
    ogTitle: 'Photos & Video Gallery | Dr. Krupali Donda',
    ogDescription:
      'Visual archive of keynote lectures, META 2026, lab moments, and international collaborations — Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/research%20meta.jpg',
    ogUrl: 'https://krupalidonda.com/gallery',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Gallery | Dr. Krupali Donda',
    twitterDescription: 'Visual photo and video gallery of research milestones and international conferences.',
    twitterImage: 'https://krupalidonda.com/assets/research%20meta.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
        { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://krupalidonda.com/gallery' },
      ],
    },
  },
  contact: {
    title: 'Contact Dr. Krupali Donda — Adani University, Ahmedabad',
    description:
      'Get in touch with Dr. Krupali Donda at Adani University, Ahmedabad, Gujarat, India. Contact for research collaborations, academic discussions, LinkedIn, ResearchGate, and Google Scholar.',
    canonical: 'https://krupalidonda.com/contact',
    ogTitle: 'Contact Dr. Krupali Donda | Adani University',
    ogDescription:
      'Contact Dr. Krupali Donda at Adani University, Ahmedabad, Gujarat for research collaborations and academic inquiries.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    ogUrl: 'https://krupalidonda.com/contact',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Contact Dr. Krupali Donda',
    twitterDescription: 'Contact Dr. Krupali Donda at Adani University, Ahmedabad for research collaborations.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://krupalidonda.com/contact' },
      ],
    },
  },
};
