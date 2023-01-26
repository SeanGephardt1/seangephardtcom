import React from 'react';
import './vert-bar-chart.css';

export default class VerticalBarChart extends React.Component
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
      <div className="ed-vert-chart-panel">
        <div>Daily mobile app downloads</div>
        <div>
          <svg
            viewBox="0 0 640 480"
            className="ed-vc-svg"
            >
            <rect
              x="10" y="10"
              width="320" height="240"
              fill="red"
              stroke="black" strokeWidth="1"
              />
          </svg>
        </div>
			</div>
		);
	};
};