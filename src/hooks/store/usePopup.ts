import { useAppDispatch, useAppSelector } from 'src/store';
import { popupRegistry, selectPopupState } from 'src/store/popup';
import { open, close } from 'src/store/popup';

const usePopup = () => {
  const dispatch = useAppDispatch();
  const popupState = useAppSelector(selectPopupState);
  const { registryCnt } = popupState;

  const openPopup = (content: JSX.Element) => {
    if (registryCnt >= 3) return;
    popupRegistry.push(content);
    dispatch(open());
  };
  const closePopup = () => {
    if (registryCnt <= 0) return;
    popupRegistry.pop();
    dispatch(close());
  };

  return {
    openPopup,
    closePopup,
  };
};

export default usePopup;
