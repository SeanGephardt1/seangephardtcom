//	<DataGridControl
//		columns={this.Columns}
//		data={this.Data}
//		showFilter={false}
//		sortDirection={DataGridControl.SortTypes.DEFAULT}
//		appNav={this.AppNavigation}
//		defaultSortColumn={this.Columns[0]} />

import React from 'react';
import './data-grid.css';
import SvgIcon from "./../svg-icons/svg-icon.js";
import PillFilterControl from './../pill-filter/pill-filter.js';
import InfoIconControl from './../info-icon/info-icon.js';
import CtaButtonControl from './../buttons/cta-button.js'
import CheckBoxControl from './../checkbox/checkbox.js';

export default class DataGridControl extends React.Component
{
	static SortTypes = {
		DEFAULT: - 1,
		ASC: 0,
		DESC: 1
	};
	static Styles = {
		Default: "dg-default",
	};
	constructor( props )
	{
		//	console.debug( "Data is added at the App scope level, and should presist between navigation." );
		super( props );
		this._internal_name = this.constructor.name;

		this.state = {
			pageChanged: false,
			AllSelected: false,
		};

		this.Columns = props.columns;
		this.Data = props.data;

		this.DisplayFiltering = ( props.showFilter || true );
		this.DisplayHiddenTypes = ( props.showHidden || CheckBoxControl.States.UnChecked );

		this.SortDirection = ( props.SortDirection || DataGridControl.SortTypes.DEFAULT );
		this.CurrentSortDirection = this.SortDirection;
		this.DefaultColumn = ( props.defaultSortColumn || 0 );
		this.CurrentSelectedColumn = "foo";

		this.SelectAllCbxState = CheckBoxControl.States.UnChecked;
		this.SelectAllCount = 0;

		this.PagingInfo = {
			startCount: 1,
			endCount: props.data.length,
			pageSize: 100,
			totalCount: this.Data.length,
			index: []
		};
		this.CurrentPage = 1;
		this.NumberOfPages = 0;
		this.PrevBtnEnabled = false;
		this.NextBtnEnabled = false;

		this.Headers = [];
		this.TempPageData = [];
		this.PageData = [];

		this.Handle_NonClickEvents = this.OnClick_HandleEventCancelling.bind( this );
		//	this.Handle_AppNavigation = this.props.navigateEvent.bind( this );

		this.Handle_CheckBoxSelectAll = this.OnClick_CheckBox_SelectAll.bind( this );

		//	this.Handle_ColumnSorting = this.OnClick_SortThisColumn.bind( this );

		this.Handle_PageChange = this.OnChange_PagingSelect.bind( this );
		this.Handle_PagePrevious = this.OnClick_PagePrevious.bind( this );
		this.Handle_PageNext = this.OnClick_PageNext.bind( this );

		this.ComputeLayout();
		return;
	};
	ComputeLayout()
	{	//	console.debug( "DataGrid.ComputeLayout()" );
		//	seems redundant, but check is the columns info has a visible flag
		//	this should allow us to create an "add columns" function later
		//	maybe we'll do something here later to enable adding/removing columns & related data
		//	console.debug( "Check state of selected data, based on moving data up a level to App Scope" );

		let _selected_count = 0;
		this.Data.forEach( function ( v, i, a )
		{
			//	console.debug( i, v._resource_name, v._selected );
			if ( v._selected === CheckBoxControl.States.Checked )
			{
				_selected_count++;
			}
		} );
		this.SelectAllCount = _selected_count;

		if ( this.SelectAllCount > 0 && this.SelectAllCount < this.Data.length )
		{
			this.SelectAllCbxState = CheckBoxControl.States.PartialChecked;
		}
		else if ( this.SelectAllCount === 0 )
		{
			this.SelectAllCbxState = CheckBoxControl.States.UnChecked;
		}
		else if ( this.SelectAllCount === this.Data.length )
		{
			this.SelectAllCbxState = CheckBoxControl.States.Checked;
		}
		//	console.debug( "this.SelectAllCbxState", this.SelectAllCbxState );

		this.CurrentPage = 1;

		this.Headers = this.Columns.filter( function ( item, index )
		{	//	console.debug( "this.columns", index, item);	
			return item.visible === true;
		} );

		this.NumberOfPages = Math.ceil( this.Data.length / this.PagingInfo.pageSize );
		//	console.debug( "this.NumberOfPages", this.NumberOfPages );
		if ( this.NumberOfPages === 0 )
		{
			this.NumberOfPages = 1;
			//	console.debug( "this.NumberOfPages === 0, 1", this.NumberOfPages );
		}
		for ( let i = 0; i < this.NumberOfPages; i++ )
		{
			this.PagingInfo.index.push( i );
		}
		//	console.debug( "this.PagingInfo[pages]", this.PagingInfo );

		this.PageData = this.Data.slice( 0, this.PagingInfo.endCount );
		//	console.debug( "this.PageData.length", this.PageData.length );
		return;
	};

	AddColumn()
	{
		console.debug( "TBD- AddColumn" );
		return;
	};
	RemoveColumn()
	{
		console.debug( "TBD- RemoveColumn" );
		return;
	};
	Filter()
	{
		console.debug( "TBD- Filter" );
		return;
	};

	// NEEDED WITH EVERY CONTROL
	OnClick_HandleEventCancelling( pe )
	{	//	console.debug( "OnClick_HandleEventCancelling" );
		//	pe.stopPropagation();
		//	pe.nativeEvent.stopImmediatePropagation();
		return;
	};

	CreateNewDataPage()
	{	//	console.debug( "CreateNewDataPage", this.CurrentPage, this.Data.length, this.TempPageData.length, this.PageData.length );
		//	console.debug( "CreateNewDataPage", this.PagingInfo );
		let _new_start_index = 0;
		let _new_end_index = 0;

		if ( this.CurrentPage === 1 )
		{
			_new_start_index = 0;
			_new_end_index = this.PagingInfo.pageSize;

			this.PagingInfo.startCount = 1;
			this.PagingInfo.endCount = 100;
		}
		else if ( this.CurrentPage !== 1 )
		{
			_new_start_index = ( this.CurrentPage - 1 ) * this.PagingInfo.pageSize;
			_new_end_index = _new_start_index + this.PagingInfo.pageSize;

			this.PagingInfo.startCount = _new_start_index + 1;

			//	console.debug( "check last page", this.PagingInfo.totalCount, (( this.CurrentPage) * this.PagingInfo.pageSize ) );
			if ( this.PagingInfo.totalCount < ( this.CurrentPage * this.PagingInfo.pageSize ) )
			{
				this.PagingInfo.endCount = this.PagingInfo.totalCount;
			}
			else
			{
				this.PagingInfo.endCount = _new_end_index;
			}
		}
		//	console.debug( "_new_start_index, _new_end_index", _new_start_index, _new_end_index );

		//	console.debug( "this.TempPageData", this.TempPageData.length );
		this.PageData = this.Data.slice( this.PagingInfo.startCount, this.PagingInfo.endCount );
		//	console.debug( "this.PageData", this.PageData.length );

		this.setState( { pageChanged: !this.state.pageChanged } );
		return;
	};

	OnClick_CheckBox_SelectAll( pe )
	{	//	console.debug( "OnClick_CheckBox_SelectAll", this.SelectAllCbxState );
		this.OnClick_HandleEventCancelling( pe );

		let _check_value = undefined;

		if ( this.SelectAllCbxState === CheckBoxControl.States.UnChecked )
		{
			this.SelectAllCbxState = CheckBoxControl.States.Checked;
			_check_value = CheckBoxControl.States.Checked;
		}
		else if ( this.SelectAllCbxState === CheckBoxControl.States.Checked )
		{
			this.SelectAllCbxState = CheckBoxControl.States.UnChecked;
			_check_value = CheckBoxControl.States.UnChecked;
		}
		else if ( this.SelectAllCbxState === CheckBoxControl.States.PartialChecked )
		{
			this.SelectAllCbxState = CheckBoxControl.States.Checked;
			_check_value = CheckBoxControl.States.Checked;
		}

		//	console.debug( "this.SelectAllCbxState", this.SelectAllCbxState, "_check_value", _check_value );

		this.Data.forEach( function ( v, i, a )
		{	//	console.debug( i, v, v._selected );
			v._selected = _check_value;
		} );

		//	this.CreateNewDataPage();
		this.setState( { pageChanged: !this.state.pageChanged } );
		return;
	};
	OnClick_CheckBox_SelectSingleRow( obj, states, pe)
	{	//	console.debug( "OnClick_CheckBox_SelectSingleRow", states, obj._selected);
		this.OnClick_HandleEventCancelling( pe );

		switch ( obj._selected )
		{
			case states.UnChecked: {
				obj._selected = CheckBoxControl.States.Checked;
				break;
			}
			case states.Checked: {
				obj._selected = CheckBoxControl.States.UnChecked;
				break;
			}
			default:
				{
					obj._selected = CheckBoxControl.States.UnChecked;
					break;
				}
		}

		let _selected_count = 0;
		this.Data.forEach( function ( v, i, a )
		{
			//	console.debug( i, v._resource_name, v._selected );
			if ( v._selected === CheckBoxControl.States.Checked )
			{
				_selected_count++;
			}
		} );
		//	console.debug( "_selected_count", _selected_count );

		this.SelectAllCount = _selected_count;

		if ( this.SelectAllCount > 0 && this.SelectAllCount < this.Data.length )
		{
			this.SelectAllCbxState = CheckBoxControl.States.PartialChecked;
		}
		else if ( this.SelectAllCount === 0 )
		{
			this.SelectAllCbxState = CheckBoxControl.States.UnChecked;
		}
		else if ( this.SelectAllCount === this.Data.length )
		{
			this.SelectAllCbxState = CheckBoxControl.States.Checked;
		}
		//	console.debug( "this.SelectAllCbxState", this.SelectAllCbxState );

		this.setState( { pageChanged: !this.state.pageChanged });
		return;
	};
	OnClick_RowLink_Navigate( obj, typeName, pe )
	{	//	console.debug( "OnClick_RowLink_Navigate");
		//	this.OnClick_HandleEventCancelling( pe );
		//this.props.navigateEvent.bind( {
		//	extension: obj._resource,
		//	level: 1,
		//	typeName: typeName,
		//	source: "datagrid",
		//	pe: this
		//}, pe );
		this.props.navigateEvent( {
			extension: obj._resource,
			level: 1,
			typeName: typeName,
			source: "datagrid",
			pe: this
		}, pe );
		return;
	};

	OnClick_SortThisColumn( idx, dataGrid, pe )
	{	//	console.debug( "OnClick_SortThisColumn" );
		dataGrid.OnClick_HandleEventCancelling( pe );
		dataGrid.CurrentSelectedColumn = dataGrid.Columns[idx].key;

		if ( dataGrid.CurrentSortDirection === DataGridControl.SortTypes.DEFAULT )
		{
			dataGrid.CurrentSortDirection = DataGridControl.SortTypes.ASC;
		}
		else if ( dataGrid.CurrentSortDirection === DataGridControl.SortTypes.DESC )
		{
			dataGrid.CurrentSortDirection = DataGridControl.SortTypes.ASC;
		}
		else if ( dataGrid.CurrentSortDirection === DataGridControl.SortTypes.ASC )
		{
			dataGrid.CurrentSortDirection = DataGridControl.SortTypes.DESC;
		}

		dataGrid.Data.sort( function ( a, b )
		{
			let key_a = a[dataGrid.CurrentSelectedColumn];
			let key_b = b[dataGrid.CurrentSelectedColumn];
			//console.debug( "a", a );
			//console.debug( "b", b );
			//console.debug( "key_a", key_a );
			//console.debug( "key_b", key_b );

			switch ( dataGrid.CurrentSortDirection )
			{
				case DataGridControl.SortTypes.ASC:
					{ 
						if ( key_a < key_b )
						{
							return -1;
						}
						if ( key_a > key_b )
						{
							return 1;
						}
						return 0;
					}
				case DataGridControl.SortTypes.DESC:
					{
						if ( key_a < key_b )
						{
							return 1;
						}
						if ( key_a > key_b )
						{
							return -1;
						}
						return 0;
					}
				default:
					{
						//	console.debug( "default sorting" );
						if ( key_a < key_b )
						{
							return 1;
						}
						if ( key_a > key_b )
						{
							return -1;
						}
						return 0;
					}
			};
		} );

		dataGrid.CreateNewDataPage();

		dataGrid.setState( { pageChanged: !dataGrid.state.pageChanged } );
		return;
	};

	OnChange_PagingSelect( pe )
	{	//	console.debug( "OnChange_PagingSelect", pe.target.value, this.CurrentPage );
		this.OnClick_HandleEventCancelling( pe );
		this.CurrentPage = parseInt(pe.target.value);
		this.CreateNewDataPage();
		return;
	};
	OnClick_PagePrevious( pe )
	{	//	console.debug( "OnClick_PagePrevious", this.CurrentPage );
		this.OnClick_HandleEventCancelling( pe );
		if ( this.CurrentPage === 0 || this.CurrentPage === 1 )
		{
			this.PrevBtnEnabled = false;
			//	return;
		}
		else
		{
			this.CurrentPage = parseInt(this.CurrentPage - 1);
		}

		//	console.debug( "prev.this.CurrentPage", this.CurrentPage );
		this.CreateNewDataPage();
		return;
	};
	OnClick_PageNext( pe )
	{	//	console.debug( "OnClick_PageNext", this.NumberOfPages, this.CurrentPage );
		this.OnClick_HandleEventCancelling( pe );
		if ( this.NumberOfPages === 1 || this.CurrentPage === this.NumberOfPages )
		{
			this.NextBtnEnabled = false;
			//	return;
		}
		else
		{
			this.CurrentPage = parseInt(this.CurrentPage + 1);
			//	this.setState( { pageChanged: !this.state.pageChanged } );
		}
		this.CreateNewDataPage();
		return;
	};

	PreRenderCheck()
	{
		//console.debug( "PreRenderCheck()" );
		//console.debug( "this.CurrentPage", this.CurrentPage );
		//console.debug( "this.NumberOfPages", this.NumberOfPages );

		let _cpage = parseInt( this.CurrentPage );

		if ( _cpage === 1 && _cpage === this.NumberOfPages)
		{
			this.PrevBtnEnabled = false;
			this.NextBtnEnabled = false;
		}
		else if ( _cpage === 1 && _cpage < this.NumberOfPages )
		{
			this.PrevBtnEnabled = false;
			this.NextBtnEnabled = true;
		}
		else if ( _cpage > 1 && _cpage < this.NumberOfPages )
		{
			this.PrevBtnEnabled = true;
			this.NextBtnEnabled = true;
		}
		else if ( _cpage > 1 && _cpage === this.NumberOfPages )
		{
			this.PrevBtnEnabled = true;
			this.NextBtnEnabled = false;
		}
		return;
	};
	render()
	{
		//	console.debug( "DataGridControl::render()", this.PageData.length );
		//	<span>{item.key}</span>|<span>{this.CurrentSelectedColumn}</span>|<span>{this.CurrentSortDirection}</span>

		//<PillFilterControl title={'Resource Groups = All'} />
		//	<PillFilterControl title={'Resources = All'} />
		//	<PillFilterControl title={'Locations = All'} />
		//	<PillFilterControl title={'Status = All'} />
		//	<PillFilterControl title={'Tags = All'} />

		this.PreRenderCheck();

		return (
			<div className="dg-container-div">

				{
					this.props.showFilter !== false && 
					<div className="dg-filter-header">
						<input className="dg-search-box" type="text" placeholder="Filter by name..."/>
						<PillFilterControl title={'Subscriptions = Contoso Corp'} />
						<PillFilterControl title={'Filter settings'}/>
					</div>
				}

				<div className="dg-results-header">
					<div className="dg-result-count">
						<span>Showing</span>
						<span className="dg-result-count-bold">{this.PagingInfo.startCount}</span>
						<span>to</span>
						<span className="dg-result-count-bold">{this.PagingInfo.endCount}</span>
						<span>of</span>
						<span className="dg-result-count-bold">{this.PagingInfo.totalCount}</span>
						<span>resources.</span>
					</div>
					<div className="dg-show-type-box">
						<CheckBoxControl isChecked={this.DisplayHiddenTypes} />
						<span>Show hidden types</span>
						<InfoIconControl />
					</div>
					<div className="dg-paging-ctrls">
						<CtaButtonControl
							title="< Previous"
							ctaStyle={this.PrevBtnEnabled ? CtaButtonControl.CtaBtnStyles.Inverse : CtaButtonControl.CtaBtnStyles.Disabled}
							eventHandler={this.Handle_PagePrevious} />
						<div className="dg-page-dropdown">
							<span>Page</span>
							<span>
								<select value={this.CurrentPage} onChange={this.Handle_PageChange} onClick={this.Handle_NonClickEvents}>
									{
										this.PagingInfo.index.map( ( item ) => ( <option key={item} value={item + 1}>{item + 1}</option> ) )
									}
								</select>
							</span>
							<span>of</span>
							<span>{this.NumberOfPages}</span>
						</div>
						<CtaButtonControl
							title="Next >"
							ctaStyle={this.NextBtnEnabled ? CtaButtonControl.CtaBtnStyles.Inverse : CtaButtonControl.CtaBtnStyles.Disabled}
							eventHandler={this.Handle_PageNext} />
					</div>
				</div>

				<div className="dg-grid-header">
				<table className="dg-grid-table" cellPadding="0" cellSpacing="0">
					<thead>
						<tr>
							{
								this.Headers.map( ( item, index ) => (
									<td key={index} onClick={this.OnClick_SortThisColumn.bind( item, index, this )}>
										{
											index === 0 && 
											<span className="dg-bulk-cbx" onClick={this.Handle_CheckBoxSelectAll}>
												<CheckBoxControl isChecked={this.SelectAllCbxState} />
											</span>
										}
											<span className="dg-header-text">{item.name}</span>

												{
													item.key === this.CurrentSelectedColumn && this.CurrentSortDirection === DataGridControl.SortTypes.ASC &&
													<span className="dg-header-sort">
														<span className="dg-header-sort-dir">&uarr;</span>
														<span className="dg-header-nonsort-dir">&darr;</span>
													</span>
												}
												{
													item.key === this.CurrentSelectedColumn && this.CurrentSortDirection === DataGridControl.SortTypes.DESC &&
													<span className="dg-header-sort">
														<span className="dg-header-nonsort-dir">&uarr;</span>
														<span className="dg-header-sort-dir">&darr;</span>
													</span>
												}
												{
													item.key !== this.CurrentSelectedColumn &&
													<span className="dg-header-sort">
													<span className="dg-header-nonsort-dir">&uarr;</span>
													<span className="dg-header-nonsort-dir">&darr;</span>
													</span>
												}
									</td>
								) )
							}

							{/* has actions */}
							{
								this.props.hasActions === true && <td className="dg-action-column-header"></td>
							}
						</tr>
					</thead>
					<tbody>
							{
								this.PageData.map( ( item, pd_index ) =>
									(
										<tr key={pd_index} onClick={this.OnClick_CheckBox_SelectSingleRow.bind( this, item, CheckBoxControl.States )} >
											{
												this.Headers.map( ( rowData, index ) =>
												{
													let _block;
													if ( index === 0  )
													{
														_block = (
															<td key={index}>
																<span className="dg-bulk-cbx" >
																	<CheckBoxControl isChecked={item._selected} />
																</span>
																<span className="dg-tbody-row-td-icon">{item._resource_icon}</span>
																{
																	this.Headers[index].link !== undefined && this.Headers[index].link === true &&
																	<span className="dg-tbody-row-td-text-link" onClick={this.OnClick_RowLink_Navigate.bind( this, item, this.Headers[index].key )}>{item[this.Headers[index].key]}</span>
																}
																{
																	this.Headers[index].link === undefined &&
																	<span className="dg-tbody-row-td-text">{item[this.Headers[index].key]}</span>
																}
																{
																	this.Headers[index].link === false &&
																	<span className="dg-tbody-row-td-text">{item[this.Headers[index].key]}</span>
																}
															</td>
														);

													}
													else if ( index === this.Headers.length - 1 )
													{
														_block = (
															<td key={index}>
																{
																	this.Headers[index].link !== undefined && this.Headers[index].link === true &&
																	<span className="dg-tbody-row-td-text-link"
																		onClick={this.OnClick_RowLink_Navigate.bind( this, item, this.Headers[index].key )}
																	>{item[this.Headers[index].key]}</span>
																}
																{
																	this.Headers[index].link === undefined &&
																	<span className="dg-tbody-row-td-text">{item[this.Headers[index].key]}</span>
																}
																{
																	this.Headers[index].link === false &&
																	<span className="dg-tbody-row-td-text">{item[this.Headers[index].key]}</span>
																}

															</td>
														);
													}
													else
													{
														_block = (
															<td key={index}>
																{
																	this.Headers[index].link !== undefined && this.Headers[index].link === true &&
																	<span className="dg-tbody-row-td-text-link"
																		onClick={this.OnClick_RowLink_Navigate.bind( this, item, this.Headers[index].key )}>{item[this.Headers[index].key]}</span>
																}
																{
																	this.Headers[index].link === undefined &&
																	<span className="dg-tbody-row-td-text">{item[this.Headers[index].key]}</span>
																}
																{
																	this.Headers[index].link === false &&
																	<span className="dg-tbody-row-td-text">{item[this.Headers[index].key]}</span>
																}
															</td>
														);
													}
													return ( _block );
												} )
											}
											{/* has actions */}
											{
												this.props.hasActions === true && 
												<td className="dg-action-column-header">
													<span className="dg-row-action-button">
														<SvgIcon icon={SvgIcon.Commands.Ellipsis} />
													</span>
												</td>
											}
										</tr>
									)
								)
							}
						</tbody>
					</table>
				</div>

			</div>
		);
	};
};