import { MainContractType } from '../enums/contract';

export interface MainContract {
  type: MainContractType;
  name: string;
  fullName: string;
  logo: string;
  bethPrice: number;
  usdPrice: number;
  circulatingSupply: number;
  totalSupply: number;
  selfBalance: number;
  color: string;
  contractAddress: string;
  lpAddress: string;
  index: number;
}
