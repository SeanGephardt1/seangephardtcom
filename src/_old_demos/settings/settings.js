import React from './react';
import { ThemeContext } from '../../js/theme-context.js';
import { Themes } from '../../js/themes.js';
import { Layouts } from '../../js/layouts.js';

import './settings.css';
import SVG from '../../art/svgs.js';

export default class Settings extends React.Component
{
    static contextType = ThemeContext;
	static defaultProps = {
		Title: "Site settings",
		LinkTitle: "Settings",
        Href: "/settings",
        Icon: SVG.AppNavButtons.Settings
	};
    constructor( props )
    {
        super( props );
        this.state = {};
        this.ThemesList = Themes;
        this.LayoutsList = Layouts;
        document.title = this.props.Title;
        return;
    };
    render()
    {
		//  console.debug( "Settings.render()", this.context );
        let { _header_color, _btn_style, _color_style } = {}; // = { color: this.context.Theme.Background };

        if ( this.context.Theme.Background === "rgba(255,255,255,1)" )
        {
            _color_style = { color: this.context.Theme.Foreground };
        }
        else
        {
            _color_style = {
                color: this.context.Theme.Background,
                fontFamily: this.context.Theme.FontFamily
            };

            _btn_style = {
                backgroundColor: this.context.Theme.Background,
                color: this.context.Theme.Foreground,
                //fontFamily: this.context.Theme.FontFamily
            };

            _header_color = {
                color: this.context.Theme.Background,
                borderBottomColor: this.context.Theme.Background,
            };
        }

        return (
            <div>
                <h1 className="settings-header" style={_header_color}>Site settings</h1>

                <h3 className="setting-row-header" style={_color_style}>Change the site theme</h3>
                <div className="settings-row">
                    {
                        this.ThemesList.map( ( item, index ) => (
                            <button
                                key={index}
                                className="setting-btn"
                                style={_btn_style}
                                onClick={this.context.ToggleThemes.bind( this, item )}>{item.Name}</button>
                        ) )
                    }
                </div>

                <h3 className="setting-row-header" style={_color_style}>Change the site layout</h3>
                <div className="settings-row">
                    {
                        this.LayoutsList.map( ( item, index ) => (
                            <button
                                key={index}
                                className="setting-btn"
                                style={_btn_style}
                                onClick={this.context.ToggleLayouts.bind( this, index )}>{item.Name}</button>
                        ) )
                    }
                </div>

                {/*
                <h3 className="setting-row-header" style={_color_style}>Random features</h3>
                <div className="settings-row">
                    <button
                        className="setting-btn"
                        style={_btn_style}
                        onClick={this.context.OpenAside.bind( this, 'testing' )}>Show the context panel</button>
                 </div>
              */}
            </div>
        );
    }
};
