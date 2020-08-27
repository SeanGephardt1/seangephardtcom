import React from 'react';

import './home.css';
import SVG from '../../art/svgs.js';


export default class About extends React.Component
{
	static defaultProps = {
		Title: "About...",
		LinkTitle: "About",
        Href: "/about",
		Icon: SVG.AppNavButtons.About
	};
    constructor( props )
    {
        super( props );
        this.state = {};
        document.title = this.Title;
        return;
    };
    render()
    {
		//  console.debug( "About.render()", this.context );
		//let _style = {
		//	backgroundColor: this.context.Theme.Background,
		//	color: this.context.Theme.Background
		//};

        return (
            <div>
                <h1>About a girl</h1>
                <br />

                <div>I need an easy friend</div>
                <div>I do, with an ear to lend</div>
                <div>I don't think you fit this shoe</div>
                <div>I do, won't you have a clue</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I'm standing in your line</div>
                <div>I do hope you have the time</div>
                <div>I do pick a number too</div>
                <div>I do keep a date with you</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I need an easy friend</div>
                <div>I do whip her in to land</div>
                <div>I do think you fit this shoe</div>
                <div>I do won't you have a clue</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>No I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I do</div>
                <div>I do</div>
                <div>I do</div>
                <div>I do</div>

                <div>I need an easy friend</div>
                <div>I do, with an ear to lend</div>
                <div>I don't think you fit this shoe</div>
                <div>I do, won't you have a clue</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I'm standing in your line</div>
                <div>I do hope you have the time</div>
                <div>I do pick a number too</div>
                <div>I do keep a date with you</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I need an easy friend</div>
                <div>I do whip her in to land</div>
                <div>I do think you fit this shoe</div>
                <div>I do won't you have a clue</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>No I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I do</div>
                <div>I do</div>
                <div>I do</div>
                <div>I do</div>
            </div>
        );
    }
};
