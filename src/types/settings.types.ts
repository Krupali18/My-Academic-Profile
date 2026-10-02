/**
 * Dr. Krupali Donda Academic Site - Site Settings & Navigation Types
 */

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  sourceHtml?: string;
  order: number;
  isCta?: boolean;
  inNav?: boolean;
}

export interface AffiliationDetails {
  institution: string;
  department: string;
  address: string;
  country: string;
}

export interface SiteTheme {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
}

export interface SiteSettings {
  title: string;
  subtitle: string;
  designation: string;
  affiliation: AffiliationDetails;
  alumniOf: {
    institution: string;
    country: string;
  };
  email: string;
  contactUrl: string;
  heroImage: string;
  footerText: string;
  logo?: string;
  favicon?: string;
  maintenanceMode?: boolean;
  officeHours?: string;
  address?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  customHeadScripts?: string;
  theme?: SiteTheme;
  socialLinks: SocialLink[];
  navigation: {
    primary: NavItem[];
    secondary?: NavItem[];
    footer?: NavItem[];
  };
}

export interface FormSubmission {
  id: string;
  formId?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'ARCHIVED';
  createdAt: string;
}
