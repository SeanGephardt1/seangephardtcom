import React from 'react';
import './vert-bar-chart.css';
  //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

export default class VerticalBarChart extends React.Component
{
	constructor ( props ) 
	{
    super( props );

    this._cr = "\n";
    this._app_os = [ "iOS", "macOS", "Android", "Windows" ];
    this._dbg_btn_strings = [ "Resume", "Pause", "Ended" ];
    this._svg_viewbox_dimensions = [ 0, 0, 1920, 1080 ];
    this._section_count = 72;
    this._price_per_unit = 100;
    this.Data = [];
    this.Data = this.Init_Data();

    this.state = {
      selected: undefined,
      selectedKey: undefined,
      selectedSubKey: undefined,
      pageIndex: 0
    };
    return;
  };

  /* custom methods */
  Format_Date( i )
  { //  console.debug( "Compute_Date", i );
    const _options = { dateStyle: 'short', timeStyle: 'short', hour12: true };

    let _d = new Date();
    _d.setMinutes( 0 );
    _d.setSeconds( 0 );
    _d.setMilliseconds( 0 );
    _d.setHours( _d.getHours() - ( this._section_count - i ) );

    const _date_time_stamp = new Intl.DateTimeFormat( 'en-US', _options ).format(_d);
    return _date_time_stamp;
  };
  Init_Data()
  { //  console.debug( "Init_data");
    let _tmp = [];

    // set data
    for ( let i = 0; i < this._section_count; i++ )
    {
      const _title = "Company X Super-rator application";
      const _date = this.Format_Date( i );

      let _data = {
        date: _date,
        title: _title,
        totalUnits: 0,
        totalSales: 0,
        platforms: []
      };

      for ( let j = 0; j < this._app_os.length; j++ )
      {
        const _h = Math.round( Math.random() * 1080 );
        const _y = 1080 - _h;
        //  const _x = i * 30;
        const _x = ( i * 20 * this._app_os.length ) + ( j * 20 );
        const _u = _h;
        const _s = ( _h * this._price_per_unit );

        let _platform = {
          name: this._app_os[ j ],
          units: _u,
          sales: _s,
          w: 20,
          h: _h,
          x: _x,
          y: _y
        };
          _data.platforms.push( _platform );
      }

      _tmp.push( _data );
      //  console.debug( i, "_data", _data );
    }

    // append aggregate totals
    for ( let i = 0; i < _tmp.length; i++ )
    {
      for ( let k = 0; k < _tmp[ i ].platforms.length; k++ )
      {
        //  console.debug( _tmp[ i ].platforms[ k ].units, _tmp[ i ].platforms[ k ].sales );
        _tmp[ i ].totalUnits += _tmp[ i ].platforms[ k ].units;
        _tmp[ i ].totalSales += parseInt(_tmp[ i ].platforms[ k ].sales);
      }
    }

    //  console.debug( "_tmp.length ", _tmp.length );
    return _tmp;
  };

  OnClick_Select_Bar_Data( idx, idx2, ev )
  { //  console.debug( 'OnClick_Select_Bar_Data', idx, idx2 );
    this.setState( {
      selected: this.Data[ idx ],
      selectedKey: idx,
      selectedSubKey: idx2
    } );
    return;
  };
  OnClick_PageLeft( ev )
  {
    console.debug( 'OnClick_PageLeft' );
    return;
  };
  OnClick_PageRight( ev )
  {
    console.debug( 'OnClick_PageRight' );
    return;
  };

  /* react lifecycle */
  componentDidMount()
  { //  console.debug( "VerticalBarChart.componentDidMount()", this );
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
        // MOVE FORMATTING TO RENDERING
       // const _s = new Intl.NumberFormat( 'en-us', { style: 'currency', currency: 'USD' } ).format( ( _h * this._price_per_unit ) );

    //                       className={ this.state.selectedKey === idx ? "ed-vc-svg-bar-selected" : "ed-vc-svg-bar" }
    //onClick={ this.OnClick_Select_Bar_Data.bind( this, idx ) }
		return (
      <div className="ed-vert-chart-panel">
        <div className="ed-vc-header">Application downloads (72 hours)</div>
        <div>
          <svg
            viewBox={ this._svg_viewbox_dimensions.join(' ')  }
            className="ed-vc-svg" >
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

            <g id="bar-group">
            {
                this.Data.map( ( item, idx ) => (
                  <g key={ idx } id="bars" datacount={ idx }>
                    {
                      item.platforms.map( ( p, idx2 ) => (
                        <rect
                          key={ idx2 }
                          tabIndex="0"
                          className={ "ed-vc-svg-bar legend-col-" + idx2 }
                          x={ p.x }
                          y={ p.y }
                          width={ p.w }
                          height={ p.h }
                          onClick={ this.OnClick_Select_Bar_Data.bind( this, idx, idx2 ) }
                        >
                          <title>
                            { item.date + this._cr }
                            { item.title + this._cr }
                            { p.name + this._cr }
                            { p.sales + this._cr }
                            { p.units + this._cr }
                          </title>
                        </rect>
                        ) )
                    }
                 </g>
               ) )
              }
            </g>

            <g id="legend">
              <rect x="10" y="10" width="850" height="50" className="ed-vc-legend-bg"></rect>
              <rect x="30" y="20" width="30" height="30" className="legend-col-0"></rect>
              <text className="ed-vc-legend-text" x="80" y="48">{ this._app_os[ 0 ] }</text>
              <rect x="200" y="20" width="30" height="30" className="legend-col-1"></rect>
              <text className="ed-vc-legend-text" x="250" y="48">{ this._app_os[ 1 ] }</text>
              <rect x="420" y="20" width="30" height="30" className="legend-col-2"></rect>
              <text className="ed-vc-legend-text" x="470" y="48">{ this._app_os[ 2 ] }</text>
              <rect x="640" y="20" width="30" height="30" className="legend-col-3"></rect>
              <text className="ed-vc-legend-text" x="690" y="48">{ this._app_os[ 3 ] }</text>
            </g>
          </svg>
        </div>
        <div className="ed-vc-controls">
          <div>
            <button
              tabIndex="0"
              className="ed-vbc-cta"
              onClick={ this.OnClick_PageLeft.bind( this ) }>&lt;</button>
          </div>
          <div>
            {
              this.state.selected !== undefined &&
              <div>
                  <div>Date: <span>{ this.state.selected.date }</span></div>
                  <div>Application: <span>{ this.state.selected.title }</span></div>
                  <div>Total Sales: <span>{ Intl.NumberFormat( 'en-us', { style: 'currency', currency: 'USD' } ).format( this.state.selected.totalSales ) }</span></div>
                  <div>Total Units: <span>{ Intl.NumberFormat().format( this.state.selected.totalUnits ) }</span></div>
                  <div>Platform: <span>{ this.state.selected.platforms[ this.state.selectedSubKey ].name }</span></div>
                  <div>Sales: <span>{ Intl.NumberFormat( 'en-us', { style: 'currency', currency: 'USD' } ).format( this.state.selected.platforms[ this.state.selectedSubKey ].sales ) }</span></div>
                  <div>Units: <span>{ Intl.NumberFormat().format( this.state.selected.platforms[ this.state.selectedSubKey ].units ) }</span></div>
              </div>
            }
          </div>
          <div>
            <button
              tabIndex="0"
              className="ed-vbc-cta"
              onClick={ this.OnClick_PageRight.bind( this ) }>&gt;</button>
          </div>
          </div>
			</div>
		);
	};
};