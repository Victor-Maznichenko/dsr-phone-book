import { useCallback, useEffect, useRef } from 'react';

type UseIntersectionObserverCallback = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

interface UseIntersectionObserverOptions {
  callback: UseIntersectionObserverCallback;
  options?: IntersectionObserverInit;
}

export const useIntersectionObserver = <R extends HTMLElement>({
  callback,
  options,
}: UseIntersectionObserverOptions) => {
  const ref = useRef<R>(null);

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
