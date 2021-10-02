import { MainContract } from '../models/contract';
import { MainContractType } from '../enums/contract';
import { contractAddressData } from './contract-address-data';
import { networkErrorValue } from '../utils/calculate.util';

export const seedHomeData: MainContract[] = [
  {
    type: MainContractType.Chips,
    name: 'CHIPS',
    fullName: 'Chips',
    logo: './images/chips.png',
    bethPrice: 0,
    usdPrice: 0,
    circulatingSupply: 0,
    totalSupply: 0,
    selfBalance: networkErrorValue,
    color: 'primary',
    contractAddress: contractAddressData.chipsAddress,
    lpAddress: contractAddressData.chipsWbnbLpAddress,
    index: 0
  },
  {
    type: MainContractType.Fish,
    name: 'FISH',
    fullName: 'Fish',
    logo: './images/fish.png',
    bethPrice: 0,
    usdPrice: 0,
    circulatingSupply: 0,
    totalSupply: 0,
    selfBalance: networkErrorValue,
    color: 'secondary',
    contractAddress: contractAddressData.fishAddress,
    lpAddress: contractAddressData.fishWbnbLpAddress,
    index: 1
  },
  {
    type: MainContractType.Mpeas,
    name: 'Mushy Peas',
    fullName: 'MPEAS',
    logo: './images/mpeas.png',
    bethPrice: 0,
    usdPrice: 0,
    circulatingSupply: 0,
    totalSupply: 0,
    selfBalance: networkErrorValue,
    color: 'success',
    contractAddress: contractAddressData.mpeasAddress,
    lpAddress: contractAddressData.mpeasChipsLpAddress,
    index: 2
  }
];
