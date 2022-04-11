import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './pages/pages.js';

export default class App extends React.Component
{
  constructor ( props )
  {
    super( props );
    return;
  };
  render()
  { //  console.debug( "App.render()", React.version );
    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
  }
};