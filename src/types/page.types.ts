/**
 * Dr. Krupali Donda Academic Site - Page Types
 * Strictly typed definitions for Page and Section representations.
 */

export type PageStatus = 'DRAFT' | 'PUBLISHED';

export interface SEOMetadata {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export interface Section<TContent = Record<string, unknown>, TSettings = Record<string, unknown>> {
  id: string;
  type: string;
  order: number;
  visible?: boolean;
  content: TContent;
  settings: TSettings;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  status: PageStatus;
  seo: SEOMetadata;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
}

export interface PageListItem {
  id: string;
  slug: string;
  title: string;
  status: PageStatus;
  sectionsCount: number;
  updatedAt: string;
}
