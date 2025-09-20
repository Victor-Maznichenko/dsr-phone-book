import { useCallback, useEffect, useRef } from 'react';

type UseIntersectionObserverCallback = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

interface UseIntersectionObserverOptions {
  callback: UseIntersectionObserverCallback;
  options?: IntersectionObserverInit;
}

export const useIntersectionObserver = ({ callback, options }: UseIntersectionObserverOptions) => {
  const ref = useRef(null);

  const callbackWrapper = useCallback<IntersectionObserverCallback>(
    (entries, observer) => {
      entries.forEach((entry) => {
        callback(entry, observer);
      });
    },
    [callback],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callbackWrapper, options);
    const currentRef = ref.current;

    if (currentRef) observer.observe(currentRef);

    return () => observer.disconnect();
  }, [callbackWrapper, options]);

  return { ref };
};
