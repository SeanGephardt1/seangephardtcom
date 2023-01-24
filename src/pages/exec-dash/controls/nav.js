import React from 'react';

export default class ExecNav extends React.Component
{
	constructor ( props ) 
	{
		super( props );
		return;
	};
	render()
	{
		return (
			<div className="exec-nav">
				<div>reports</div>
				<div>apps</div>
				<div>help</div>
				<div>config</div>
			</div>
		);
	};
};