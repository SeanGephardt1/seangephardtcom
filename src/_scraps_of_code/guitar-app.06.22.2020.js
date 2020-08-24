import React from 'react';
//  import { ThemeContext } from '../../js/theme-context.js';
import './guitar-app.css';
import SVG from '../../art/svgs.js';
import SvgChord from './svg-chord.js';

export default class GuitarApp extends React.Component
{
    //  static contextType = ThemeContext;
	static defaultProps = {
		Title: "My Guitar App",
		LinkTitle: "Guitar App",
		Href: "/guitar-app",
		Icon: SVG.AppNavButtons.GuitarApp
	};
    constructor( props )
    {
        super( props );
        this.Title = ( this.props.Title || GuitarApp.defaultProps.Title );
        document.title = this.Title;

        this.state = {
            dataChanged: false,
            displaySettingsPanel: true
        };

        this.ChordFretNumber = 2;

        this.Notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        this.KeyNames = [];

        this.KeyMajorMinor = ["Major", "Minor"];

        // always less that 7 notes in a scale -- TBD for larger chords, fix up temp scale
        this.ChordTypes = [
            { name: "Major", steps: [0, 4, 7] },
            { name: "Minor", steps: [0, 3, 7] },
            { name: "Diminished", steps: [0, 3, 6] },
            { name: "Augmented", steps: [0, 3, 6] },
            { name: "Sus 2", steps: [0, 2, 5] },
            { name: "Sus 4", steps: [0, 4, 5] },
        ];
        this.DiatonicChordTypes = [
            this.ChordTypes[0],
            this.ChordTypes[1],
            this.ChordTypes[2],
        ];

        //  https://lotusmusic.com/lm_scales.html
        //  https://www.guitar-chords.org.uk/c-harmonic-minor-chords.html

        this.KeyScaleChordFormulas = {
            Major: {
                name: "Major",
                steps: [0, 2, 4, 5, 7, 9, 11],
                chords: [
                    this.DiatonicChordTypes[0],
                    this.DiatonicChordTypes[0],
                    this.DiatonicChordTypes[1],
                    this.DiatonicChordTypes[0],
                    this.DiatonicChordTypes[0],
                    this.DiatonicChordTypes[1],
                    this.DiatonicChordTypes[2]
                ]
            },
            NaturalMinor: {
                name: "Natural Minor",
                steps: [0, 2, 3, 5, 7, 8, 10],
                chords: [
                    this.DiatonicChordTypes[1],
                    this.DiatonicChordTypes[2],
                    this.DiatonicChordTypes[0],
                    this.DiatonicChordTypes[1],
                    this.DiatonicChordTypes[1],
                    this.DiatonicChordTypes[2],
                    this.DiatonicChordTypes[2]
                ]
            },

            //MelodicMinor: { name: "Melodic Minor", steps: [1] },
            //HarmonicMinor: { name: "Harmonic Minor", steps: [1] },
            //Diminished: { name: "Diminished", steps: [1] },
            //WholeTone: { name: "Whole Tone", steps: [1] },
            //Blues: { name: "Blues", steps: [1] },
            //MinorPentatonic: { name: "Minor Pentatonic", steps: [1] },
            //MajorPentatonic: { name: "Major Pentatonic", steps: [1] },
            //HungarianMinor: { name: "Hungarian Minor", steps: [1] },
            //Persian: { name: "Persian", steps: [1] },
            //Hirojoshi: { name: "Hirojoshi", steps: [1] },
            //Arabian: { name: "Arabian", steps: [1] },
            //Scottish: { name: "Arabian", steps: [1] },
        };

        this.CurrentKey = this.Notes[0];
        this.CurrentScale = [];
        this.CurrentChordsData = [];

        this.AppData =  {
            Tuning: ["E", "A", "D", "G", "B", "E","A"],
            KeyScale: ["C", "D", "E", "F", "G", "A", "B"],
            Name: "C Major",
            Notes: ["C", "E", "G"],
            Fret: 0,
            Layout: SvgChord.LayoutTypes.Fretboard,
            Orientation: SvgChord.Orientations.Right,
            ShowFretNotes: true,
            ShowScaleNotes: true,
            ShowChordNotes: true
        };

        this._chords_count = 7;
        this.Chords = [];

        //  INIT
        this.ComputeKeysAndScales();
		return;
    };
    // DEFAULT SETUP
    GetScale( val, scale)
    {   //  console.debug( "GetScale( val, scale)", val, scale );
        // get major root note index
        let _major_note_index = this.Notes.findIndex( function ( item )
        {
            return item.toLowerCase() === val.toLowerCase();
        }, val );
        //  console.debug( "_major_note_index", _major_note_index );

        let _start_notes = this.Notes.slice( _major_note_index );
        let _end_notes = this.Notes.slice( 0, _major_note_index );
        let _new_notes = [..._start_notes, ..._end_notes];
        //  console.debug( "GetScale()::_new_notes", _new_notes );

       let _new_scale = [];
       scale.steps.forEach( function ( v, i, a )
        {   //  console.debug( i, v, _new_notes[v] );
            _new_scale.push( _new_notes[v] );
            return;
        }, _new_notes );
        //  console.debug( "_new_scale", _new_scale );
        this.CurrentScale = _new_scale;
        return;
    };
    GetChords( scale )
    {   //  console.debug( "GetChords( val, scale)" );
        //  console.debug( this.Notes );
        //  console.debug( this.CurrentScale );
        //  console.debug( scale );

        let _new_chords = [];

        for ( let nc = 0; nc < this.CurrentScale.length; nc++ )
        {   //  console.debug( nc, this.CurrentScale[nc], scale.chords[nc].name );
            let _major_note_index = this.Notes.findIndex( function ( item )
            {
                return item.toLowerCase() ===  this.CurrentScale[nc].toLowerCase();
            }, this );
            //  console.debug( "_major_note_index", _major_note_index , "this.Notes[_major_note_index]", this.Notes[_major_note_index] );

            let _start_notes = this.Notes.slice( _major_note_index );
            let _end_notes = this.Notes.slice( 0, _major_note_index );
            let _new_notes = [..._start_notes, ..._end_notes];
            //  console.debug( _new_notes );

            let _chord_notes = [];
            for ( let s = 0; s < scale.chords[nc].steps.length; s++ )
            {
                //  console.debug( s, scale.chords[nc].steps[s], _new_notes[scale.chords[nc].steps[s]] );
                _chord_notes.push( _new_notes[scale.chords[nc].steps[s]] );
            }
            //  console.debug( nc, _new_notes[nc], scale.chords[nc].steps, _chord_notes );
            //  console.debug( _chord_notes );

            let _chord = {
                Name: this.CurrentScale[nc] + " " + scale.chords[nc].name,
                Notes : _chord_notes
            };
            //  console.debug( "_chords", _chord.Name, _chord.Notes );
            _new_chords.push( _chord );
        }

        //  console.debug( "_new_chords", _new_chords ); 
        this.CurrentChordsData = _new_chords;
        return;
    };
    ComputeKeysAndScales()
    {   //  console.debug( "ComputeKeysAndScales()" );
        //  FROM USER SELECTION
        let _user_major_note_index = 0;

        let _selected_major_root_note = this.Notes[_user_major_note_index];
        //  console.debug( "_selected_major_root_note", _selected_major_root_note );

        this.GetScale( _selected_major_root_note, this.KeyScaleChordFormulas.Major );
        this.GetChords( this.KeyScaleChordFormulas.Major );

        this.AppData = {
            Tuning: ["E", "A", "D", "G", "B", "E"],
            KeyScale: this.CurrentScale,
            Name: "FROM THE GUITAR APP ON THIS PAGE WILL CONTAIN SOMETHING",
            Notes: ["C","E","G"],
            Fret: 0,
            Layout: SvgChord.LayoutTypes.Fretboard,
            Orientation: SvgChord.Orientations.Right,
            ShowFretNotes: true,
            ShowScaleNotes: true,
            ShowArpeggioNotes: true,
            ShowChordNotes: true
        };
        //  console.debug( "this.AppData.Orientation", this.AppData.Orientation );

        for ( let i = 0; i < this.CurrentChordsData.length; i++ )
        {   //  console.debug( i, "this.CurrentChordsData", this.CurrentChordsData[i] );
            let _new_chord = {
                Tuning: this.AppData.Tuning,
                KeyScale: this.CurrentScale,
                Name: this.CurrentChordsData[i].Name,
                Notes: this.CurrentChordsData[i].Notes,
                Fret: this.ChordFretNumber,
                Layout: SvgChord.LayoutTypes.Chord,
                Orientation: this.AppData.Orientation,
                ShowFretNotes: false,
                ShowScaleNotes: false,
                ShowChordNotes: true
            };
            this.Chords.push( _new_chord );
        }
        //  console.debug( "this.Chords[0].Orientation", this.Chords[0].Orientation );


        //let _user_minor_note_index = _user_major_note_index - 3;
        ////  console.debug( "_user_minor_note_index", _user_minor_note_index );
        //if ( _user_minor_note_index < 0 )
        //{
        //    _user_minor_note_index = this.Notes.length + (_user_minor_note_index);
        //}
        ////  console.debug( "_user_minor_note_index", _user_minor_note_index );
        //let _selected_nat_minor_root_note = this.Notes[_user_minor_note_index];
        //console.debug( "_selected_nat_minor_root_note", _selected_nat_minor_root_note );
        //this.GetScale( _selected_nat_minor_root_note, this.KeyScaleFormulas.NaturalMinor );
        return;
    };

    // EVENT HANDLERS 
    OnClick_Toggle_ConfigPanel( ev )
    {   //  console.debug( "OnClick_Toggle_ConfigPanel" );
        this.setState( { displaySettingsPanel: !this.state.displaySettingsPanel } );
        return;
    };

    OnClick_SetOrientation( orientation, ev )
    {   //  console.debug( "OnClick_SetOrientation", orientation, this.AppData.Orientation );
        this.AppData.Orientation = orientation;

        this.Chords.forEach( function ( v, i, a )
        {   //  console.debug( i, v.Orientation );
            v.Orientation = orientation;
            return;
        } );

        this.setState( {dataChanged: !this.state.dataChanged} );
        return;
    };

    render()
    {	//  console.debug( "GuitarApp.render()", this.AppData );
        //  console.debug( "ComputeKeysAndScales() this.CurrentScale ", this.CurrentScale );
        //  console.debug( "ComputeKeysAndScales() this.CurrentChords ", this.CurrentChords );

        // TESTING this.AppData.Tuning = ["E", "A", "D", "G", "B", "E", "A", "D"];

        //this.AppData = {
        //    Tuning: ["E", "A", "D", "G", "B", "E"],
        //    KeyScale: this.CurrentScale,
        //    Name: "FROM THE GUITAR APP ON THIS PAGE WILL CONTAIN SOMETHING",
        //    Notes: [""],
        //    Fret: 0,
        //    Layout: SvgChord.LayoutTypes.Fretboard,
        //    Orientation: SvgChord.Orientations.Left,
        //    ShowFretNotes: true,
        //    ShowScaleNotes: true,
        //    ShowChordNotes: true
        //};

        //  console.debug( "this.state.orientationButtonSelected", this.state.orientationButtonSelected, SvgChord.Orientations.Right );


        return (
			<div className="guitar-app-main-panel">
                <div className="gapp-title-bar">
                    <div className="gapp-title-bar-header">{this.Title}</div>
                    <div className="gapp-title-bar-settings" onClick={this.OnClick_Toggle_ConfigPanel.bind(this)}>{SVG.AppNavButtons.Settings}</div>
                </div>
                {/* settings panel */}
                {
                    this.state.displaySettingsPanel === true &&
                    <div className="gapp-settings-panel">
                        <div className="gapp-settings-panel-row">Configuration</div>

                        {/* Fretboard oreintation */}
                        <div className="gapp-settings-panel-row">Fretboard orientation</div>
                        <div className="gapp-settings-panel-row">
                            <button
                                className={( this.AppData.Orientation === SvgChord.Orientations.Right ) ? 'gapp-feature-btn gapp-feature-btn-selected' : 'gapp-feature-btn '
                                }
                                onClick={this.OnClick_SetOrientation.bind( this, SvgChord.Orientations.Right )}>Right handed</button>

                            <button
                                className={( this.AppData.Orientation === SvgChord.Orientations.Left ) ? 'gapp-feature-btn gapp-feature-btn-selected' : 'gapp-feature-btn '
                                }
                                onClick={this.OnClick_SetOrientation.bind( this, SvgChord.Orientations.Left )}>Left handed</button>
                            {/*
                                <span className="gapp-info-key">Select a fretboard orientation: </span>
                                <span className="gapp-info-value">{this.AppData.Orientation}</span>
                            
                             */}
                        </div>

                        {/* key and scales */}
                        <div className="gapp-settings-panel-row">Key and Scale {this.CurrentScale}</div>
                        <div className="gapp-settings-panel-row">
                            <select>
                                {
                                    this.Notes.map( ( item, i ) => (
                                        <option key={i}>{item}</option>
                                    ))
                                }
                            </select>
                            <select>
                                {
                                    this.KeyMajorMinor.map( ( item, i ) => (
                                        <option key={i}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>


                        {/*
                        <div className="gapp-settings-panel-row">
                            <span className="gapp-debug-span">{this.AppData.Layout}</span>
                            <button className="gapp-feature-btn" onClick={this.OnClick_SetFretboardLayout.bind( this, SvgChord.LayoutTypes.Fretboard )}>Full fretboard</button>
                            <button className="gapp-feature-btn" onClick={this.OnClick_SetFretboardLayout.bind( this, SvgChord.LayoutTypes.Chord )}>Chord</button>
                            <button className="gapp-feature-btn" onClick={this.OnClick_SetFretboardLayout.bind( this, SvgChord.LayoutTypes.ExtendedChord )}>Extended Chord</button>
                        </div>
                        */}
                    </div>
                }

                <div className="gapp-selected-settings-row">
                    <div>
                        <span className="gapp-info-key">Key selected:</span>
                        <span className="gapp-info-value">{this.AppData.KeyScale}</span>
                    </div>
                    <div>
                        <span className="gapp-info-key">Fretboard orientation:</span>
                        <span className="gapp-info-value">{this.AppData.Orientation}</span>
                    </div>
                    <div>
                        <span className="gapp-info-key">Instrument tuning:</span>
                        <span className="gapp-info-value">{this.AppData.Tuning}</span>
                    </div>
                    <div>
                        <span className="gapp-info-key">Number of strings:</span>
                        <span className="gapp-info-value">{this.AppData.Tuning.length}</span>
                    </div>
                </div>

                <div className="fretboard-panel">
                    <SvgChord data={this.AppData} />
                </div>



                    {/* this.Chords 
                     * 
                <div className="gapp-feature-rowl">
                    <div>Diatonic chords</div>
                </div>
                        <div className="chords-panel"></div>
                     */}
                    {
                        //this.Chords.length > 0 &&
                        //this.Chords.map( ( item, idx ) => (
                        //    <div className="chord-panel" key={idx}>
                        //        <SvgChord key={idx} data={item} />
                        //    </div>
                        //) )
                    }

			</div>
        );
    }
};
