/// <reference path="knockout-3.4.0.js" />
// SKG.COM ViewModel template V 1.1
"use strict";
function TEMPLATE_ViewModel(title, debugFlag)
{
	var _self = this;
	this.ID = ko.pureComputed(function () { return "id-" + Math.random().toPrecision(7).replace(".", ""); }, this);
	this.Title = ko.observable(title);
	this.DEBUGFLAG = ko.observable(debugFlag || false);
	this.DebugOutput = ko.pureComputed(function ()
	{
	    console.log("DebugOutput::", this, _self );
		return;
	}, this);


    //  Handle All Clicks on the body element, return false.
    //  <body data-bind="event: { click: CloseAllFlyouts}, clickBubble: false">
	this.OnClick_CloseAll = function ( viewModel, event )
	{
	    if ( this.DEBUGFLAG() == true )
	    {
	        console.debug( "this.CloseAll", viewModel, event );
	    }
	    var _rv_false = false;
	    // handle objects like popups, drop down menus and other UI events
	    return _rv_false;
	};
	return;
}