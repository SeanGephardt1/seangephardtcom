import React from 'react';
import './svg-animations-data.css';

export default class SvgAniData extends React.Component
{
	static Animation = {
		TestAnimation: (
			<svg>
					<path fill="none" stroke="lightgrey" d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
					<circle r="5" fill="red">
						<animateMotion dur="1000ms" repeatCount="indefinite" path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
					</circle>
			</svg>
		),
		Menu: (
			<svg>
				<polygon points="60,30 90,90 30,90">
						<animateTransform attributeName="transform"
							attributeType="XML"
							type="rotate"
							from="0 60 70"
							to="360 60 70"
							dur="1s"
							repeatCount="indefinite"/>
					</polygon>
			</svg>
		),
		Menu: (
			<svg>
				<polygon points="60,30 90,90 30,90">
						<animateTransform attributeName="transform"
							attributeType="XML"
							type="rotate"
							from="0 60 70"
							to="360 60 70"
							dur="1s"
							repeatCount="indefinite"/>
					</polygon>
			</svg>
		)
	};
};