import React from 'react';
import './movie-works-auth.css';
import MovieStoreIcon from './movie-works-brand-icon.js';
import { MovieWorksAvatars } from './images/mw-avatar-images.js';

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
			<div className="mw-auth-panel"
				onClick={this.props.validate}>



				<div className="mw-brand-large">
					<MovieStoreIcon size={MovieStoreIcon.Sizes.Large}/>
					<div className="mw-brand-text-large">MovieWorks</div>
				</div>

				<div className="mw-auth-logon-panel">
					<div className="mw-avatar-card">
						<img src={MovieWorksAvatars[0]} alt="Alfred" />
						<div>Alfred</div>
					</div>
					<div className="mw-avatar-card">
						<img src={MovieWorksAvatars[1]} alt="Anne" />
						<div>Anne</div>
					</div>
					<div className="mw-avatar-card">
						<img src={MovieWorksAvatars[2]} alt="Chris" />
						<div>Chris</div>
					</div>
					<div className="mw-avatar-card">
						<img src={MovieWorksAvatars[3]} alt="Guest" />
						<div>Guest</div>
					</div>
				</div>

			</div>				
		);
	};
};