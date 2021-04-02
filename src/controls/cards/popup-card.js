import React from 'react';
import { Utilities as Utils } from "./../../js/utilities.js";
import SvgIcon from "./../../components/svg-icons/svg-icon.js";
import './popup-card.min.css';

export default class PopupCardComponent extends React.Component
{	
	constructor( props )
	{
		super( props );

		this.state = {
			isClicked: false,
			FavoritingStateToggle: false
		};

		//this._FavoriteSelectedText = "Favorited";
		//this._FavoriteNonSelectedText = "Favorite";

		return;
	};
	OnClick_ResourceFavoritingToggle( item, pe )
	{	//	console.debug( "AllServices.OnClick_ResourceFavoritingToggle", item, item.IsFavorited );
		pe.stopPropagation();
		pe.nativeEvent.stopImmediatePropagation();
		item.IsFavorited = !item.IsFavorited;
		this.setState( { FavoritingStateToggle: !this.state.FavoritingStateToggle } );
		return;
	}
	render()
	{	//	console.debug( "PopupCardComponent.render()", typeof this.props.headerData.Icon );
		return (
			<div className="asset-type-card" style={{ 'top': this.props.posTop, 'left': this.props.posLeft}}>

				<div className="card-header-panel">
					<div className="card-row-one">
						{
							typeof this.props.headerData.Icon === "object" && 
							<div className="card-row-one-icon">
								<SvgIcon icon={this.props.headerData.Icon}/>
							</div>
						}
						{
							typeof this.props.headerData.Icon === "string" && 
							<div className="card-row-one-icon" dangerouslySetInnerHTML={Utils.CreateSvgMarkup( this.props.headerData.Icon )}></div>
						}
						{
							this.props.headerData.DisplayName !== undefined &&
							<div className="card-row-one-text">{this.props.headerData.DisplayName}</div>
						}
						{
							this.props.headerData.DisplayName === undefined &&
							<div className="card-row-one-text">{this.props.headerData.Name}</div>
						}
						<div className="card-row-one-fave"
							onClick={this.OnClick_ResourceFavoritingToggle.bind( this, this.props.headerData )}>
								{
									( this.props.headerData.IsFavorited === true ) &&
									<SvgIcon icon={SvgIcon.Misc.FavoriteFilled} />
								}
								{
									( this.props.headerData.IsFavorited === false ) &&
									<SvgIcon icon={SvgIcon.Misc.FavoriteOutline} />
								}
						</div>
					</div>
					<div className="card-row-two">
						<div className="card-row-two-button">
							<div className="card-row-two-button-icon">
								<SvgIcon icon={SvgIcon.Commands.Create} />
							</div>
							<div className="card-row-two-button-text">Create</div>
						</div>
						<div className="card-row-two-button">
							<div className="card-row-two-button-icon">
								<SvgIcon icon={SvgIcon.Commands.Browse} />
							</div>
							<div className="card-row-two-button-text">Browse</div>
						</div>
					</div>
				</div>

				<div className="card-delayed-panel">

					{/* recent resources */}
					<div className="card-row-generic">
						<div className="boldedHeader">Recent resources</div>
						<div className="genericLink"><a href="index.html">Fabrikam</a><span className="genericDesc">3 days ago</span></div>
						<div className="genericLink"><a href="index.html">Test web app</a><span className="genericDesc">3 days ago</span></div>
						<div className="genericLink"><a href="index.html">Sample Publc Storage</a><span className="genericDesc">3 days ago</span></div>
					</div>

					{/* training */}
					<div className="card-row-generic">
						<div className="boldedHeader">Free training from Microsoft</div>

						<div className="gen-training-panel">
							<div className="gen-training-icon">
								<SvgIcon icon={SvgIcon.Misc.PopupCardTraining1} />
							</div>
							<div>
								<a href="index.html">Secure your Azure virtual machine disks</a>
								<div className="genericDesc2">3 units &bull; 1 hr 34 min</div>
							</div>
						</div>

						<div className="gen-training-panel">
							<div className="gen-training-icon">
								<SvgIcon icon={SvgIcon.Misc.PopupCardTrainging2} />
							</div>
							<div>
								<a href="index.html">Add and size disks in Azure virtual machines</a>
								<div className="genericDesc2">3 units &bull; 1 hr 34 min</div>
							</div>
						</div>

						<div className="gen-training-panel">
							<div className="gen-training-icon">
								<SvgIcon icon={SvgIcon.Misc.PopupCardTrainging3} />
							</div>
							<div>
								<a href="index.html">Configure the network for your virtual machines</a>
								<div className="genericDesc2">3 units &bull; 1 hr 34 min</div>
							</div>
						</div>

						<div className="genericLink2"><a href="index.html">See more</a></div>
					</div>

					{/* useful links */}
					<div className="card-row-generic">
						<div className="boldedHeader">Useful links</div>

						<div className="genericLink">
							<a href="index.html">Recommendations</a>
						</div>

						<div className="genericLink">
							<a href="index.html">Azure products</a>
							<span className="external-link-svg">
								<SvgIcon icon={SvgIcon.Misc.ExternalLink} />
							</span>
						</div>

						<div className="genericLink">
							<a href="index.html">Azure latest updates</a>
							<span className="external-link-svg">
								<SvgIcon icon={SvgIcon.Misc.ExternalLink} />
							</span>
						</div>

					</div>

					{/* free offerings */}
					<div className="card-row-generic">
						<div className="boldedHeader">Free offerings</div>
						<div className="genericLink">
							<a href="index.html">Windows Virtual Machine</a>
							<div className="genericDesc2">750 hours, B1S</div>
						</div>
						<div className="genericLink">
							<a href="index.html">Linux Virtual Machine</a>
							<div className="genericDesc2">750 hours, B1S</div>
						</div>
					</div>

				</div>

			</div>
		);
	};
};
export
{
	PopupCardComponent as Card
};