import { LP } from '../models/lp';
import { FishLpV1Type } from '../enums/lp';
import { contractAddressData } from './contract-address-data';
import { networkErrorValue } from '../utils/calculate.util';

export const seedCookFishData: LP[] = [
  {
    type: FishLpV1Type.ChipsBusd,
    scalingFactor: 6,
    name: 'CHIPS/BUSD',
    logo: [
      './images/chips.png',
      './images/busd.png',
    ],
    description: 'Withdraw fee: 2%',
    tvl: 0,
    apr: 0,
    availableAmount: networkErrorValue,
    depositedAmount: networkErrorValue,
    claimAmount: networkErrorValue,
    allowanceAmount: networkErrorValue,
    isLoading: false,
    contractAddress: contractAddressData.chipsBusdLpAddress,
    index: 0,
  },
  {
    type: FishLpV1Type.ChipsWbnb,
    scalingFactor: 3,
    name: 'CHIPS/WBNB',
    logo: [
      './images/chips.png',
      './images/wbnb.png',
    ],
    description: 'Withdraw fee: 2%',
    tvl: 0,
    apr: 0,
    availableAmount: networkErrorValue,
    depositedAmount: networkErrorValue,
    claimAmount: networkErrorValue,
    allowanceAmount: networkErrorValue,
    isLoading: false,
    contractAddress: contractAddressData.chipsWbnbLpAddress,
    index: 1,
  },
  {
    type: FishLpV1Type.FishWbnb,
    scalingFactor: 3,
    name: 'FISH/WBNB',
    logo: [
      './images/fish.png',
      './images/wbnb.png',
    ],
    description: 'Withdraw fee: 2%',
    tvl: 0,
    apr: 0,
    availableAmount: networkErrorValue,
    depositedAmount: networkErrorValue,
    claimAmount: networkErrorValue,
    allowanceAmount: networkErrorValue,
    isLoading: false,
    contractAddress: contractAddressData.fishWbnbLpAddress,
    index: 2,
  },
  {
    type: FishLpV1Type.ChipsBtd,
    scalingFactor: 1,
    name: 'CHIPS/BTD',
    logo: [
      './images/chips.png',
      './images/btd.png',
    ],
    description: 'Withdraw fee: 2%',
    tvl: 0,
    apr: 0,
    availableAmount: networkErrorValue,
    depositedAmount: networkErrorValue,
    claimAmount: networkErrorValue,
    allowanceAmount: networkErrorValue,
    isLoading: false,
    contractAddress: contractAddressData.chipsBtdLpAddress,
    index: 3,
  }
];
