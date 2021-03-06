import { LP } from '../models/lp';
import { ChipsLpType } from '../enums/lp';
import { contractAddressData } from './contract-address-data';
import { networkErrorValue } from '../utils/calculate.util';

export const seedCookChipsData: LP[] = [
  {
    type: ChipsLpType.Wbnb,
    scalingFactor: 2,
    name: 'WBNB',
    logo: './images/wbnb.png',
    description: 'Deposit fee: 1%',
    tvl: 0,
    apr: 0,
    availableAmount: networkErrorValue,
    depositedAmount: networkErrorValue,
    claimAmount: networkErrorValue,
    allowanceAmount: networkErrorValue,
    isLoading: false,
    contractAddress: contractAddressData.wbnbAddress,
    index: 0,
  },
  {
    type: ChipsLpType.Busd,
    scalingFactor: 1,
    name: 'BUSD',
    logo: './images/busd.png',
    description: 'Deposit fee: 1%',
    tvl: 0,
    apr: 0,
    availableAmount: networkErrorValue,
    depositedAmount: networkErrorValue,
    claimAmount: networkErrorValue,
    allowanceAmount: networkErrorValue,
    isLoading: false,
    contractAddress: contractAddressData.busdAddress,
    index: 1,
  },
  {
    type: ChipsLpType.Btd,
    scalingFactor: 0.5,
    name: 'BTD',
    logo: './images/btd.png',
    description: 'Deposit fee: 1%',
    tvl: 0,
    apr: 0,
    availableAmount: networkErrorValue,
    depositedAmount: networkErrorValue,
    claimAmount: networkErrorValue,
    allowanceAmount: networkErrorValue,
    isLoading: false,
    contractAddress: contractAddressData.btdAddress,
    index: 2,
  },
  {
    type: ChipsLpType.Mdo,
    scalingFactor: 0.5,
    name: 'MDO',
    logo: './images/mdo.png',
    description: 'Deposit fee: 1%',
    tvl: 0,
    apr: 0,
    availableAmount: networkErrorValue,
    depositedAmount: networkErrorValue,
    claimAmount: networkErrorValue,
    allowanceAmount: networkErrorValue,
    isLoading: false,
    contractAddress: contractAddressData.mdoAddress,
    index: 3,
  },
  {
    type: ChipsLpType.ChipsWbnb,
    scalingFactor: 99,
    name: 'CHIPS/BNB',
    logo: [
      './images/chips.png',
      './images/wbnb.png',
    ],
    description: 'Withdrawal fee: 3%',
    tvl: 0,
    apr: 0,
    availableAmount: networkErrorValue,
    depositedAmount: networkErrorValue,
    claimAmount: networkErrorValue,
    allowanceAmount: networkErrorValue,
    isLoading: false,
    contractAddress: contractAddressData.chipsWbnbLpAddress,
    index: 4,
  }
];
