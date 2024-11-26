import { useEffect } from 'react';

interface UseClickOutsideProps {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
  isActive?: boolean;
  parentPortalRef?: React.RefObject<HTMLElement>;
}

export const useClickOutside = ({
  ref,
  isActive = true,
  parentPortalRef,
  callback,
}: UseClickOutsideProps) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (!isActive) return;

    const target = event.target as Node;

    if (
      (parentPortalRef?.current && parentPortalRef.current.contains(target)) ||
      (ref.current && ref.current.contains(target))
    ) {
      return;
    }

    callback();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};
