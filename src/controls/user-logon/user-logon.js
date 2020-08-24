import React from 'react';
import Icon from './../svg-icons/svg-icon.js';
import './user-logon.css';

export default class UserLogonControl extends React.Component
{
	constructor( props )
	{	//	console.debug( "UserLogonControl.props", props );
		super( props );

		this.state = {
			userChanged: false,
		}

		//this.CurrentUser = props.currentUser;
		//this.NonUsers = props.nonUsers;
        return;
	};
	OnClick_HandleEventCancelling( pe )
	{	//	console.debug( "OnClick_HandleEventCancelling" );
		pe.stopPropagation();
		pe.nativeEvent.stopImmediatePropagation();
		return;
	};
	render()
	{	//	console.debug( "UserLogonControl::render()", this.props.visiblePanel, this.props.currentUser );
		return (
			<div className="user-logon-container-ctrl" onClick={this.OnClick_HandleEventCancelling}>
				<div className="user-info-panel" onClick={this.props.clickEvent} onKeyPress={this.props.clickEvent} tabIndex="0"						>
					<div className="user-info-text">
						<div className="user-info-text-name">{this.props.currentUser.email}</div>
						<div className="user-info-text-company">{this.props.currentUser.companyName}</div>
					</div>
					<div className="user-image">
						<Icon icon={this.props.currentUser.avatar} name={this.props.currentUser.name} />
					</div>
				</div>
				{this.props.visiblePanel === true &&
					<div className="user-account-panel">

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
	UserLogonControl as UserLogon
};