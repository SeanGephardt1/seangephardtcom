﻿"use strict";
"use strict";
const FilterViewModelTypes = {
	/* required global */
	Subscriptions: {
		title: "Subscriptions",
		filterColumnKey: "Subscription",
		type: "subscriptions-type",
		infoText: "Select from a list of subscriptions",
		desc: "Subscriptions available in your directory and/or the tenant provided by your company or consultant",
		isRemovable: true,
		hasMore: true,
		hasSelectAll: true,
		hasSearch: true,
		data: [
			"Contoso",
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
		],
	},
	DataLocations: {
		title: "Locations",
		filterColumnKey: "ResourceLocation",
		desc: "Regions where datacenters are located",
		isRemovable: true,
		hasMore: true,
		hasSelectAll: true,
		data: [
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
		],
	},
	ResourceGroups: {
		title: "Resource Groups",
		filterColumnKey: "ResourceGroup",
		infoText: "Select from a list of resource groups",
		desc: "Resource groups help organize resrouces for your team",
		isRemovable: true,
		hasMore: true,
		hasSelectAll: true,
		data: [
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
		],
	},
	ResourceTypes: {
		title: "Resource types",
		filterColumnKey: "ResourceType",
		infoText: "Select from a list of resource types",
		desc: "Resources are the different services and objects that you have access to",
		isRemovable: true,
		hasMore: true,
		hasSelectAll: true,
		data: [
			"Access reviews",
			"Alerts",
			"API connections",
			"App Service",
			"App Services Certificates",
			"App Service plans",
			"Application Insights",
			"Application gateways",
			"Azure Cosmos DB",
			"Azure Information Protection",
			"App Service Domains",
			"Advisor",
			"App registrations",
			"App Service environments",
			"AppDynamics",
			"Automation account",
			"Azure Active Directory",
			"Azure Databricks",
			"Batch account",
			"Bot services",
			"Bing APIs",
			"CDN profiles",
			"Containers",
			"Container registrations",
			"Cognitive Services",
			"Cost management + billing",
			"DevOps projects",
			"Devices",
			"Devices configuration",
			"Devices enrollment",
			"DNS zones",
			"Disks",
			"Disks (classic)",
			"eBooks",
			"Entreprise applications",
			"Event Hubs",
			"Event Hubs Clusters",
			"Firewalls",
			"Free services",
			"Function Apps",
			"Groups",
			"Help + Support",
			"Images",
			"InTune",
			"InTune roles",
			"IoT Hub",
			"Key vaults",
			"Lab accounts",
			"Local network gateways",
			"Logic Apps",
			"Machine Learning Services",
			"Management groups",
			"Mesa applications",
			"Marketplace",
			"Metrics",
			"Mobile apps",
			"Media services",
			"Microsoft InTune",
			"Monitor",
			"Network Interfaces",
			"Network Watcher",
			"Network security groups",
			"Network security groups (classic)",
			"On-premise access",
			"OS Images",
			"Policy",
			"Power BI",
			"Public IP addresses",
			"Relays",
			"Reservations",
			"Resource groups",
			"Route tables",
			"Route filters",
			"Reserved IP addresses",
			"Search services",
			"Security Center",
			"Service Fabric",
			"Service Health",
			"Software as a Service (SaaS)",
			"Software updates",
			"SQL Server",
			"SQL database",
			"Storage accounts",
			"Subscriptions",
			"Tags",
			"Team projects",
			"Troubleshoot",
			"User privacy",
			"Users",
			"Virtual Machines",
			"Virtual Machines scale sets",
			"Virtual Machines (classic)",
			"Virtual Networks",
			"Virtual Networks (classic)",
			"Virtual Networks gateways",
			"Virtual Networks images",
		],
	},
	TagsList: {
		title: "Tags",
		filterColumnKey: "TagsListFilter",
		infoText: "Select from a list of tags",
		isRemovable: false,
		IsTags: true,
		hasOperators: true,
		operators: [
			{ name: "equals", value: "=" },
			{ name: "not equals", value: "!=" },
			{ name: "equals or less than", value: "<=" },
			{ name: "equals or greater than", value: "=>" },
			{ name: "contains", value: "" },
		],
		hasMore: true,
		hasSelectAll: true,
		hasDataHeaders: true,
		hasSearch: false,
		data: [
			{ name: "Environment", tagName: "env", list: ["prod", "test", "preview", "internal", "external", "external-1234-erfvg-345-fgb-56-hgfghj-456-456-3-3453435"] },
			{ name: "Cost center", tagName: "cc", list: ["1", "2", "3", "4", "5", "99", "1000", "1337"] },
			{ name: "Phase", tagName: "phase", list: ["One", "Two", "Three", "Four", "GA", "Private preview", "Public preview"] },
			{ name: "Department", tagName: "dept", list: ["r&d", "engineering", "sales", "marketing", "support", "hr", "legal", "facilities", "brick&mortar"] },
			{ name: "Created", tagName: "created", list: ["1/1/2019", "April 2018", "2015", "2016", "2017", "2018", "2019"] },
			{ name: "AppName", tagName: "ap-name", list: ["Contoso", "Fabrikam", "Pirate-Portal", "Windy City Wheels", "TopTree Travel", "MoMoney", "GuitarPlanet1"] },
			{ name: "Location", tagName: "loc", list: ["west1", "west2", "west3", "east1", "east2", "east3", "europe1", "europe2", "Central US", "South Africa", "South America"] },
			{ name: "Created by", tagName: "createdBy", list: ["jsmith", "april@reagan.com", "allyourbase", "connief", "smithers", "Johnny Appleseed"] },
			{ name: "Version", tagName: "version", list: ["1.0.0", "1.0.1", "1.0.3", "1.1.0", "1.1.2", "1.1.5", "1.1.7", "1.1.8", "1.1.9", "1.2.0", "1.2.6", "1.2.7", "1.5.1", "2.0.0", "2.0.2",] },
		],
	},

	/* notcurrently used - resource specific filters */
	Environments: {
		title: "Environments",
		filterColumnKey: "Environment",
		infoText: "Select from a list of environments",
		isRemovable: true,
		hasSelectAll: true,
		data: [
			"Azure",
			"Non-Azure"
		],
	},
	AppType:
	{
		title: "App Type",
		filterColumnKey: "AppType",
		isRemovable: true,
		hasMore: true,
		infoText: "Select app types",
		data: [
			"Web app",
			"App service environment",
			"Funcation app",
			"Logic app",
		],
	},
	AppServicePlan:
	{
		title: "App service plan",
		filterColumnKey: "AppServicePlan",
		isRemovable: true,
		hasMore: true,
		infoText: "Select plans",
		data: [
			"West_US_Free",
			"DefaultServerFarm",
			"Ibiza reflector plan",
			"PortalFX analytics",
		],
	},
	PricingTiers:
	{
		title: "Pricing tiers",
		filterColumnKey: "PricingTier",
		isRemovable: true,
		hasMore: true,
		infoText: "Select pricing tiers",
		data: [
			"Free",
			"Standard",
			"Premium",
		],
	},

	/* marketplace - prelim */
	MarketPricing: {
		title: "Price",
		filterColumnKey: "PricingTier",
		infoText: "Select from a list of pricing options",
		isRemovable: false,
		hasSelectAll: true,
		data: [
			"Free",
			"Pay as your go",
			"Bring your own license",
		],
	},
	Publishers: {
		title: "Publisher",
		filterColumnKey: "Publisher",
		infoText: "Select from a list of publishers",
		isRemovable: false,
		hasSelectAll: true,
		// add data dynamically
		data: [],
	},
	OperatingSystems: {
		title: "Operating systems",
		filterColumnKey: "OperatingSystem",
		infoText: "Select from a list of operating systems",
		isRemovable: true,
		hasSelectAll: true,
		data: [
			"Windows",
			"Linux"
		],
	},


	/* virtual machine specific filters, lifted from the portal */
	AvailSets:
	{
		title: "Kind",
		filterColumnKey: "AvailabilitySet",
		isRemovable: true,
		hasMore: true,
		infoText: "Select from a list of Availability sets",
		data: [
			"Fxci3-argsz-avst-1",
			"Fxci7-argsz-avst-2",
			"Fxci9-argsz-avst-3",
			"Fxci1-argsz-avst-4",
			"Fxci0-argsz-avst-5",
			"Fxci0-argsz-avst-6",
			"Fxci9-argsz-avst-7",
			"Fxci1-argsz-avst-8",
			"Fxci0-argsz-avst-9",
			"Fxci0-argsz-avst-10",
		],
	},
	IPAddresses: {
		title: "IP 4 Address",
		filterColumnKey: "IP_Address",
		isIpFilter: true,
		isRemovable: true,
		hasMore: true,
		hasSearch: true,
		infoText: "Select from a list of IP addresses",
		data: [
			"10.1.1.1",
			"11.10.110.1",
			"12.10.120.1",
			"177.1.255.179",
			"37.37.111.1",
			"25.10.250.1",
			"49.10.49.1",
			"51.12.151.1",
			"73.14.100.1",
			"99.15.1.1",
			"113.10.27.192",
			"127.1.1.1",
			"191.10.1.1",
			"192.18.71.1",
			"201.24.255.1",
			"211.57.179.165",
			"247.179.81.91",
			"255.201.120.21",
		],
	},
	PublicIPAddresses: {
		title: "Public IP Address",
		filterColumnKey: "Public_IP_Address",
		isRemovable: true,
		hasMore: true,
		hasSearch: true,
		infoText: "Select from a list of IP addresses",
		data: [""],
	},
	OSTypes: {
		title: "OS Type",
		filterColumnKey: "OperatingSystem",
		infoText: "Select from a list of operating systems",
		isRemovable: true,
		hasSelectAll: true,
		data: [
			"Windows",
			"Linux"
		],
	},
	VirtualNetworks:
	{
		title: "Virtual network",
		filterColumnKey: "VirtualNetwork",
		isRemovable: true,
		hasMore: true,
		infoText: "Select from a list of Virtual networks",
		data: [
			"FxCI3Jenkins-vnet",
			"Horseman1-vnet",
			"Horseman2-vnet",
			"Horseman3-vnet",
			"SalesMarCom1-vnet",
			"SalesMarCom2-vnet",
			"SalesMarCom3-vnet",
			"IT-Web-1-vnet",
			"IT-Web-2-vnet",
			"IT-Web-3-vnet",
		],
	},
	Disks:
	{
		title: "Disks",
		filterColumnKey: "Disk",
		isRemovable: true,
		hasMore: true,
		infoText: "Select from a list of disks",
		data: [
			"1",
			"2",
			"3",
			"4",
		],
	},
	DiskEncryption:
	{
		title: "Disk encryption",
		filterColumnKey: "DiskEncryption",
        isRemovable: true,
        hasMore: true,
		infoText: "disk encryption setting",
        data: [
            "Enabled",
            "Not enabled"
        ],
	},
	ManagedDisks:
	{
		title: "Managed Disks",
		filterColumnKey: "ManagedDisks",
		isRemovable: true,
		hasMore: true,
		infoText: "values for managed disks",
		data: [
			"Yes",
			"No",
			"Not supported",
		],
	},
	Subnet:
	{
		title: "Subet",
		filterColumnKey: "Subnet",
        isRemovable: true,
        hasMore: true,
		infoText: "Select Subnet",
		data: [
			"default",
            "aka.ms",
			"aks-subnet-1",
			"aks-subnet-2",
			"aks-subnet-3",
			"aka-msft-1",
			"aka-msft-2",
			"aka-msft-3",
        ],
	},
    Status:
    {
		title: "Status",
		filterColumnKey: "Status",
        isRemovable: true,
        hasMore: true,
		infoText: "Select statuses",
        data: [
            "Running",
			"Stopped",
			"Stopped (deallocated)",
        ],
    },

    /* functionality related and configured */
	SearchPill:
	{
		title: "Search",
		infoText: "Find by name",
		IsSearchPill: true,
		IsAddPill: false,
		isRemovable: false,
		hasMore: false,
		hasSelectAll: false,
		hasSearch: false,
		data:[]
	},
	AddButton: {
		title: "Add a filter",
		infoText: "Select from a list of other filters",
		IsSearchPill: false,
		IsAddPill: true,
		isRemovable: false,
		hasMore: false,
		hasSelectAll: false,
		hasSearch: false,
		data: [],
	},
	ResetButton:
	{
		title: "Reset filters",
		infoText: "Reset filters to the default settings",
		IsSearchPill: false,
		IsResetPill: true,
		IsAddPill: false,
		isRemovable: false,
		hasMore: false,
		hasSelectAll: false,
		hasSearch: false,
		data: [],
	},
	Grouping:
	{
		title: "Grouping",
        isRemovable: false,
		hasMore: true,
		hasSelectAll: false,
        hasSearch: false,
		infoText: "Select a grouping criteria",
		data: [
			"No Grouping",
			"Group by subscription",
			"Group by location",
			"Group by resource group",
			"Group by resource type",
		],
	},
};

let BrowseAll_PillsData = [
	FilterViewModelTypes.SearchPill,
	FilterViewModelTypes.Subscriptions,
	FilterViewModelTypes.ResourceGroups,
	FilterViewModelTypes.DataLocations,
	FilterViewModelTypes.ResourceTypes,
	FilterViewModelTypes.TagsList,
	FilterViewModelTypes.ResetButton
];

let VirtualMachine_PillsData = [
	FilterViewModelTypes.SearchPill,
	FilterViewModelTypes.Subscriptions,
	FilterViewModelTypes.ResourceGroups,
	FilterViewModelTypes.DataLocations,
	FilterViewModelTypes.TagsList,
	FilterViewModelTypes.IPAddresses,
	FilterViewModelTypes.VirtualNetworks,
	FilterViewModelTypes.AvailSets,
	FilterViewModelTypes.AppServicePlan,
	FilterViewModelTypes.Disks,
	FilterViewModelTypes.OSTypes,
	FilterViewModelTypes.Status,
	FilterViewModelTypes.AddButton,
	FilterViewModelTypes.ResetButton
];

let MarketPlaceAll_PillsData = [
	FilterViewModelTypes.SearchPill,
	FilterViewModelTypes.MarketPricing,
	FilterViewModelTypes.OperatingSystems,
	FilterViewModelTypes.Publishers,
	FilterViewModelTypes.ResetButton
];