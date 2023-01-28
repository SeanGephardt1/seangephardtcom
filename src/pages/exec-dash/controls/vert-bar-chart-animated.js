import React from 'react';
import './vert-bar-chart.css';

export default class VerticalBarChart extends React.Component
{
	constructor ( props ) 
	{
    super( props );

    this._dbg_btn_strings = [ "Resume", "Pause", "Ended" ];
    this._svg_viewbox_dimensions = [ 0, 0, 1920, 1080 ];
    this._column_count = 1920 / 30;

    this.AnimationID = undefined;
    this.FrameCount = 0;
    this.FrameMax = 30;
    this.Data = this.Init_Data();

    this.state = {
      debug: true,
      isRunning: true,
      updated: false,
      debugBtnText: this._dbg_btn_strings[ 1 ],
    };
    return;
  };

  /* custom methods */
  Init_Data()
  { //  
    console.debug( "Init_data", this._column_count );
    let _tmp = [];

    for ( let i = 0; i < this._column_count; i++ )
    {
      const _h = Math.round( Math.random() * 1080 );
      const _y = 1080 - _h;
      const _x = i * 30;
      const _t = new Intl.NumberFormat( 'en-us', { style: 'currency', currency: 'USD' } ).format( ( _h * 1000 ) );


      let _d = new Date();
      //  console.debug( i,"_d", _d );
      _d.setHours( _d.getHours() - i );
      console.debug( i,"_d", _d );
      let _title = _d.setHours( i );

      const _data = {
        title: _title,
        total: _t,
        w: 30,
        h: _h,
        x: _x,
        y: _y
      };
      _tmp.push( _data );

      //  console.debug( i, "_data._title", _data.title );
    }
    //  console.debug( 'this.Data', this.Data.length );
    return _tmp;
  };
  DoLogoAnimation()
  {	//	console.debug( "DoLogoAnimation()");
    if ( this.FrameCount % this.FrameMax === 0)
    {
      for ( let i = 0; i < this.Data.length; i++ )
      {
        if ( this.Data[ i + 1 ] !== undefined )
        {
          this.Data[ i ].h = this.Data[ i + 1 ].h;
          this.Data[ i ].y = this.Data[ i + 1 ].y;
        }
        else if ( this.Data[ i + 1 ] === undefined )
        {
          this.Data[ i ].h = Math.round( Math.random() * 1080 );
          this.Data[ i ].y = 1080 - this.Data[ i ].h;
        }
      }
    }

    this.FrameCount++;
    this.AnimationID = window.requestAnimationFrame( () => this.DoLogoAnimation() );
    this.setState( { updated: !this.state.updated } );
    return;
  };
  OnClick_PauseResume_Animation( ev )
  { //  console.debug( 'OnClick_PauseResume_Animation', this.state );
    if ( this.state.isRunning === false )
    {
      this.AnimationID = window.requestAnimationFrame( () => this.DoLogoAnimation() );
      this.setState( {
        isRunning: true,
        debugBtnText: this._dbg_btn_strings[ 1 ],
      } );
    }
    else if ( this.state.isRunning === true )
    {
      window.cancelAnimationFrame( this.AnimationID );
      this.setState( {
        isRunning: false,
        debugBtnText: this._dbg_btn_strings[ 0 ],
      } );
    }
    return;
  };

  /* react lifecycle */
  componentDidMount()
  { //  console.debug( "VerticalBarChart.componentDidMount()", this );
    //  this.AnimationID = window.requestAnimationFrame( () => this.DoLogoAnimation() );
    return;
  }
  componentWillUnmount()
  { //  console.debug( "componentWillUnmount()" );
    window.cancelAnimationFrame( this.AnimationID );
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
        <div className="ed-vc-header">Downloads by hour (realtime)</div>
        <div>
          <svg
            viewBox={ this._svg_viewbox_dimensions.join(' ')  }
            className="ed-vc-svg" >
            {
              /*<rect id="debug-rect" x="10" y="10" width="320" height="240" fill="red"stroke="black" strokeWidth="1"/>*/
            }
            <g id="lines">
              <line className="ed-vc-line" x1="0" x2="1920" y1="980" y2="980" />
              <line className="ed-vc-line" x1="0" x2="1920" y1="880" y2="880" />
              <line className="ed-vc-line" x1="0" x2="1920" y1="780" y2="780" />
              <line className="ed-vc-line" x1="0" x2="1920" y1="680" y2="680" />
              <line className="ed-vc-line" x1="0" x2="1920" y1="580" y2="580" />
              <line className="ed-vc-line" x1="0" x2="1920" y1="480" y2="480" />
              <line className="ed-vc-line" x1="0" x2="1920" y1="380" y2="380" />
              <line className="ed-vc-line" x1="0" x2="1920" y1="280" y2="280" />
              <line className="ed-vc-line" x1="0" x2="1920" y1="180" y2="180" />
              <line className="ed-vc-line" x1="0" x2="1920" y1="80" y2="80" />
            </g>
            <g id="bars">
            {
              this.Data.map( ( item, idx ) => (
                <rect
                  className="ed-vc-svg-bar"
                  key={ idx }
                  x={ item.x }
                  y={ item.y }
                  width={ item.w}
                  height={ item.h }>
                  <title>{ item.title }</title>
                  </rect>
                ) )
              }
            </g>
          </svg>
        </div>
        {
          this.state.debug === true &&
          <div className="ed-vc-controls">
            <button
                tabIndex="0"
                className="ed-cta"
                onClick={ this.OnClick_PauseResume_Animation.bind(this)}>{ this.state.debugBtnText }</button>
          </div>
        }
			</div>
		);
	};
};