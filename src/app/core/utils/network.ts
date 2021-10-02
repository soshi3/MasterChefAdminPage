import { toast } from './notification.util';

const bscNetworkChainId = '0x4';

export const isBscNetwork = async () => {
  const { ethereum } = window;
  const chainId = await ethereum.request({ method: 'eth_chainId' });
  if (chainId !== bscNetworkChainId) {
    if (chainId !== bscNetworkChainId) {
      toast('danger', 'Please select network of MetaMask as "Binance Smart Chain"');
    }
    return false;
  }
  return true;
}
