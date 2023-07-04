import { PropsWithChildren } from 'react';
import { Wallet } from 'src/store/metaMask';
import './index.scss';

interface WalletProfileProps {
  wallet?: Wallet;
}

const WalletProfile = ({ wallet }: PropsWithChildren<WalletProfileProps>) => {
  const accounts = wallet?.accounts || [];
  const balance = wallet?.balance ?? '';
  const chainIdAsNum = wallet?.chainIdAsNum || '';
  return (
    <div className="profile">
      {wallet ? (
        <>
          <div className="profile-item">
            <span className="profile-item__key">계정 주소</span>
            {accounts.length > 0 && <span className="profile-item__value">{accounts[0]}</span>}
          </div>
          <div className="profile-item">
            <span className="profile-item__key">ETH</span>
            {balance && <span className="profile-item__value">{balance}</span>}
          </div>
          <div className="profile-item">
            <span className="profile-item__key">네트워크</span>
            {chainIdAsNum && <span className="profile-item__value">{chainIdAsNum}</span>}
          </div>
        </>
      ) : (
        <>지갑 연결 후, 이용해주세요.</>
      )}
    </div>
  );
};

export default WalletProfile;
