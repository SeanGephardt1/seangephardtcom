import React from 'react';

export default class ExecFooter extends React.Component
{
  constructor ( props ) 
  {
    super( props );
    return;
  };
  render()
  {
    return (
      <footer
        className="exec-footer">
        <div>
          <a
            tabIndex="0"
            href="../portfolio/">Back to Portfolio</a>
        </div>
        <div>&copy;&reg;&trade; { new Date().getFullYear().toString() } Executive Dashboard Demo By Sean Gephardt. All rights reserved.
        </div>
      </footer>
    );
  };
};