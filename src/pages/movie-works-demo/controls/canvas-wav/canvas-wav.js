import React from 'react';
import './canvas-wav.css';

export default class WavCanvasComponent extends React.Component 
{
    constructor( props )
    {
        super( props );
        //  console.debug( "WavCanvasComponent", props.line );
        //  this.UpdateCanvas = this.updateCanvas.bind( this );
        this.Context = undefined;
    }
    componentDidMount()
    {   //  console.debug( "componentDidMount", this.props.line );
        this.Context = this.canvas.getContext( '2d' );
        this.Context.clearRect( 0, 0, 800, 512 );
        this.Paint( this.Context, this.props.line );  
        return;
    }
    componentDidUpdate()
    {   //  console.debug( "componentDidUpdate", this.props );
        this.Context = this.canvas.getContext( '2d' );
        this.Context.clearRect( 0, 0, 800, 512 );
        this.Paint( this.Context, this.props.line );  
        return;
     };
    Paint( thisContext, val )
    {   //  console.debug( "Paint", val );
        if ( thisContext !== undefined) 
        {
            const _col_width = 12;
            const _col_space = _col_width - 2;
            const _height = thisContext.canvas.height;
            const _num_columns = thisContext.canvas.width / _col_width;
            //  console.debug( "_num_columns", _num_columns );
            //  let array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 250, 320];
            let array = [];

            for ( let i = 0; i < _num_columns; i++ )
            {   //  console.debug( i, _num_columns, _new_val );
                let _first = i + _num_columns +  parseFloat(val);
                let _sec = (Math.random() * _num_columns ) * 3;
                let _num = Math.ceil(_first + _sec - (i + parseFloat(val)));
                array.push(_num);
            }

            //  console.debug( "array", array );
            array = array.filter( item => { return item < _height } );
            array.sort( function ( a, b )
            {
                let _rv = 0;
                if ( a > b ) { _rv = 1;}
                else if ( a < b ) { _rv = -1;}
                else if ( a === b ) { _rv = 0; }
                return _rv;
            } );
            array.reverse();
            //  console.debug( "array", array );

            const gradient = thisContext.createLinearGradient( 0, 0, 0, _height );
            gradient.addColorStop(1, '#000000');
            gradient.addColorStop(0.75, '#FF0000');
            gradient.addColorStop(0.25, '#FFFF00');
            gradient.addColorStop( 0, '#00FF00' );

            const bgGradient = thisContext.createLinearGradient( 0, 0, 0, _height );
            bgGradient.addColorStop( 0, '#000000' );
            bgGradient.addColorStop( 0.25, '#111111' );
            bgGradient.addColorStop( 0.75, '#222222' );
            bgGradient.addColorStop(1, '#009900');

            thisContext.save();
            thisContext.clearRect( 0, 0, 300, 240 );
            thisContext.fillStyle = bgGradient;

            thisContext.fillRect( 0, 0, 300, 240 );

            thisContext.fillStyle = gradient;

            for ( let i = 0; i < ( array.length ); i++ ) 
            {   // void ctx.fillRect(x, y, width, height);
                //  console.debug( "array[i]", array[i] );
                thisContext.fillRect( i * _col_width, _height, _col_space, array[i] * -2 );
            }
            thisContext.restore();
        }
        return;
    }
    render()
    {
        return (
             <canvas
                className="wav-canvas"
                width={300}
                height={240}
                ref={(c) => { this.canvas = c; }}
              />
        );
    }
}