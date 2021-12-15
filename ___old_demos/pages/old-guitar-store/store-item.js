import React from 'react';
import { GuitarStoreDemoJSONData } from './guitar-store-json-data.js';
import { NavLink } from "react-router-dom";
import './guitar-store.css';
import './store-item.css';

export class StoreItemExtension extends React.Component
{
	//	static contextType = AzureThemeContext;
	//	static defaultProps = {
	//	Title: "Store Item Title",
	//	LinkTitle: "Store Item Link Title",
	//	Href: "/guitar-name/",
	//};
	constructor( props )
	{
		super( props );
		//	console.debug( "StoreItemExtension:this.props", this.props );

		let _item_id = parseInt( this.props.match.params.id );
		if ( isNaN( _item_id ) === true )
		{
			return;
		}
		if ( _item_id === 0 )
		{
			_item_id = 1;
		}

		const _previousPage= ( this.props.history.location.state || this.props.location.state );
		//	console.debug( "_previousPage:", _previousPage );

		this.BackLink = "/guitars/1";

		if ( _previousPage !== undefined )
		{
			if ( _previousPage.prevPage !== undefined )
			{
				if ( _previousPage.prevPage.length > 0 )
				{
					this.BackLink = _previousPage.prevPage;
				}
			}
		}
		//	console.debug( "this.BackLink", this.BackLink );

		this.Data = GuitarStoreDemoJSONData.filter( function ( item )
		{	//	console.debug( "filter", item.guid, item.key, item.brandName, _page_path.id );
			return item.key === parseInt(_item_id);
		} );
		//	console.debug( "StoreItemExtension:cotr:this.Data", this.Data[0]);

		this.Title = `${this.Data[0].yearMade} ${this.Data[0].brandName} ${this.Data[0].model}, ${this.Data[0].modelColor}`;
		this.Images = this.Data[0].images;

		this.CurrentPictureIndex = 0;
		this.CurrentPicture = this.Images[this.CurrentPictureIndex];

		this.state = {
			pictureChanged: false,
			slideShowDisplayed: "none",
			previousPage: null
		};
		return;
	};
	OnClick_SwapPicture( img, index, se )
	{	//	console.debug( "OnClick_SwapPicture", img, index );
		this.CurrentPictureIndex = index;
		this.CurrentPicture = this.Images[this.CurrentPictureIndex];
		this.setState( { pictureChanged: !this.state.pictureChanged } );
		return;
	};
	OnClick_OpenSlideShow( se )
	{	//	console.debug( "OnClick_OpenSlideShow", this.CurrentPictureIndex, this.CurrentPicture );
		this.setState( {slideShowDisplayed: "block"} );
		return;
	};
	OnClick_CloseSlideShow( se )
	{	//	console.debug( "OnClick_OpenSlideShow", this.CurrentPictureIndex, this.CurrentPicture );
		this.setState( {slideShowDisplayed: "none"} );
		return;
	};
	render()
	{	//	console.debug( "StoreItemExtension.render()" );
		return (
			<div className="page-main">
				<div className="page-block">
					<NavLink
						tabIndex="0"
						to={this.BackLink}
						className="store-item-back-button">
							<span>&larr;</span>
							<span>Back to results</span>
					</NavLink>

					<div className="store-item-header-title">{this.Title}</div>

					<div className="store-item-content-panel">

						<div className="store-item-images-panel">

								<div className="store-image-gallery-main" onClick={this.OnClick_OpenSlideShow.bind( this )}>
									<img
										className="store-image-viewer"
										src={this.CurrentPicture}
										alt={this.Title}
										title={this.Title} />
								</div>

								<div className="store-image-gallery-slider">
									{
										this.Images.map( ( item, index ) => (
											<img
												key={index}
												className="store-image-gallery-thumbnail"
												src={item}
												alt={this.Title}
												title={this.Title}
												onClick={this.OnClick_SwapPicture.bind( this, item, index )}
											/>
										) )
									}
								</div>
							</div>

						<div className="store-item-content-window">
								<h1>HTML Ipsum Presents</h1>

								<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="index.html">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

								<h2>Header Level 2</h2>

								<ol>
									<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
									<li>Aliquam tincidunt mauris eu risus.</li>
								</ol>

								<blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>

								<h3>Header Level 3</h3>

								<ul>
									<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
									<li>Aliquam tincidunt mauris eu risus.</li>
								</ul>
							</div>

					</div>

				</div>

				<div className="portfolio-modal-overlay"
					title="click anywhere to close"
					onClick={this.OnClick_CloseSlideShow.bind( this )}
					style={{ display: this.state.slideShowDisplayed }}>
					<img
						className="portfolio-modal-image"
						src={this.CurrentPicture}
						alt={this.Title}
						title={this.Title} />
					<div className="portfolio-modal-text" title={this.Title}>{this.Title}</div>
				</div>
			</div>
		);
	};
};