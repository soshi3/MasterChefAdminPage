import React from 'react';
import ReactNotification from 'react-notifications-component'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import { ContractDataProvider } from './core/context-provider/contract-data/contract-data-provider';
import { WalletProvider } from './core/context-provider/wallet/wallet-provider';
import { ContractDataContext } from './core/context-provider/contract-data/contract-data-context';

import { Layout } from './layout/Layout';


import { HomePage } from './pages/home-page/home-page';

import { ROUTES } from './core/data/routes';

function App() {
  return (
    <ContractDataProvider>
      <ReactNotification/>
        <WalletProvider>
            <Router>
                <Layout>
                    <Switch>
                        <Redirect exact from='/' to={ ROUTES.home }/>
                        <Route exact path={ `/${ ROUTES.home }` } component={ HomePage }/>
                    </Switch>
                </Layout>
            </Router>
        </WalletProvider>
    </ContractDataProvider>
  );
}

export default App;
