import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }: PropsWithChildren<unknown>) => {
  const $portal = document.querySelector('#portal') as Element;
  return ReactDOM.createPortal(children, $portal);
};

export default Portal;
