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
		Href: "/demos/guitar-app/",
		Icon: SVG.AppNavButtons.GuitarApp
	};
    constructor( props )
    {
        super( props );
        this.Title = ( this.props.Title || GuitarApp.defaultProps.Title );
        document.title = this.Title;

        this.SharpNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        this.FlatNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
        this.Notes = this.SharpNotes;

        // tuning stuff
        this._allowed_string_numbers = [4, 5, 6, 7, 8, 9, 10];

        // always less that 7 notes in a scale -- TBD for larger chords, fix up temp scale
        //  https://lotusmusic.com/lm_scales.html
        //  https://www.theguitarlesson.com/free-guitar-chords/
        //  https://www.guitar-chords.org.uk/c-harmonic-minor-chords.html
        //  https://spinditty.com/learning/chord-building-for-musicians


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

        this._chord_fret_number = 0;
        this._chords_count = 7;
        this.Chords = [];
        this.ChordTypes = [
            { name: "Major", steps: [0, 4, 7] },
            { name: "Minor", steps: [0, 3, 7] },
            { name: "Diminished", steps: [0, 3, 6, 9 ] },
            { name: "Augmented", steps: [0, 3, 6] },
            { name: "Sus 2", steps: [0, 2, 5] },
            { name: "Sus 4", steps: [0, 4, 5] },
        ];
        this.DiatonicChordTypes = [
            this.ChordTypes[0],
            this.ChordTypes[1],
            this.ChordTypes[2],
        ];

        this.KeyNames = [];
        this.KeyScaleChordFormulas = [
            {
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
            {
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
        ];
        this.KeyMajorMinor = [this.KeyScaleChordFormulas[0].name, this.KeyScaleChordFormulas[1].name];
        this.CurrentKeyMajorMinor = this.KeyScaleChordFormulas[0]; 

        this.AppData = SvgChord.defaultProps;
        //  this.AppData.Name = "Fretboard Helper App";
        //  this.AppData.Tuning = ["E", "A#", "Db", "G#", "B", "Eb"];

        for ( let i = 0; i < this.AppData.KeyScale.length; i++ )
        {
            let _temp_chord = {
                Name: "Chord Name",
                Fret: 0,
                Tuning: ["E", "A", "D", "G", "B", "E"],
                KeyScale: ["C", "D", "E", "F", "G", "A", "B"],
                ChordNotes: ["C", "E", "G"],
                Layout: SvgChord.LayoutTypes.Chord,
                Orientation: SvgChord.Orientations.Right,
                ShowSharpsOrFlats: "sharps",
                ShowFretNotes: true,
                ShowScaleNotes: true,
                ShowArpeggioNotes: true,
                ShowChordNotes: true
            };
            this.Chords.push( _temp_chord );
        }

        //  INIT
        this.state = {
            dataChanged: false,
            displaySettingsPanel: false,
            keyRootValue: this.Notes[0],
            keyMajorMinorValue: this.KeyMajorMinor[0],
            sharpsOrFlats: "sharps",
            fretboardOreintation: SvgChord.Orientations.Right,
            numberOfStrings: 6
        };

        this.NormalizeTuning();
        this.GetChords();
		return;
    };
    // DEFAULT SETUP
    NormalizeTuning()
    {
        //  FIX TUNING
        //  console.debug( "1. NormalizeTuning", this.AppData.Tuning, this.AppData.ShowSharpsOrFlats );

        if ( this.AppData.ShowSharpsOrFlats === "sharps" )
        {
            for ( let i = 0; i < this.AppData.Tuning.length; i++ )
            {   //  console.debug( i, "this.AppData.Tuning", this.AppData.Tuning[i] );
                if ( this.AppData.Tuning[i].indexOf( "b" ) !== -1 )
                {
                    //  console.debug( "_temp_note", i, this.AppData.Tuning[i].indexOf( "#" ) );
                    let _note_index = this.FlatNotes.findIndex( function ( item )
                    {
                        return item.toLowerCase() === this.AppData.Tuning[i].toLowerCase();
                    }, this );
                    //  console.debug( "_note_index", _note_index, this.SharpNotes[_note_index], this.FlatNotes[_note_index] );
                    this.AppData.Tuning[i] = this.SharpNotes[_note_index];
                }                
            }
        }
        else if ( this.AppData.ShowSharpsOrFlats === "flats" )
        {
            for ( let i = 0; i < this.AppData.Tuning.length; i++ )
            {   //  console.debug( i, "this.AppData.Tuning", this.AppData.Tuning[i] );
                if ( this.AppData.Tuning[i].indexOf( "#" ) !== -1 )
                {
                    //  console.debug( "_temp_note", i, this.AppData.Tuning[i].indexOf( "#" ) );
                    let _note_index = this.SharpNotes.findIndex( function ( item )
                    {
                        return item.toLowerCase() === this.AppData.Tuning[i].toLowerCase();
                    }, this );
                    //  console.debug( "_note_index", _note_index, this.SharpNotes[_note_index], this.FlatNotes[_note_index] );
                    this.AppData.Tuning[i] = this.FlatNotes[_note_index];
                }                
            }
        }

        //  this.AppData.Tuning = _new_tuning;
        //  console.debug( "2. NormalizeTuning", this.AppData.Tuning, this.AppData.ShowSharpsOrFlats );
        return;
    };
    GetKeyScaleChordsData( rootNote, keyType )
    {   //  
        //  console.debug( "GetKeyScaleChordsData", rootNote, this.Notes );
        this.NormalizeTuning();

        // get major root note index
        let _major_note_index = this.Notes.findIndex( function ( item )
        {
            return item.toLowerCase() === rootNote.toLowerCase();
        } );
        //  console.debug( "_major_note_index", _major_note_index );

        // get scale type
        let _scale_type_index = this.KeyScaleChordFormulas.findIndex( function ( item )
        {
            return item.name.toLowerCase() === keyType.toLowerCase();
        } );
        //  console.debug( "_scale_type_index", _scale_type_index );

        //re-arrange the notes for a scale
        let _start_notes = this.Notes.slice( _major_note_index );
        let _end_notes = this.Notes.slice( 0, _major_note_index );
        let _new_notes = [..._start_notes, ..._end_notes];
        //  console.debug( "_new_notes", _new_notes );

        //let _new_scale_steps = this.KeyScaleChordFormulas[_scale_type_index];
        //console.debug( "_new_scale_steps", _new_scale_steps.name );
        this.CurrentKeyMajorMinor = this.KeyScaleChordFormulas[_scale_type_index]; 
        //console.debug( "this.CurrentKeyMajorMinor", this.CurrentKeyMajorMinor.name );

        this.AppData.KeyScale = [];
        for ( let i = 0; i < this.CurrentKeyMajorMinor.steps.length; i++ )
        {
            //  console.debug( "_new_scale_steps.steps", _new_scale_steps.steps[i], _new_notes[_new_scale_steps.steps[i]] );
            this.AppData.KeyScale.push( _new_notes[this.CurrentKeyMajorMinor.steps[i]]);
        }
        //  console.debug( "this.AppData.KeyScale", this.AppData.KeyScale );

        this.GetChords();
        //  this.Update();
        return;
    };
    GetChords()
    {   //  
        //  console.debug( "GetChords()", this.Chords.length, this.AppData.KeyScale, this.CurrentKeyMajorMinor, this.KeyScaleChordFormulas );
        //  console.debug( this.Notes );
        //  console.debug( this.CurrentScale );

        // GET CHORD ROOT NOTES
        let _chord_roots = [];
        for ( let nc = 0; nc < this.AppData.KeyScale.length; nc++ )
        {   //  console.debug( nc, this.CurrentScale[nc], scale.chords[nc].name );
            let _major_note_index = this.Notes.findIndex( function ( item )
            {
                return item.toLowerCase() === this.AppData.KeyScale[nc].toLowerCase();
            }, this );
            //  console.debug( "_major_note_index", _major_note_index, this.Notes[_major_note_index] );
            _chord_roots.push( this.Notes[_major_note_index] );
        }
        //  console.debug("_chord_roots", _chord_roots );

        // GET CHORD FORMULAS
        for ( let i = 0; i < this.CurrentKeyMajorMinor.chords.length; i++ )
        {
            //  console.debug( "this.CurrentKeyMajorMinor.steps[i]", _chord_roots[i], this.CurrentKeyMajorMinor.chords[i] );

            // shift this.Notes array
             let _chord_root_index = this.Notes.findIndex( function ( item )
            {
                return item.toLowerCase() === _chord_roots[i].toLowerCase();
            } );
            //  console.debug( "_chord_root_index", _chord_root_index );

            let _start_notes = this.Notes.slice( _chord_root_index );
            let _end_notes = this.Notes.slice( 0, _chord_root_index );
            let _new_notes = [..._start_notes, ..._end_notes];
            //  console.debug( "_new_notes", _new_notes );

            let _chord_note_data = [];
            for ( let cs = 0; cs < this.CurrentKeyMajorMinor.chords[i].steps.length; cs++ )
            {
                //  console.debug( this.CurrentKeyMajorMinor.chords[i].steps[cs] );
                let _note = _new_notes[this.CurrentKeyMajorMinor.chords[i].steps[cs]];
                //  console.debug( "_note", _note );
                _chord_note_data.push( _note );
            }
            //  console.debug( "_chord_note_data", _chord_note_data );
            //  console.debug( "_chord_note_data", _chord_roots[i] , this.CurrentKeyMajorMinor.chords[i].name, _chord_note_data );

            this.Chords[i].Name = _chord_roots[i] + " " + this.CurrentKeyMajorMinor.chords[i].name;
            this.Chords[i].Fret = 0;
            this.Chords[i].Tuning = ["F#","B","E","A","D","G","B","E"]; //  this.AppData.Tuning;
            this.Chords[i].KeyScale =_chord_roots;
            this.Chords[i].ChordNotes = _chord_note_data;
            this.Chords[i].Layout = SvgChord.LayoutTypes.Chord;
            this.Chords[i].Orientation = this.AppData.Orientation;
            this.Chords[i].ShowSharpsOrFlats = this.AppData.ShowSharpsOrFlats;
            this.Chords[i].ShowFretNotes = true;
            this.Chords[i].ShowScaleNotes = true;
            this.Chords[i].ShowArpeggioNotes = true;
            this.Chords[i].ShowChordNotes = true;
        }

        //  console.debug( "GetChords():: this.Chords", this.Chords[0].KeyScale );
        return;
    };


    Update()
    {   //  console.debug( "Update()" );

        // FULL FRETBAORD DATA
        //  this.AppData.Tuning = ["E", "A", "D", "G", "B", "E"];
        //  this.AppData.KeyScale = this.CurrentScale;
        //  this.AppData.Name = "FROM THE GUITAR APP ON THIS PAGE WILL CONTAIN SOMETHING";
        //  this.AppData.Notes = ["C", "E", "G"];
        //this.AppData.Fret = 0;
        //this.AppData.Layout = SvgChord.LayoutTypes.Fretboard;
        //// this.AppData.Orientation = this.state.fretboardOreintation;
        ////  this.AppData.ShowSharpsOrFlats = this.state.sharpsOrFlats;
        //this.AppData.ShowFretNotes = true;
        //this.AppData.ShowScaleNotes = true;
        //  this.AppData.ShowArpeggioNotes = true;
        //  this.AppData.ShowChordNotes = false;
        //  console.debug( "this.AppData.Orientation", this.AppData.Orientation );

        // CHORDS DATA
        //Name: "Guitar Fretboard Helper",
        //Fret: 0,
        //Tuning: ["E", "A", "D", "G", "B", "E"],
        //KeyScale: ["C", "D", "E", "F", "G", "A", "B"],
        //ChordNotes: ["C", "E","G"],
        //Layout: SvgChord.LayoutTypes.Fretboard,
        //Orientation: SvgChord.Orientations.Right,
        //ShowSharpsOrFlats: "sharps",
        //ShowFretNotes: true,
        //ShowScaleNotes: true,
        //ShowArpeggioNotes: false,
        //ShowChordNotes: false


        //for ( let i = 0; i < this.Chords.length; i++ )
        //{   //  console.debug( i, "this.CurrentChordsData", this.CurrentChordsData[i] );
        //    let _new_chord = {
        //        Tuning: this.AppData.Tuning,
        //        KeyScale: this.CurrentScale,
        //        Name: this.Chords[i].Name,
        //        ChordNotes: this.Chords[i].Notes,
        //        Fret: this._chord_fret_number,
        //        Layout: SvgChord.LayoutTypes.Chord,
        //        Orientation: this.AppData.Orientation,
        //        ShowFretNotes: false,
        //        ShowScaleNotes: false,
        //        ShowChordNotes: true
        //    };
        //    this.Chords.push( _new_chord );
        //}
        //console.debug( "this.Chords", this.Chords);

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

        this.setState( { dataChanged: !this.state.dataChanged } );
        return;
    };
    OnClick_SelectSharpsOrFlats( data, ev )
    {   //        console.debug( "OnClick_SelectSharpsOrFlats", ev.target.value );
        if ( data === "sharps" )
        {
            this.Notes = this.SharpNotes;
        }
        else if ( data === "flats" )
        {
            this.Notes = this.FlatNotes;
        }

        this.AppData.ShowSharpsOrFlats = data;

        this.GetKeyScaleChordsData( this.state.keyRootValue, this.state.keyMajorMinorValue );

        this.setState( { dataChanged: !this.state.dataChanged } );
        return;
    };

    OnChange_SelectRootNote( ev )
    {   //  console.debug( "OnChange_SelectRootNote", ev.target.value );
        this.GetKeyScaleChordsData( ev.target.value, this.state.keyMajorMinorValue );
        this.setState( { keyRootValue: ev.target.value } );
        return;
    };
    OnChange_SelectRootNoteMajorMinor( ev )
    {   //  console.debug( "OnChange_SelectRootNoteMajorMinor", ev.target.value );
        this.GetKeyScaleChordsData( this.state.keyRootValue, ev.target.value );
        this.setState( { keyMajorMinorValue: ev.target.value } );
        return;
    };

    OnChange_SelectNumberOfStrings(ev)
    {
        console.debug( "TBD OnChange_SelectNumberOfStrings",ev.target.value );
        //  this.AppData.Tuning = ["E", "A", "D", "G", "B", "E"];
        //  this.GetKeyScaleChordsData( this.state.keyRootValue, ev.target.value );
        this.setState( { numberOfStrings: ev.target.value } );

        return;
    }

    render()
    {
        //  console.debug( "GuitarApp.render()" );
        // ["E", "A", "D", "G", "B", "E"],
        //  this.AppData.Tuning = ["E", "A#", "D#", "G", "B", "E"];
        //  this.AppData.ShowFretNotes = true;
        //  this.AppData.ShowScaleNotes = true;
        //  console.debug( "GuitarApp.render()", this.AppData );
        //  console.debug( "GuitarApp.render().this.Chords", this.Chords.length, this.Chords );

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

                        {/* FRETBOARD OREINTATION */}
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
                             </div>

                        {/* KEY AND SCALES */}
                        <div className="gapp-settings-panel-row">Key and Scale</div>
                        <div className="gapp-settings-panel-row">

                            <select
                                className="gapp-info-select"
                                value={this.state.keyRootValue}
                                onChange={this.OnChange_SelectRootNote.bind( this )} >
                                {
                                    this.Notes.map( ( item, i ) => (
                                        <option key={i}>{item}</option>
                                    ))
                                }
                            </select>

                            <select
                                className="gapp-info-select"
                                value={this.state.keyMajorMinorValue}
                                onChange={this.OnChange_SelectRootNoteMajorMinor.bind( this )} >
                                {
                                    this.KeyMajorMinor.map( ( item, i ) => (
                                        <option key={i}>{item}</option>
                                    ))
                                }
                            </select>

                            <button
                                className={( this.AppData.ShowSharpsOrFlats ==="sharps") ? 'gapp-feature-btn gapp-feature-btn-selected' : 'gapp-feature-btn '
                                }
                                onClick={this.OnClick_SelectSharpsOrFlats.bind( this, "sharps" )}>Show sharps ( # )</button>

                            <button
                                className={( this.AppData.ShowSharpsOrFlats ==="flats" ) ? 'gapp-feature-btn gapp-feature-btn-selected' : 'gapp-feature-btn '
                                }
                                onClick={this.OnClick_SelectSharpsOrFlats.bind( this, "flats" )}>Show flats ( b )</button>

                        </div>

                        {/* STRINGS AND TUNINGS
                        <div className="gapp-settings-panel-row">Number of strings and string tunings</div>
                        <div className="gapp-settings-panel-row">
                            <select
                                className="gapp-info-select"
                                value={this.AppData.Tuning.length}
                                onChange={this.OnChange_SelectNumberOfStrings.bind( this )} >
                                {
                                    this._allowed_string_numbers.map( ( item, i ) => (
                                        <option key={i}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                         * */}


                        {/* OTHER CUSTOMIZATIONS 
                        <div className="gapp-settings-panel-row">Colors</div>
                        <div className="gapp-settings-panel-row">
                            <span>Fret note color</span> <input type="color" defaultValue="#0000FF" />
                            <span>Scale note color</span> <input type="color" defaultValue="#FF0000"/>
                        </div>
                     */}

                    </div>
                }

                <div className="gapp-selected-settings-row">
                    <div>
                        <span className="gapp-info-key">Key selected:</span>
                        <span className="gapp-info-value">{this.state.keyRootValue} {this.state.keyMajorMinorValue}</span>
                        <span className="gapp-info-value">
                            {
                                this.AppData.KeyScale.map( ( item, i ) => (
                                        <span key={i}>{item} </span>
                                ) )
                            }
                        </span>
                    </div>
                    <div>
                        <span className="gapp-info-key">Fretboard orientation:</span>
                        <span className="gapp-info-value">{this.AppData.Orientation}</span>
                    </div>
                    <div>
                        <span className="gapp-info-key">Instrument tuning:</span>
                        <span className="gapp-info-value">
                            {
                                this.AppData.Tuning.map( ( item, i ) => (
                                        <span key={i}>{item} </span>
                                ) )
                            }
                        </span>
                    </div>
                    <div>
                        <span className="gapp-info-key">Number of strings:</span>
                        <span className="gapp-info-value">{this.AppData.Tuning.length}</span>
                    </div>
                </div>

                {/* FRETBOARD VIEW 
                <div className="fretboard-panel">
                    <SvgChord data={this.AppData} />
                </div>                 
                 */}



                    {/* this.Chords 
                     * 
                <div className="gapp-feature-row">
                    <div>Diatonic chords</div>
                </div

                    {
                        this.Chords.length > 0 &&
                        this.Chords.map( ( item, idx ) => (
                            <div className="chord-panel" key={idx}>
                                <SvgChord key={idx} data={item} />
                            </div>
                        ) )
                    }

                     */}
                <div className="chords-panel">
                    <div className="chord-panel" >
                        <SvgChord data={this.Chords[0]} />
                    </div>
                </div>

			</div>
        );
    }
};
