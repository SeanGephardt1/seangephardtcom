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

		this.state = {
			opened: false
		};
		return;
	};
	OnClick_Toggle_Nav(ev)
	{
		console.debug( 'OnClick_Toggle_Nav, update app state context', this.state.opened );

		this.setState( {
			opened: !this.state.opened
		} );

		return;
	};
	render()
	{
		return (
			<div className={ this.state.opened === false ? 'exec-nav nav-open' : 'exec-nav nav-closed' }>

				<div className="exec-nav-top">
					{
						this.state.opened === false &&
						this.LeftNav.map( (item, index ) => (
						<a
							tabIndex="0"
							key={ index }
								className="ed-nav-item"
								href={ item.component.defaultProps.Href }>{ item.component.defaultProps.LinkTitle.toString().toLocaleUpperCase() }</a>
					) )
					}
					{
						this.state.opened === true &&
						this.LeftNav.map( ( item, index ) => (
							<a
								tabIndex="0"
								key={ index }
								className="ed-nav-item-closed"
								href={ item.component.defaultProps.Href }
								title={ item.component.defaultProps.LinkTitle.toString() }>{ item.component.defaultProps.LinkTitle.toString().charAt( 0 ) }</a>
						) )
					}
				</div>

				<div
					tabIndex="0"
					className={ this.state.opened === false ? 'exec-nav-toggle toggle-open' : 'exec-nav-toggle toggle-closed' }
					onClick={ this.OnClick_Toggle_Nav.bind( this ) }>
					<svg className="svg-toggle" viewBox="0 0 64 64">
						{
							this.state.opened === false &&
							<>
								<line x1="0" x2="64" y1="32" y2="32" stroke="white" strokeWidth="2" />
								<line x1="0" x2="32" y1="32" y2="0" stroke="white" strokeWidth="2" />
								<line x1="0" x2="32" y1="32" y2="64" stroke="white" strokeWidth="2" />
							</>
						}
						{
							this.state.opened === true &&
							<>
								<line x1="0" x2="64" y1="32" y2="32" stroke="white" strokeWidth="2" />
								<line x1="64" x2="32" y1="32" y2="0" stroke="white" strokeWidth="2" />
								<line x1="64" x2="32" y1="32" y2="64" stroke="white" strokeWidth="2" />
							</>
						}
					</svg>
				</div>
			</div>
		);
	};
};