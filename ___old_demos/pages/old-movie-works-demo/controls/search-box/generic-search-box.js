import React from 'react';
import './generic-search-box.css';
import Icon from '../svg-icons/svg-icons.js';

export default class GenericSearchBox extends React.Component
{
	constructor( props )
	{
		super( props );
		this.PlaceholderText = ( this.props.placeholdertext || "Search this form" );
		this.Handle_OnChange = this.OnChange_HandleUserQuery.bind( this, this.props.eventHandler );
		return;
	};
	OnChange_HandleUserQuery( fc, pe )
	{	//	console.debug( "OnChange_HandleUserQuery", pe.currentTarget.value );
		fc( pe.currentTarget.value.trim() );
		return;
	};
	render()
	{     
		//	console.debug( "GenericSearchBox.render()::textValue", this.props.value);
		return (
			<div className="gen-search-panel">
				<div className="gen-search-btn">
					<Icon icon={Icon.ShellIcons.Search}/>
				</div>
				<input type="text"
					className="gen-search-input"
					style={this.BackgroundIcon}
					placeholder={this.PlaceholderText}
					onChange={this.Handle_OnChange}
					/>
			</div>
		);
	};
};
