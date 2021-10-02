import { DeepFatFryer } from '../models/deep-fat-fryer';
import { networkErrorValue } from '../utils/calculate.util';

export const seedDeepFatFryerData: DeepFatFryer = {
  epoch: 0,
  expansionRate: 0,
  remainingTime: 0,
  twapPrice: 0,
  apr: 0,
  chipsStakedAmount: 0,
  tvl: 0,
  claimAvailableAmount: networkErrorValue,
  myStakedAmount: networkErrorValue,
  stakeAvailableAmount: 0
}
