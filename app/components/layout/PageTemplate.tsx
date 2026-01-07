'use client';
import React, { ReactNode } from 'react';
import { TerminalBackButton } from '@/components/ui/TerminalBackButton';
import { 
  Z_INDEX_CLASSES, 
  HEADER_HEIGHT_CLASSES, 
  MAX_WIDTH_CLASSES,
  CONTAINER_PADDING_CLASSES,
  SECTION_PADDING_CLASSES,
  MARGIN_BOTTOM_CLASSES,
} from '@/styles/tokens';

interface PageTemplateProps {
  title: ReactNode;
  description?: string;
  headerTag?: string;
  maxWidth?: 'page' | 'content' | 'narrow';
  showHeader?: boolean;
  action?: ReactNode;
  children: ReactNode;
}

/**
 * PageTemplate - Enhanced page layout component for sub-pages
 */
export const PageTemplate: React.FC<PageTemplateProps> = ({ 
  title, 
  description, 
  headerTag = 'SYSTEM',
  maxWidth = 'page',
  showHeader = true,
  action,
  children 
}) => {
  const maxWidthClass = MAX_WIDTH_CLASSES[maxWidth] || MAX_WIDTH_CLASSES.page;

  return (
    <div className="min-h-screen text-gray-300 font-mono selection:bg-primary selection:text-black bg-page">
      {/* Fixed Sub-page Header */}
      {showHeader && (
        <nav className={`fixed top-0 left-0 w-full ${Z_INDEX_CLASSES.sticky} bg-(--bg-page)/80 backdrop-blur-md border-b border-(--border-subtle)`}>
          <div className={`flex items-center justify-between ${CONTAINER_PADDING_CLASSES.x} ${HEADER_HEIGHT_CLASSES.subpage} ${MAX_WIDTH_CLASSES.page} mx-auto`}>
            {/* Left: Back Button */}
            <div className="shrink-0">
              <TerminalBackButton />
            </div>
            
            {/* Right: Page Tag */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[9px] text-primary tracking-[0.3em] uppercase font-bold">{headerTag}</span>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content - with padding for fixed header */}
      <main className={`relative z-10 ${maxWidthClass} mx-auto ${CONTAINER_PADDING_CLASSES.x} ${SECTION_PADDING_CLASSES.top} ${SECTION_PADDING_CLASSES.bottom}`}>
        {/* Title/Description Zone */}
        {(title || description || action) && (
          <header className={MARGIN_BOTTOM_CLASSES.xl}>
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                {title && (
                  <h1 className="text-heading-1 mb-4">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
              {action && (
                <div className="shrink-0">
                  {action}
                </div>
              )}
            </div>
          </header>
        )}

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
};

/**
 * Generate standard metadata for a page
 * Use this in your page.js files:
 * 
 * import { generatePageMetadata } from '@/components/layout/PageTemplate';
 * export const metadata = generatePageMetadata({
 *   title: 'Settings',
 *   description: 'Configure your preferences',
 * });
 * 
 * @param {Object} options - Metadata options
 * @param {string} options.title - Page title (will be templated as "Title | Author Name")
 * @param {string} options.description - Page description for SEO
 * @param {string} options.path - Optional path for canonical URL
 * @param {boolean} options.noIndex - Whether to exclude from search engines
 * @returns {Object} Next.js metadata object
 */
export const generatePageMetadata = ({ 
  title, 
  description, 
  path = '',
  noIndex = false,
}) => {
  const fullTitle = title ? `${title} | Shaikh Mahad` : 'Shaikh Mahad | Backend Systems Engineer';
  
  return {
    title: fullTitle,
    description: description || 'Backend Systems Engineer specializing in distributed systems, Java, Spring Boot, and scalable architectures.',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
};

export default PageTemplate;
