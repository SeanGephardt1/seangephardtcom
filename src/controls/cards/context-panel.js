import React from 'react';
import './context-panel.css';

export default class ContextPanel extends React.Component
{
	static defaultProps = {
		Placements:
		{
			Top: "cp-main-panel cp-top",
			Left: "cp-main-panel cp-left",
			Right: "cp-main-panel cp-right",
			Bottom: "cp-main-panel cp-bottom"
		}
	};
	constructor( props )
	{
		super( props );

		this.Close = this.props.closeEvent.bind( this );

		this.state = {
			placementChanged:  ( this.props.placement || ContextPanel.defaultProps.Placements.Right )
		}

		return;
	};
	OnChange_ContextPanel_Placement( ev )
	{	//	console.debug( "OnChange_ContextPanel_Placement", ev.target.value );
		this.setState( { placementChanged: ev.target.value } );
		return;
	}
	render()
	{	//	console.debug( this.state.placementChanged, "||", this.PlacementClassNames);
		return (
			<div className="context-full-panel">

				<div className={this.state.placementChanged}>

					{ /*header */}
					<div className="cp-header">
						<div className="cp-header-title">{ this.props.title}<br/>{this.PlacementClassNames}</div>
						<div className="cp-header-close-btn" tabIndex="0" onClick={this.Close}>
							<svg viewBox="0 0 24 24" width="100%" height="100%">
								<circle x="0" y="0" cx="12" cy="12" r="12" strokeWidth="0" stroke="transparent" fill="rgba(0,0,0,0.4)"/>
								<line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="3" />
								<line x1="6" y1="18" x2="18" y2="6" stroke="white" strokeWidth="3" />
							</svg>	
						</div>
					</div>

					{ /* content */}
					<div className="cp-body">

						<div className="cp-controls-panel">

							<div className="cp-controls-panel-row">Change the placement of this Context panel</div>

							<div className="cp-controls-panel-row">
								<select
									value={this.state.placementChanged}
									onChange={this.OnChange_ContextPanel_Placement.bind( this )}>
									{
										Object.entries( ContextPanel.defaultProps.Placements ).map( ( item, index ) => (
											<option key={index} value={item[1]}>{ item[0] }</option>
										))
									}
								</select>
							</div>

						</div>

						<div className="cp-doi">
							<h1>Declaration of Independence: A Transcription</h1>

							<p><em>Note: The following text is a transcription of the Stone Engraving of the parchment Declaration of Independence (the document on display in <a href="https://museum.archives.gov/founding-documents">the Rotunda at the National Archives Museum</a>.)&nbsp;The spelling and punctuation reflects the original.</em></p>

							<p className="cp-doi-larger">In Congress, July 4, 1776</p>

							<p><strong>The unanimous Declaration of the thirteen united States of America,</strong> When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.</p>

							<p>We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, --That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness. Prudence, indeed, will dictate that Governments long established should not be changed for light and transient causes; and accordingly all experience hath shewn, that mankind are more disposed to suffer, while evils are sufferable, than to right themselves by abolishing the forms to which they are accustomed. But when a long train of abuses and usurpations, pursuing invariably the same Object evinces a design to reduce them under absolute Despotism, it is their right, it is their duty, to throw off such Government, and to provide new Guards for their future security.--Such has been the patient sufferance of these Colonies; and such is now the necessity which constrains them to alter their former Systems of Government. The history of the present King of Great Britain is a history of repeated injuries and usurpations, all having in direct object the establishment of an absolute Tyranny over these States. To prove this, let Facts be submitted to a candid world.</p>

							<p>In every stage of these Oppressions We have Petitioned for Redress in the most humble terms: Our repeated Petitions have been answered only by repeated injury. A Prince whose character is thus marked by every act which may define a Tyrant, is unfit to be the ruler of a free people.</p>

							<p>Nor have We been wanting in attentions to our Brittish brethren. We have warned them from time to time of attempts by their legislature to extend an unwarrantable jurisdiction over us. We have reminded them of the circumstances of our emigration and settlement here. We have appealed to their native justice and magnanimity, and we have conjured them by the ties of our common kindred to disavow these usurpations, which, would inevitably interrupt our connections and correspondence. They too have been deaf to the voice of justice and of consanguinity. We must, therefore, acquiesce in the necessity, which denounces our Separation, and hold them, as we hold the rest of mankind, Enemies in War, in Peace Friends.</p>

							<p>We, therefore, the Representatives of the united States of America, in General Congress, Assembled, appealing to the Supreme Judge of the world for the rectitude of our intentions, do, in the Name, and by Authority of the good People of these Colonies, solemnly publish and declare, That these United Colonies are, and of Right ought to be Free and Independent States; that they are Absolved from all Allegiance to the British Crown, and that all political connection between them and the State of Great Britain, is and ought to be totally dissolved; and that as Free and Independent States, they have full Power to levy War, conclude Peace, contract Alliances, establish Commerce, and to do all other Acts and Things which Independent States may of right do. And for the support of this Declaration, with a firm reliance on the protection of divine Providence, we mutually pledge to each other our Lives, our Fortunes and our sacred Honor.</p>

							<div class="doi-sig-panel">
								<div>
										<p><strong>Georgia</strong></p>
										<p>Button Gwinnett</p>
										<p>Lyman Hall</p>
										<p>George Walton</p>
										<p>&nbsp;</p>
										<p><strong>North Carolina</strong></p>
										<p>William Hooper</p>
										<p>Joseph Hewes</p>
										<p>John Penn</p>
										<p>&nbsp;</p>
										<p><strong>South Carolina</strong></p>
										<p>Edward Rutledge</p>
										<p>Thomas Heyward, Jr.</p>
										<p>Thomas Lynch, Jr.</p>
										<p>Arthur Middleton</p>
										<p>&nbsp;</p>
										<p><strong>Massachusetts</strong></p>
										<p>John Hancock</p>
									</div>

								<div>
										<p><strong>Maryland</strong></p>
										<p>Samuel Chase</p>
										<p>William Paca</p>
										<p>Thomas Stone</p>
										<p>Charles Carroll of Carrollton</p>
										<p>&nbsp;</p>
										<p><strong>Virginia</strong></p>
										<p>George Wythe</p>
										<p>Richard Henry Lee</p>
										<p>Thomas Jefferson</p>
										<p>Benjamin Harrison</p>
										<p>Thomas Nelson, Jr.</p>
										<p>Francis Lightfoot Lee</p>
										<p>Carter Braxton</p>
										<p>&nbsp;</p>
										<p><strong>Pennsylvania</strong></p>
										<p>Robert Morris</p>
										<p>Benjamin Rush</p>
										<p>Benjamin Franklin</p>
										<p>John Morton</p>
										<p>George Clymer</p>
										<p>James Smith</p>
										<p>George Taylor</p>
										<p>James Wilson</p>
										<p>George Ross</p>
									</div>

								<div>
										<p><strong>Delaware</strong></p>
										<p>Caesar Rodney</p>
										<p>George Read</p>
										<p>Thomas McKean</p>
										<p>&nbsp;</p>
										<p><strong>New York</strong></p>
										<p>William Floyd</p>
										<p>Philip Livingston</p>
										<p>Francis Lewis</p>
										<p>Lewis Morris</p>
										<p>&nbsp;</p>
										<p><strong>New Jersey</strong></p>
										<p>Richard Stockton</p>
										<p>John Witherspoon</p>
										<p>Francis Hopkinson</p>
										<p>John Hart</p>
										<p>Abraham Clark</p>
										<p>&nbsp;</p>
										<p><strong>New Hampshire</strong></p>
										<p>Josiah Bartlett</p>
										<p>William Whipple</p>
										<p>&nbsp;</p>
									</div>

								<div>
										<p><strong>Massachusetts</strong></p>
										<p>Samuel Adams</p>
										<p>John Adams</p>
										<p>Robert Treat Paine</p>
										<p>Elbridge Gerry</p>
										<p>&nbsp;</p>
										<p><strong>Rhode Island</strong></p>
										<p>Stephen Hopkins</p>
										<p>William Ellery</p>
										<p>&nbsp;</p>
										<p><strong>Connecticut</strong></p>
										<p>Roger Sherman</p>
										<p>Samuel Huntington</p>
										<p>William Williams</p>
										<p>Oliver Wolcott</p>
										<p>&nbsp;</p>
										<p><strong>New Hampshire</strong></p>
										<p>Matthew Thornton</p>
									</div>

							</div>

							{ /* END CONTENT*/}
						</div>

					</div>

					{ /* END */}
				</div>
			</div>
		);
	};
};
