import { useRef } from 'react';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import usePopup from 'src/hooks/store/usePopup';
import Portal from '../Portal';
import Button from '../Button';

import './index.scss';

interface PopupProps {
  children: JSX.Element;
  priority: number;
}

const Popup = ({ children, priority }: PopupProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { openPopup, closePopup } = usePopup();
  useOnClickOutside(containerRef, (evt) => closePopup());

  const handleClickOpenPopup = (evt: React.MouseEvent) => {
    openPopup(<>팝업{priority + 1}</>);
  };

  return (
    <Portal>
      <div className="popup">
        {priority === 0 && <div className="popup__overlay" />}

        <div className="popup__wrapper" style={{ zIndex: 1000 + priority }} ref={containerRef}>
          <div className="popup__content">
            <div className="popup__body">{children}</div>
            <div className="popup__footer">
              <Button onClick={closePopup}>팝업 닫기</Button>
              <Button color="primary" onClick={handleClickOpenPopup}>
                {priority}다음 팝업 열기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Popup;
