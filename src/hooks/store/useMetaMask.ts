import { unwrapResult } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  Wallet,
  getProvider,
  selectHasProvider,
  selectMetaMaskWallet,
  updateWallet,
} from 'src/store/metaMask';

const NETWORK_DICT = {
  ETH: '0x1',
} as const;

const getWalletAfterAlertConnectToEthNet = (wallet?: Wallet) => {
  if (!wallet) return;
  const { chainId } = wallet;
  if (chainId === NETWORK_DICT.ETH) {
    alert('이더리움 메인넷에 연결되었습니다.');
  }
  return wallet;
};

const useMetaMask = () => {
  const dispatch = useAppDispatch();
  const hasProvider = useAppSelector(selectHasProvider);
  const wallet = useAppSelector(selectMetaMaskWallet);

  const boundGetProvider = useCallback(
    () => dispatch(getProvider()).then(unwrapResult),
    [dispatch]
  );

  const boundUpdateWalletAndAccounts = useCallback(() => {
    dispatch(updateWallet({})).then(unwrapResult).then(getWalletAfterAlertConnectToEthNet);
  }, [dispatch]);

  const boundUpdateWallet = useCallback(
    (accounts: any) =>
      dispatch(updateWallet(accounts)).then(unwrapResult).then(getWalletAfterAlertConnectToEthNet),
    [dispatch]
  );

  useEffect(() => {
    if (hasProvider) {
      window.ethereum.on('accountsChanged', boundUpdateWallet);
      window.ethereum.on('chainChanged', boundUpdateWalletAndAccounts);
    }
    return () => {
      window.ethereum?.removeListener('accountsChanged', boundUpdateWallet);
      window.ethereum?.removeListener('chainChanged', boundUpdateWalletAndAccounts);
    };
  }, [boundUpdateWallet, boundUpdateWalletAndAccounts, hasProvider]);

  return {
    getProvider: boundGetProvider,
    connectWallet: boundUpdateWalletAndAccounts,
    hasProvider,
    wallet,
  };
};

export default useMetaMask;
