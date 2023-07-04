import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import './index.scss';

interface ButtonProps {
  classNames?: string;
  color?: 'primary' | 'default';
  onClick: (args: any) => void;
}

const Button = ({
  classNames,
  color = 'default',
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button className={clsx('button', `button--${color}`, classNames)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
