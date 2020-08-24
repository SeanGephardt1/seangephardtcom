import React from 'react';
import Icon from './../svg-icons/svg-icon.js';
import './me-control.css';

export default class MicrosoftMeControl extends React.Component
{
	constructor( props )
	{	//	console.debug( "MicrosoftMeControl.props", props );
		super( props );
        return;
	};
	render()
	{	//	console.debug( "UserLogonControl::render()", this.props.panelOpen );
		return (
			<div className="me-logon-ctrl" tabIndex="0">

				{/* icon button */}
				<div className="me-logon-image"
					onClick={this.props.clickEvent}
					onKeyPress={this.props.clickEvent}>
					<Icon icon={this.props.currentUser.avatar} name={this.props.currentUser.name} />
				</div>

				{/* panel */}
				{
					( this.props.panelOpen === false ) &&
					<div className="user-account-panel-closed"></div>
				}
				{
					( this.props.panelOpen=== true ) &&
					<div className="user-account-panel-open">

						<div className="uap-company">
							<div className="uap-company-name">{this.props.currentUser.companyName}</div>
							<div className="uap-sign-in-out">Sign out</div>
						</div>

						<div className="uap-avatar">
							<div className="uap-avatar-image">
								<Icon icon={this.props.currentUser.avatar} name={this.props.currentUser.name} />
							</div>
							<div className="uap-avatar-text">
								<div className="uap-user-name">{this.props.currentUser.name}</div>
								<div className="uap-user-email">{this.props.currentUser.email}</div>
								<div className="uap-user-links">View account</div>
								<div className="uap-user-links">Switch directories</div>
							</div>
						</div>

						<div className="uap-swap-login-panel">
							{
								this.props.nonUsers.map( ( item, index ) => (
									<div className="uap-other-user" key={index}>
										<div className="uap-other-avatar">
											<Icon icon={item.avatar} />
										</div>
										<div className="uap-other-name">
											<div className="uap-other-name-co">{item.companyName}</div>
											<div className="uap-other-name-email">{item.email}</div>
										</div>
									</div>
								) )
							}
							<div className="uap-other-user">
								<div className="uap-other-avatar">
									<Icon icon={Icon.Avatars.DefaultUser} />
								</div>
								<div className="uap-other-name">
									<div className="uap-other-name-other">Sign in with a different account</div>
								</div>
							</div>
						</div>

					</div>				
				}
			</div>			
		);
	};
};
export
{
	MicrosoftMeControl as MeControl
};



//<div className="uap-company">
//	<div className="uap-company-name">{this.props.currentUser.companyName}</div>
//	<div className="uap-sign-in-out">Sign out</div>
//</div>

