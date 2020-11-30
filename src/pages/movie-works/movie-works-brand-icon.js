import React from 'react';
import './movie-works-brand-icon.css';

export default class MovieStoreIcon extends React.Component
{
	static Sizes =
		{
			Small: "mwbi-small",
			Medium: "mwbi-medium",
			Large: "mwbi-large"
		};
	constructor( props )
	{
		super( props );
		return;
	};
	render()
	{

		return (
			<div className={`mw-brand-icon-default ` + this.props.size}>
			<svg version="1.1" 
				 xmlns="http://www.w3.org/2000/svg" 
				 xmlnsXlink="http://www.w3.org/1999/xlink" 
				 xmlSpace="preserve"
				 x="0px" y="0px" 
				 viewBox="0 0 1000 1000" 
				 enableBackground="new 0 0 1000 1000" 
				 >
			<path d="M899.4,411c10.8,68-35.7,131.9-103.6,142.7c-68.1,10.7-132-35.6-142.8-103.7c-10.7-68.1,35.7-131.9,103.7-142.7C824.7,296.5,888.7,343,899.4,411z M731.4,838.2c-57.9,37.6-135,21-172.6-36.7c-37.4-57.8-21.2-134.9,36.7-172.5c57.7-37.6,135-21.1,172.5,36.7C805.5,723.4,789,800.7,731.4,838.2L731.4,838.2z M433.8,500c0-36.6,29.6-66.1,66.2-66.1c36.6,0,66.2,29.5,66.2,66.1c0,36.7-29.6,66.2-66.2,66.2C463.4,566.2,433.8,536.6,433.8,500z M420.1,826.3c-51.2,46-130,42-176.1-9.2c-46.1-51.3-42-130.1,9.1-176.2c51.3-46.1,130.1-42,176.2,9.2C475.4,701.3,471.2,780.2,420.1,826.3L420.1,826.3z M109.9,379.8c28-63,101.7-91.2,164.6-63.2c62.9,28,91.1,101.7,63.3,164.6c-28,63-101.8,91.2-164.8,63.2C110.2,516.4,81.8,442.7,109.9,379.8z M500,104.1c69,0,124.8,55.8,124.8,124.7c0,68.9-55.8,124.8-124.8,124.8c-68.8,0-124.7-55.8-124.7-124.8C375.3,159.9,431.2,104.1,500,104.1z M500,10C229.4,10,10,229.4,10,500.1c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10"/>
				</svg>
			</div>
		);
	};
};