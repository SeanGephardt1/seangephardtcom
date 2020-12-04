import React from 'react';
import './fabric-app-loader-spinner.css';
import { SvgIconControl as SvgIcon } from "../svg-icons/svg-icons.js";
//	import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { AzureProgessSpinner } from "./azure-spinner.js";

class FabricSpinnerAppLoaderControl extends React.Component
{
	constructor( props )
	{
		super( props );
		//	console.debug( "FabricSpinnerAppLoaderControl.ctor()", props );
		this.state = {
			//started: false,
			//running: false,
			leftValue: [],
			rightValue: []
		};

		this.animationData = {
			Left: [
				// first ani -- 11 steps
				["0 0", "0 0", "0 0", "0 0", "0 0"],
				["260 56", "200 140", "257 68", "257 68"],
				["261 56", "190 140", "180 160", "252 108"],
				["262 56", "170 146", "150 188", "242 142"],
				["262 56", "174 146", "134 226", "222 196"],
				["264 56", "170 150", "114 250", "210 230"],
				["264 56", "170 150", "100 290", "200 280"],
				["266 57", "160 160", "90 320", "180 316"],
				["272 57", "150 164", "60 340", "160 334"],
				["275 57", "150 166", "50 350", "150 346"],
				["280 57", "147 167", "32 360", "144 360"],
				// pause & restart - 21
				//["283 57", "146 170", "36 360", "148 360"],
				//["285 57", "144 172", "34 364", "156 362"],
				//["286 57", "138 174", "32 366", "156 362"],
				//["288 58", "134 176", "30 368", "160 360"],
				//["289 59", "130 178", "34 369", "168 356"],
				//["289 59", "128 180", "38 369", "172 354"],
				//["290 60", "126 180", "42 370", "180 350"],
				//["290 61", "122 182", "44 370", "184 348"],
				//["291 61", "121 184", "48 371", "196 344"],
				//["291 63", "120 185", "52 371", "200 344"],
				//["291 64", "122 185", "55 372", "210 340"],
				//["291 65", "123 186", "60 372", "215 339"],
				//["292 66", "124 186", "66 372", "212 338"],
				//["262 122", "140 188", "90 364", "224 334"],
				//["260 174", "166 198", "120 362", "234 332"],
				//["262 240", "168 280", "144 362", "244 332"],
				//["270 280", "180 320", "180 362", "268 329"],
				//["314 300", "244 336", "244 362", "314 324"],
				//["340 310", "274 346", "274 358", "340 316"],
				//["360 312", "294 342", "294 350", "360 316"],
				//["0 0", "0 0", "0 0", "0 0"],
			],
			Right:
				[
					// first start -- 22 steps
					["0 0", "0 0", "0 0", "0 0", "0 0", "0 0", "0 0"],
					["250 350", "250 350", "250 350", "250 350", "250 350", "240 353", "248 353"],
					["250 350", "250 350", "250 350", "250 350", "250 350", "236 354", "248 354"],
					["240 352", "240 352", "240 352", "240 352", "240 352", "225 360", "246 358"],
					["238 352", "238 352", "238 352", "238 352", "238 352", "222 362", "246 358"],
					["238 352", "238 352", "238 352", "238 352", "238 352", "228 366", "252 360"],
					["233 353", "233 353", "233 353", "233 353", "233 353", "236 372", "262 361"],
					["230 354", "230 354", "230 354", "230 354", "230 354", "242 377", "268 362"],
					["227 355", "227 355", "227 355", "227 355", "227 355", "273 383", "284 362"],
					// star breaking out points
					["223 355", "223 355", "223 355", "330 390", "330 355", "325 345", "320 357"],
					["220 357", "220 357", "220 357", "345 390", "334 358", "325 344", "324 359"],
					["218 358", "370 390", "320 300", "318 310", "312 320", "325 359", "325 359"],
					["216 360", "380 385", "320 230", "325 280", "313 310", "342 357", "342 357"],
					["214 365", "390 385", "325 200", "325 260", "320 310", "342 361", "342 361"],
					["194 370", "400 385", "325 200", "325 260", "320 310", "342 361", "342 361"],
					["180 375", "410 387", "315 180", "290 240", "280 260", "342 361", "342 361"],
					["170 380", "420 387", "305 150", "270 220", "260 245", "342 361", "342 361"],
					["160 383", "445 388", "305 125", "258 220", "245 240", "342 361", "342 361"],
					["160 383", "445 388", "290 105", "258 200", "245 240", "342 361", "342 361"],
					["150 387", "460 389", "290 95", "252 200", "240 237", "342 361", "342 361"],
					["145 389", "470 389", "288 85", "249 200", "235 233", "342 361", "342 361"],
					["143 389", "473 392", "288 80", "234 232", "234 232", "342 361", "342 361"],
					//	pause & restart - 15 steps
					//["165 386", "185 390", "473 392", "288 80", "234 232", "342 361", "342 361"],
					//["200 381", "225 390", "473 392", "288 80", "234 232", "342 361", "342 361"],
					//["235 376", "270 390", "473 392", "288 80", "234 232", "342 361", "342 361"],
					//["282 369", "330 391", "473 392", "288 80", "234 232", "342 361", "342 361"],
					//["325 363", "425 391", "473 392", "288 80", "234 232", "342 361", "342 361"],
					//["342 361", "473 392", "473 392", "288 80", "234 232", "342 361", "342 361"],
					//// back to 4 points instead 6
					//["333 350", "460 370", "288 80", "234 232", "342 361", "342 361", "342 361"],
					//["307 320", "443 340", "288 80", "234 232", "307 320", "307 320", "307 320"],
					//["282 290", "407 280", "288 80", "234 232", "282 290", "282 290", "282 290"],
					//["282 290", "407 280", "288 80", "234 232", "282 290", "282 290", "282 290"],
					//["270 280", "371 220", "288 80", "234 232", "270 280", "270 280", "270 280"],
					//["270 280", "348 180", "288 80", "234 232", "270 280", "270 280", "270 280"],
					//["250 250", "313 120", "288 80", "234 232", "250 250", "250 250", "250 250"],
					//["240 240", "300 100", "288 80", "234 232", "240 240", "240 240", "240 240"],
					//["0 0", "0 0", "0 0", "0 0", "0 0", "0 0", "0 0"]
				]
		};

		this.AnimationID = null;
		this.IncrementCounter = 0;
		this.CounterMax = 90;
		this.MaxIterationCount = 0;
		this.MaxInterations = ( this.props.iterations || 10 );
		this.LeftCounter = 0;
		this.RightCounter = 0;
		return;
	};
	ParseAnimationData( data )
	{	//	console.debug( "ParseAnimationData", data );
		let _rv;
		if ( data !== undefined )
		{
			let _data_string = [];
			data.forEach( function ( v, i, a )
			{
				if ( i === 0 )
				{
					_data_string.push( "M" + v );
				}
				else if ( i < a.length )
				{
					_data_string.push( "L" + v );
				}

				if ( i + 1 === a.length )
				{
					_data_string.push( "Z" );
				}
				return;
			} );
			_rv = _data_string.join( " " );
			//	console.debug( "_rv", _rv );
		}
		else if ( data === undefined )
		{
			_rv = "M 0 0 Z";
		}
		return _rv;
	};
	DoLogoAnimation()
	{	//	console.debug( "DoLogoAnimation()", this.IncrementCounter, this.CounterMax );
		if ( this.IncrementCounter === this.CounterMax )
		{	//	console.debug( "DoLogoAnimation - hitting max count" );
			window.cancelAnimationFrame( this.AnimationID );
			this.IncrementCounter = 0;
			this.MaxIterationCount = 0;
			this.LeftCounter = 0;
			this.RightCounter = 0;
			this.setState( {
				started: false,
				running: false,
				//leftValue: [],
				//rightValue: []
			} );
			//	this.AnimationID = window.requestAnimationFrame( () => this.DoLogoAnimation() );

			//console.debug( "this.MaxIterationCount", this.MaxInterations, this.MaxIterationCount );
			//if ( this.MaxIterationCount === this.MaxInterations )
			//{
			//	window.cancelAnimationFrame( this.AnimationID );
			//	this.IncrementCounter = 0;
			//	this.MaxIterationCount = 0;
			//	this.LeftCounter = 0;
			//	this.RightCounter = 0;
			//	this.setState( {
			//		running: false,
			//		leftValue: [],
			//		rightValue: []
			//	} );
			//	//	this.props.stopEvent();
			//}
			return;
		}

		//	if ( ( this.IncrementCounter > 26 && this.IncrementCounter < 37 ) || ( this.IncrementCounter > 67 ) )
		if ( this.IncrementCounter > 26 && this.IncrementCounter < 37 )
		{
			this.LeftCounter = this.LeftCounter + 1;
			let _data_left = this.ParseAnimationData( this.animationData.Left[this.LeftCounter] );
			this.setState( { leftValue: _data_left } );
			//	console.debug("LeftData\t", this.IncrementCounter, _data_left);
		}

		//	if ( ( this.IncrementCounter > 18 && this.IncrementCounter < 40 ) || ( this.IncrementCounter > 70 ) )
		if ( this.IncrementCounter > 18 && this.IncrementCounter < 40 )
		{
			this.RightCounter = this.RightCounter + 1;
			let _data_right = this.ParseAnimationData( this.animationData.Right[this.RightCounter] );
			this.setState( { rightValue: _data_right } );
			//	console.debug( "RightData\t", this.IncrementCounter, _data_right );
		}

		this.IncrementCounter++;
		this.AnimationID = window.requestAnimationFrame( () => this.DoLogoAnimation() );
		return;
	};
	componentDidMount()
	{	//	console.debug( "AppLoader.componentDidMount()" );
		this.AnimationID = window.requestAnimationFrame( () => this.DoLogoAnimation() );
		return;
	}
	componentWillUnmount()
	{	//console.debug( "AppLoader.componentWillUnmount()", this.AnimationID );
		window.cancelAnimationFrame( this.AnimationID );
		return;
	}
	render()
	{	//	console.debug( "render()", this.props.config.FabricLoader );
		return (
			<div className="app-loader-panel">
				<div className="fabric-spinner-azure-logo">
					<svg viewBox="0 0 500 500" x="0px" y="0px" width="100%" height="100%" >
						<path fill="rgba(52, 144, 220, 1)" d={this.state.leftValue}></path>
						<path fill="rgba(52, 144, 220, 1)" d={this.state.rightValue}></path>
					</svg>
				</div>
				{/* if fabric prog line control is enabled in config*/}
				{
					( this.props.config.FabricLoader.ProgressLine === true && this.props.config.FabricLoader.Spinner === false ) &&
					<div className="fabric-spinner-prog-line">
						<ProgressIndicator barHeight={1} label={''} description={''} />
					</div>
				}

				{/* if fabric spinner control is enabled in config*/}
				{
					this.props.config.ShowMicrosoftLogo === true &&
					<div className="fabric-spinner-msft-logo">
						<SvgIcon icon={SvgIcon.Misc.MicrosoftLogo} />
					</div>
				}

				{/* if fabric spinner control is enabled in config - 						<Spinner size={SpinnerSize.large} /> */}
				{
					( this.props.config.FabricLoader.ProgressLine === false && this.props.config.FabricLoader.Spinner === true ) &&
					<div className="fabric-spinner-prog-circle">
						<AzureProgessSpinner size={AzureProgessSpinner.defaultProps.Sizes.Large} />
					</div>
				}

			</div>
		);
	};
};
export
{
	FabricSpinnerAppLoaderControl  as FabricLogoSpinner
};