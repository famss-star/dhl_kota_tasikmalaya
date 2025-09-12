'use client';

import { useEffect, useState } from 'react';

interface PageContentData {
  id: string;
  section: string;
  title: string;
  content: string;
  order: number;
}

interface PageContentSectionProps {
  page: string;
  section: string;
}

export default function PageContentSection({ page, section }: PageContentSectionProps) {
  const [content, setContent] = useState<PageContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/public/page-content/${page}`);
        if (response.ok) {
          const data = await response.json();
          const sectionContent = data.data.find((item: PageContentData) => item.section === section);
          setContent(sectionContent);
        }
      } catch (error) {
        console.error('Error fetching page content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [page, section]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded mb-4 w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>
        </div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {content.title}
      </h2>
      <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
        {content.content}
      </div>
    </div>
  );
}
