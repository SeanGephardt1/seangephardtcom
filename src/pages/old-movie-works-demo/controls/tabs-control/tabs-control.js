import React from 'react';
import './tabs-control.css';
import CtaButtonControl from './../buttons/cta-button.js';

class TabLabel extends React.Component
{
	static defaultProps = {
		SelectedStyle: "tab-label-selected",
		UnselectedStyle: "tab-label"
	}
	constructor( props )
	{
		//	console.debug( "TabLabel", props );
		super( props );
		this.isSelected = ( this.props.selected || false );
		this.HandleClick = this.props.event;	//	.bind( this );
		return;
	};
	render()
	{	//	console.debug( "TabLabel::render", this.props.selected );
		let _css;
		if ( this.props.selected === true )
		{
			_css = TabLabel.defaultProps.SelectedStyle;
		}
		else if ( this.props.selected === false )
		{
			_css = TabLabel.defaultProps.UnselectedStyle;
		}

		return (
			<div className="tab-label-button" onClick={this.HandleClick}>
				<span className={_css} >{this.props.label}</span>
			</div>
		); 
	};
};

class TabsHeader extends React.Component
{
	constructor( props )
	{
		super( props );
		return;
	};
	render()
	{	//	console.debug( "TabHeader::render::this.props.children", this.props.children );
		return (
			<div className="tab-label-header">{this.props.children}</ div>
		);
	};
};

class TabPanel extends React.Component
{
	constructor( props )
	{
		super( props );
		this.isSelected = ( this.props.selected || false );
		return;
	};
	render()
	{	//	console.debug( "TabPanel::render", this.isSelected, this.props.selected);
		return (
			<div className="tab-panel">{this.props.children}</div>
		);
	};
};

class TabsPanelCollection extends React.Component
{
	constructor( props )
	{
		super( props );
		return;
	};
	render()
	{	//	console.debug( "Application::render", this.state, this.props );
		return (
			<div className="tabs-panel-collection">{this.props.children}</div>	
		);
	};
};

class TabsContainer extends React.Component
{
	static defaultProps =
	{
		showFooter: true
	}
	constructor( props )
	{
		super( props );
		this.state = {
			showFooter: this.props.showFooter,
			selectedTab: 0,
			rancClicked: false
		};

		this.SelectedTab = 0;
		this.HeaderCollection = this.props.labels;
		this.PanelCollection = this.props.panels;

		this._ranc_default_text = "Review + create";
		this._ranc_create_text = "Create";
		this.ReviewAndCreateText = this._ranc_default_text;
		this.Handle_ReviewAndCreate = this.OnClick_ReviewAndCreate.bind( this, this.props.reviewCreateHandler );
		return;
	};
	OnClick_HandleEventCancelling( pe )
	{	//	console.debug( "OnClick_HandleEventCancelling" );
		pe.stopPropagation();
		pe.nativeEvent.stopImmediatePropagation();
		return;
	};
	OnClick_NullClick( pe )
	{	//	console.debug( "OnClick_NullClick" );
		this.OnClick_HandleEventCancelling( pe );
		return;
	}
	OnClick_NextButton( pe )
	{	//	console.debug( "OnClick_NextButton", this.state.selectedTab );
		this.ReviewAndCreateText = this._ranc_default_text;
		this.setState( { selectedTab: this.state.selectedTab + 1 } );
		return;
	};
	OnClick_PrevButton( idx, pe )
	{	//	console.debug( "OnClick_PrevButton", this.state.selectedTab );
		this.ReviewAndCreateText = this._ranc_default_text;
		this.setState( { selectedTab: this.state.selectedTab - 1 } );
		return;
	};
	OnClick_SelectTabLabel( idx, pe )
	{
		//	console.debug( "OnClick_SelectTabLabel", idx, pe );
		this.ReviewAndCreateText = this._ranc_default_text;
		this.setState( { selectedTab: idx } );
		return;
	};
	OnClick_ReviewAndCreate( args, pe )
	{	//	console.debug( "OnClick_ReviewAndCreate", this.state.selectedTab, (this.HeaderCollection.length - 1 ) );

		if ( this.state.selectedTab === ( this.HeaderCollection.length - 1 ) )
		{
			args( pe );
		}
		else
		{
			this.setState( { selectedTab: ( this.HeaderCollection.length - 1 ) } );
		}
		return;
	};
	render()
	{	//	console.debug( "TabsContainer:render:this.state.selectedTab", this.state.selectedTab, this.ReviewAndCreateText );
		if ( this.state.selectedTab === ( this.HeaderCollection.length - 1 ) )
		{
			if ( this.props.reviewButtonState !== false )
			{
				this.ReviewAndCreateText = this._ranc_create_text;
			}
		}

		let _tab_labels = [];

		for ( let i = 0; i < this.HeaderCollection.length; i++ )
		{	//	console.debug( "this.HeaderCollection", this.HeaderCollection[i] );
			if ( i === this.state.selectedTab )
			{
				_tab_labels.push( {
					label: this.HeaderCollection[i],
					index: i,
					selected: true
				} );
				//_current_panel = ( this.props.panels[i] );
			}
			else
			{
				_tab_labels.push( {
					label: this.HeaderCollection[i],
					index: i,
					selected: false
				} );
			}
		}
		//	console.debug( "TabsContainer:render()::_tab_labels", _tab_labels.length, this.state.selectedTab );
		//	<TabPanel>{_current_panel}</TabPanel>

		return (
			<div className="tabs-container" onClick={this.OnClick_HandleEventCancelling.bind(this)}>
				<TabsHeader>
					{
						_tab_labels.map( ( item, index ) => (
							<TabLabel key={index} label={item.label} selected={item.selected} event={this.OnClick_SelectTabLabel.bind( this, item.index )} />
						) )
					}
				</TabsHeader>
				<TabsPanelCollection>
					<TabPanel>
						{
							this.props.panels[this.state.selectedTab]
						}
					</TabPanel>
				</TabsPanelCollection>
				{
					this.props.showFooter &&
					<div className="tabs-container-footer">
						{
							this.props.reviewButtonState === false && 
							<CtaButtonControl
								ctaStyle={CtaButtonControl.CtaBtnStyles.Disabled}
								title={this.ReviewAndCreateText}
								eventHandler={this.OnClick_NullClick.bind( this )} />
						}
						{
							this.props.reviewButtonState !== false && 
							<CtaButtonControl
								ctaStyle={CtaButtonControl.CtaBtnStyles.Default}
								title={this.ReviewAndCreateText}
								eventHandler={this.Handle_ReviewAndCreate} />
						}
						{
							this.state.selectedTab === 0 && <CtaButtonControl
								ctaStyle={CtaButtonControl.CtaBtnStyles.Disabled}
								title="Previous"
								eventHandler={this.OnClick_HandleEventCancelling.bind(this)} />
						}
						{
							this.state.selectedTab !== 0 && <CtaButtonControl
								ctaStyle={CtaButtonControl.CtaBtnStyles.Inverse}
								title="Previous"
								eventHandler={this.OnClick_PrevButton.bind( this )} />
						}


						{
							this.state.selectedTab !== _tab_labels.length - 1 && <CtaButtonControl
								ctaStyle={CtaButtonControl.CtaBtnStyles.Inverse}
								title="Next"
								eventHandler={this.OnClick_NextButton.bind( this )} />
						}
						{
							this.state.selectedTab === _tab_labels.length - 1 && <CtaButtonControl
								ctaStyle={CtaButtonControl.CtaBtnStyles.Disabled}
								title="Next"
								eventHandler={this.OnClick_HandleEventCancelling.bind( this )}  />
						}
					</div>
				}
				{this.props.children}
			</div>
		);
	};
};

export
{
	TabLabel,
	TabsHeader,
	TabPanel,
	TabsPanelCollection,
	TabsContainer
};

