//	<SimpleGridControl columns={this.Columns} data={this.Data} />

import React from 'react';
import './simple-grid.css';

export default class SimpleGridControl extends React.Component
{
	constructor( props )
	{
		super( props );
		//	console.debug( "SimpleGridControl", this.props );
		this.state = {};
		return;
	};
	OnClick_RowNavigation(ext, pe)
	{	//	console.debug( "OnClick_RowNavigation", ext );	
		let _ext_obj = {
			extension: ext,
			source: "extension",
		};
		this.props.navigateEvent( _ext_obj );
		return;
	};
	render()
	{	// console.debug( "SimpleGridControl::render()" );	//, this.props.navigateEvent );
		return (
			<div className="simple-grid-root">
				<table className="simple-grid-table" cellPadding="0" cellSpacing="0">
					<thead>
						<tr>
							{
								this.props.columns.map( ( item, index ) => (
									<td key={index}>{item}</td>
								) )
							}
						</tr>
					</thead>
					<tbody>
						{
							this.props.data.map( ( item, index ) => (
								<tr key={index} onClick={this.OnClick_RowNavigation.bind(this, item.Resource)}>
									<td>{item.Icon}</td>
									<td>{item.Name}</td>
									<td>{item.Type}</td>
									<td>{item.LastViewed}</td>
								</tr>
							) )
						}
					</tbody>
				</table>
			</div>
		);
	};
};