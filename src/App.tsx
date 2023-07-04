import React, { useEffect, useState } from 'react';
import { popupRegistry } from './store/popup';
import usePopup from './hooks/store/usePopup';
import useMetaMask from './hooks/store/useMetaMask';
import Button from './components/Button';
import Popup from './components/Popup';
import { TokenDropdown } from './components/Dropdown';
import WalletProfile from './components/WalletProfile';
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

let injectedProvider = false;

if (typeof window.ethereum !== 'undefined') {
  injectedProvider = true;
  console.log(window.ethereum);
}

const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false;

function App() {
  const { openPopup } = usePopup();
  const { hasProvider, wallet, getProvider, connectWallet } = useMetaMask();

  const [selectedItem, setSelectedItem] = useState<TokenDropdownOption | undefined>();

  const [connectErr, setConnectErr] = useState<string | null>(null);

  useEffect(() => {
    getProvider();
  }, [getProvider]);

  const handleClickConnectWallet = () => {
    if (!isMetaMask || !hasProvider) setConnectErr('Metamask 지갑 설치 후, 이용해주세요.');
    connectWallet();
  };

  const handleSelectItem = (item: TokenDropdownOption) => {
    setSelectedItem(item);
  };

  const handleClickOpenPopup = () => {
    openPopup(<>팝업0</>);
  };

  // [TODO] 지갑 연결 취소 시, 에러 핸들링
  return (
    <div className="App">
      <div className="App__header">
        <Button color="primary" onClick={handleClickConnectWallet}>
          지갑 연결
        </Button>
        <div className="App__btn_group">
          <Button onClick={handleClickOpenPopup}>팝업 열기</Button>
          <TokenDropdown items={items} selectItem={handleSelectItem} selectedItem={selectedItem} />
        </div>
      </div>
      <div className="App__body">
        <h3 className="App__title">프로필</h3>
        <WalletProfile wallet={wallet} />
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
