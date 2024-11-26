import { ReactNode } from 'react';

import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
  container?: HTMLElement;
}

export const Portal = ({ children, container }: PortalProps) => {
  const target = container || document.body;

  return ReactDOM.createPortal(children, target);
};
