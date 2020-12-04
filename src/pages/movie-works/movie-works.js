import React from 'react';
import MovieStoreIcon from './movie-works-brand-icon.js';
import './movie-works.css';
import MovieWorksIcon from './movie-reel-icon.svg';
import MovieWorksAuth from './movie-works-auth.js';
import MovieWorksSearchBox from './movie-works-search.js';
import MovieStoreCard from './movie-works-card.js';

import { MoviesDatabase } from './movie-data.js';

export default class MovieStoreExtension extends React.Component
{
	static defaultProps = {
		Title: "MovieWorks Demo",
		LinkTitle: "MovieWorks Demo",
		LinkIcon: MovieWorksIcon,
		Href: "/demos/movie-works/"
	};
	constructor( props )
	{
		super( props );

		this.Title = ( this.props.Title || MovieStoreExtension.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || MovieStoreExtension.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || MovieStoreExtension.defaultProps.Href );

		//	console.debug( "MoviesDatabase", MoviesDatabase );
		this.DataSet = MoviesDatabase;

		this.state = {
			userAuthenticated: false,
			displaySearchResults: false,
			searchDirty: false
		};
		return;
	};
	OnClick_ValidateUserAuth( pe )
	{	//	console.debug( "OnClick_ValidateUserAuth", this.state.userAuthenticated );
		this.setState( { userAuthenticated: !this.state.userAuthenticated } );
		return;
	};

	// WIP -- search box functionality 
	OnClick_SearchBoxHandleEventCancelling( pe )
	{	//	
		console.debug( "OnClick_SearchBoxHandleEventCancelling" );
		pe.preventDefault();
		pe.nativeEvent.stopPropagation();
		pe.nativeEvent.preventDefault();
		pe.nativeEvent.stopImmediatePropagation();
		return;
	};
	OnFocus_ShowResultsPanel( pe )
	{	//	
		console.debug( "SearchBox::OnFocus_ShowResultsPanel" );
		//this.OnClick_SearchBoxHandleEventCancelling( pe );
		this.setState( {
			displaySearchResults: true,
		} );
		return;
    };
	OnBlur_CloseResultsPanel( pe )
	{	//	
		console.debug( "OnBlur_CloseResultsPanel" );
		//	this.OnClick_SearchBoxHandleEventCancelling( pe );
		this.setState( {
			displaySearchResults: false,
		} );
		return;
	};
	OnClick_ResultCheck( value, pe )
	{
		console.debug( "OnClick_ResultCheck", value, pe );
		this.OnClick_SearchBoxHandleEventCancelling( pe );

		//this.setState( {
		//	SearchBoxResultsDisplayed: false,
		//} );
		return;
	};

	render()
	{	//	
		console.debug( "MovieWorks.render()", this.state );
		return (
			<div className="movie-store-root">
				<div className="work-in-progress-banner">Work in progress</div>
				{
					this.state.userAuthenticated === false &&
					<MovieWorksAuth validate={this.OnClick_ValidateUserAuth.bind(this)}/>
				}

				{ this.state.userAuthenticated === true &&
					<div>
						<div className="ms-header">
							<div className="ms-header-block" tabIndex="0">
								<MovieStoreIcon />
							<div className="ms-header-block-brand-text">MovieWorks</div>
							</div>
							<div className="ms-header-block">
								<MovieWorksSearchBox
									focusEvent={this.OnFocus_ShowResultsPanel.bind( this )}
									blurEvent={this.OnBlur_CloseResultsPanel.bind(this)}
									displayResults={this.state.displaySearchResults}
									DataSet={this.DataSet} />	
							</div>
							<div className="ms-header-block">
								<div tabIndex="0"
								onClick={this.OnClick_ValidateUserAuth.bind( this )}>My Account</div>
							</div>
						</div>

						<div className="ms-toolbar" tabIndex="0">Movies / Action / Adventure</div>

						<div className="mw-body-panel">
							{
								this.DataSet.map( ( item, index ) => (
									<MovieStoreCard key={index} data={item} />
								))
							}
							</div>
					</div>
				}
			</div>
		);
	};
};