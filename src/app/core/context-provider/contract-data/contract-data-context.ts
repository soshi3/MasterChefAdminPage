import { createContext, useContext } from 'react';
import Web3 from 'web3';

import { MainContract } from '../../models/contract';
import { LP } from '../../models/lp';
import { ChipsSwap } from '../../models/chips-swap';
import { seedChipsSwapData } from '../../data/chip-swap';
import { Bond } from '../../models/bond';
import { MainContractType } from '../../enums/contract';
import { ChipsLpType, FishLpV1Type, FishLpV2Type } from '../../enums/lp';
import { KeyValuePair } from '../../models/base';
import { DeepFatFryer } from '../../models/deep-fat-fryer';
import { seedDeepFatFryerData } from '../../data/deep-fat-fryer';
import { environment } from '../../../../environment';

export type ContractDataContextType = {
  bscWeb3: Web3;
  isLoadingContractData: boolean,
  tvlAmount: number,
  availableBalance: number;
  homes: MainContract[],
  cookChipses: LP[],
  cookFishes: LP[],
  deepFatFryer: DeepFatFryer,
  mpeas: Bond[],
  chipsSwap: ChipsSwap,
  chipsTwapPrice: number;
  setBscWeb3: (bscWeb3: Web3) => void;
  setIsLoadingContractData: (isLoadingContractData: boolean) => void;
  setTvlAmount: (amount: number) => void;
  setAvailableBalance: (balance: number) => void;
  setHome: (type: MainContractType, data: KeyValuePair[]) => void;
  setCookChips: (type: ChipsLpType, data: KeyValuePair[]) => void;
  setCookFish: (type: FishLpV1Type | FishLpV2Type, data: KeyValuePair[]) => void;
  setDeepFatFryer: (deepFatFryer: DeepFatFryer) => void;
  setChipsSwap: (chipsSwap: ChipsSwap) => void;
  setMpeas: (bond: Bond) => void;
  setChipsTwapPrice: (twapPrice: number) => void;
}

export const ContractDataContext = createContext<ContractDataContextType>({
  bscWeb3: new Web3(new Web3.providers.HttpProvider(environment.rinkebyNetworkUrl)),
  isLoadingContractData: true,
  tvlAmount: 0,
  availableBalance: 0,
  homes: [],
  cookChipses: [],
  cookFishes: [],
  deepFatFryer: seedDeepFatFryerData,
  chipsSwap: seedChipsSwapData,
  mpeas: [],
  chipsTwapPrice: 0,
  setBscWeb3: (bscWeb3: Web3) => {},
  setIsLoadingContractData: (isLoadingContractData: boolean) => {},
  setTvlAmount: (amount: number) => {},
  setAvailableBalance: (balance: number) => {},
  setHome: (type: MainContractType, data: KeyValuePair[]) => {},
  setCookChips: (type: ChipsLpType, data: KeyValuePair[]) => {},
  setCookFish: (type: FishLpV1Type | FishLpV2Type, data: KeyValuePair[]) => {},
  setDeepFatFryer: (deepFatFryer: DeepFatFryer) => {},
  setChipsSwap: (chipsSwap: ChipsSwap) => {},
  setMpeas: (bond: Bond) => {},
  setChipsTwapPrice: (twapPrice: number) => {},
});

export const useContractData = () => useContext(ContractDataContext);
