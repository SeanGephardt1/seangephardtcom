import React from 'react';
import './carousel.css';

export default class SimpleCarouselPanel extends React.Component
{
	constructor( props )
	{
		super( props );
		this.Data = props.data;
		this.Title = props.title;
        return;
	};
	render()
	{	
		return (
			<div className="mw-movies-new-list-panel">

				<div className="mw-section-header">{this.Title}</div>
				<div className="mw-movies-nav-carousel">
					{
						this.Data.map( ( item, index ) => (

							<div className="mw-movie-card" key={index}>
								<div className="mw-movie-card-poster-div" style={{backgroundImage: 'url(' + item.posterurl + ')'}}>
								</div>
								<div className="mw-movie-card-text-panel">{item.title} ({item.year})</div>
								<div className="mw-movie-hover-card">{item.storyline}</div>
							</div>
							
						) )
					}
				</div>
			</div>
		);
	};
};
export
{
	SimpleCarouselPanel as Carousel
};