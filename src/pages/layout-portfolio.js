import React from 'react';
import { Outlet } from "react-router-dom";

export default class PortfolioLayoutPage extends React.Component
{
  constructor ( props )
  {
    super( props );
    return;
  };
  render()
  {
    //  console.debug( "PortfolioLayoutPage.render()", React.version );
    return (
      <Outlet />
    );
  }
};