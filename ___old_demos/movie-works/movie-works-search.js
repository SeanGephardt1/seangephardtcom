import React from 'react';
import './movie-works-search.css';

export default class MovieWorksSearchBox extends React.Component
{
	constructor( props )
	{
		super( props );
		return;
	};
	render()
	{
		//	console.debug( "search re-render(), this.props.displayResults ", this.props.displayResults );
		return (
			<div className="ms-search-panel">
				<div className="ms-sp-header">
					<input
						className="ms-search-box"
						tabIndex="0"
						type="text"
						placeholder="Search for movies, actors, directors..."
						onFocus={this.props.focusEvent			}
						onBlur={this.props.blurEvent}
					/>
				</div>
				{
					this.props.displayResults === true &&
					<div className="ms-sp-body-panel">
					{
						this.props.DataSet.map( ( item, index ) => (
							<div key={index} tabIndex="0" className="movie-search-result-card">
								<div className="movie-search-result-card-image">
									<img src={item.images[0]} alt="placeholder" />
								</div>
								<div className="movie-search-result-card-text-block">
									<div>{item.name} ({item.year})</div>
									<div>{item.company}</div>
									<div>Rated PG, {item.time}</div>
								</div>
							</div>
						))
					}
					</div>
				}
			</div>				
		);
	};
};