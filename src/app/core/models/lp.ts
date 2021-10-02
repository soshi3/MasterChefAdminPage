import { ChipsLpType, FishLpV1Type, FishLpV2Type } from '../enums/lp';

export interface LP {
  type?: ChipsLpType | FishLpV1Type | FishLpV2Type;
  name: string;
  logo: string | string[];
  scalingFactor: number;
  description?: string;
  tvl: number;
  apr: number;
  availableAmount: number;
  depositedAmount: number;
  claimAmount: number;
  allowanceAmount: number;
  isLoading: boolean;
  contractAddress?: string;
  index?: number;
}
