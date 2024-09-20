import React from "react";
import "./svg-ddd.css";

export default class SvgDDD extends React.Component {
	static defaultProps = {
		Title: "Design, Develop, Deploy",
		LinkTitle: "Design, Develop, Deploy",
		Href: "/portfolio/svg-ddd",
	};
	constructor(props) {
		super(props);
		this.Title = this.props.Title || this.defaultProps.Title;
		this.LinkTitle = this.props.LinkTitle || this.defaultProps.LinkTitle;
		this.Href = this.props.Href || this.defaultProps.Href;
		document.title = this.Title;
		return;
	}

	render() {
		//  console.debug("SvgDDDComponent.render()");
		return (
			<div className="svg-ddd-root">
				<h1 className="svg-ddd-h1">SVG Design, Develop, Deploy</h1>
				<svg className="svg-ddd-svg-root" viewBox="0 0 1920 1920" height="50%" width="50%">
					<g id="debug-group">
						<line x1="0" y1="50%" x2="100%" y2="50%" stroke="black" />
						<line x1="50%" y1="0" x2="50%" y2="100%" stroke="black" />
						<circle cx="50%" cy="50%" r="50" />
					</g>

					<g id="design-group" transform="translate(100,100)">
						<svg width="512" height="399" viewBox="0 0 512 399" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M59 399L74.5 388H444L454 399H59Z" fill="#CECECE" />
							<path d="M111 388L148.579 340H366.534L402 388H111Z" fill="#E8E8E8" />
							<mask id="path-3-inside-1_1_33" fill="white">
								<path d="M0 10C0 4.47716 4.47715 0 10 0H502C507.523 0 512 4.47715 512 10V330C512 335.523 507.523 340 502 340H10C4.47715 340 0 335.523 0 330V10Z" />
							</mask>
							<path
								d="M0 10C0 4.47716 4.47715 0 10 0H502C507.523 0 512 4.47715 512 10V330C512 335.523 507.523 340 502 340H10C4.47715 340 0 335.523 0 330V10Z"
								fill="#F0F0F0"
							/>
							<path
								d="M0 0H512H0ZM512.4 330.6C512.4 336.344 507.744 341 502 341H10C4.25624 341 -0.4 336.344 -0.4 330.6L0.4 330C0.4 334.971 4.69807 339 10 339H502C507.302 339 511.6 334.971 511.6 330L512.4 330.6ZM10 341C4.25624 341 -0.4 336.344 -0.4 330.6V10.4C-0.4 4.65624 4.25624 0 10 0H10C4.69807 0 0.4 4.47715 0.4 10V330C0.4 334.971 4.69807 339 10 339L10 341ZM502 0C507.744 0 512.4 4.65624 512.4 10.4V330.6C512.4 336.344 507.744 341 502 341L502 339C507.302 339 511.6 334.971 511.6 330V10C511.6 4.47715 507.302 0 502 0H502Z"
								fill="#808080"
								mask="url(#path-3-inside-1_1_33)"
							/>
							<path
								d="M10 5H502C504.761 5 507 7.23858 507 10V299H5V10C5 7.23858 7.23857 5 10 5Z"
								fill="white"
								stroke="#002080"
								strokeWidth="10"
								strokeMiterlimit="3.8637"
							/>
							<rect x="40" y="30" width="400" height="60" fill="url(#paint0_linear_1_33)" />
							<rect x="40" y="120" width="80" height="150" fill="url(#paint1_linear_1_33)" />
							<rect x="148" y="120" width="292" height="14" fill="#00147C" />
							<rect x="148" y="154" width="292" height="14" fill="#00147C" />
							<rect x="148" y="188" width="292" height="14" fill="#00147C" />
							<rect x="148" y="222" width="292" height="14" fill="#00147C" />
							<rect x="148" y="256" width="292" height="14" fill="#00147C" />
							<defs>
								<linearGradient
									id="paint0_linear_1_33"
									x1="263.256"
									y1="60"
									x2="263.769"
									y2="60.7297"
									gradientUnits="userSpaceOnUse">
									<stop stopColor="#052DFF" />
									<stop offset="1" stopColor="#000F5E" />
								</linearGradient>
								<linearGradient
									id="paint1_linear_1_33"
									x1="84.6512"
									y1="195"
									x2="84.9213"
									y2="195.327"
									gradientUnits="userSpaceOnUse">
									<stop stopColor="#052DFF" />
									<stop offset="1" stopColor="#000F5E" />
								</linearGradient>
							</defs>
						</svg>
					</g>
				</svg>
			</div>
		);
	}
}
