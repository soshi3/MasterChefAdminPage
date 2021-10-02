import { BondType } from '../enums/bond';

export interface Bond {
  type: BondType;
  logo: string[],
  leftMpeasPurchaseAmount?: number;
  leftMpeasRedeemAmount?: number;
  availableMpeasAmount?: number;
}
