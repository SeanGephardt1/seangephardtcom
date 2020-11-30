import { ResourceExtensions } from "../extensions-list.js";
import SvgIconControl from "./../components/svg-icons/svg-icon.js";
import CheckBoxControl from "./../components/checkbox/checkbox.js";
import { MarketPlaceData } from "./../extensions/azure-marketplace/_mp_data.js";
import { VirtualMachine } from "./../extensions/virtual-machine/virtual-machine-ext.js";

const _subscriptions_names = [
	"Contoso Corp",
	"Fabrikam",
	"Web Portal (dev)",
	"Web Portal (pre)",
	"Web Portal (prod)",
	"Mobile Portal (dev)",
	"Mobile Portal (prod)",
	"IoT Portal (dev)",
	"IoT Portal (prod)",
	"Finance (prod)",
	"Procurement",
	"Human Resources (dev)",
	"Human Resources (prod)",
	"Marketing & Sales (dev)",
	"Marketing & Sales (pre)",
	"Marketing & Sales (prod)",
	"IT public subscription (dev)",
	"IT public subscription (prod)",
	"IT internal subscription",
	"Design Studio (dev)",
	"Design Studio (pre)",
	"Design Studio (prod)",
];
const _resource_group_names = [
	"Contoso WW IoT",
	"Fabrikam Public Portal RG 1",
	"Fabrikam Public Portal RG 2",
	"Web Team APIs",
	"Marketing DB",
	"IT Helpdesk",
	"Procurement Portal",
	"Engineering Portal",
	"Sales Leads - mobile",
	"Sales Leads - web",
	"Public Site",
	"Public mobile app",
	"iOS mobile app",
	"Windows mobile app",
	"XBOX cloud app",
	"XBOX client app",
	"XBOX mobile app",
	"XBOX web app",
	"PS4 server app",
	"PS4 client app",
];
const _resource_locations = [
	"US West 1",
	"US West 2",
	"US West 3",
	"US West 4",
	"US West 5",
	"US East 1",
	"US East 2",
	"US East 3",
	"US East 4",
	"US East 5",
	"US Central 1",
	"US Central 2",
	"US Central 3",
	"US Central 4",
	"US Central 5",
	"Europe 1",
	"Europe 2",
	"Europe 3",
	"Europe 4",
	"Europe 5",
	"Africa 1",
	"Africa 2",
	"Africa 3",
	"Africa 4",
	"Africa 5",
	"China 1",
	"China 2",
	"China 3",
	"China 4",
	"China 5",
];
const _resource_names = [
	"Freezing Frog",
	"All Your Base",
	"Alpha Caterpillar",
	"Boring Crow",
	"Dancing Butterfly",
	"Crouching Panda",
	"Happy Kitten",
	"Dusty Dog",
	"Zuper Zebra",
	"Jazzy Jolopy",
	"Ghoti The Band",
	"Holiday Trout",
	"King Crocodile",
	"Beta Dogma",
	"Flying Frisbee",
	"Munching Manatee",
	"Screaming Demon",
	"Batcave INTL",
	"Rocky Mountain",
	"Space Mountain",
	"WaterWorld",
	"Rob's Virtual Laptop",
	"Zuper Zoo",
];
const _resource_type_names = function ()
{
	//	console.debug( "_resource_type_names" );
	let _type_names = ResourceExtensions.filter( (item )=>{ return item.defaultProps.TypeName });
	//	console.debug( "_type_names", _type_names );
	return _type_names;
};
const _cloud_environment_names = [
	"Azure",
	"AWS",
	"GPC",
	"HP",
	"IBM",
	"Non-Azure"
];
const _os_names = [
	"Windows",
	"Linux"
];
const _os_full_names = [
	//	https://docs.microsoft.com/en-us/azure-stack/operator/azure-stack-supported-os
	"Windows Server, version 1709",
	"Windows Server 2016",
	"Windows Server 2012 R2",
	"Windows Server 2012",
	"Windows Server 2008 R2 SP1",
	"Windows Server 2008 SP2",
	"Windows 10",
	"CentOS-based 6.9",
	"CentOS-based 7.4",
	"ClearLinux",
	"Container Linux",
	"Debian 8 'Jessie'",
	"Debian 9 'Stretch'",
	"Red Hat Enterprise Linux 7.x+",
	"SLES 11SP4",
	"SLES 12SP3",
	"Ubuntu 14.04-LTS",
	"Ubuntu 16.04-LTS",
	"Ubuntu 18.04-LTS"
];
const _statuses = [
	"Running",
	"Stopped",
	"Stopped (deallocated)",
	"On",
	"Off",
	"Restarting",
	"Active",
	"Non-active",
	"Suspended"
];
const _role_types = [
	"Resource access",
	"Owner",
	"Contributor",
	"Account admin",

];

const _services_types = [
	{ name: "Management Groups", icon: SvgIconControl.Extensions.ManagementGroups, keywords: "" },
	{ name: "Subcriptions", icon: SvgIconControl.Extensions.Subscriptions, keywords: "" },
	{ name: "Virtual machine", icon: SvgIconControl.Extensions.Subscriptions, keywords: "" },
	{ name: "Activity log", icon: SvgIconControl.Extensions.ActivityLog, keywords: "" },
	{ name: "Availibility sets", icon: SvgIconControl.Extensions.AvailabilitySet, keywords: "" },
	{ name: "App services", icon: SvgIconControl.Extensions.AppServices, keywords: "" },
	{ name: "SQL servers", icon: SvgIconControl.Extensions.SqlServer, keywords: "" },
	{ name: "SQL databases", icon: SvgIconControl.Extensions.SqlServer, keywords: "" },
	{ name: "SQL data warehouses", icon: SvgIconControl.Extensions.SqlServer, keywords: "" },
	{ name: "SQL virtual machines", icon: SvgIconControl.Extensions.SqlServer, keywords: "" },
	{ name: "All resources", icon: SvgIconControl.Extensions.AllResources, keywords: "" },
	{ name: "Resource groups", icon: SvgIconControl.Extensions.ResourceGroups, keywords: "" },
	{ name: "Function apps", icon: SvgIconControl.Extensions.AllFunctionApps, keywords: "" },
	{ name: "Azure Active Directory", icon: SvgIconControl.Extensions.AzureActiveDirectory, keywords: "" },
	{ name: "Monitoring", icon: SvgIconControl.Extensions.Monitoring, keywords: "" },
	{ name: "Azure Marketplace", icon: SvgIconControl.Extensions.Marketplace, keywords: "" },
	{ name: "Cost management + billing", icon: SvgIconControl.Extensions.CostAndBilling, keywords: "" },
];

class _DataRow
{
	constructor( props )
	{
		this.Subscription = _subscriptions_names[0];
		this.ResourceGroup = _resource_group_names[0];
		this.Name = _resource_names[0];
		this.Location = _resource_locations[0];
	};
};
export default class _DataGenerator
{	
	static GenerateValue( list )
	{
		let _rnd = Math.round( Math.random() * list.length - 1 );
		if ( _rnd < 0 )
		{
			_rnd = list.length - 1;
		}
		let _rv = list[_rnd];
		//	console.debug( "_rnd", _rnd, "_ext", _ext.name );
		return _rv;
	};
	static GenerateGUID()
	{
		const _numeric = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		const _hex_alpha = ["A", "B", "C", "D", "E", "F"];

		let _temp_guid = [];
		let bit_array = _numeric.concat( _hex_alpha );

		for ( var i = 0; i < 36; i++ )
		{
			if ( i === 8 || i === 13 || i === 18 || i === 23 )
			{
				_temp_guid[i] = "-";
			}
			else
			{
				_temp_guid[i] = _DataGenerator.GenerateValue( bit_array );
			}
			//	console.debug( "_temp_guid = ", _temp_guid.join( "" ) );
		}

		let _fini = _temp_guid.join( "" );
		//	console.log( "_fini = ", _fini );
		return _fini;
	};
	static GenerateMoneyValue()
	{
		let _temp = "$" + ( Math.random() * 999.99 ).toFixed( 2 );
		return _temp;
	};
	static GenerateLastViewDate()
	{
		let _temp;

		let _base_date = new Date();
		//console.debug( "_base_date", _base_date );

		let _scope_date = new Date(
			_base_date.getFullYear(),
			Math.round( Math.random() * 11 ),
			Math.round( Math.random() * 31 ),
			Math.round( Math.random() * 23 ),
			Math.round( Math.random() * 59 ),
		);
		//	console.debug( "_scope_date", _scope_date );

		let _day_name;
		switch ( _scope_date.getDay() )
		{
			case 0: {
				_day_name = "Sun";
				break;
			}
			case 1: {
				_day_name = "Mon";
				break;
			}
			case 2: {
				_day_name = "Tue";
				break;
			}
			case 3: {
				_day_name = "Wed";
				break;
			}
			case 4: {
				_day_name = "Thu";
				break;
			}
			case 5: {
				_day_name = "Fri";
				break;
			}
			case 6: {
				_day_name = "Sat";
				break;
			}
			default: {
				_day_name = "Haxorday";
				break;
			}
		}

		let _hour;
		if ( _scope_date.getHours() > 12 )
		{
			_hour = _scope_date.getHours() - 12 ;
		}
		else
		{
			_hour = _scope_date.getHours();
		}

		let _mins;
		if ( _scope_date.getMinutes() < 10 )
		{
			_mins = "0" + _scope_date.getMinutes();
		}
		else
		{
			_mins = _scope_date.getMinutes();
		}

		let _am_pm = ( Math.round( Math.random() ) ) ? "AM" : "PM";

		_temp = _day_name + " at " + _hour + ":" + _mins + " " + _am_pm;
		//	console.debug( "_temp", _temp );
		return _temp;
	};

	// SPECIFIC FOR "BROWSE/ALL RESOURCES" EXTENSION
	static GenerateHomeRecentResources( count )
	{	//	console.debug( "GenerateHomeRecentResources", count );
		let _data_list = [];

		for ( let i = 0; i < count; i++ )
		{
			let _ext = _DataGenerator.GenerateValue( ResourceExtensions );
			let _res_name = _DataGenerator.GenerateValue( _resource_names );
			let _last_viewed = _DataGenerator.GenerateLastViewDate();

			const _data_row = {
				Resource: _ext,
				Props: _ext.defaultProps,
				Type: _ext.defaultProps.TypeName,
				Icon: _ext.defaultProps.Icon,
				Name: _res_name,
				LastViewed: _last_viewed
			};
			//	console.debug( "_data_row", _data_row );
			_data_list.push( _data_row );
		}

		const _data_row = {
			Resource: ResourceExtensions[4],
			Props: VirtualMachine.defaultProps,
			Type: VirtualMachine.defaultProps.TypeName,
			Icon: VirtualMachine.defaultProps.Icon,
			Name: VirtualMachine.defaultProps.Title,
			LastViewed: _DataGenerator.GenerateLastViewDate()
		};
		_data_list.splice( 3, 3, _data_row );
		//	console.debug( "planted::_data_row", _data_row );
		return _data_list;
	};

	// SPECIFIC FOR "BROWSE/ALL RESOURCES" EXTENSION
	static AllResourcesColumns = [
		//{ name: "Icon", key: "_resource_icon", visible: true },
		{ name: "Name", key: "_resource_name", link:true, visible: true },
		{ name: "Type", key: "_resource_type", link: false, visible: true },
		{ name: "Resource Group", key: "_resource_group", link: true, visible: true },
		{ name: "Subscription", key: "_subscription", link: true, visible: true },
		{ name: "Location", key: "_location", link:false, visible: true },
		{ name: "Status", key: "_resource_status", visible: false },
		{ name: "Tags", key: "_tags", visible: false },
		{ name: "Location ID", key: "_location_ID", visible: false },
	];
	static GenerateAllResourcesData(count)
	{	//	console.debug( "_AllResourcesData.GenerateData()", count );
		let _data_list = [];

		for ( let i = 0; i < count; i++ )
		{
			let _ext = _DataGenerator.GenerateValue( ResourceExtensions );
			let _res_name = _DataGenerator.GenerateValue( _resource_names );
			let _res_group_name = _DataGenerator.GenerateValue( _resource_group_names );
			let _sub_name = _DataGenerator.GenerateValue( _subscriptions_names );
			let _loc = _DataGenerator.GenerateValue( _resource_locations );
			let _status = _DataGenerator.GenerateValue( _statuses );
			let _hidden_flag = Math.round( Math.random() ) ? true : false;

			const _data_row = {
				_resource: _ext,
				_resource_defaultProps: _ext.defaultProps,
				_resource_type: _ext.defaultProps.TypeName,
				_resource_icon: _ext.defaultProps.Icon,
				_resource_name: _res_name,
				_resource_group: _res_group_name,
				_subscription: _sub_name,	
				_location: _loc,
				_resource_status: _status,
				_status: "on",
				_test: "foo",
				_retired: false,
				_selected: CheckBoxControl.States.UnChecked,
				_hidden: _hidden_flag,
				_tags: [
					{ name: "Created by", value: "robtaft" },
					{ name: "Owned by", value: "seange" },
					{ name: "Last updated by", value: "jackieg" },
				]
			};
			//	console.debug( "_data_row", _data_row );
			_data_list.push( _data_row );
		}
		return _data_list;
	};

	// SPECIFIC FOR "ALL SUBSCRIPTIONS" EXTENSION
	static AllSubscriptionsColumns = [
		{ name: "Subscription", key: "_sub_name", link: false, visible: true },
		{ name: "Subscription ID", key: "_sub_id", link: false, visible: true },
		{ name: "My Role", key: "_role_type", link: false, visible: true },
		{ name: "Current Cost", key: "_current_cost", link: false, visible: true },
		{ name: "Status", key: "_status", link: false, visible: true },
		{ name: "Action", key: "_action", link: false, visible: false },
	];
	static GenerateAllSubscriptionsData( count )
	{	//	console.debug( "_AllResourcesData.GenerateData()", count );
		let _data_list = [];

		for ( let i = 0; i < _subscriptions_names.length; i++ )
		{
			const _data_row = {
				_sub_name: _subscriptions_names[i],
				_sub_id: _DataGenerator.GenerateGUID(),
				_role_type: _DataGenerator.GenerateValue( _role_types ),
				_current_cost: _DataGenerator.GenerateMoneyValue(),
				_status: _DataGenerator.GenerateValue( _statuses )
			};
			//	console.debug( "_data_row", _data_row );
			_data_list.push( _data_row );
		}
		return _data_list;
	};

	// SPECIFIC FOR "ALL VIRTUAL MACHINES" EXTENSION
	static AllVMsColumns = [
		{ name: "Name", key: "_resource_name", link: true, visible: true },
		{ name: "Type", key: "_resource_type", link: false, visible: true },
		{ name: "Status", key: "_resource_status", visible: true },
		{ name: "Resource Group", key: "_resource_group", link: true, visible: true },
		{ name: "Location", key: "_location", link: false, visible: true },
		{ name: "Maintenance Status", key: "_main_status", link: false, visible: true },
		{ name: "Subscription", key: "_subscription", link: true, visible: true },
	];
	static GenerateAllVirtualMachinesData( count )
	{	//	console.debug( "_AllResourcesData.GenerateData()", count );
		let _data_list = [];

		for ( let i = 0; i < count; i++ )
		{
			let _rnd = Math.random().toFixed(3).toString().split( "." );
			//	console.debug( _rnd );
			let _ext = ResourceExtensions[4];	//_DataGenerator.GenerateValue( ResourceExtensions );
			let _res_name = _DataGenerator.GenerateValue( _resource_names ) + "-" + _rnd[1].toString(); 
			let _res_group_name = _DataGenerator.GenerateValue( _resource_group_names );
			let _sub_name = _DataGenerator.GenerateValue( _subscriptions_names );
			let _loc = _DataGenerator.GenerateValue( _resource_locations );
			let _status = _DataGenerator.GenerateValue( _statuses );

			const _data_row = {
				_resource: _ext,
				_resource_defaultProps: _ext.defaultProps,
				_resource_type: _ext.defaultProps.TypeName,
				_resource_icon: _ext.defaultProps.Icon,
				_resource_name: _res_name,
				_resource_group: _res_group_name,
				_subscription: _sub_name,
				_location: _loc,
				_resource_status: _status,
				_main_status: "-",
				_selected: CheckBoxControl.States.UnChecked,
			};
			//	console.debug( "_data_row", _data_row );
			_data_list.push( _data_row );
		}

		const _data_row = {
			_resource: ResourceExtensions[4],
			_resource_defaultProps: VirtualMachine.defaultProps,
			_resource_type: VirtualMachine.defaultProps.TypeName,
			_resource_icon: VirtualMachine.defaultProps.Icon,
			_resource_name: VirtualMachine.defaultProps.Title,
			_resource_group: _resource_group_names[1],
			_subscription: _subscriptions_names[1],
			_location: _resource_locations[1],
			_resource_status: _statuses[0],
			_main_status: "-",
			_selected: CheckBoxControl.States.UnChecked,
		};
		//	console.debug( "planted::_data_row", _data_row );
		_data_list.splice(4,5, _data_row );

		return _data_list;
	};

	// SPECIFIC FOR GLOBAL SEARCH
	static GenerateGlobalSearchData()
	{	//	console.debug( "GenerateGlobalSearchData" );
		let _rv = {
			Services: _services_types,
			Resources: _DataGenerator.GenerateAllResourcesData(50),
			Marketplace: MarketPlaceData.slice(0,20),
			Documentation: [
				{ name: "Microsoft Azure documentation | Microsoft Docs" },
				{ name: "Managing Azure subscriptions| Microsoft Docs" },
				{ name: "Azure web apps and App services | Microsoft Docs" },
				{ name: "SQL data warehouses on Azure | Microsoft Docs" },
				{ name: "SQL servers configuration | Microsoft Docs" },
				{ name: "SQL database migration | Microsoft Docs" },
				{ name: "SQL database migration | Microsoft Docs" },
				{ name: "Creating a custom role | Microsoft Docs" },
				{ name: "Managing Virtual machines | Microsoft Docs" },
				{ name: "Azure Databricks | Microsoft Docs" },
				{ name: "Azure Active Directory | Microsoft Docs" },
			],
			ResourceGroups: [
				{ name: _resource_group_names[0], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[1], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[2], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[3], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[4], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[5], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[6], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[7], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[8], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[9], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[10], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[11], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[12], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[13], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[14], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[15], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[16], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[17], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[18], icon: SvgIconControl.Extensions.ResourceGroups },
				{ name: _resource_group_names[19], icon: SvgIconControl.Extensions.ResourceGroups }
			]
		};

		//	console.debug( "GenerateGlobalSearchData", _rv);
		return _rv;
	};
};

export
{
	_DataRow as DatRow,
	_DataGenerator as DataGen,
	_subscriptions_names as SubscriptionNames,
	_resource_locations as LocationNames,
	_resource_group_names as ResourceGroupNames,
	_resource_type_names as ResourceTypeNames,
	_resource_names as ResourceNames,
	_cloud_environment_names as CloudNames,
	_os_names as OSNames,
	_os_full_names as OSFullNames,
	_statuses as StatusNames,
	_services_types as Services
};