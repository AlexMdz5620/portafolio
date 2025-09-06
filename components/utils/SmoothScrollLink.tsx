'use client';

interface SmoothScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SmoothScrollLink = ({ href, children, className, onClick }: SmoothScrollLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Scroll suave al elemento
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Actualizar la URL (opcional)
      window.history.pushState(null, '', href);
    }
    
    if (onClick) onClick();
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

// Componente Section opcional (sin useInView)
interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ id, children, className }: SectionProps) => {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
};
