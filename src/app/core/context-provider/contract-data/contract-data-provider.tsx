import React, { useState } from 'react';
import Web3 from 'web3';

import { ContractDataContext } from './contract-data-context';

import { MainContract } from '../../models/contract';
import { LP } from '../../models/lp';
import { ChipsSwap } from '../../models/chips-swap';
import { Bond } from '../../models/bond';
import { KeyValuePair } from '../../models/base';
import { DeepFatFryer } from '../../models/deep-fat-fryer';
import { MainContractType } from '../../enums/contract';
import { ChipsLpType, FishLpV1Type, FishLpV2Type } from '../../enums/lp';
import { seedHomeData } from '../../data/home';
import { seedCookChipsData } from '../../data/cook-chips';
import { seedCookFishData } from '../../data/cook-fish';
import { seedDeepFatFryerData } from '../../data/deep-fat-fryer';
import { seedChipsSwapData } from '../../data/chip-swap';
import { seedMpeasData } from '../../data/mpeas';
import { environment } from '../../../../environment';

export const ContractDataProvider = (props: React.PropsWithChildren<{}>) => {

  const [bscWeb3, setBscWeb3] = useState<Web3>(new Web3(new Web3.providers.HttpProvider(environment.rinkebyNetworkUrl)));
  const [isLoadingContractData, setIsLoadingContractData] = useState<boolean>(true);
  const [tvlAmount, setTvlAmount] = useState<number>(0);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [homes, setAllHomes] = useState<MainContract[]>(seedHomeData);
  const [cookChipses, setAllCookChipses] = useState<LP[]>(seedCookChipsData);
  const [cookFishes, setAllCookFishes] = useState<LP[]>(seedCookFishData);
  const [deepFatFryer, setDeepFatFryer] = useState<DeepFatFryer>(seedDeepFatFryerData);
  const [chipsSwap, setChipsSwap] = useState<ChipsSwap>(seedChipsSwapData);
  const [mpeas, setAllMpeas] = useState<Bond[]>(seedMpeasData);
  const [chipsTwapPrice, setChipsTwapPrice] = useState(0);

  const setHome = (type: MainContractType, data: KeyValuePair[] = []) => {
    const tempHomes: any[] = homes;
    let index: number = tempHomes.findIndex((item: MainContract) => item.type === type);
    if (index < 0) {
      return;
    }
    data.forEach((item: KeyValuePair) => {
      tempHomes[index][item.key] = item.value;
    });
    setAllHomes(tempHomes);
  }

  const setCookChips = (type: ChipsLpType, data: KeyValuePair[] = []) => {
    const tempCookChips: any[] = cookChipses;
    let index: number = tempCookChips.findIndex((item: LP) => item.type === type);
    if (index < 0) {
      return;
    }
    data.forEach((item: KeyValuePair) => {
      tempCookChips[index][item.key] = item.value;
    });
    setAllCookChipses(tempCookChips);
  }

  const setCookFish = (type: FishLpV1Type | FishLpV2Type, data: KeyValuePair[] = []) => {
    const tempCookFishes: any[] = cookFishes;
    let index: number = tempCookFishes.findIndex((item: LP) => item.type === type);
    if (index < 0) {
      return;
    }
    data.forEach((item: KeyValuePair) => {
      tempCookFishes[index][item.key] = item.value;
    });
    setAllCookFishes(tempCookFishes);
  }

  const setMpeas = (bond: Bond) => {
    setAllMpeas([...mpeas, bond]);
  }

  return (
    <ContractDataContext.Provider value={{
      bscWeb3,
      isLoadingContractData,
      tvlAmount,
      availableBalance,
      homes,
      cookChipses,
      cookFishes,
      deepFatFryer,
      chipsSwap,
      mpeas,
      chipsTwapPrice,
      setIsLoadingContractData,
      setTvlAmount,
      setAvailableBalance,
      setBscWeb3,
      setHome,
      setCookChips,
      setCookFish,
      setDeepFatFryer,
      setChipsSwap,
      setMpeas,
      setChipsTwapPrice
    }}>
      {props.children}
    </ContractDataContext.Provider>
  );

}
