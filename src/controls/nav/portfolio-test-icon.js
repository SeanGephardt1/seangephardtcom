import React from 'react';

export default class PortfolioTestSvgIcon extends React.Component
{
  constructor ( props )
  {
    super( props );
    this.state = {
      debug: false,
    };
    return;
  };
  render()
  {
    return (
      <svg
        width="250"
        height="250"
        viewBox="0 0 500 500">
        <rect x="0" y="0" width="100%" height="100%" fill="rgba(48,0,0,1)" />
      </svg>
    );
  };
};