import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';

import { formatBalance, formatChainAsNum } from 'src/utils/formatter';
import { RootState } from '.';

export interface Wallet {
  accounts: any[];
  balance: string;
  chainId: string;
  chainIdAsNum?: number;
}

export interface MetakMask {
  hasProvider: boolean;
  isConnecting: boolean;
  wallet?: Wallet;
  errMsg?: string;
}

const initialState: MetakMask = {
  hasProvider: false,
  isConnecting: false,
  wallet: undefined,
  errMsg: undefined,
};

export const getProvider = createAsyncThunk('meta-mask/getProvider', async () => {
  const provider = await detectEthereumProvider({ silent: true });

  return Boolean(provider);
});

export const updateWallet = createAsyncThunk(
  'meta-mask/updateWallet',
  async ({ providedAccounts }: { providedAccounts?: any }) => {
    const accounts =
      providedAccounts || (await window.ethereum.request({ method: 'eth_accounts' }));

    if (accounts.length === 0) return;

    const balance = formatBalance(
      await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      })
    );
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    return {
      accounts,
      balance,
      chainId,
      chainIdAsNum: formatChainAsNum(chainId),
    };
  }
);

const metaMaskSlice = createSlice({
  name: 'meta-mask',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateWallet.fulfilled, (state, action) => {
      state.wallet = action.payload;
    });
    builder.addCase(getProvider.fulfilled, (state, action) => {
      state.hasProvider = action.payload;
    });
  },
});

export const selectMetaMaskWallet = (state: RootState) => state.metaMask.wallet;
export const selectHasProvider = (state: RootState) => state.metaMask.hasProvider;

export default metaMaskSlice.reducer;
