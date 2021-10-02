import React, { FunctionComponent, useState } from 'react';
import ReactDOM from 'react-dom';

import { LP } from '../../../core/models/lp';
import { LPActionType } from '../../../core/enums/lp';
import { titleCase } from '../../../core/utils/string.util';

export interface LPActionDialogProps {
  isShown: boolean;
  hide: () => void;
  title: string;
  lp: LP;
  lpActionType: LPActionType
}

export const LPActionDialog: FunctionComponent<LPActionDialogProps> = ({ isShown, hide, title, lp, lpActionType }) => {

  const [amount, setAmount] = useState('');
  const [hasError, setHasError] = useState(false);
  const compareAmount = lpActionType === LPActionType.Deposit ? lp.availableAmount : lp.depositedAmount;

  const change = (e: any) => {
    if (!e.target.value.length) {
      setAmount('');
    } else {
      setAmount(e.target.value);
      if (compareAmount >= parseFloat(e.target.value)) {
        setHasError(false);
      } else {
        setHasError(true);
      }
    }
  };

  const dialog = (
    <React.Fragment>
      <div className="width-300 border-radius-10 bg-color-gray-coral">
        <div className="p-15">
          <h2 className="text-primary">{ title }</h2>
        </div>
        <div className="body">
          <div className="d-flex flex-column">
            <span className="mb-5">Available { titleCase(lpActionType as string) } Amount: { compareAmount }</span>
            <input type="number" value={ amount } onChange={ (e: any) => change(e) }/>
            {
              hasError && <span className="mt-5 text-danger">Not Available</span>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(dialog, document.body) : null;
};
