import React from 'react';
import './lorum-ipsum.css';

export default class LorumContextPanel extends React.Component
{
	constructor( props )
	{
		super( props );
        return;
	};
	render()
	{	
		let _panel_style;

		if ( this.props.contextPanelStyle === true )
		{
			_panel_style = "content-lorum-ipsum-context-panel";
		}
		else if ( this.props.contextPanelStyle === undefined || this.props.contextPanelStyle === false )
		{
			_panel_style = "content-lorum-ipsum-panel";
		}

		return (
			<div className={_panel_style}>
				<h1>Header level 1</h1>
				<h2>Header Level 2</h2>
				<h3>Header Level 3</h3>
				<h4>Header Level 4</h4>
				<h5>Header Level 5</h5>
				<h6>Header Level 6</h6>

				<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="https://portal.azure.com">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

				<table className="demo-table" cellPadding="0" cellSpacing="0">
					<thead>
						<tr>
							<td>Name&uarr;&darr;</td>
							<td>Name&uarr;&darr;</td>
							<td>Name&uarr;&darr;</td>
							<td>Name&uarr;&darr;</td>
							<td>Name&uarr;&darr;</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
						</tr>
						<tr>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
						</tr>
						<tr>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
						</tr>
						<tr>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
						</tr>
						<tr>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
							<td>Value</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td colSpan="5">Copyright &copy; 2020 Microsoft Corporation</td>
						</tr>
					</tfoot>
				</table>

				<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="https://portal.azure.com">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

				<ol>
					<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
					<li>Aliquam tincidunt mauris eu risus.</li>
					<li>Aliquam tincidunt mauris eu risus.</li>
					<ol>
						<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
						<li>Aliquam tincidunt mauris eu risus.</li>
						<li>Aliquam tincidunt mauris eu risus.</li>
						<ol>
							<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
							<li>Aliquam tincidunt mauris eu risus.</li>
							<li>Aliquam tincidunt mauris eu risus.</li>
						</ol>
					</ol>
				</ol>

				<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="https://portal.azure.com">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

				<ul>
					<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
					<li>Aliquam tincidunt mauris eu risus.</li>
					<li>Aliquam tincidunt mauris eu risus.</li>
					<ul>
						<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
						<li>Aliquam tincidunt mauris eu risus.</li>
						<li>Aliquam tincidunt mauris eu risus.</li>
						<ul>
							<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
							<li>Aliquam tincidunt mauris eu risus.</li>
							<li>Aliquam tincidunt mauris eu risus.</li>
						</ul>
					</ul>
				</ul>

			</div>
		);
	};
};
export
{
	LorumContextPanel as LorumContent
};