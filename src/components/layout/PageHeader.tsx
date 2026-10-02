import React from 'react';

export interface PageHeaderProps {
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <section className="page-header" aria-label="Page title">
      <h1 className="reveal active">{title}</h1>
    </section>
  );
};
