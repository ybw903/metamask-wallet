import { RefObject, useEffect } from 'react';

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: React.MouseEvent | MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (event: React.MouseEvent | MouseEvent) => {
      const el = ref.current;

      if (!el || (el !== event.target && el.contains(event.target as Node))) return;

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
};

export default useOnClickOutside;
