import React from 'react';
import './hero-carousel.css';
import AxiosHero from '../../images/hero/axios-hero-01.jpg';
import BettyHero from '../../images/hero/betty-hero-01.jpg';
import BillMaherHero from '../../images/hero/bill-maher-hero-01.jpg';
import EuphoriaHero from '../../images/hero/euphoria-hero-01.jpg';
import IknowHero from '../../images/hero/i-know-hero-01.jpg';
import InsecruiteaHero from '../../images/hero/insecruitea-ep7-hero-01.jpg';
import InsecureHero from '../../images/hero/insecure-hero-01.jpg';
import ReadyOrNotHero from '../../images/hero/ready-or-not-hero-01.jpg';
import RunHero from '../../images/hero/run-hero-01.jpg';
import WatchNextHero from '../../images/hero/watchnext-hero-01.jpg';
import WereHereHero from '../../images/hero/were-here-hero-01.jpg';
import WestWorld3Hero from '../../images/hero/westworld-3-hero-01.jpg';

class HeroCarouselPanel extends React.Component
{
	constructor( props )
	{
		super( props );
		//	console.debug( "props.data", props.data );
		//	this.Data = props.data;
		this.Title = props.title;
		this.HeroData = [
			{
				id: 1,
				title: "Axios",
				subtitle: "Season 5, Epsidode 5",
				image: AxiosHero
			},
			{
				id: 2,
				title: "Betty",
				subtitle: "",
				image: BettyHero
			},
			{
				id: 3,
				title: "Real Time with Bill Maher",
				subtitle: "Season 15, Epsidode 10",
				image: BillMaherHero
			},
			{
				id: 4,
				title: "Euphoria",
				subtitle: "Season 1, Epsidode 1",
				image: EuphoriaHero
			},
			{
				id: 5,
				title: "I Know This Much Is True",
				subtitle: "Season 1, Epsidode 2",
				image: IknowHero
			},
			{
				id: 6,
				title: "Insecruitea",
				subtitle: "Season 3, Epsidode 4",
				image: InsecruiteaHero
			},
			{
				id: 7,
				title: "Insecure",
				subtitle: "Limited Series",
				image: InsecureHero
			},
			{
				id: 8,
				title: "Ready or Not",
				subtitle: "Gothic Horror",
				image: ReadyOrNotHero
			},
			{
				id: 9,
				title: "Run",
				subtitle: "Season 2, Epsidode 3",
				image: RunHero
			},
			{
				id: 10,
				title: "We're Here",
				subtitle: "Season 1",
				image: WereHereHero
			},
			{
				id: 11,
				title: "Westworld",
				subtitle: "Season 1-3",
				image: WestWorld3Hero
			},
			{
				id: 12,
				title: "What to watch next",
				subtitle: "New content available",
				image: WatchNextHero
			}
		];
		this.TempHeroData = this.HeroData;

		this.state = {
			HeroArrayUpdated: false
		};

		this.SetIntervalObj = undefined;

		console.debug( "DefaultAnimation", this.HeroData, this.TempHeroData);

		this.Init_Animation();
        return;
	};
	OnClick_TestStopAnimation( se )
	{	//	console.debug( "OnClick_TestStopAnimation", this.SetIntervalObj );
		window.clearInterval( this.SetIntervalObj );
		this.SetIntervalObj = undefined;
		console.debug( "Stopping: OnClick_TestStopAnimation", this.SetIntervalObj );
		return;
	}
	Init_Animation(ev)
	{	console.debug( "Init_Animation" );
		const _self = this;
		this.SetIntervalObj = window.setInterval( _self.DefaultAnimation, 1000, this );
		return;
	};
	DefaultAnimation( _self_val )
	{
		console.debug( "DefaultAnimation", _self_val.HeroData.length, _self_val.TempHeroData.length );

		let _first_card = _self_val.TempHeroData.slice( 0, 1 );
		console.debug( "_first_card", _first_card.length);

		let _new_arr = _self_val.TempHeroData.slice( 1, _self_val.HeroData.length );
		console.debug( "_new_arr", _new_arr.length );

		_new_arr.push( _first_card[0] );
		console.debug( "_new_arr", _new_arr.length );

		_self_val.TempHeroData = [];
		_self_val.TempHeroData = _new_arr;
		console.debug( _self_val.TempHeroData );

		_self_val.setState( { HeroArrayUpdated: !_self_val.state.HeroArrayUpdated } );
		return;
	};
	OnClick_SlideLeft( se )
	{
		console.debug( "OnClick_SlideLeft", se );

		return;
	};
	OnClick_SlideRight( se )
	{
		console.debug( "OnClick_SlideRight", se );

		return;
	};
	render()
	{
		//	console.debug( "this.HeroData", this.HeroData.length );
		return (
			<div className="hero-carousel-panel" onClick={this.OnClick_TestStopAnimation.bind(this)}>

				<div className="hero-content-panel">
					{
						this.TempHeroData.map( ( item, index ) => (
							<div key={index} className="hero-card-panel" style={{ 'backgroundImage': `url(${item.image})` }}>
								<div className="silder-feature-panel">Play</div>
								<div className="silder-feature-panel">Add</div>
								<div className="hero-card-title">{index} {item.id} {item.title}</div>
								<div className="hero-card-subtitle">{item.subtitle}</div>
							</div>							
						) )
					}
				</div>
				
				<div className="hero-control-overlay-panel">
					<div className="slider-button-panel" onClick={this.OnClick_SlideLeft.bind(this)}>
						<div className="slider-button">&larr;</div>
					</div>
					<div className="slider-center-column"></div>
					<div className="slider-button-panel slider-button-right" onClick={this.OnClick_SlideRight.bind(this)}>
						<div className="slider-button">&rarr;</div>
					</div>
				</div>
				
			</div>	
		);
	};
};
export
{
	HeroCarouselPanel as HeroCarousel
};