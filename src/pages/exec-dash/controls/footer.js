import React from 'react';
import './exec-dash.css';

export default class ExecFooter extends React.Component
{
	constructor ( props ) 
	{
		super( props );
		return;
	};
	render()
	{
		return (
			<footer
			className="exec-footer">&copy;&reg;&trade; { new Date().getFullYear().toString() } Executive Dashboard Demo By Sean Gephardt. All rights reserved.</footer>
		);
	};
};