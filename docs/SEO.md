# Search Engine Optimization (SEO) & Structured Data Manual
## Dr. Krupali Donda Academic Portfolio

### 1. Architectural Highlights
- **Canonical Domain**: `https://krupalidonda.com`
- **Dynamic Meta Tags**: Managed via `react-helmet-async` on all 12 routes using `src/seo.config.ts`.
- **Pre-rendered Fallback**: Shell HTML in `index.html` provides crawlable baseline text, author data, and canonical tags for crawlers that do not execute client-side JavaScript.
- **Indexation Directives**: `public/robots.txt` explicitly allows search engine bots and points to the validated sitemap.
- **Sitemap**: `public/sitemap.xml` includes all canonical academic routes (`/`, `/about`, `/research`, `/publications`, `/teaching`, `/group`, `/honors`, `/talks`, `/service`, `/news-outreach`, `/gallery`, `/contact`).

---

### 2. Route Matrix & Metadata Registry

| Route | Title | Description | Canonical URL | JSON-LD Schema |
|---|---|---|---|---|
| `/` | Dr. Krupali Donda \| Metamaterials & AI Research | Assistant Professor at Adani University. Expert in Metasurfaces, Nanophotonics, Acoustic Metamaterials, Deep Learning. | `https://krupalidonda.com/` | `Person`, `WebSite` |
| `/about` | Biography & Academic Career \| Dr. Krupali Donda | Full academic biography, education, research philosophy, and positions held at Adani University, IIT Delhi, CNRS. | `https://krupalidonda.com/about` | `BreadcrumbList`, `ProfilePage` |
| `/research` | Research Focus & Wave Physics \| Dr. Krupali Donda | Intelligent Metasurfaces, Nanophotonics, Deep Learning for Inverse Design, Acoustic Metamaterials. | `https://krupalidonda.com/research` | `BreadcrumbList`, `WebPage` |
| `/publications` | Peer-Reviewed Publications \| Dr. Krupali Donda | Journal articles, conference proceedings, and patents on Metamaterials and Wave Dynamics. | `https://krupalidonda.com/publications` | `BreadcrumbList`, `CollectionPage` |
| `/teaching` | Teaching & Academic Courses \| Dr. Krupali Donda | Undergraduate and postgraduate courses in ICT, Wave Physics, and Electromagnetic Engineering. | `https://krupalidonda.com/teaching` | `BreadcrumbList`, `WebPage` |
| `/group` | Research Group & Scholars \| Dr. Krupali Donda | Research team, PhD scholars, and graduate students working in wave physics and metasurfaces. | `https://krupalidonda.com/group` | `BreadcrumbList`, `WebPage` |
| `/honors` | Honors, Awards & Distinctions \| Dr. Krupali Donda | Academic fellowships, national grants, and distinguished recognition awards. | `https://krupalidonda.com/honors` | `BreadcrumbList`, `WebPage` |
| `/talks` | Keynotes & Invited Talks \| Dr. Krupali Donda | Invited lectures, keynote addresses, and workshops delivered at international symposiums. | `https://krupalidonda.com/talks` | `BreadcrumbList`, `WebPage` |
| `/service` | Volunteering & Service \| Dr. Krupali Donda | Peer review, editorial appointments, university leadership, and STEM outreach initiatives. | `https://krupalidonda.com/service` | `BreadcrumbList`, `WebPage` |
| `/news-outreach` | News & Outreach \| Dr. Krupali Donda | Latest laboratory developments, conference participation, and scientific mentoring news. | `https://krupalidonda.com/news-outreach` | `BreadcrumbList`, `CollectionPage` |
| `/gallery` | Photos & Video Gallery \| Dr. Krupali Donda | Photographic record of academic milestones, lab work, conferences, and student interactions. | `https://krupalidonda.com/gallery` | `BreadcrumbList`, `ImageGallery` |
| `/contact` | Contact Dr. Krupali Donda \| Adani University | Academic office address, laboratory location, institutional email, and professional links. | `https://krupalidonda.com/contact` | `BreadcrumbList`, `ContactPage` |

---

### 3. Google Search Console & Verification Steps

1. Visit [Google Search Console](https://search.google.com/search-console).
2. Add property `https://krupalidonda.com`.
3. Verify domain ownership via DNS TXT record or HTML meta tag.
4. Navigate to **Sitemaps** and submit:
   ```
   https://krupalidonda.com/sitemap.xml
   ```
5. Request indexing for primary canonical routes.
