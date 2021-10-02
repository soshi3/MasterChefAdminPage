import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useWallet } from '../../core/context-provider/wallet/wallet-context';

import { ROUTES } from '../../core/data/routes';
import { toast } from '../../core/utils/notification.util';
import { isBscNetwork } from '../../core/utils/network';
import { getLocalStorageWalletAddress, setLocalStorageWalletAddress } from '../../core/utils/wallet';

import '../layout.scss';

declare global {
  interface Window {
    ethereum: any;
  }
}

export const Header = () => {

  const { address, setAddress } = useWallet();

  const pages = [
    {
      name: 'Home',
      route: ROUTES.home
    },
    {
      name: 'Cook Chips',
      route: ROUTES.cookChips
    },
    {
      name: 'Cook Fish',
      route: ROUTES.cookFish
    },
    {
      name: 'Deep Fat Fryer',
      route: ROUTES.deepFatFryer
    },
    {
      name: 'Chips Swap',
      route: ROUTES.chipsSwap
    },
    {
      name: 'Mpeas',
      route: ROUTES.mpeas
    },
    {
      name: 'Delivery',
      route: ROUTES.delivery
    }
  ];

  const disconnectWallet = () => {
    setAddress('');
    setLocalStorageWalletAddress('').then();
  }

  const connectWallet = () => {
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch(async (err: any) => {
        setAddress('');
        setLocalStorageWalletAddress('').then();
        if (err.code === 4001) {
          toast('danger', 'Please connect to MetaMask.');
        }
      });
  }

  const handleAccountsChanged = async (accounts: any[]) => {
    if (!await isBscNetwork()) {
      setAddress('');
      setLocalStorageWalletAddress('').then();
      return;
    }
    if (!accounts || !accounts.length) {
      setAddress('');
      setLocalStorageWalletAddress('').then();
      toast('danger', 'Please connect to MetaMask.');
      return;
    }
    setAddress(accounts[0]);
    setLocalStorageWalletAddress(accounts[0]).then();
  }

  const loadWallet = async () => {
    if (!await isBscNetwork()) {
      setAddress('');
      return;
    }
    setAddress(getLocalStorageWalletAddress());
  }

  useEffect(() => {
    loadWallet().then();
  },[]);

  return (
    <div className="height-60 bg-dark">
      <div className="d-none d-lg-flex h-100">
        <div className="container h-100">
          <div className="d-flex justify-content-end h-100">
            {/*<div className="d-flex align-items-center justify-content-between flex-grow-1 mr-50">*/}
            {/*  {*/}
            {/*    pages.map((page: any, index) => (*/}
            {/*      <NavLink activeClassName="active" to={ page.route } key={ index }>*/}
            {/*        <span className="font-weight-bold">{ page.name }</span>*/}
            {/*      </NavLink>*/}
            {/*    ))*/}
            {/*  }*/}
            {/*</div>*/}
            <div className="d-flex align-items-center text-white">
              {
                address ? (
                  <button className="btn btn-primary" onClick={ () => disconnectWallet() }>Disconnect Wallet</button>
                ) : (
                  <button className="btn btn-danger" onClick={ () => connectWallet() }>Connect Wallet</button>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex d-lg-none"></div>
    </div>
  );

}
