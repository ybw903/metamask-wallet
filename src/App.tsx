import React, { useState } from 'react';
import { popupRegistry } from './store/popup';
import usePopup from './hooks/store/usePopup';
import Button from './components/Button';
import Popup from './components/Popup';
import { TokenDropdown } from './components/Dropdown';
import { BitCoinIcon, EtheriumIcon } from './components/Icons';
import { TokenDropdownOption } from './components/Dropdown/TokenDropdown';

import './App.scss';

const items = [
  { icon: <EtheriumIcon />, label: '이더리움' },
  { icon: <BitCoinIcon />, label: '비트코인' },
  { icon: <EtheriumIcon />, label: '이더리움' },
  { icon: <BitCoinIcon />, label: '비트코인' },
  { icon: <EtheriumIcon />, label: '이더리움' },
  { icon: <BitCoinIcon />, label: '비트코인' },
  { icon: <EtheriumIcon />, label: '이더리움' },
  { icon: <BitCoinIcon />, label: '비트코인' },
  { icon: <EtheriumIcon />, label: '이더리움' },
  { icon: <BitCoinIcon />, label: '비트코인' },
  { icon: <EtheriumIcon />, label: '이더리움' },
  { icon: <BitCoinIcon />, label: '비트코인' },
];

function App() {
  const { openPopup } = usePopup();

  const [selectedItem, setSelectedItem] = useState<TokenDropdownOption | undefined>();

  const [connectErr, setConnectErr] = useState<string | null>(null);

  const handleSelectItem = (item: TokenDropdownOption) => {
    setSelectedItem(item);
  };

  const handleClickOpenPopup = () => {
    openPopup(<>팝업0</>);
  };

  // 지갑 연결 취소 시, 에러 핸들링
  return (
    <div className="App">
      <div className="App__header">
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <Button color="primary" onClick={() => {}}>
          지갑 연결
        </Button>
        <div className="App__btn_group">
          <Button onClick={handleClickOpenPopup}>팝업 열기</Button>
          <TokenDropdown items={items} selectItem={handleSelectItem} selectedItem={selectedItem} />
        </div>
      </div>
      <div className="App__body">
        <h3 className="App__title">프로필</h3>
      </div>
      {connectErr && <div className="App__error">{connectErr}</div>}
      {popupRegistry.map((content, idx) => (
        <Popup priority={idx} key={`popup-${idx}`}>
          {content}
        </Popup>
      ))}
    </div>
  );
}

export default App;
