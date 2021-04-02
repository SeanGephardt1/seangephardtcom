import React from 'react';
import './checkbox.css';
import SvgIcon from '../svg-icons/svg-icons.js';

export default class CheckBoxControl extends React.Component
{
	static States = {
		UnChecked: - 1,
		PartialChecked: 0,
		Checked: 1
	};
	constructor( props )
	{
		super( props );
		return;
	};
	render()
	{	//	console.debug( "CheckBoxControl.Render()", this.props.isChecked );
		return (
			<div className="cbx-default" >
				{
					this.props.isChecked === 1 &&
					<SvgIcon icon={SvgIcon.Misc.CheckBoxChecked} />
				}
				{
					this.props.isChecked === 0 &&
					<SvgIcon icon={SvgIcon.Misc.CheckBoxPartial} />
				}
				{
					this.props.isChecked === -1 &&
					<SvgIcon icon={SvgIcon.Misc.CheckBoxUncheckedDefault} />
				}
			</div>
		);
	};
};