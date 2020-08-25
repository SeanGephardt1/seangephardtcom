import React from 'react';
import MovieStoreIcon from './movie-works-brand-icon.js';
import './movie-works.css';
import MovieWorksSearchBox from './movie-works-search.js';
import { MoviesDatabase } from './movie-data.js';

export class MovieStoreExtension extends React.Component
{
	static defaultProps = {
		Title: "Movie Store",
		LinkTitle: "Movie Store",
		Href: "/movie-store/"
	};
	constructor( props )
	{
		super( props );

		this.Title = ( this.props.Title || MovieStoreExtension.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || MovieStoreExtension.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || MovieStoreExtension.defaultProps.Href );

		//	console.debug( "MoviesDatabase", MoviesDatabase );
		this.DataSet = MoviesDatabase;
		return;
	};
	render()
	{	//	console.debug( "MovieWorks.render()", this.state );
		return (
			<div className="movie-store-root">
				<div className="ms-header">
					<div className="ms-header-block">
						<MovieStoreIcon />
						<div>Movie Works</div>
					</div>
					<div className="ms-header-block">
						<MovieWorksSearchBox />	
					</div>
					<div className="ms-header-block">
						<div>My Account</div>
					</div>
				</div>

				<div className="ms-toolbar">Movies / Action / Adventure</div>

				<div className="ms-body-panel">
					{
						this.DataSet.map( ( item, index ) => (
							<div key={index} className="movie-card">
								<div className="movie-card-image">
									<img src={item.images[0]} alt="placeholder" />
								</div>
								<div className="movie-card-title">{item.name} ({item.year})</div>
								<div className="movie-card-company-name">{item.company}</div>
								<div>Rated PG, {item.time}</div>
							</div>
						))
					}
				</div>
			</div>
		);
	};
};