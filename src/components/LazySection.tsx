import { useEffect, useState, useRef, ReactNode, ComponentType } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}

export const LazySection = ({ children, fallback = null, rootMargin = '200px' }: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If IntersectionObserver is not supported, show content immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
};

// HOC for lazy loading components
export function withLazyLoad<T extends object>(
  Component: ComponentType<T>,
  fallback?: ReactNode
) {
  return function LazyComponent(props: T) {
    return (
      <LazySection fallback={fallback}>
        <Component {...props} />
      </LazySection>
    );
  };
}

export default LazySection;
