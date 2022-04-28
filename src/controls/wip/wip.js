import React from 'react';
import './wip.css';

export default class WorkInProgressControl extends React.Component
{
	constructor ( props )
	{
		super(props);
		return;
	};
	render()
	{	//	console.debug( "WIP CONTROL" );
		return (
			<div className="wip-banner">Work in Progress</div>
		);
	};
};