import React from 'react';

import { Header } from './header/header';
import { Footer } from './footer/footer';

export const Layout = (props: React.PropsWithChildren<{}>) => {
  return (
    <section className="d-flex flex-column">
      <Header/>
      <div className="d-flex h-100 w-100">
        { props.children }
      </div>
      {/*<Footer />*/}
    </section>
  );
}
