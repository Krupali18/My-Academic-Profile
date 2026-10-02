/**
 * Dr. Krupali Donda Academic Site - Section Component Types
 * Strongly typed props, content schemas, and settings for each section component.
 */

// 1. Intro Overlay Section
export interface IntroOverlayContent {
  eyebrow: string;
  heading: string;
  roles: string;
  skipText: string;
}

export interface IntroOverlaySettings {
  enabled: boolean;
  skipKey: string;
}

// 2. Hero Banner Section
export interface HeroBannerContent {
  heading: string;
  title: string;
  researchArea: string;
  profileImage: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface HeroBannerSettings {
  hasParticles: boolean;
  hasWaveform: boolean;
}

// 3. About Text Section
export interface AboutTextContent {
  heading: string;
  paragraphs: string[];
  researchContributions: string[];
}

export interface AboutTextSettings {
  backgroundColor?: string;
  textColor?: string;
}

// 4. Page Header Section
export interface PageHeaderContent {
  heading: string;
  subtitle?: string;
}

export interface PageHeaderSettings {
  backgroundColor?: string;
  textColor?: string;
}

// 5. Stack Spread Section (About Page Interactive Photo Fan)
export interface StackCardItem {
  id: number;
  cardImg: string;
  modalImg: string;
  caption?: string;
}

export interface StackSpreadContent {
  manifestoQuote: string;
  quoteAuthor: string;
  scrollHint: string;
  cards: StackCardItem[];
}

export interface StackSpreadSettings {
  cardCount: number;
  interactiveSpread: boolean;
}

// 6. Timeline Section
export interface TimelineItem {
  badge: string;
  description: string;
  isCurrent: boolean;
}

export interface TimelineContent {
  heading: string;
  items: TimelineItem[];
}

export interface TimelineSettings {
  accentColor?: string;
}

// 7. Research Gallery Section
export interface ResearchItem {
  type: 'image' | 'video';
  image?: string;
  alt?: string;
  videoUrl?: string;
  kicker: string;
  title: string;
  linkUrl: string;
  linkText: string;
}

export interface ResearchGalleryContent {
  subtitle: string;
  items: ResearchItem[];
}

export interface ResearchGallerySettings {
  columns?: number;
}

// 8. Teaching Schedule Section
export interface CourseItem {
  code: string;
  title: string;
}

export interface TermItem {
  termName: string;
  courses: CourseItem[];
}

export interface TeachingScheduleContent {
  terms: TermItem[];
}

export interface TeachingScheduleSettings {
  expandedDefault?: boolean;
}

// 9. Team Grid Section
export interface LabMember {
  name: string;
  role: string;
  photo: string;
  description: string;
  linkedin?: string;
}

export interface MemberCategory {
  title: string;
  members: LabMember[];
}

export interface PIProfile {
  name: string;
  credentials: string;
  photo: string;
  bio: string;
}

export interface TeamGridContent {
  pi: PIProfile;
  categories: MemberCategory[];
}

export interface TeamGridSettings {
  showPI: boolean;
}

// 10. Cards Grid Section (Honours / News / Services)
export interface CardMetaItem {
  label: string;
  value: string;
}

export interface CardItem {
  id?: string;
  tag?: string;
  pill?: string;
  heading?: string;
  title?: string;
  summary?: string;
  description?: string;
  image?: string;
  imageCaption?: string;
  meta?: CardMetaItem[];
}

export interface CardsGridContent {
  heading?: string;
  items?: CardItem[];
  cards?: CardItem[];
}

export interface CardsGridSettings {
  layout?: 'grid' | 'cards';
}

// 11. Publication List Section
export interface PublicationItem {
  citation: string;
  url?: string;
}

export interface PublicationCategory {
  title: string;
  items: PublicationItem[];
}

export interface PublicationListContent {
  categories: PublicationCategory[];
}

export interface PublicationListSettings {
  enableSearch?: boolean;
}

// 12. Ticker Banner Section
export interface TickerItem {
  text: string;
  linkTarget?: string;
  icon?: string;
}

export interface TickerBannerContent {
  items: TickerItem[];
}

export interface TickerBannerSettings {
  speedSeconds?: number;
}

// 13. Gallery Slideshow Section
export interface GallerySlide {
  id: number;
  image: string;
  alt: string;
}

export interface GallerySlideshowContent {
  slides: GallerySlide[];
}

export interface GallerySlideshowSettings {
  hasLightbox: boolean;
  autoplay: boolean;
  interval: number;
}

// 14. Talks List Section
export interface TalkItem {
  year: string;
  month: string;
  title: string;
  venue: string;
  type: string;
}

export interface TalksListContent {
  sectionTitle: string;
  talks: TalkItem[];
}

export interface TalksListSettings {
  groupByYear?: boolean;
}

// 15. Contact Info Section
export interface ContactInfoContent {
  heading: string;
  officeAddress: string;
  email: string;
  linkedinUrl: string;
  linkedinText: string;
  researchGateUrl: string;
  researchGateText: string;
  scholarUrl: string;
  scholarText: string;
  mapAddress: string;
  mapLink: string;
}

export interface ContactInfoSettings {
  showMap: boolean;
  showForm: boolean;
}

// 16. Video Showcase Section (Builder element)
export interface VideoShowcaseContent {
  videoUrl: string;
  posterImage?: string;
  caption?: string;
}

export interface VideoShowcaseSettings {
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
}

// Section Registry Type Enum
export type SectionType =
  | 'IntroOverlaySection'
  | 'HeroBannerSection'
  | 'AboutTextSection'
  | 'PageHeaderSection'
  | 'StackSpreadSection'
  | 'TimelineSection'
  | 'ResearchGallerySection'
  | 'TeachingScheduleSection'
  | 'TeamGridSection'
  | 'CardsGridSection'
  | 'PublicationListSection'
  | 'TickerBannerSection'
  | 'GallerySlideshowSection'
  | 'TalksListSection'
  | 'ContactInfoSection'
  | 'VideoShowcaseSection';
