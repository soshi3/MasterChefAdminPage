import { createContext, useContext } from 'react';

export type WalletContextType = {
  address: string,
  setAddress: (address: string) => void;
}

export const WalletContext = createContext<WalletContextType>({
  address: '',
  setAddress: (address: string) => {},
});

export const useWallet = () => useContext(WalletContext);
