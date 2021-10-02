import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../core/data/routes';

import '../layout.scss';

export const Footer = () => {

  const pages = [
    {
      name: 'Docs',
      route: ROUTES.docs
    },
    {
      name: 'GitHub',
      route: ROUTES.github
    },
    {
      name: 'Twitter',
      route: ROUTES.twitter
    },
    {
      name: 'Telegram',
      route: ROUTES.telegram
    },
    {
      name: 'Medium',
      route: ROUTES.medium
    },
    {
      name: 'Discord',
      route: ROUTES.discord
    }
  ];

  return (
    <div className="height-60 bg-dark">
      <div className="d-none d-lg-flex h-100">
        <div className="container h-100">
          <div className="d-flex h-100">
            <div className="d-flex align-items-center justify-content-between flex-grow-1 mr-100">
              {
                pages.map((page: any, index) => (
                  <NavLink activeClassName="active" to={ page.route } key={ index }>
                    <span className="font-weight-bold">{ page.name }</span>
                  </NavLink>
                ))
              }
            </div>
            <div className="d-flex align-items-center font-14 text-white">
              Chip Shop.finance 2021, All rights reserved
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex d-lg-none"></div>
    </div>
  );

}
