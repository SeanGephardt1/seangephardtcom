import React from 'react';
import './canvas-viz.css';

export default class VizCanvasComponent extends React.Component 
{
    constructor( props )
    {
        super( props );
        this.Context = undefined;

        this.AnimationID = null;
        this.TotalCount = 0;
		this.Counter = 0;
		this.CounterMax = 180;
		this.MaxIterationCount = 1;
		this.MaxInterations = ( this.props.Iterations || 10 );

        this.state = {
			started: false,
			running: false
		};

        return;
    }
    componentDidMount()
    {   //  console.debug( "componentDidMount" );
        this.Context = this.canvas.getContext( '2d' );
        this.Context.clearRect( 0, 0, 800, 512 );
		this.AnimationID = window.requestAnimationFrame( () => this.DoLogoAnimation(this.Context) );
        return;
    }
    componentDidUpdate()
    {   //  console.debug( "componentDidUpdate", this.props );
        //  this.Context = this.canvas.getContext( '2d' );
        //  this.Context.clearRect( 0, 0, 800, 512 );
        //  this.AnimationID = window.requestAnimationFrame( () => this.DoLogoAnimation( this.Context, new Date() ) ); 
        return;
    };
	componentWillUnmount()
    {	//  console.debug( "AppLoader.componentWillUnmount()", this.AnimationID );
		window.cancelAnimationFrame( this.AnimationID );
		return;
	}
    DoLogoAnimation( thisContext )
    {	//	console.debug( "DoLogoAnimation()", this.Counter, this.CounterMax, this.MaxIterationCount, this.MaxInterations, this.TotalCount );

        if ( this.MaxIterationCount < this.MaxInterations && this.Counter === this.CounterMax )
        {   //  console.debug( "DoLogoAnimation - hitting max count" );
            this.MaxIterationCount++;
            this.Counter = 0;
        }
        else if ( this.MaxIterationCount === this.MaxInterations && this.Counter === this.CounterMax )
        {   //  console.debug( "DoLogoAnimation - STOP" );
            window.cancelAnimationFrame( this.AnimationID );
            this.MaxIterationCount = 1;
	    	this.Counter = 0;
            return;
        }

        if ( thisContext !== undefined) 
        {
            const gradTwo = thisContext.createLinearGradient( 0, 0, 0, 240 );
            gradTwo.addColorStop(1, 'rgba(0,0,0,1)');
            gradTwo.addColorStop(0, 'rgba(0,0,255,1)');

            thisContext.save();
            thisContext.clearRect( 0, 0, 300, 240 );
            thisContext.fillStyle = gradTwo;
            thisContext.fillRect( 0, 0, 300, 240 );

            // write text
            let _count_string = `${this.MaxIterationCount} of ${this.MaxInterations} : ${this.Counter + 1}`;
            let _total_string = `Total count = ${this.TotalCount + 1}`;
            //  let _foo = thisContext.measureText( _count_string );
            //  console.debug( "_foo", _foo.width );
            //  thisContext.strokeText( _count_string, 10, 10 );

            thisContext.fillStyle = 'rgba(255,255,255,1)';
            thisContext.strokeStyle = 'rgba(255,0,0,1)';
            thisContext.lineWidth = 2.0;
            thisContext.font = '28px Arial black';
            thisContext.shadowOffsetX = 2.0;
            thisContext.shadowOffsetY = 2.0;
            thisContext.shadowBlur = 2.0;
            thisContext.shadowColor = 'rgba(0,0,0,1)';
            thisContext.textAlign = 'start';
            thisContext.textBaseline = 'top';

            thisContext.fillText( _count_string, 10, 10 );
            thisContext.fillText( _total_string, 10, 40 );

            thisContext.restore();
        }
        this.Counter++;
        this.TotalCount++;
        this.AnimationID = window.requestAnimationFrame( () => this.DoLogoAnimation( thisContext ) );
		return;
	};
    render()
    {
        return (
            <div>
             <canvas
                className="viz-canvas"
                width={300}
                height={240}
                ref={(c) => { this.canvas = c; }}
                />
             </div>
        );
    }
}