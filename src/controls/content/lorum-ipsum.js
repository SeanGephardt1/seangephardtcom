import React from 'react';
import './lorum-ipsum.css';

export default class LorumContextPanel extends React.Component
{
	static defaultProps = {
		SimpleContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at faucibus felis. Nulla faucibus elit vel mollis finibus. Maecenas metus lacus, consectetur quis turpis ac, sollicitudin dapibus ipsum. Maecenas hendrerit turpis a neque scelerisque rhoncus. Pellentesque lobortis arcu sed mauris porttitor, id accumsan est aliquet. Vivamus congue quam neque, ac fermentum orci rhoncus ac. Quisque in metus eros. Nullam luctus ex urna, sed bibendum metus fringilla sed.",
		ComplexContent:
			`<h1>Header level 1</h1><h2>Header Level 2</h2><h3>Header Level 3</h3><h4>Header Level 4</h4><h5>Header Level 5</h5><h6>Header Level 6</h6><p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href='https://portal.azure.com'>Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p><table className='demo-table' cellPadding='0' cellSpacing='0'><thead><tr><td>Name&uarr;&darr;</td><td>Name&uarr;&darr;</td><td>Name&uarr;&darr;</td><td>Name&uarr;&darr;</td><td>Name&uarr;&darr;</td></tr></thead><tbody><tr><td>Value</td><td>Value</td><td>Value</td><td>Value</td><td>Value</td></tr><tr><td>Value</td><td>Value</td><td>Value</td><td>Value</td><td>Value</td></tr><tr><td>Value</td><td>Value</td><td>Value</td><td>Value</td><td>Value</td></tr><tr><td>Value</td><td>Value</td><td>Value</td><td>Value</td><td>Value</td></tr><tr><td>Value</td><td>Value</td><td>Value</td><td>Value</td><td>Value</td></tr></tbody><tfoot><tr><td colSpan='5'>Copyright &copy; 2020 Microsofty Corporation</td></tr></tfoot></table><p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href='https://portal.azure.com'>Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p><ol><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Aliquam tincidunt mauris eu risus.</li><ol><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Aliquam tincidunt mauris eu risus.</li><ol><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Aliquam tincidunt mauris eu risus.</li></ol></ol></ol><p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href='https://portal.azure.com'>Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p><ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Aliquam tincidunt mauris eu risus.</li><ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Aliquam tincidunt mauris eu risus.</li><ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Aliquam tincidunt mauris eu risus.</li></ul></ul></ul>`;
		NirvanaAboutAGirl:
        (
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
        )
	};
	constructor( props )
	{
		super( props );
		this.Content = ( this.props.content || LorumContextPanel.defaultProps.ComplexContent );
        return;
	};
	render()
	{	
		return (
			<div className="content-lorum-ipsum-panel">{ this.Content }</div>
		);
	};
};
export
{
	LorumContextPanel as LorumContent
};