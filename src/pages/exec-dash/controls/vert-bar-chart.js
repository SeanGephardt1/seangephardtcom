import React from 'react';
import './vert-bar-chart.css';

export default class VerticalBarChart extends React.Component
{
	constructor ( props ) 
	{
    super( props );

    this._dbg_btn_strings = [ "Resume", "Pause" ];
    this._svg_viewbox_dimensions = [ 0, 0, 1920, 1080 ];
    this._column_count = 1920 / 20;

    this.Interval = undefined;
    this.Data = [];

    for ( let i = 0; i < this._column_count; i++ )
    {
      const _h = Math.round( Math.random() * 1080 );
      const _y = 1080 - _h;
      const _x = i * 20;

      const _data = {
        w: 20,
        h: _h,
        x: _x,
        y: _y
      };
      this.Data.push( _data );
    }
    //  console.debug( 'this.Data', this.Data.length );

    this.state = {
      debug: true,
      isRunning: true,
      updated: false,
      intervalTime: 100,
      debugBtnText: this._dbg_btn_strings[ 1 ],
    };
    return;
  };

  /* custom methods */
  AppendChart( params )
  {
    console.debug( "AppendChart()", params );

    let _first = params[0].shift();

    //const _h = Math.round( Math.random() * 1080 );
    //const _y = 1080 - _h;
    //const _x = this._column_count + 20;

    //let _last = {
    //  w: 20,
    //  h: _h,
    //  x: _x,
    //  y: _y
    //};

    //params.Data.push( _data );
    if ( params[ 0 ].length > 0 )
    {
      params[ 1 ].setState( {
        updated: false
      } );
    }
    else
    {
      console.debug( "NO DATA" );
    }
    return;
  };
  OnClick_Toggle_Bar_Rendering( ev )
  {
    //  console.debug( 'OnClick_Toggle_Bar_Rendering',
    //  this.state.isRunning, 
    //  this.Interval );

    if ( this.state.isRunning === true )
    {
      console.debug( "pausing" );
      window.clearInterval( this.Interval );
      this.Interval = undefined;
      this.setState( {
        isRunning: false,
        debugBtnText: this._dbg_btn_strings[ 0 ]
      } );
    }
    else if ( this.state.isRunning === false )
    {
      console.debug( "running" );
      this.Interval = window.setInterval( this.AppendChart, this.state.intervalTime, [ this.Data, this ] );
      this.setState( {
        isRunning: true,
        debugBtnText: this._dbg_btn_strings[ 1 ]
      } );
    }
    return;
  };

  /* react lifecycle */
  componentDidMount()
  { //  console.debug( "VerticalBarChart.componentDidMount()", this );
    this.Interval = window.setInterval( this.AppendChart, this.state.intervalTime, [this.Data, this] );
    return;
  }
  componentWillUnmount()
  {
    //  console.debug( "componentWillUnmount()" );
    if ( this.Interval !== undefined )
    {
      window.clearInterval( this.Interval );
      this.Interval = undefined;
    }
    return;
  };
  componentDidUpdate()
  { //  console.debug( "componentDidUpdate()" );
    return;
  };
	render()
	{
		return (
      <div className="ed-vert-chart-panel">
        <div className="ed-vc-header">Daily mobile app downloads</div>
        <div>
          <svg
            viewBox={ this._svg_viewbox_dimensions.join(' ')  }
            className="ed-vc-svg" >
            {/*<rect*/}
            {/*  x="10" y="10"*/}
            {/*  width="320" height="240"*/}
            {/*  fill="red"*/}
            {/*  stroke="black" strokeWidth="1"*/}
            {/*/>*/}
            {
              this.Data.map( ( item, idx ) => (
                <rect
                  className="ed-vc-svg-bar"
                  key={ idx }
                  x={ item.x }
                  y={ item.y }
                  width={ item.w}
                  height={ item.h } />
                ) )
            }
          </svg>
        </div>
        {
          this.state.debug === true &&
          <div className="ed-vc-controls">
            <button
              tabIndex="0"
              className="ed-cta"
              onClick={ this.OnClick_Toggle_Bar_Rendering.bind( this ) }>{ this.state.debugBtnText }</button>
          </div>
        }
			</div>
		);
	};
};