import React from 'react';
import ExecReportsPage from '../reports.js';
import ExecAppsPage from '../apps.js';
import ExecConfigPage from '../config.js';
import ExecHelpPage from '../help.js';

export default class ExecNav extends React.Component
{
	constructor ( props ) 
	{
		super( props );

		this.LeftNav = [
			{
				component: ExecReportsPage
			},
			{
				component: ExecAppsPage
			},
			{
				component: ExecConfigPage
			},
			{
				component: ExecHelpPage
			}
		];

		return;
	};
	render()
	{
		return (
			<div className="exec-nav">
				{
					this.LeftNav.map( (item, index ) => (
						<a
							tabIndex="0"
							key={ index }
							className="ed-nav-item"
							href={ item.component.defaultProps.Href }>{ item.component.defaultProps.LinkTitle.toString() }</a>
					) )
				}
			</div>
		);
	};
};