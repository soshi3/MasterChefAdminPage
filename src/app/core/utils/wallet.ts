import { environment } from '../../../environment';

export async function setLocalStorageWalletAddress(address: string): Promise<void> {
  await window.localStorage.setItem(environment.localStorageKeys.walletAddress, address);
}
export function getLocalStorageWalletAddress(): string {
  const address = window.localStorage.getItem(environment.localStorageKeys.walletAddress);
  return address || '';
}
