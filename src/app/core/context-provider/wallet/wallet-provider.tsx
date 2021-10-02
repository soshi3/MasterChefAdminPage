import React, { useState } from 'react';

import { WalletContext } from './wallet-context';

export const WalletProvider = (props: React.PropsWithChildren<{}>) => {

  const [address, setAddress] = useState<string>('');

  return (
    <WalletContext.Provider value={{ address, setAddress }}>
      { props.children }
    </WalletContext.Provider>
  );

}
