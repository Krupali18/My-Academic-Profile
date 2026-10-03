export interface PageSeoConfig {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt?: string;
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
    title: 'Dr. Krupali Donda - Metamaterials and AI Research',
    description:
      'Dr. Krupali Donda is an Assistant Professor at Adani University, Ahmedabad. Expert in Metasurfaces, Nanophotonics, Acoustic Metamaterials, and Deep Learning for inverse material design. INSA Visiting Scientist Fellow 2025.',
    canonical: 'https://krupalidonda.com/',
    ogTitle: 'Dr. Krupali Donda - Metamaterials and AI Research',
    ogDescription:
      'Assistant Professor specialising in Metasurfaces, Nanophotonics, and Deep Learning-driven material design. INSA Visiting Scientist Fellow 2025.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    ogImageAlt: 'Dr. Krupali Donda - Assistant Professor',
    ogUrl: 'https://krupalidonda.com/',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Dr. Krupali Donda - Metamaterials and AI Research',
    twitterDescription:
      'Assistant Professor specialising in Metasurfaces, Nanophotonics, and Deep Learning-driven material design.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
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
      image: 'https://krupalidonda.com/assets/genratedd-2.webp',
      sameAs: [
        'https://www.linkedin.com/in/krupalidonda/',
        'https://scholar.google.com/citations?user=JRLRYokAAAAJ',
        'https://www.researchgate.net/profile/Krupali-Donda-2',
        'https://www.youtube.com/@humansineducation4511',
      ],
    },
  },
  about: {
    title: 'About - Dr. Krupali Donda',
    description:
      'Dr. Krupali Donda is a physicist and engineer specialising in Metamaterials, Metasurfaces, Nanophotonics, and AI-driven inverse material design. Ph.D. from Institut Jean Lamour, CNRS, France.',
    canonical: 'https://krupalidonda.com/about',
    ogTitle: 'About - Dr. Krupali Donda',
    ogDescription:
      'Physicist and engineer specialising in Metamaterials, Metasurfaces, Nanophotonics, and AI-driven inverse design. Ph.D. from Institut Jean Lamour, CNRS, France.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    ogImageAlt: 'Dr. Krupali Donda - Physicist and Engineer',
    ogUrl: 'https://krupalidonda.com/about',
    twitterCard: 'summary_large_image',
    twitterTitle: 'About - Dr. Krupali Donda',
    twitterDescription:
      'Physicist and engineer specialising in Metamaterials, Metasurfaces, Nanophotonics, and AI-driven inverse material design.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: 'About Dr. Krupali Donda',
      description:
        'Academic profile and personal journey of Dr. Krupali Donda.',
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
    title: 'Research - Dr. Krupali Donda',
    description:
      'Research projects, metasurface design, and deep learning inverse design by Dr. Krupali Donda. Specialising in acoustic metamaterials, nanophotonics, and wave propagation for low-frequency sound absorption.',
    canonical: 'https://krupalidonda.com/research',
    ogTitle: 'Research - Dr. Krupali Donda',
    ogDescription:
      'Metasurfaces, Nanophotonics, Wave Propagation, and Deep Learning for materials discovery.',
    ogImage: 'https://krupalidonda.com/assets/research-meta-opt.webp',
    ogImageAlt: 'Research on Metamaterials and Metasurfaces - Dr. Krupali Donda',
    ogUrl: 'https://krupalidonda.com/research',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Research - Dr. Krupali Donda',
    twitterDescription: 'Research projects and grants in metamaterials and machine intelligence.',
    twitterImage: 'https://krupalidonda.com/assets/research-meta-opt.webp',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ResearchProject',
        name: 'Acoustic Metamaterials & Deep Learning Research',
        description:
          'Research on acoustic absorbing metasurfaces using deep learning for inverse material design.',
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
    title: 'Teaching - Dr. Krupali Donda',
    description:
      'Courses taught by Dr. Krupali Donda including Machine Learning, Generative AI, Artificial Intelligence, Natural Language Processing, and Analog & Digital Communication.',
    canonical: 'https://krupalidonda.com/teaching',
    ogTitle: 'Teaching - Dr. Krupali Donda',
    ogDescription: 'Courses in AI, Machine Learning, Generative AI, NLP and Physics taught by Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    ogImageAlt: 'Dr. Krupali Donda - Teaching Courses',
    ogUrl: 'https://krupalidonda.com/teaching',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Teaching - Dr. Krupali Donda',
    twitterDescription: 'AI, Machine Learning and Physics courses taught by Dr. Krupali Donda.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Courses taught by Dr. Krupali Donda',
        url: 'https://krupalidonda.com/teaching',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Course',
              name: 'Machine Learning',
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Course',
              name: 'Generative AI',
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'Course',
              name: 'Artificial Intelligence',
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'Course',
              name: 'Natural Language Processing',
            },
          },
          {
            '@type': 'ListItem',
            position: 5,
            item: {
              '@type': 'Course',
              name: 'Analog & Digital Communication',
            },
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
          { '@type': 'ListItem', position: 2, name: 'Teaching', item: 'https://krupalidonda.com/teaching' },
        ],
      },
    ],
  },
  group: {
    title: 'Research Group - Dr. Krupali Donda',
    description:
      'Meet the research group of Dr. Krupali Donda - current B.Tech students, summer interns, and alumni working on metamaterials, metasurfaces, and deep learning for intelligent material design.',
    canonical: 'https://krupalidonda.com/group',
    ogTitle: 'Research Group - Dr. Krupali Donda',
    ogDescription:
      'B.Tech students, interns, and alumni in Dr. Krupali Donda\'s group working on metamaterials, metasurfaces, and deep learning.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    ogImageAlt: 'Research Group - Dr. Krupali Donda',
    ogUrl: 'https://krupalidonda.com/group',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Research Group - Dr. Krupali Donda',
    twitterDescription: 'Students, interns and alumni working on metamaterials, metasurfaces, and deep learning.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
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
    title: 'Honours and Awards - Dr. Krupali Donda',
    description:
      'Honours, awards, fellowships and travel grants awarded to Dr. Krupali Donda: INSA Visiting Scientist Fellowship (2025), Women in Acoustics Emerging Investigator Award, ANRF International Travel Grant (2026).',
    canonical: 'https://krupalidonda.com/honors',
    ogTitle: 'Honours and Awards - Dr. Krupali Donda',
    ogDescription:
      'INSA Visiting Scientist Fellowship (2025), Women in Acoustics Award, ANRF International Travel Grant - Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    ogImageAlt: 'Honours and Awards - Dr. Krupali Donda',
    ogUrl: 'https://krupalidonda.com/honors',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Honours and Awards - Dr. Krupali Donda',
    twitterDescription: 'INSA Fellowship, Women in Acoustics Award, ANRF Travel Grant - academic recognitions.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Krupali Donda',
        honorificPrefix: 'Dr.',
        url: 'https://krupalidonda.com',
        award: [
          'Visiting Scientist Fellowship, Indian National Science Academy (2025)',
          'Women in Acoustics Emerging Investigator Award',
          'ANRF International Travel Support Grant (2026)',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
          { '@type': 'ListItem', position: 2, name: 'Honours', item: 'https://krupalidonda.com/honors' },
        ],
      },
    ],
  },
  publications: {
    title: 'Publications - Dr. Krupali Donda',
    description:
      'Peer-reviewed journal articles and international conference proceedings by Dr. Krupali Donda. Published in Applied Physics Letters, Extreme Mechanics Letters, Physical Review B, Smart Materials and Structures, and more.',
    canonical: 'https://krupalidonda.com/publications',
    ogTitle: 'Publications - Dr. Krupali Donda',
    ogDescription:
      'High-impact journal articles in Applied Physics Letters, Extreme Mechanics Letters, PRB - Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    ogImageAlt: 'Publications by Dr. Krupali Donda',
    ogUrl: 'https://krupalidonda.com/publications',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Publications - Dr. Krupali Donda',
    twitterDescription: 'Scientific publications in metamaterials, acoustic metasurfaces, and deep learning.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
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
    title: 'Invited Talks and Seminars - Dr. Krupali Donda',
    description:
      'Invited talks, keynote seminars, and academic lectures by Dr. Krupali Donda at IIT Delhi, SVNIT Surat, ASA Honolulu, META 2025, SPIE Photonics Europe, URSI, and more national and international forums.',
    canonical: 'https://krupalidonda.com/talks',
    ogTitle: 'Invited Talks and Seminars - Dr. Krupali Donda',
    ogDescription: 'Keynote and invited presentations at national and international forums - Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/svnit-expert-talk.webp',
    ogImageAlt: 'Invited Talks by Dr. Krupali Donda',
    ogUrl: 'https://krupalidonda.com/talks',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Invited Talks and Seminars - Dr. Krupali Donda',
    twitterDescription: 'Invited talks and academic seminar presentations at international conferences.',
    twitterImage: 'https://krupalidonda.com/assets/svnit-expert-talk.webp',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'META 2025 - Invited Talk by Dr. Krupali Donda',
        description: 'Invited talk on metamaterials and AI at the META 2025 international conference.',
        performer: { '@type': 'Person', name: 'Dr. Krupali Donda', url: 'https://krupalidonda.com' },
        organizer: { '@type': 'Organization', name: 'META Conference Series' },
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
          { '@type': 'ListItem', position: 2, name: 'Talks', item: 'https://krupalidonda.com/talks' },
        ],
      },
    ],
  },
  service: {
    title: 'Volunteering and Service - Dr. Krupali Donda',
    description:
      'Academic community service, committee roles, conference organisation, peer review, and volunteering by Dr. Krupali Donda - Board of Studies, Research & Innovation Cell, IEEE Student Branch Advisor.',
    canonical: 'https://krupalidonda.com/service',
    ogTitle: 'Volunteering and Service - Dr. Krupali Donda',
    ogDescription: 'Institutional contributions, peer review, conference organisation, and academic leadership - Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    ogImageAlt: 'Academic Community Service - Dr. Krupali Donda',
    ogUrl: 'https://krupalidonda.com/service',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Volunteering and Service - Dr. Krupali Donda',
    twitterDescription: 'Academic community service, committee roles, and volunteering.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
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
    title: 'News and Outreach - Dr. Krupali Donda',
    description:
      'Latest news, conference presentations at META 2026 Trinity College Dublin, invited expert talk on AI for ICMR (QCI), and academic mentorship at SVNIT Surat - Dr. Krupali Donda.',
    canonical: 'https://krupalidonda.com/news-outreach',
    ogTitle: 'News and Outreach - Dr. Krupali Donda',
    ogDescription: 'META 2026 research presentations, AI invited talk for ICMR, and mentorship outreach - Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/research-meta-opt.webp',
    ogImageAlt: 'News and Outreach - Dr. Krupali Donda',
    ogUrl: 'https://krupalidonda.com/news-outreach',
    twitterCard: 'summary_large_image',
    twitterTitle: 'News and Outreach - Dr. Krupali Donda',
    twitterDescription: 'Research highlights, invited talks, and academic outreach activities.',
    twitterImage: 'https://krupalidonda.com/assets/research-meta-opt.webp',
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
    title: 'Photos and Video Gallery - Dr. Krupali Donda',
    description:
      'Explore photo gallery, workshops, invited talks at META 2026 Trinity College Dublin, international conference presentations, research milestones and lab moments of Dr. Krupali Donda.',
    canonical: 'https://krupalidonda.com/gallery',
    ogTitle: 'Photos and Video Gallery - Dr. Krupali Donda',
    ogDescription:
      'Visual archive of keynote lectures, META 2026, lab moments, and international collaborations - Dr. Krupali Donda.',
    ogImage: 'https://krupalidonda.com/assets/research-meta-opt.webp',
    ogImageAlt: 'Gallery - Dr. Krupali Donda',
    ogUrl: 'https://krupalidonda.com/gallery',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Photos and Video Gallery - Dr. Krupali Donda',
    twitterDescription: 'Visual photo and video gallery of research milestones and international conferences.',
    twitterImage: 'https://krupalidonda.com/assets/research-meta-opt.webp',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Research & Conference Photo Gallery - Dr. Krupali Donda',
        description: 'Visual archive of research milestones, conference presentations, and lab moments.',
        url: 'https://krupalidonda.com/gallery',
        author: { '@type': 'Person', name: 'Dr. Krupali Donda', url: 'https://krupalidonda.com' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
          { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://krupalidonda.com/gallery' },
        ],
      },
    ],
  },
  contact: {
    title: 'Contact - Dr. Krupali Donda',
    description:
      'Get in touch with Dr. Krupali Donda for research collaborations, academic discussions, LinkedIn, ResearchGate, and Google Scholar.',
    canonical: 'https://krupalidonda.com/contact',
    ogTitle: 'Contact - Dr. Krupali Donda',
    ogDescription:
      'Contact Dr. Krupali Donda for research collaborations and academic inquiries.',
    ogImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    ogImageAlt: 'Contact Dr. Krupali Donda',
    ogUrl: 'https://krupalidonda.com/contact',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Contact - Dr. Krupali Donda',
    twitterDescription: 'Contact Dr. Krupali Donda for research collaborations.',
    twitterImage: 'https://krupalidonda.com/assets/genratedd-2.webp',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Dr. Krupali Donda',
        description: 'Contact page for Dr. Krupali Donda.',
        url: 'https://krupalidonda.com/contact',
        mainEntity: {
          '@type': 'Person',
          name: 'Krupali Donda',
          honorificPrefix: 'Dr.',
          jobTitle: 'Assistant Professor',
          worksFor: { '@type': 'EducationalOrganization', name: 'Adani University' },
          url: 'https://krupalidonda.com',
          sameAs: [
            'https://www.linkedin.com/in/krupalidonda/',
            'https://scholar.google.com/citations?user=JRLRYokAAAAJ',
            'https://www.researchgate.net/profile/Krupali-Donda-2',
          ],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krupalidonda.com/' },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://krupalidonda.com/contact' },
        ],
      },
    ],
  },
};

(seoConfig as Record<string, PageSeoConfig>)['news-outreach'] = seoConfig.newsOutreach;
