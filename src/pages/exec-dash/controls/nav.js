import React from 'react';
import ExecDashboardPage from '../dash.js';
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
				component: ExecDashboardPage
			},
			{
				component: ExecAppsPage
			},
			{
				component: ExecReportsPage
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
				<div className="exec-nav-top">
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
				<div className="exec-nav-bottom">
					<a
						tabIndex="0"
						className="ed-nav-item"
						href="../portfolio/">Back to Portfolio</a>				
				</div>
			</div>
		);
	};
};