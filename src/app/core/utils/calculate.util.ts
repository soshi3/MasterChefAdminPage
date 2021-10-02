import Web3 from 'web3';

import { LP } from '../models/lp';
import { ChipsLpType, FishLpV1Type } from '../enums/lp';
import { RewardType } from '../enums/base';
import { chipsAbi, chipsRewardAbi, erc20Abi } from '../data/abi';
import { contractAddressData } from '../data/contract-address-data';
import { environment } from '../../../environment';

export const ethUnit = 1000000000000000000;
export const networkErrorValue: number = -1;

export function convertToEtherValue(value: number): number {
  return Number((value / ethUnit).toFixed(4)) || 0;
}

export async function getTokenRate(firstContractAddress: string, secondContractAddress: string, lpAddress: string): Promise<number> {
  try {
    const bscWeb3 = new Web3(new Web3.providers.HttpProvider(environment.rinkebyNetworkUrl));
    const firstContract = new bscWeb3.eth.Contract(chipsAbi, firstContractAddress);
    const firstTokenAmount = await firstContract.methods.balanceOf(lpAddress).call();
    const secondContract = new bscWeb3.eth.Contract(chipsAbi, secondContractAddress);
    const secondTokenAmount = await secondContract.methods.balanceOf(lpAddress).call();
    if (!secondTokenAmount || secondTokenAmount === 0) {
      return 0;
    }
    return Number(firstTokenAmount / secondTokenAmount);
  } catch (e) {
    console.log(e);
    return networkErrorValue;
  }
}

export async function getUsdPriceFromTargetToken(targetTokenAddress: string, lpAddress: string): Promise<number> {
  try {
    const targetTokenAndBnbRate = await getTokenRate(contractAddressData.wbnbAddress, targetTokenAddress, lpAddress);

    const bnbAndUsdRate = await getTokenRate(contractAddressData.busdAddress, contractAddressData.wbnbAddress, contractAddressData.wbnbBusdLpAddress);
    if (targetTokenAndBnbRate === networkErrorValue || bnbAndUsdRate === networkErrorValue) {
      return networkErrorValue;
    }
    return Number(targetTokenAndBnbRate * bnbAndUsdRate);
  } catch (e) {
    console.log(e);
    return networkErrorValue;
  }
}

export async function getEtherPriceFromTargetToken(targetTokenAddress: string, lpAddress: string): Promise<number> {
  try {
    const targetTokenAndBnbRate = await getTokenRate(contractAddressData.wbnbAddress, targetTokenAddress, lpAddress);
    const wbnbAndEtherRate = await getTokenRate(contractAddressData.ethAddress, contractAddressData.wbnbAddress, contractAddressData.wbnbEthLpAddress);
    if (targetTokenAndBnbRate === networkErrorValue || wbnbAndEtherRate === networkErrorValue) {
      return networkErrorValue;
    }
    return Number((targetTokenAndBnbRate || 0) * (wbnbAndEtherRate || 0));
  } catch (e) {
    console.log(e);
    return networkErrorValue;
  }
}

export async function getMpeasAndUsdRate(): Promise<number> {
  try {
    const usdPriceOfChips = await getUsdPriceFromTargetToken(contractAddressData.chipsAddress, contractAddressData.chipsWbnbLpAddress);
    const chipsAndMpeasRate = await getTokenRate(contractAddressData.chipsAddress, contractAddressData.mpeasAddress, contractAddressData.mpeasChipsLpAddress);
    if (usdPriceOfChips === networkErrorValue || chipsAndMpeasRate === networkErrorValue) {
      return networkErrorValue;
    }
    return usdPriceOfChips * chipsAndMpeasRate;
  } catch (e) {
    console.log(e);
    return networkErrorValue;
  }
}

export async function getMpeasAndEtherRate(): Promise<number> {
  try {
    const etherPriceOfChips = await getEtherPriceFromTargetToken(contractAddressData.chipsAddress, contractAddressData.chipsWbnbLpAddress);
    const chipsAndMpeasRate = await getTokenRate(contractAddressData.chipsAddress, contractAddressData.mpeasAddress, contractAddressData.mpeasChipsLpAddress);
    if (etherPriceOfChips === networkErrorValue || chipsAndMpeasRate === networkErrorValue) {
      return networkErrorValue;
    }
    return etherPriceOfChips * chipsAndMpeasRate;
  } catch (e) {
    console.log(e);
    return -1;
  }
}

export async function getTvlOfChips(item: LP): Promise<number> {
  try {
    const bscWeb3 = new Web3(new Web3.providers.HttpProvider(environment.rinkebyNetworkUrl));
    const contract = new bscWeb3.eth.Contract(erc20Abi, item.contractAddress);
    const depositedAmount = await contract.methods.balanceOf(contractAddressData.chipsRewardAddress).call();
    let rate = 1;
    switch (item.type) {
      case ChipsLpType.Wbnb:
        rate = await getTokenRate(contractAddressData.busdAddress, contractAddressData.wbnbAddress, contractAddressData.wbnbBusdLpAddress);
        break;
      case ChipsLpType.Mdo:
        rate = await getTokenRate(contractAddressData.busdAddress, contractAddressData.mdoAddress, contractAddressData.mdoBusdLpAddress);
        break;
      case ChipsLpType.Btd:
        rate = await getTokenRate(contractAddressData.busdAddress, contractAddressData.btdAddress, contractAddressData.btdBusdLpAddress);
        break;
      case ChipsLpType.ChipsWbnb:
        rate = await getTokenRate(contractAddressData.busdAddress, contractAddressData.wbnbAddress, contractAddressData.wbnbBusdLpAddress);
        rate *= 2;
        break;
    }
    if (rate === networkErrorValue) {
      return networkErrorValue;
    }
    return convertToEtherValue(rate * depositedAmount);
  } catch (e) {
    console.log(e);
    return networkErrorValue;
  }
}

export async function getTvlOfFish(item: LP): Promise<number> {
  try {
    const bscWeb3 = new Web3(new Web3.providers.HttpProvider(environment.rinkebyNetworkUrl));
    let contract = null;
    let depositedAmount = 0;
    let rate = 1;
    let balance = 0;
    let totalSupply = 0;
    switch (item.type) {
      case FishLpV1Type.ChipsBusd:
        contract = new bscWeb3.eth.Contract(erc20Abi, contractAddressData.busdAddress);
        depositedAmount = await contract.methods.balanceOf(item.contractAddress).call();
        contract = new bscWeb3.eth.Contract(erc20Abi, item.contractAddress);
        balance = await contract.methods.balanceOf(contractAddressData.fishRewardAddress).call();
        totalSupply = await contract.methods.totalSupply().call();
        if (totalSupply === 0) {
          return 0;
        }
        break;
      case FishLpV1Type.ChipsWbnb:
        contract = new bscWeb3.eth.Contract(erc20Abi, contractAddressData.wbnbAddress);
        depositedAmount = await contract.methods.balanceOf(item.contractAddress).call();
        contract = new bscWeb3.eth.Contract(erc20Abi, item.contractAddress);
        balance = await contract.methods.balanceOf(contractAddressData.fishRewardAddress).call();
        totalSupply = await contract.methods.totalSupply().call();
        rate = await getTokenRate(contractAddressData.busdAddress, contractAddressData.wbnbAddress, contractAddressData.wbnbBusdLpAddress);
        if (totalSupply === 0) {
          return 0;
        }
        break;
      case FishLpV1Type.FishWbnb:
        contract = new bscWeb3.eth.Contract(erc20Abi, contractAddressData.wbnbAddress);
        depositedAmount = await contract.methods.balanceOf(item.contractAddress).call();
        contract = new bscWeb3.eth.Contract(erc20Abi, item.contractAddress);
        balance = await contract.methods.balanceOf(contractAddressData.fishRewardAddress).call();
        totalSupply = await contract.methods.totalSupply().call();
        rate = await getTokenRate(contractAddressData.busdAddress, contractAddressData.wbnbAddress, contractAddressData.wbnbBusdLpAddress);
        break;
      case FishLpV1Type.ChipsBtd:
        contract = new bscWeb3.eth.Contract(erc20Abi, contractAddressData.wbnbAddress);
        depositedAmount = await contract.methods.balanceOf(item.contractAddress).call();
        contract = new bscWeb3.eth.Contract(erc20Abi, item.contractAddress);
        balance = await contract.methods.balanceOf(contractAddressData.fishRewardAddress).call();
        totalSupply = await contract.methods.totalSupply().call();
        rate = await getTokenRate(contractAddressData.busdAddress, contractAddressData.btdAddress, contractAddressData.btdBusdLpAddress);
        break;
    }
    if (rate === networkErrorValue) {
      return networkErrorValue;
    }
    return convertToEtherValue(depositedAmount * balance * 2 * rate / totalSupply);
  } catch (e) {
    console.log(e);
    return networkErrorValue;
  }
}

export async function getApr(rewardType: RewardType, lp: LP): Promise<number> {
  try {
    const bscWeb3 = new Web3(new Web3.providers.HttpProvider(environment.rinkebyNetworkUrl));
    const rewardAddress = rewardType === RewardType.Chips ? contractAddressData.chipsRewardAddress : contractAddressData.fishRewardAddress;
    const contract = new bscWeb3.eth.Contract(chipsRewardAbi, rewardAddress);
    const totalRewards = await contract.methods.totalRewards().call();
    const poolInfo = await contract.methods.poolInfo(lp.index).call();
    const totalAllocPoint = await contract.methods.totalAllocPoint().call();

    let rate: number;
    if (rewardType === RewardType.Chips) {
      rate = await getUsdPriceFromTargetToken(contractAddressData.chipsAddress, contractAddressData.chipsWbnbLpAddress);
    } else {
      rate = await getUsdPriceFromTargetToken(contractAddressData.fishAddress, contractAddressData.fishWbnbLpAddress);
    }
    if (lp.tvl === 0 || totalAllocPoint === 0) {
      return 0;
    }
    if (rate === networkErrorValue) {
      return networkErrorValue;
    }
    return Number(totalRewards * (poolInfo?.allocPoint || 0) * rate / totalAllocPoint / ethUnit);
  } catch (e) {
    console.log(e);
    return networkErrorValue;
  }
}
