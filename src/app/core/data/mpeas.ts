import { Bond } from '../models/bond';
import { BondType } from '../enums/bond';

export const seedMpeasData: Bond[] = [
  {
    type: BondType.ChipsMpeas,
    logo: [
      './images/chips.png',
      './images/mpeas.png',
    ],
    leftMpeasPurchaseAmount: 0,
    leftMpeasRedeemAmount: 0,
    availableMpeasAmount: 0
  },
  {
    type: BondType.MpeasChips,
    logo: [
      './images/mpeas.png',
      './images/chips.png',
    ],
    leftMpeasPurchaseAmount: 0,
    leftMpeasRedeemAmount: 0,
    availableMpeasAmount: 0
  }
];
