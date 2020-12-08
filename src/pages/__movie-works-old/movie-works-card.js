import React from 'react';
import './movie-works-card.css';

export default class MovieStoreCard extends React.Component
{
	static defaultProps = {
		Title: "Movie Store Card",
		LinkTitle: "Movie Store Card",
		Href: "/movie-store-card/"
	};
	constructor( props )
	{
		super( props );

		this.Title = ( this.props.Title || MovieStoreCard.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || MovieStoreCard.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || MovieStoreCard.defaultProps.Href );

		return;
	};
	render()
	{	//	console.debug( "MovieStoreCard.render()", this.props );
		return (
			<div className="movie-card" tabIndex="0">
				<div className="movie-card-image">
					<img src={this.props.data.images[0]} alt="placeholder" />
				</div>
				<div className="movie-card-title">{this.props.data.name} ({this.props.data.year})</div>
				<div className="movie-card-company-name">{this.props.data.company}</div>
				<div>Rated PG, {this.props.data.time}</div> 
			</div>
		);
	};
};