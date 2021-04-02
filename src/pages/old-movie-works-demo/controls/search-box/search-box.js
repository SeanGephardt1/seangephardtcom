import React from 'react';
import { Utilities as Utils } from "./../../js/utilities.js";
import { DataGen } from "./../../js/data-generator.js";
import SvgIcon from "../svg-icons/svg-icons.js";
import './search-box.css';

class SearchBox extends React.Component
{
	//static defaultProps = {
	//	//	ID: Utils.NewId("sb-id")
	//};
	constructor( props )
	{
		super( props );

		this.state = {
			userText: "",
			IsRecentPanelDisplayed: false,
			IsResultsPanelDisplayed: false,
			HasFocus: false,
			IsDirty: false
		};

		this.AltTitle = "Search across the entire application";
		this.PlaceholderText = "Search resources, services and documentation";
		this.Quadrant_Title_Name = "Quadrant title";
		this.Search_Results_Num = "See more";

		this.Data = DataGen.GenerateGlobalSearchData();

		this.ServicesData = [];	//this.Data.Services;
		this.ResourcesData = [];//this.Data.Resources;
		this.MarketplaceData = [];//this.Data.Marketplace;
		this.DocsData = [];//this.Data.Documentation;
		this.ResGroupData = [];//this.Data.ResourceGroups;

		//	event handlers
		this.handle_BoxFocus = this.OnFocus_ShowResultsPanel.bind( this );
		this.handle_BoxBlur = this.OnBlur_CloseResultsPanel.bind( this );
		this.handle_UserInput = this.OnChange_FilterDataSet.bind( this );

		this.handle_StopSearchBoxStateChange = this.OnClick_SearchBoxHandleEventCancelling.bind( this );
		return;
    };
	OnClick_SearchBoxHandleEventCancelling( pe )
	{	//	console.debug( "OnClick_SearchBoxHandleEventCancelling" );
		pe.stopPropagation();
		pe.nativeEvent.stopImmediatePropagation();
		return;
	};
	OnClick_SelectResult( ev )
	{	//	console.debug( "OnClick_SelectResult", this.DataObject );
		let _self = this.ParentObject;
		window.setTimeout( function ()
		{
			let _rp = document.getElementById( _self.ResultsPanel_ID );
			_rp.className = "results-panel";
		},1000);
		return;
    };
	RefreshData( thisCtrl, resultsArray )
	{	//	console.debug( "RefreshData", resultsArray.length );
		let _rv = [];

		if (resultsArray.length > 0 )
		{
			resultsArray.forEach( function ( v, i, a )
			{	//	console.debug( i, v );
				v.srid = Utils.NewId( "search-result-id" );

				let _result = document.createElement( "div" );
				_result.className = "search-result";
				_result.setAttribute( "tabindex", "0" );
				//	_result.setAttribute( "data-srid", v.srid );

				_result.innerText = v.name;
				_result.DataObject = v;
				_result.ParentObject = thisCtrl;
				_result.addEventListener( "click", thisCtrl.OnClick_SelectResult );

				_rv.push(_result);
				return;
			} );
		}
		else
		{
			let _zero_result = document.createElement( "div" );
			_zero_result.className = "zero-result";
			_zero_result.innerText = "No results found for \"" + this.TextValue + "\"";

			_rv.push( _zero_result );
		}
		return _rv;
    };
	OnFocus_ShowResultsPanel( pe )
	{	//	console.debug( "SearchBox::OnFocus_ShowResultsPanel", pe.target.value.length );
		this.OnClick_SearchBoxHandleEventCancelling( pe );
		if ( pe.target.value.length === 0 )
		{
			this.setState( {
				IsRecentPanelDisplayed: true,
				IsResultsPanelDisplayed: false,
				HasFocus: true,
				IsDirty:false
			} );
		}
		else if ( pe.target.value.length > 0 )
		{
			this.setState( {
				IsRecentPanelDisplayed: false,
				IsResultsPanelDisplayed: true,
				HasFocus: true,
				IsDirty: true
			} );
		}
		return;
    };
	OnBlur_CloseResultsPanel( pe )
	{	//	console.debug( "OnBlur_CloseResultsPanel" );
		this.OnClick_SearchBoxHandleEventCancelling( pe );
		this.setState( {
			userText: this.state.userText,
			IsRecentPanelDisplayed: false,
			IsResultsPanelDisplayed: false,
			HasFocus: false,
			IsDirty: this.state.IsDirty
		} );
		return;
    };
	OnChange_FilterDataSet( pe )
	{	//	console.debug( "OnChange_FilterDataSet", pe.target.value );

		this.OnClick_SearchBoxHandleEventCancelling( pe );

		if ( pe.target.value.length === 0 )
		{
			this.ServicesData = this.Data.Services;
			this.ResourcesData = this.Data.Resources;
			this.MarketplaceData = this.Data.Marketplace;
			this.DocsData = this.Data.Documentation;
			this.ResGroupData = this.Data.ResourceGroups;

			this.setState( {
				userText: pe.target.value,
				IsRecentPanelDisplayed: true,
				IsResultsPanelDisplayed: false,
				HasFocus: true,
				IsDirty: false
			} );
		}
		else if ( pe.target.value.length > 0 )
		{
			let _val = pe.target.value.toLowerCase();

			//	console.debug( this.ServicesData.length );
			this.ServicesData = this.Data.Services.filter( function ( item )
			{	//	console.debug( item, _val );
				if ( item.name.toLowerCase().indexOf( _val ) !== -1 )
				{
					return item;
				}
				return undefined;
			}, _val );
			//	console.debug( this.ServicesData.length );
			this.ServicesData = this.ServicesData.slice( 0, 5 );

			//	console.debug( this.ResourcesData.length );
			this.ResourcesData = this.Data.Resources.filter( function ( item )
			{	//	console.debug( item, _val );
				if (
					item._resource_name.toLowerCase().indexOf( _val ) !== -1 ||
					item._resource_type.toLowerCase().indexOf( _val ) !== -1 ||
					item._resource_group.toLowerCase().indexOf( _val ) !== -1 ||
					item._subscription.toLowerCase().indexOf( _val ) !== -1 ||
					item._location.toLowerCase().indexOf( _val ) !== -1
				)
				{	//	console.debug( item, _val );
					return item;
				}
				return undefined; 
			}, _val );
			//	console.debug( this.ResourcesData.length );
			this.ResourcesData = this.ResourcesData.slice( 0, 5 );

			//	console.debug( this.ResourcesData.length );
			this.MarketplaceData = this.Data.Marketplace.filter( function ( item )
			{	//	console.debug( item, _val );
				if (
					item.displayName.toLowerCase().indexOf( _val ) !== -1 
				)
				{//	console.debug( item, _val );
					return item;
				}
				return undefined;
			}, _val );
			//	console.debug( this.MarketplaceData.length );
			this.MarketplaceData = this.MarketplaceData.slice( 0, 5 );

			//	console.debug( this.DocsData.length );
			this.DocsData = this.Data.Documentation.filter( function ( item )
			{	//	console.debug( item, _val );
				if (
					item.name.toLowerCase().indexOf( _val ) !== -1
				)
				{//	console.debug( item, _val );
					return item;
				}
				return undefined;
			}, _val );
			//	console.debug( this.DocsData.length );
			this.DocsData = this.DocsData.slice( 0, 5 );

			//	console.debug( this.ResGroupData.length );
			this.ResGroupData = this.Data.ResourceGroups.filter( function ( item )
			{	//	console.debug( item, _val );
				if (
					item.name.toLowerCase().indexOf( _val ) !== -1
				)
				{//	console.debug( item, _val );
					return item;
				}
				return undefined;
			}, _val );
			//	console.debug( this.ResGroupData.length );
			this.ResGroupData = this.ResGroupData.slice( 0, 5 );

			this.setState( {
				userText: pe.target.value,
				IsRecentPanelDisplayed: false,
				IsResultsPanelDisplayed: true,
				HasFocus: true,
				IsDirty: true
			} );
		}
        return;
	};
	OnClick_ClearUserQuery( pe )
	{
		this.OnClick_SearchBoxHandleEventCancelling( pe );
		this.setState( {
			userText: "",
			IsRecentPanelDisplayed: false,
			IsResultsPanelDisplayed: false,
			HasFocus: false,
			IsDirty: false
		} );
		return;
	};
	render()
	{	//	console.debug( "SearchBox.render()::", this.state.HasFocus, this.state.IsDirty );

		let _focus_class;
		if ( this.state.HasFocus === true )
		{
			_focus_class = "search-area-panel-focus";
		}
		else if ( this.state.HasFocus === false )
		{
			_focus_class = "search-area-panel";
		}

		return (
			<div className="global-search-box-panel">
				{
					this.props.searchBarState === "open" &&
					<div className="search-resp-icon-close" onClick={this.props.closeEvent}>
						<SvgIcon icon={SvgIcon.Misc.ArrowLeft} />
					</div>
				}
				{
					this.props.searchBarState === "closed" &&
					<div className="search-resp-icon-expand" onClick={this.props.expandEvent}>
						<SvgIcon icon={SvgIcon.ShellIcons.Search} />
					</div>
				}

				<div className={_focus_class}>
					<div className="search-icon-panel">
						<SvgIcon icon={SvgIcon.ShellIcons.Search} />
					</div>
					<div className="search-input-panel">
						<input type="text"
							tabIndex="0"
							className="input-box-class"
							placeholder={this.PlaceholderText}
							onChange={this.handle_UserInput}
							onBlur={this.handle_BoxBlur}
							onFocus={this.handle_BoxFocus}
							value={this.state.userText} />
					</div>
					{
						this.state.IsDirty === true &&
						<div className="search-is-dirty" tabIndex="0"
							onClick={this.OnClick_ClearUserQuery.bind( this )}
							onKeyPress={this.OnClick_ClearUserQuery.bind( this )}>
							<SvgIcon icon={SvgIcon.ShellIcons.Close} />
						</div>
					}
				</div>

				{/* Search quick history panel */}
				{
					( this.state.IsRecentPanelDisplayed === true && this.state.IsResultsPanelDisplayed === false ) &&
					<div className="search-history-panel">
						<div className="search-history-header">
							<div>Search history</div>
							<div></div>
						</div>
						<div className="search-history-query-list">
							<div className="search-history-list-item" tabIndex="0">
								<div>
									<SvgIcon icon={SvgIcon.Extensions.QuickStart} />
								</div>
								<div>App Service quickstart</div>
							</div>
						</div>
						<div className="search-history-header">
							<div>Recent</div>
							<div></div>
							<div><a href="https://portal.azure.com">See more</a></div>
						</div>
						<div className="search-history-query-list">
							<div className="search-history-list-item" tabIndex="0">
								<div>
									<SvgIcon icon={SvgIcon.Extensions.Subscriptions} />
								</div>
								<div>Contoso Dev</div>
								<div>Subscription</div>
							</div>
							<div className="search-history-list-item" tabIndex="0">
								<div>
									<SvgIcon icon={SvgIcon.Extensions.VirtualMachine} />
								</div>
								<div>VM-prod-0123-GXFC</div>
								<div>Virtual machine</div>
							</div>
							<div className="search-history-list-item" tabIndex="0">
								<div>
									<SvgIcon icon={SvgIcon.Extensions.ResourceGroups} />
								</div>
								<div>Contoso mobile production</div>
								<div>Resource group</div>
							</div>
							<div className="search-history-list-item" tabIndex="0">
								<div>
									<SvgIcon icon={SvgIcon.Extensions.AppServices} />
								</div>
								<div>Contoso WWW pre-prod</div>
								<div>App service</div>
							</div>
							<div className="search-history-list-item" tabIndex="0">
								<div>
									<SvgIcon icon={SvgIcon.Extensions.AppServices} />
								</div>
								<div>Contoso WWW production</div>
								<div>App service</div>
							</div>
						</div>
						<div className="results-panel-footer">Searching 2 of 9 subscriptions. <a href="https://portal.azure.com/">Change</a></div>
					</div>
				}

				{/* fitlered search results */}
				{
					( this.state.IsRecentPanelDisplayed === false && this.state.IsResultsPanelDisplayed === true ) &&
					<div className="results-panel">

						<div className="results-panel-main-column">

							<div className="results-quads-column">

							{/* quadrant blocks - Services */}
								<div className="quadrant">
									<div className="search-history-header">
										<div>Services</div>
										<div></div>
										<div><a href="https://portal.azure.com">See more</a></div>
									</div>
									{
										this.ServicesData.length === 0 &&
										<div className="quad-no-results">No results found.</div>
									}
									{
										this.ServicesData.length > 0 &&
										this.ServicesData.map((item,i)=> (
											<div key={i} className="search-history-list-item" tabIndex="0">
												<div>
													<SvgIcon icon={item.icon} />
												</div>
												<div>{item.name}</div>
											</div>
										))
									}
							</div>

							{/* quadrant blocks - Resources */}
								<div className="quadrant">
									<div className="search-history-header">
										<div>Resources</div>
										<div></div>
										<div><a href="https://portal.azure.com">See more</a></div>
									</div>
									{
										this.ResourcesData.length === 0 &&
										<div className="quad-no-results">No results found.</div>
									}
									{
										this.ResourcesData.length > 0 &&
										this.ResourcesData.map( ( item, i ) => (
											<div key={i} className="search-history-list-item" tabIndex="0">
												<div>
													<SvgIcon icon={item._resource_icon} />
												</div>
												<div>{item._resource_name}</div>
												<div>{item._resource_type}</div>
											</div>
										) )
									}
								</div>

							</div>

							<div className="results-quads-column">

							{/* quadrant blocks - Marketplace */}
								<div className="quadrant">
									<div className="search-history-header">
										<div>Marketplace</div>
										<div></div>
										<div><a href="https://portal.azure.com">See more</a></div>
									</div>
									{
										this.MarketplaceData.length === 0 &&
										<div className="quad-no-results">No results found.</div>
									}
									{
										this.MarketplaceData.length > 0 &&
										this.MarketplaceData.map( ( item, i ) => (
											<div key={i} className="search-history-list-item" tabIndex="0">
												<div>
													<SvgIcon icon={SvgIcon.Extensions.Marketplace} />
												</div>
												<div>{item.displayName}</div>
											</div>
										) )
									}
								</div>

							{/* quadrant blocks - Documentation */}
								<div className="quadrant">
									<div className="search-history-header">
										<div>Documentation</div>
										<div></div>
										<div><a href="https://portal.azure.com">See more</a></div>
									</div>
									{
										this.DocsData.length === 0 &&
										<div className="quad-no-results">No results found.</div>
									}
									{
										this.DocsData.length > 0 &&
										this.DocsData.map( ( item, i ) => (
											<div key={i} className="search-history-list-item" tabIndex="0">
												<div><a href="https://docs.microsoft.com">{item.name}</a></div>
											</div>
										) )
									}
								</div>

							{/* quadrant blocks - Resource Groups */}
								<div className="quadrant">
									<div className="search-history-header">
										<div>Resource groups</div>
										<div></div>
										<div><a href="https://portal.azure.com">See more</a></div>
									</div>
									{
										this.ResGroupData.length === 0 &&
										<div className="quad-no-results">No results found.</div>
									}
									{
										this.ResGroupData.length > 0 &&
										this.ResGroupData.map( ( item, i ) => (
											<div key={i} className="search-history-list-item" tabIndex="0">
												<div>
													<SvgIcon icon={SvgIcon.Extensions.ResourceGroups} />
												</div>
												<div>{item.name}</div>
											</div>
										) )
									}
								</div>
							</div>

						</div>

						{/* footer */}
						<div className="results-panel-footer">Searching 2 of 9 subscriptions. <a href="https://portal.azure.com/">Change</a></div>
					</div>
				}

			</div>
		);
	};
};

export
{
	SearchBox as ShellSearch
};