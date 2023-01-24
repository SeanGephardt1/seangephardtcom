import React from 'react';

export default class ExecHeader extends React.Component
{
  constructor ( props ) 
  {
    super( props );
    return;
  };
  /* REACT LIFECYCLE */
  componentDidMount()
  {
    //  console.debug( "componentDidMount()" );
    return;
  }
  componentDidUpdate()
  {
    //  console.debug( "componentDidUpdate()" );
    return;
  };
  componentWillUnmount()
  {
    //  console.debug( "componentWillUnmount()" );
    return;
  };
  render()
  {
    return (
      <div className="exec-header-panel">
        <div className="ehp-item ehp-brand">
          <div>branding</div>
        </div>
        <div className="ehp-item ehp-search">
          <div>search</div>
        </div>
        <div className="ehp-item ehp-tools">
          <div>tools</div>
        </div>
        <div className="ehp-item ehp-account">
          <div>account</div>
        </div>
      </div>
    );
  };
};