import React from 'react';
import { Link,NavLink } from "react-router-dom";
//	import { GuitarStoreDataGenerator, GuitarConditions, GuitarTypes, GuitarColors, GuitarBrandsAndModels } from './demo-guitar-store-data.js';
import { GuitarStoreDataGenerator } from './demo-guitar-store-data.js';
import { GuitarStoreDemoJSONData } from './guitar-store-json-data.js';
//	import { StoreItemExtension } from './store-item.js';
import './guitar-store.css';

export class GuitarStoreExtension extends React.Component
{
	//	static contextType = AzureThemeContext;
	static defaultProps = {
		Title: "Sean's Guitar Store demo",
		LinkTitle: "Guitar Store demo",
		Href: "/guitars/", // hack for react router paging
	};
	static SortDirection = [
			{ name: "asc", icon: "\u2191" },
			{ name: "desc", icon: "\u2193" }
		];
	constructor( props )
	{
		super( props );
		console.debug( "GuitarStoreExtension", props );
		//	let _page_path = this.props.match.params;
		//	console.debug("this.props.match.params", this.props.match.params);

		//let _item_id = parseInt( this.props.match.params.id );
		//if ( isNaN( _item_id ) === true )
		//{
		//	return;
		//}
		//if ( _item_id === 0 )
		//{
		//	_item_id = 1;
		//}
		//	console.debug( "GuitarStoreExtension:cotr:_page_path", _page_path );

		this.Title = ( this.props.Title || GuitarStoreExtension.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || GuitarStoreExtension.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || GuitarStoreExtension.defaultProps.Href );
		this.PreviousHistory = undefined;
		
		this.Data = GuitarStoreDemoJSONData;
		//this.JSONData = GuitarStoreDataGenerator.GenerateGuitarInventory();
		//console.debug( "this.JSONData", JSON.stringify( this.JSONData ) );
		this.TempData = this.Data;

		this._filterPanel_Open = "&darr;"; //&#8595; // "\u2193"
		this._filterPanel_Closed = "&uarr;"; // "&#8593;" "\u2191"
		this.FilterPanelGraphic = this._filterPanel_Open;

		this.SortingKeys = Object.keys( this.Data[0] );
		//	console.log( "this.SortingKeys", this.SortingKeys );

		this.SortingOptions = [
			{ name: "Inventory order", keys: [this.SortingKeys[0]], value: GuitarStoreExtension.SortDirection[0] },
			//{ name: "Inventory order", keys: [this.SortingKeys[0]], value: GuitarStoreExtension.SortDirection[1] },
			{ name: "Newest", keys: [this.SortingKeys[16]], value: GuitarStoreExtension.SortDirection[1] },
			{ name: "Oldest", keys: [this.SortingKeys[16]], value: GuitarStoreExtension.SortDirection[0] },
			{ name: "Price lowest", keys: [this.SortingKeys[13]], value: GuitarStoreExtension.SortDirection[0] },
			{ name: "Price highest", keys: [this.SortingKeys[13]], value: GuitarStoreExtension.SortDirection[1] },
			//{ name: "On Sale first", keys: [this.SortingKeys[14]], value: GuitarStoreExtension.SortDirection[1] },
		];
		//	console.debug( "this.SortingOptions", this.SortingOptions );
		this.FilteringOptions = [
			{ name: "Guitar store bump", value: this.SortingKeys[4], checked: false }, // storeBump
			{ name: "Sale items", value: this.SortingKeys[5], checked: false}, // onSale
			{ name: "Free shipping", value:this.SortingKeys[6], checked: false}, // freeShipping
		];
		//	console.log( "this.FilteringOptions", this.FilteringOptions );

		//this.GuitarConditions = GuitarConditions;
		//this.GuitarTypes = GuitarTypes;
		//this.GuitarBrands = GuitarBrandsAndModels;
		//this.GuitarColors = GuitarColors;
		////	console.debug( "this.GuitarColors", this.GuitarColors );

		/* do any initial paging, sorting, default filtering */
		this.PageSize = 12;
		this.CurrentPage = 1;
		this.TotalPageCount = 0;
		this.TotalPageCountArray = [];
		this.DisplayedPageCount = 5;
		this.Pages = this.Get_Deafult_PageSize();

		this.Sort_Data( this.SortingOptions[0] );
		this.DataSet = this.TempData.slice( 0, this.PageSize );
		//console.debug( "CTOR:this.Data", this.Data.length );	
		//console.debug( "CTOR:this.TempData ", this.TempData.length );

		this.state = {
			debug: false,
			selectedChange: false,
			AddFiltersModelDisplayed: false,

			filtersChecked:false,

			currentSortingProp: this.SortingOptions[3],
			userTextValue: '',

			pageSize: this.PageSize,
			currentPage: this.CurrentPage,
			currentPageArray: this.Pages,
			totalPageCount: this.TotalPageCount,
		};

		return;
	};

	/* layout functions */
	Reset_Layout( se )
	{	console.debug( "Reset_Layout" );
		//this.OnClick_HandleEventCancelling( se );

		this.TempData.forEach( function ( v, i, a )
		{
			v.selected = false;
			return;
		} );

		this.setState( {
			selectedChange: false,
		} );
		return;
	};
	Get_Deafult_PageSize()
	{	//	console.debug( "Get_PageSize()", this.Data.length, this.TempData.length, this.CurrentPage, this.state.dataSpliceValue);

		this.TotalPageCount = Math.ceil( this.TempData.length / this.PageSize );
		//	console.debug( "this.TotalPageCount", this.TotalPageCount);

		for ( let i = 0; i < this.TotalPageCount; i++ )
		{
			this.TotalPageCountArray.push( i + 1 );
		}
		//	console.debug( "this.TotalPageCountArray", this.TotalPageCountArray );

		let _pages = this.TotalPageCountArray.slice( 0, this.DisplayedPageCount );
		return _pages;
	};
	Update_Paging()
	{	//	console.debug( "Update_Paging()", this.Data.length, this.TempData.length, this.DataSet.length );
		if ( this.TempData.length < this.PageSize )
		{
			//	console.debug("Update_Paging, small pages")
			this.setState( {
				currentPage: 0,
				currentPageArray: [],
				totalPageCount: 0
			} );
		}
		else
		{
			this.TotalPageCountArray = [];
			this.TotalPageCount = Math.ceil( this.TempData.length / this.PageSize );	//	
			//	console.debug( "this.TotalPageCount", this.TotalPageCount );

			for ( let i = 0; i < this.TotalPageCount; i++ )
			{
				this.TotalPageCountArray.push( i + 1 );
			}
			//	console.debug( "this.TotalPageCount, this.TotalPageCountArray.length",this.TotalPageCount, this.TotalPageCountArray.length );

			this.setState( {
				currentPage: 1,
				currentPageArray: this.TotalPageCountArray.slice( 0, this.DisplayedPageCount ),
				totalPageCount: this.TotalPageCountArray.length
			} );
			//	console.debug( "Update_Paging()", this.Data.length, this.TempData.length, this.DataSet.length );
		}
		return;
	};

	/* 
	 * sorting & filtering functions 
	 * props.keys order is important
	 * */
	Sort_Data( sortProp )
	{	//	console.debug( "Sort_Data", sortProp.value.name, GuitarStoreExtension.SortDirection[0].name);

		let _prop = sortProp.keys[0];
		//	console.debug( "_prop", _prop );

		this.TempData.sort( function ( a, b)
		{	//	console.debug( "this.Data.sort", "a", a, "b", b, sortProp.value );
			let _rv = 0;

			if ( sortProp.value === GuitarStoreExtension.SortDirection[0] )
			{	//	console.debug( "ASC sorting" );
				if ( a[_prop] < b[_prop] )
				{
					_rv =  -1;
				}
				if ( a[_prop] > b[_prop] ) 
				{
					_rv =  1;
				}
				if ( a[_prop] === b[_prop] )
				{
					_rv =  0;
				}	
			}	
			if ( sortProp.value === GuitarStoreExtension.SortDirection[1] )
			{	//	console.debug( "DESC sorting" );
				if ( a[_prop] < b[_prop] )
				{
					_rv =  1;
				}
				if ( a[_prop] > b[_prop] ) 
				{
					_rv =  -1;
				}
				if ( a[_prop] === b[_prop] )
				{
					_rv =  0;
				}	
			}

			//	console.debug( "_rv", _rv );
			return _rv;
		} );

		//this.TempData.forEach( function ( v, i, a )
		//{
		//	console.debug( i, v["key"] );	//, v["yearMade"], v["brandName"], v["model"] );
		//	return;
		//} );
		//	console.debug( this.TempData.length, this.TempData[this.TempData.length - 1].key, this.TempData[this.TempData.length - 1].brandName );	

		return;
	};
	Filter_Data( userText )
	{	//	console.debug( "Filter_Data" , userText, this.state.userTextValue );
		let _filtered_results = [];
		let _query = userText.split( ' ' ).filter( function ( entry ) { return entry.trim() !== ''; } );
		//	console.debug( "_query", _query );

		this.Data.forEach( function ( v, i, a )
		{	//	console.debug( i, v );
			let _match_count = 0;

			if ( _match_count === 0 )
			{

				for ( let index = 0; index < _query.length; index++ )
				{	//	console.debug( "_query[i]", _query[i].toString() );

					let _term = _query[index].toString().toLowerCase(); //	console.debug( "_term", _term, v );

					if ( v.brandName.toLowerCase().indexOf( _term ) !== - 1 )
					{
						_match_count++;
					}
					else if ( v.model.toLowerCase().indexOf( _term ) !== - 1 )
					{
						_match_count++;
					}
					else if ( v.modelColor.toLowerCase().indexOf( _term ) !== - 1 )
					{
						_match_count++;
					}
					else if ( v.guitarType.toLowerCase().indexOf( _term ) !== - 1 )
					{
						_match_count++;
					}
					else if ( v.yearMade.toString().toLowerCase().indexOf( _term ) !== - 1 )
					{
						_match_count++;
					}

				}
			}

			//	console.debug("_match_count", _match_count, _query.length);
			if ( _match_count === _query.length )
			{
				_filtered_results.push( v );
			}
			return;
		} );

		//	console.debug( "_filtered_results", _filtered_results.length );

		// apply filters
		//this.FilteringOptions.forEach( function ( v, i, a )
		//{
		//	console.debug( "Filter_Data::this.FilteringOptions", i, v.name, v.checked );
		//	return;
		//} );

		let _filtered_options_results = [];
		let _fo = this.FilteringOptions;

		let _has_filters = this.FilteringOptions.filter( function ( item ) { return item.checked === true; } );

		if ( _has_filters.length === 0 )
		{
			this.TempData = _filtered_results;
		}
		else
		{	//	console.debug("_has_filters", _has_filters.length);
			_filtered_options_results = _filtered_results.filter( function ( item )
			{	//	console.debug( "_fo", _fo, "item", item );
				let _rv = undefined;
				let _match = false;

				_fo.forEach( function ( v, i, a )
				{	//	console.debug( "_fo", i, v.value, v.checked, item[v.value] );
					if ( v.checked === true )
					{
						if ( item[v.value] === v.checked )
						{
							_match = true;
						}
					}
					return;
				} );
				//	console.debug( "matcht test", _match,"|", item.onSale, item.storeBump, item.freeShipping );
				if ( _match === true )
				{
					_rv = item;
				}
				//	console.debug( "_rv", _rv );
				return _rv;
			}, _fo);

			//	console.debug( "_filtered_options_results", _filtered_options_results.length );
			this.TempData = _filtered_options_results;
		}

		//	this.TempData.forEach( function ( v, i, a ) { console.debug( i, v.brandName ); return; } );
		this.DataSet = this.TempData.slice( 0, this.PageSize );

		//	this.Sort_Data( this.SortingOptions[0] );
		// reset sorting options

		this.Update_Paging();
		return;
	};

	/* Generic event handler */
	OnClick_HandleEventCancelling( se )
	{	//	console.debug( "OnClick_HandleEventCancelling", se );
		se.preventDefault();
		se.stopPropagation();
		se.nativeEvent.stopImmediatePropagation();
		return;
	}

	/* additonal filters button event handlers */
	OnClick_AddFilters_Toggle( se )
	{
		this.OnClick_HandleEventCancelling( se );
		this.setState( { AddFiltersModelDisplayed: !this.state.AddFiltersModelDisplayed } );
		return;
	};

	/* card pop event handlers */
	OnClick_ClearSelectedCard( se )
	{
		console.debug( "OnClick_ClearSelectedCard" );
		this.OnClick_HandleEventCancelling( se );
		this.Data.forEach( function ( v, i, a )
		{
			v.selected = false;
			return;
		} );
		this.setState( { selectedChange: false } );
		return;
	};
	OnClick_SelectCard( index, se )
	{	//	
		console.debug( "REFACTOR OnClick_SelectCard", index );
		this.OnClick_HandleEventCancelling( se );

		this.TempData.forEach( function ( v, i, a )
		{
			v.selected = false;
			return;
		} );

		this.Data[index].selected = !this.Data[index].selected;
		this.setState( { selectedChange: !this.state.selectedChange } );

		return;
	};

	/* RETIRED  - paging event handler */
	OnClick_PagingEvent( index, se )
	{	//	console.debug( "OnClick_PagingEvent", index );
		this.OnClick_HandleEventCancelling( se );

		let _increment = 0;
		let _start = 0;
		let _end = 0;	

		//	console.clear();
		//	check "index" parameter
		if ( index === "prev" )
		{
			_increment = this.state.currentPage - 1;
		}
		else if ( index === "next" )
		{
			if ( this.state.currentPage === this.state.totalPageCount )
			{
				_increment = this.state.currentPage;
			}
			else
			{
				_increment = this.state.currentPage + 1;
			}
		}
		else
		{
			_increment = index;
		}

		//	console.debug( "index, _increment", index, _increment );

		// determine slice size, from this.TempData
		if ( _increment === 0 || _increment === 1 )
		{
			_start = 0;
			_end = this.state.pageSize;
		}
		else if ( _increment === 2 )
		{
			_start = this.state.pageSize;
			_end = this.state.pageSize * 2;
		}
		else if ( _increment > 2 )
		{
			_start = ( _increment - 1 ) * this.state.pageSize;
			_end = ( _increment ) * this.state.pageSize;
		}
		//	console.debug( "END _start, _end", _increment, _start, _end );

		this.DataSet = this.TempData.slice( _start, _end );
		//	console.debug("Paging this.TempData", this.Data.length, this.TempData.length)

		// detemine button array
		//	console.debug( "_increment", _increment );//, "this.state.totalPageCount", this.state.totalPageCount, "this.DisplayedPageCount", this.DisplayedPageCount );
		//	console.debug("this.TotalPageCountArray", this.TotalPageCountArray.length, "this.DisplayedPageCount",this.DisplayedPageCount );

		let _new_btn_array = this.TotalPageCountArray.slice( 0, this.DisplayedPageCount );

		if ( this.TotalPageCountArray.length <= this.DisplayedPageCount )
		{
			_new_btn_array = this.TotalPageCountArray.slice( 0, this.DisplayedPageCount );
		}
		else if ( this.TotalPageCountArray.length > this.DisplayedPageCount )
		{	//	console.debug("MORE than 5 pages",  this.TotalPageCountArray.length, this.DisplayedPageCount);

			if ( _increment <= 3  && _increment < (this.TotalPageCountArray.length - 3))
			{
				_new_btn_array = this.TotalPageCountArray.slice( 0, this.DisplayedPageCount );
			}
			else if ( _increment > 3  && _increment < (this.TotalPageCountArray.length - 2))
			{
				let _start_page = ( _increment - 3 );
				let _end_page = ( _increment + 2 );// + this.DisplayedPageCount;
				_new_btn_array = this.TotalPageCountArray.slice( _start_page,  _end_page );
			}
			else if ( _increment > 3  && _increment < this.TotalPageCountArray.length )
			{
				let _start_page = (this.TotalPageCountArray.length - this.DisplayedPageCount);
				let _end_page = this.TotalPageCountArray.length;// + this.DisplayedPageCount;
				_new_btn_array = this.TotalPageCountArray.slice( _start_page,  _end_page );
			}
			else if ( _increment === this.TotalPageCountArray.length )
			{
				let _start_page = (this.TotalPageCountArray.length - this.DisplayedPageCount);
				let _end_page = this.TotalPageCountArray.length;// + this.DisplayedPageCount;
				_new_btn_array = this.TotalPageCountArray.slice( _start_page,  _end_page );
			}
		}
		//	console.debug( "_new_btn_array", _new_btn_array.length, _new_btn_array );

		this.setState( {
			debug: !this.state.debug,
			currentPage: _increment,
			currentPageArray: _new_btn_array
		});
		return;
	};

	/**
	 * 
	 * @param {any} index
	 *	//this.PageSize = 12;
		//this.CurrentPage = 1;
		//this.TotalPageCount = 0;
		//this.TotalPageCountArray = [];
		//this.DisplayedPageCount = 5;		 
	 */
	Update_PagingArray( index )
	{	//	
		console.debug( "Update_PagingArray: BEFORE", this.Pages, this.CurrentPage );
		let _start_page = 0;
		let _end_page = this.PageSize;

		if ( this.TotalPageCountArray.length <= this.DisplayedPageCount )
		{
			this.Pages = this.TotalPageCountArray.slice( 0, this.DisplayedPageCount );
		}
		else if ( this.TotalPageCountArray.length > this.DisplayedPageCount )
		{	//	console.debug("MORE than 5 pages",  this.TotalPageCountArray.length, this.DisplayedPageCount);
			if ( index <= 3  && index < (this.TotalPageCountArray.length - 3))
			{
				this.Pages = this.TotalPageCountArray.slice( 0, this.DisplayedPageCount );
			}
			else if ( index > 3  && index < (this.TotalPageCountArray.length - 2))
			{
				_start_page = ( index - 3 );
				_end_page = ( index + 2 );
				this.Pages = this.TotalPageCountArray.slice( _start_page,  _end_page );
			}
			else if ( index > 3  && index < this.TotalPageCountArray.length )
			{
				_start_page = (this.TotalPageCountArray.length - this.DisplayedPageCount);
				_end_page = this.TotalPageCountArray.length;
				this.Pages = this.TotalPageCountArray.slice( _start_page,  _end_page );
			}
			else if ( index === this.TotalPageCountArray.length )
			{
				_start_page = (this.TotalPageCountArray.length - this.DisplayedPageCount);
				_end_page = this.TotalPageCountArray.length;
				this.Pages = this.TotalPageCountArray.slice( _start_page,  _end_page );
			}
		}

		console.debug( "AFTER", this.Pages, this.CurrentPage );
		return;
	};
	OnClick_RoutingPagingEvent( index, se )
	{	//	console.clear();
		//console.debug( "OnClick_RouterPagingEvent",
		//	index,
		//	this.TempData.length,
		//	//this.TempData[0].yearMade,
		//	//this.TempData[0].brandName,
		//	//this.TempData[0].model,
		//);

		let _start = 0;
		let _parsed_index = parseInt( index );

		//	TEST THE INCOMING VALUE
		//	console.debug( "_parsed_index", _parsed_index, isNaN( _parsed_index ) );
		if ( _parsed_index === undefined || isNaN( _parsed_index ) === true )
		{
			_parsed_index = 1;
		}
		//	console.debug( "_parsed_index", _parsed_index, isNaN(_parsed_index) );
	
		// GET DATASET SIZE "_start"
		if ( _parsed_index === 1 )
		{
			_start = 0;
		}
		else if ( _parsed_index === 2 )
		{
			_start = this.PageSize;
		}
		else if ( _parsed_index > 2 )
		{
			_start = ( _parsed_index - 1 ) * this.PageSize;
		}

		// GET CURRENT PAGE
		//	console.debug( "_parsed_index", _parsed_index, "_start", _start );
		if ( _parsed_index === 0 || _parsed_index === 1)
		{
			this.CurrentPage = 1;
		}
		else if ( _parsed_index > 1)
		{
			this.CurrentPage = _parsed_index;
		}
		//	console.debug("this.CurrentPage", this.CurrentPage);
		// GET PAGING ARRAY

		this.Update_PagingArray( this.CurrentPage);

		//	slice data
		//	console.debug( "dataset", _start, _start + this.PageSize );
		this.DataSet = this.TempData.slice( _start, _start + this.PageSize );
		//	console.debug("Paging this.TempData", this.Data.length, this.TempData.length)
		return;
	};

	/* seach box related functions */
	OnChange_FilterSearchBox( se )
	{	//	console.debug( "OnChange_FilterSearchBox", se.target );
		//	console.debug( "OnChange_FilterByUserInput::se.target.value", se.target.value );
		//	console.debug( "OnChange_FilterByUserInput::this.state.userTextValue", this.state.userTextValue.length );

		if ( se.target.value.length !== 0 )
		{
			this.Filter_Data( se.target.value );
		}
		else if ( se.target.value.length === 0 )
		{
			this.TempData = this.Data;
			this.DataSet = this.TempData.slice( 0, this.PageSize );
			this.Update_Paging();
		}
		this.setState( { userTextValue: se.target.value } );
		return;
	};
	OnFocus_SearchBox( se )
	{	//	console.debug( "OnFocus_CloseResultsPanel" );
		this.OnClick_HandleEventCancelling( se );
		return;
	};
	OnBlur_SearchBox( se )
	{	//	console.debug( "OnBlur_HideResultsPanel" );
		this.OnClick_HandleEventCancelling( se );
		return;
	};

	/* sorting drop down event handler */
	OnChange_SortingDropDown( se )
	{	//	console.debug("OnChange_SortingDropDown:",se.target.value,se.target.selectedOptions[0].value);
		//	console.debug( this.state.currentPage, this.state.totalPageCount , this.state.currentPageArray);
		this.Sort_Data( this.SortingOptions[se.target.selectedOptions[0].value] );
		this.DataSet = this.TempData.slice( 0, this.PageSize );
		this.OnClick_PagingEvent( 1, se )
		return;
	};

/* optional filter event handlers */
	OnChange_Toggle_FilterCbxs( filterOption, se )
	{	//	console.debug( "OnChange_Toggle_OnSaleCbx", se.target, se.target.checked, se.target.value, "this.state.userTextValue", this.state.userTextValue );
		//	console.debug( "OnChange_Toggle_OnSaleCbx", filterOption.name, filterOption.value, filterOption.checked );

		filterOption.checked = se.target.checked;
		//	console.debug( "filterOption.checked", filterOption.checked );

		this.Filter_Data( this.state.userTextValue );
		//this.setState( { filtersChecked: !this.state.filtersChecked } );
		//console.debug( "state check", this.state.filtersChecked );
		return;
	};

	/* render */
	render()
	{	
		//	console.debug( "GuitarStoreExtension.render()", this.state.onSaleCbxChecked );
		//	<div className="debug-paging-index">{item.key}</div>
		//	console.debug( "render():this.CurrentPage", this.CurrentPage, this.Pages.length, this.TotalPageCountArray.length);
		console.debug( "this.props.match.params", this.props.match.params );

		this.OnClick_RoutingPagingEvent( this.props.match.params.id );

		return (
			<div className="page-main">

				{/* header */}
				<div className="page-block-no-padding">

					<div className="gs-header">

						<div className="gs-header-row-0">This demo is a "work in progress". Some features may not work as expected.</div>

						<div className="gs-header-row-1">

							<div className="gs-search-panel" >
								<input
									id="sg-gsd-search-box"
									type="text"
									tabIndex="0"
									className="gs-search-box"
									placeholder="Filter by brand, model, color or year"
									defaultValue={this.state.userTextValue}
									onChange={this.OnChange_FilterSearchBox.bind( this )}
									onFocus={this.OnFocus_SearchBox.bind( this )}
									onBlur={this.OnBlur_SearchBox.bind( this )}
								/>
								<div className="gs-search-box-icon" tabIndex="0">
									<svg version="1.1" x="0px" y="0px" width="32px" height="32px" viewBox="-4 -4 40 40">
										<circle cx="12" cy="12" r="8"
											fill="none"
											stroke="rgba(0,0,0,0.6)"
											strokeWidth="2" />
										<line x1="17" x2="30" y1="17" y2="30"
											stroke="rgba(0,0,0,0.6)" strokeWidth="2" />
									</svg>
								</div>
							</div>

							<div className="gs-filtering-control">

								<div className="gs-filter-button" tabIndex="0" onClick={this.OnClick_AddFilters_Toggle.bind( this )}>
									<span className="gs-filter-button-text">Filters</span>
									{
										this.state.AddFiltersModelDisplayed === true &&
										<span className="gs-filter-button-arrows">&uarr;</span>
									}
									{
										this.state.AddFiltersModelDisplayed === false &&
										<span className="gs-filter-button-arrows">&darr;</span>
									}
								</div>

							</div>

						</div>

						<div className="gs-header-row-2">
							{
								this.state.AddFiltersModelDisplayed === true &&
								<div className="gs-filters-panel" tabIndex="0" >
									<div className="gs-filters-panel-header">Additonal filtering options</div>

									<div className="gs-filters-list-panel">
										{
											this.FilteringOptions.map( ( item, index ) => (
												<div className="gs-filter-option" key={index} tabIndex="0">

													<div className="gs-filter-option-cbx">
														<input type="checkbox" id={item.name} name={item.name}
															defaultChecked={this.state.filtersChecked[item]}
															onChange={this.OnChange_Toggle_FilterCbxs.bind( this, item )} />
													</div>
													<label htmlFor={item.name} className="gs-filter-option-label" tabIndex="0"	>Show "{item.name}" items</label>

												</div>
											) )
										}
									</div>
								</div>
							}
						</div>

						<div className="gs-header-row-3 marg-top-10">

							<div className="gs-results-panel">
								<div>Showing {this.DataSet.length} of {this.TempData.length} listings</div>
							</div>

							<div className="gs-paging-control">
								{/* paging via react router */}


								{
									this.CurrentPage === 1 && this.DataSet.length > 0 && this.Pages.length < this.TotalPageCountArray.length &&
									<div className="gs-paging-button-disabled" title="Previous page"
										onClick={this.OnClick_HandleEventCancelling.bind( this )}>&lt;</div>
								}
								{
									this.CurrentPage > 1 && this.DataSet.length > 0 && this.Pages.length < this.TotalPageCountArray.length &&
									<NavLink
										tabIndex="0"
										className="gs-paging-button"
										activeClassName="gs-paging-button-selected"
										to={`/guitars/${this.CurrentPage - 1}`}>&lt;</NavLink>
								}
								{
									this.Pages.length > 0 && this.DataSet.length > 0 && 
									this.Pages.map( ( item, index ) => (
										<NavLink
											key={index}
											tabIndex="0"
											className="gs-paging-button"
											activeClassName="gs-paging-button-selected"
											to={`/guitars/${item}`}>{item}</NavLink>
									) )
								}
								{
									this.CurrentPage === this.TotalPageCountArray.length && this.TotalPageCountArray.length > this.Pages.length && this.DataSet.length > 0 &&
									<div className="gs-paging-button-disabled" title="Next page"
										onClick={this.OnClick_HandleEventCancelling.bind( this )}>&gt;</div>
								}
								{
									this.CurrentPage < this.TotalPageCountArray.length && this.TotalPageCountArray.length > this.Pages.length && this.DataSet.length > 0 &&
									<NavLink
										tabIndex="0"
										className="gs-paging-button"
										activeClassName="gs-paging-button-selected"
										to={`/guitars/${this.CurrentPage + 1}`}>&gt;</NavLink>
								}
							</div>

							<div className="gs-sorting-panel">

								<span className="gs-sort-text">Sort by</span>
								<select className="gs-sort-select" tabIndex="0" value={this.state.sortingValue} onChange={this.OnChange_SortingDropDown.bind( this )}>
									{
										this.SortingOptions.map( ( item, index ) => (
											<option key={index} value={index}>{item.name}</option>
										) )
									}
								</select>

							</div>

						</div>

					</div>

				</div>

				{/* grid layout 
					<Route exact={true} path={'/guitars/item/:id'} component={StoreItemExtension}/>
								<Link
									key={index}
									tabIndex="0"
									className="gs-card-main"
									to={{ pathname: `/guitars/item/${item.key}`, data: [`/guitars/${this.CurrentPage}`] }}
									>
				 */}
				<div className="page-block-no-padding">
					<div className="gs-catalog-page">

						{
							this.DataSet.map( ( item, index ) => (

								<Link
									key={index}
									tabIndex="0"
									className="gs-card-main"
									to={{
										pathname: `/guitars/item/${item.key}`,
										state: {
											prevPage: `/guitars/${this.CurrentPage}`,
											page: `/guitars/${this.CurrentPage}` 
										},
									}}
									>


									{/*
									 * <div className="debug-paging-index">{item.guid} : {item.key}</div>
									 */}

										{/* image thumbnail */}
										<div className="gs-card-img"
											title={item.yearMade + ' ' + item.brandName + ' ' + item.model}
											style={{ 'backgroundImage': 'url(' + item.thumbnail + ')' }}
										>
											{
												item.storeBump === true &&
												<div className="gs-card-store-bump">Guitar Store Bump!</div>
											}

										</div>

										{/* listed date */}
										<div className="gs-card-listing-date">Listed: {GuitarStoreDataGenerator.FormatDate( item.dateAdded )}</div>


										{/* title */}
										<div className="gs-card-text-title">{item.yearMade} {item.brandName} {item.model}</div>

										{/* pricing */}
										<div className="gs-card-prices-panel">
											{
												item.onSale === true &&
												<div>
													<span className="gs-card-pricing-sale">${item.msrpPrice}</span>
													<span className="gs-card-pricing-msrp-sale">${item.salePrice}</span>
												</div>
											}
											{
												item.onSale === false && <span className="gs-card-pricing-msrp">${item.msrpPrice}</span>
											}
										</div>


										{/* shipping & condition */}
										<div className="gs-card-shipping-panel">
											{
												item.condition === "Excellent" &&
												<span className="item-condition cond-excellent">{item.condition}</span>
											}
											{
												item.condition === "Very good" &&
												<span className="item-condition cond-very-good">{item.condition}</span>
											}
											{
												item.condition === "Good" &&
												<span className="item-condition cond-good">{item.condition}</span>
											}
											{
												item.condition === "Average" &&
												<span className="item-condition cond-average">{item.condition}</span>
											}
											{
												item.condition === "Needs love" &&
												<span className="item-condition cond-needs-love">{item.condition}</span>
											}
											{
												item.freeShipping === true &&
												<span className="gs-card-free-shipping">Free shipping!</span>
											}
										</div>


										{/* action buttons */}
										<div className="gs-card-watch-buy-panel">
											<div className="gs-card-wbp-share-btn">
												<svg width="16" height="16" viewBox="0 0 1000 1000" >
													<path d="M381.9,181l95.8-95.8v525.9c0,13.4,8.9,22.3,22.3,22.3c13.4,0,22.3-8.9,22.3-22.3V85.2l95.8,95.8c4.5,4.5,8.9,6.7,15.6,6.7c6.7,0,11.1-2.2,15.6-6.7c8.9-8.9,8.9-22.3,0-31.2L515.6,16.1c-2.2-2.2-4.5-4.5-6.7-4.5c-4.5-2.2-11.1-2.2-17.8,0c-2.2,2.2-4.5,2.2-6.7,4.5L350.7,149.8c-8.9,8.9-8.9,22.3,0,31.2C359.6,190,373,190,381.9,181z M812,276.9H633.7v44.6H812v624H188v-624h178.3v-44.6H188c-24.5,0-44.6,20.1-44.6,44.6v624c0,24.5,20.1,44.6,44.6,44.6h624c24.5,0,44.6-20.1,44.6-44.6v-624C856.6,296.9,836.5,276.9,812,276.9z" />
												</svg>
											</div>
											<div className="gs-card-wbp-watch-btn">
												<svg width="16" height="16" viewBox="0 0 14 14" >
													<path d="M10.2812 0.875C10.7962 0.875 11.2793 0.972982 11.7305 1.16895C12.1816 1.36491 12.5758 1.63151 12.9131 1.96875C13.2503 2.30143 13.5146 2.69564 13.7061 3.15137C13.902 3.60254 14 4.08333 14 4.59375C14 5.09049 13.9043 5.56673 13.7129 6.02246C13.526 6.47819 13.2594 6.87923 12.9131 7.22559L7 13.1318L1.08691 7.22559C0.74056 6.87923 0.47168 6.47819 0.280273 6.02246C0.0934245 5.56673 0 5.09049 0 4.59375C0 4.08333 0.0957031 3.60254 0.287109 3.15137C0.483073 2.69564 0.749674 2.30143 1.08691 1.96875C1.42415 1.63151 1.81836 1.36491 2.26953 1.16895C2.7207 0.972982 3.20378 0.875 3.71875 0.875C4.09701 0.875 4.43424 0.918294 4.73047 1.00488C5.02669 1.09147 5.30013 1.21224 5.55078 1.36719C5.80599 1.51758 6.04753 1.69987 6.27539 1.91406C6.50781 2.12826 6.74935 2.36296 7 2.61816C7.25065 2.36296 7.48991 2.12826 7.71777 1.91406C7.9502 1.69987 8.19173 1.51758 8.44238 1.36719C8.69759 1.21224 8.97331 1.09147 9.26953 1.00488C9.56576 0.918294 9.90299 0.875 10.2812 0.875ZM12.291 6.60352C12.5599 6.33464 12.765 6.02702 12.9062 5.68066C13.0475 5.33431 13.1182 4.97201 13.1182 4.59375C13.1182 4.19727 13.0452 3.82812 12.8994 3.48633C12.7536 3.13997 12.5508 2.84147 12.291 2.59082C12.0358 2.33561 11.735 2.13737 11.3887 1.99609C11.0469 1.85026 10.6777 1.77734 10.2812 1.77734C9.89844 1.77734 9.55892 1.83887 9.2627 1.96191C8.96647 2.0804 8.69303 2.23763 8.44238 2.43359C8.19173 2.62956 7.9502 2.85286 7.71777 3.10352C7.48991 3.34961 7.25065 3.60026 7 3.85547C6.75391 3.60938 6.51465 3.361 6.28223 3.11035C6.0498 2.8597 5.80599 2.63411 5.55078 2.43359C5.30013 2.23307 5.02441 2.06901 4.72363 1.94141C4.42741 1.8138 4.09245 1.75 3.71875 1.75C3.32682 1.75 2.95768 1.8252 2.61133 1.97559C2.26497 2.12142 1.96191 2.32422 1.70215 2.58398C1.44694 2.83919 1.24414 3.13997 1.09375 3.48633C0.947917 3.83268 0.875 4.20182 0.875 4.59375C0.875 4.97201 0.945638 5.33431 1.08691 5.68066C1.23275 6.02702 1.4401 6.33464 1.70898 6.60352L7 11.8945L12.291 6.60352Z"></path>
												</svg>
											</div>
											<div className="gs-card-wbp-buy-btn">
												<svg height="16" width="16" viewBox="0 0 500 500" >
													<path d="M282.044,203.485c-50.331-18.941-67.309-30.381-67.309-45.35c0-17.49,15.958-27.112,44.968-27.112 c18.257,0,35.362,2.522,52.276,7.693c9.831,3.031,20.808,1.866,29.808-3.16c9.034-5.074,15.703-13.723,18.289-23.778l0.543-2.138 c5.552-21.589-7.47-43.787-29.042-49.5c-14.81-3.895-31.31-6.446-49.117-7.555V35.224C282.461,15.805,266.648,0,247.225,0 c-19.434,0-35.232,15.805-35.232,35.224v22.35c-62.043,13.911-100.339,55.961-100.339,110.662 c0,68.347,59.344,97.085,111.03,114.477c42.318,14.3,58.804,27.161,58.804,45.862c0,19.23-19.023,30.702-50.888,30.702 c-21.481,0-43.407-3.957-65.202-11.742c-9.704-3.479-20.777-2.682-29.873,2.137c-9.206,4.882-15.958,13.468-18.542,23.521 l-1.18,4.66c-5.476,21.318,6.687,43.274,27.67,50.009c20.138,6.448,43.194,10.726,65.536,12.207v21.544 c0,19.419,15.813,35.218,35.219,35.218c19.436,0,35.232-15.799,35.232-35.234v-26.392 c64.404-13.053,105.718-57.719,105.718-114.958C385.177,263.916,354.3,228.969,282.044,203.485z" />
												</svg>

											</div>
										</div>


								</Link>
							))
						}

					</div>
				</div>
			</div>
		);
	};
};