import React from 'react';
import './svg-chord.css';

export default class SvgChord extends React.Component
{
    static LayoutTypes = { Fretboard: "fretboard", Chord: "chord", ExtendedChord: "extchord" };
    static Orientations = { Left: "left", Right: "right" };
    static defaultProps = {
        Name: "Guitar Fretboard Helper",
        Fret: 0,
        Tuning: ["E", "A", "D", "G", "B", "E"],
        KeyScale: ["C", "D", "E", "F", "G", "A", "B"],
        ChordNotes: ["C", "E","G"],
        Layout: SvgChord.LayoutTypes.Fretboard,
        Orientation: SvgChord.Orientations.Right,
        ShowSharpsOrFlats: "sharps",
        ShowFretNotes: true,
        ShowScaleNotes: true,
        ShowArpeggioNotes: false,
        ShowChordNotes: false
    };
    constructor( props )
    {
        super( props );
        this.state = {};

        this.SharpNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        this.FlatNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
        this.Notes = this.SharpNotes;

        this._debug = true;

        this._default_note_radius = 20;
        this._fretboard_count = 24;
        this._chord_fret_count = 5;
        this._ext_chord_count = 8;

        this._default_padding = 50;
        this._fret_height_space = 60;
        this._string_spacing = 50;

        this.Data = ( this.props.data || SvgChord.defaultProps );

        this.Height = 100;
        this.Width = 100;
        this.ViewBox = "0 0 " + this.Height + " " + this.Width;

        // SVG LAYOUT DEFAULTS
        this.LabelRectCoords = {
            x: 0,
            y: 0,
            height: 50,
            width: this.Width
        };
        this.LabelTextData = {
            x: "50%",
            y: 35,
            rotate: 0,
            textLength: "50%",
            fontSize: 26,
            fillColor: "rgba(0,0,0,1)",
            dominantBaseline: "text-top",
            textAnchor: "start",
            text: this.Data.Name
        };

        this.StringNamesRect = {
            x: 50,
            y: 50,
            height: 50,
            width: 100
        };
        this.StringNames = [];
        this.StringNotes = [];
        this.StringLinePositions = [];

        this.StringNameTextData = {
            x: 100,
            y: 100,
            rotate: 0,
            textLength: "50%",
            fontSize: 26,
            fillColor: "rgba(0,0,0,1)",
            dominantBaseline: "text-top",
            textAnchor: "start",
            text: "testing"
        };

        this.FretNamesRect = {
            x: 80,
            y: 80,
            height: 50,
            width: 100
        };
        this.FretNames = [];

        this.FretsTextArea = {
            x: 100,
            y: 100,
            rotate: 0,
            textLength: "50%",
            fontSize: 26,
            fillColor: "rgba(0,0,0,1)",
            dominantBaseline: "text-top",
            textAnchor: "start",
            text: "FRETS"
        };

        this.FretboardRect = {
            x: 100,
            y: 100,
            height: 100,
            width: 100
        };
        this.Frets = [
            {
                    text: "XX",
                    x: 100,
                    y: 100,
                    x1: 100,
                    y1: 100,
                    x2: 200,
                    y2:  200,
                    strokeWidth: 1,
                    stroke: "rgba(0,0,0,1)"
                }
        ];

        this.FretNoteMatrix = [];
        this.ScaleNoteMatrix = [];
        this.ArpeggioNoteMatrix = [];
        this.ChordNoteMatrix = [];

        // CHORD LAYOUT SPECIFICS
        this.RootNutLine = {}
        this.LeftFretLine = {};
        this.RightFretLIne = {};
        this.ChordFretLines = [];
        this.ChordStringLines = [];

        //  INIT 
        this.CreateStyles();
		return;
    };
    CreateStyles()
    {
        // lame hackiness
        this.FretNoteCircleFillColor = "rgb(255,255,255,1)";
        this.FretNoteTextFillColor = "rgba(0,0,0,1)";
        this.FretNoteStrokeColor = "rgba(0,0,0,1)";
        this.FretNoteStrokeWidth = 0;

        this.ScaleNoteCircleFillColor = "rgb(255,128,0,1)";
        this.ScaleNoteTextFillColor = "rgba(255,255,255,1)";
        this.ScaleNoteStrokeColor = "rgba(0,0,0,1)";
        this.ScaleNoteStrokeWidth = 0;

        this.ChordNoteCircleFillColor = "rgb(0,64,190,1)";
        this.ChordNoteTextFillColor = "rgba(255,255,255,1)";
        this.ChordNoteStrokeColor = "rgba(0,0,0,1)";
        this.ChordNoteStrokeWidth = 0;

        return;
    };
    ComputeCoordinates()
    {   //  console.debug( "SvgChord.ComputeCoordinates()", this.props.data.Tuning );

        // POSSIBLE BUG - change string names also?

        if ( this.props.data.ShowSharpsOrFlats === "sharps" )
        {
            this.Notes = this.SharpNotes;
        }
        else if(this.props.data.ShowSharpsOrFlats === "flats")
        {
            this.Notes = this.FlatNotes;
        }

        if ( this.Data.Layout === SvgChord.LayoutTypes.Fretboard )
        {
            this.ComputeFullFretboard();
        }
        else if ( this.Data.Layout === SvgChord.LayoutTypes.Chord || this.Data.Layout === SvgChord.LayoutTypes.ExtendedChord )
        {
            this.ComputeChordFretboard();
        }
        return;
    };

    // FULL FRETBOARD SPECIFIC
    ComputeFullFretboard()
    {   //  console.debug( "ComputeFretboard()" );
        //  this._fretboard_count = 24;
        this.FretNumber = 0;    // SvgChord.defaultProps.Fret;

        this.Width = ( this._default_padding * 2 ) + ( ( this._fretboard_count ) * this._fret_height_space );
        this.Height = ( this._default_padding * 4 ) + ( this.Data.Tuning.length * this._string_spacing );

        // SVG - REVERSED
        this.ViewBox = "0 0 " + this.Width + " " + this.Height; 
        //  console.debug( "Fretboard", this.Width, this.Height, this.ViewBox );

        this.LabelRectCoords = {
            x: 0,
            y: 0,
            height: 50,
            width: this.Width
        };

        if ( this.Data.Orientation === SvgChord.Orientations.Right )
        {
            this.StringNamesRect = {
                x: 0,
                y: 90,
                height: this.Height - 50,
                width: 100
            };

            this.FretNamesRect = {
                x: 100,
                y: 50,
                height: 40,
                width: this.Width - 50
            };

            this.FretboardRect = {
                x: 100,
                y: 90,
                height: this.Height - 90,
                width: this.Width - 50
            };
        }
        else if ( this.Data.Orientation === SvgChord.Orientations.Left )
        {
            this.StringNamesRect = {
                x: this.Width - 100,
                y: 90,
                height: this.Height - 50,
                width: 100
            };

            this.FretNamesRect = {
                x: 0,
                y: 50,
                height: 40,
                width: this.Width - 100
            };

            this.FretboardRect = {
                x: 0,
                y: 90,
                height: this.Height - 90,
                width: this.Width - 100
            };
    }

        this.ComputeAreaLayouts();
        this.ComputeFullFretboardLayouts();
        return;
    };
    ComputeFullFretboardLayouts()
    {
        //  console.debug( "ComputeAreaLayouts()", this.Data.Orientation );
        //  console.debug( "this.LabelRectCoords", this.LabelRectCoords );
        //  console.debug( "this.StringNamesRect", this.StringNamesRect );
        //  console.debug( "this.FretboardRect", this.FretboardRect );
        //  console.debug( "this.FretNamesRect", this.FretNamesRect );

        // SET SVGCHORD LEVEL TEXT
        this.LabelTextData = {
            x: "50%",
            y: 35,
            rotate: 0,
            textLength: undefined,
            fontSize: 26,
            fillColor: "rgba(0,0,0,1)",
            dominantBaseline: "text-top",
            textAnchor: "middle",
            text: this.Data.Name
        };
        //  console.debug( "this.LabelTextData", this.LabelTextData );

        // SET STRING NAME TEXT AREA
        let _string_names_padding = 10;
        let _string_names_left = 0;

        if ( this.Data.Orientation === "right" )
        {
            _string_names_left = this.StringNamesRect.x + _string_names_padding;
        }
        else if (this.Data.Orientation === "left")
        {
            _string_names_left = this.Width - (_string_names_padding * 4);
        }
        //  console.debug( "_string_names_left", _string_names_left );

        this.StringNameTextData = {
            x: _string_names_left,
            y: this.StringNamesRect.y,
            rotate: 0,
            textLength: "50%",
            fontSize: 26,
            fillColor: "rgba(0,0,0,1)",
            dominantBaseline: "text-top",
            textAnchor: "start",
            text: this.Data.Name
        };
        //  console.debug( "this.StringNameTextData", this.StringNameTextData );

        //  SET STRING NAME OBJECTS - AFTER STRINGS HAVE BEEN DEFINED
        //  REVERSE STRING NOTES ARRAY AS WELL
        //  console.debug( "this.Data.Tuning", this.Data.Tuning );
        this.StringNames = [];
        let _string_names = [];

        for ( let i = 0; i < this.Data.Tuning.length; i++ )
        {
            _string_names.push( this.Data.Tuning[i] );
        }

        if ( this.Data.Orientation === "right" )
        {
            _string_names.reverse();
        }
        //  console.debug( "_string_names", _string_names );

        let _string_space = Math.round( (this.FretboardRect.height - this._string_spacing) / this.Data.Tuning.length ) ;
        //  console.debug( "_string_space", _string_space );

        for ( let i = 0; i < _string_names.length; i++ )
        {   //  console.debug( "_string_names[i]", _string_names[i] );

            let _ss = ( _string_space * (i+1)) + this.StringNameTextData.y; // + this._string_spacing );
            //  console.debug( "_ss", _ss );

            let _new_string_name = {
                text: _string_names[i],
                x: _string_names_left,
                y:_ss
            };
            this.StringNames.push( _new_string_name );
        }
        //  console.debug( "this.StringNames", this.StringNames );


        //  COMPUTE FULL STRINGS
        //  console.debug( "this._fretboard_count", this._fretboard_count, this.StringNames.length );
        //  <line x1="80" y1="100" x2="1450" y2="100" stroke="black" strokeWidth="10" />
        //  this.StringNotes = [];
        this.StringLinePositions = [];

        let _string_left = 0;
        let _string_right = 0;

        if ( this.Data.Orientation === "right" )
        {
            _string_left = this.FretboardRect.x;// + this._default_padding;
            _string_right = this.Width;// - this._default_padding;
        }
        else if (this.Data.Orientation === "left")
        {
            _string_left = 0;//this._default_padding;
            _string_right = this.StringNamesRect.x;// - this._default_padding;
        }

        for ( let i = 0; i < this.StringNames.length; i++ )
        {   //  console.debug( "this.StringNames[i]", this.StringNames[i].y );
            let _stroke_width = 0;
            if ( this.Data.Orientation === "right" )
            {
                _stroke_width = ( i + 1 );
            }
            else if (this.Data.Orientation === "left")
            {
                _stroke_width = ( this.StringNames.length - i );
            }

            let _new_string = {
                name: this.StringNames[i].text,
                x1: _string_left,
                y1: this.StringNames[i].y,
                x2: _string_right,
                y2: this.StringNames[i].y,
                stroke: "rgba(0,0,0,1)",
                strokeWidth: _stroke_width,
            };
            this.StringLinePositions.push( _new_string );
        }
        //  console.debug( "this.StringLinePositions", this.StringLinePositions.length, this.StringLinePositions );


        //  FRETS & FRET NAMES
        //  <line x1="100" y1="90" x2="100" y2="500" stroke="black" strokeWidth="10" />
        //  console.debug( "FRETS", this.FretboardRect, this.FretNamesRect );
        this.FretNames = [];
        this.Frets = [];

        this.FretsTextArea = {
            x: this.FretNamesRect.x,
            y: this.FretNamesRect.y + 30,
            rotate: 0,
            textLength: "50%",
            fontSize: 26,
            fillColor: "rgba(0,0,0,1)",
            dominantBaseline: "text-top",
            textAnchor: "start",
            text: "FRETS"
        };

        // fret names
        let _fret_data = [];

        let _top = this.FretboardRect.y;
        let _nut_strokeWidth = 1;
        let _bottom = this.Height;
        let _new_left = this.FretboardRect.x; // console.debug( "_new_left", _new_left );

        if ( this.Data.Orientation === "right" )
        {
            _new_left = this.FretboardRect.x;

            for ( let i = 0; i < this._fretboard_count + 1; i++ )
            {
                let _left = 0;

                if ( i === 0 )
                {
                    _left = _new_left;
                    _nut_strokeWidth = 6;
                }
                else
                {
                    _left = ( i * this._fret_height_space ) + _new_left;
                    _nut_strokeWidth = 1;
                }
                //  console.debug( i, _left );

                let _fn = {
                    text: i,
                    x: _left - 8,
                    y: _top - 10,
                    x1: _left,
                    y1: _top,
                    x2: _left,
                    y2:  _bottom,
                    strokeWidth: _nut_strokeWidth,
                    stroke: "rgba(0,0,0,1)"
                };
                _fret_data.push( _fn );
            }
        }
        else if ( this.Data.Orientation === "left" )
        {
            _new_left = this.FretboardRect.width;
            //  console.debug( "_new_left", _new_left );

            for ( let i = 0; i < this._fretboard_count + 1; i++ )
            {
                let _left = 0;

                if ( i === 0 )
                {
                    _left = _new_left;
                    _nut_strokeWidth = 6;
                }
                else
                {
                    _left =  _new_left - ( i * this._fret_height_space );
                    _nut_strokeWidth = 1;
                }
                //  console.debug( i, _left );

                let _fn = {
                    text: i,
                    x: _left - 8,
                    y: _top - 10,
                    x1: _left,
                    y1: _top,
                    x2: _left,
                    y2:  _bottom,
                    strokeWidth: _nut_strokeWidth,
                    stroke: "rgba(0,0,0,1)"
                };
                _fret_data.push( _fn );
            }
        }

        this.Frets = _fret_data;

        //console.debug( "this.FretNoteMatrix ", this.FretNoteMatrix );

        for ( let i = 0; i < this.StringLinePositions.length; i++ )
        {
            //  console.debug( "this.StringLinePositions", this.StringLinePositions[i].name, this.StringLinePositions[i].y1 );

            let _temp_fret_x1 = [];
            for ( let j = 0; j < this.Frets.length; j++ )
            {   //  console.debug( "this.Frets", this.Frets[j].text, this.Frets[j].x1 );

                let _new_y = 0;
                let _new_x = 0;

                if ( this.Data.Orientation === "right" )
                {
                    _new_y = this.StringLinePositions[i].y1 - 20;
                    _new_x = this.Frets[j].x1 - 49;
                }
                else if (this.Data.Orientation === "left")
                {
                    _new_y = this.StringLinePositions[i].y1 - 20;
                    _new_x = this.Frets[j].x1 + 10;
                }

                let _note_location = {
                    noteName: "XX",
                    y: _new_y,
                    x: _new_x
                }

                _temp_fret_x1.push( _note_location );
            }

            this.FretNoteMatrix[i] = _temp_fret_x1;
        }

        //  console.debug( "this.FretNoteMatrix ", this.FretNoteMatrix.length, this.FretNoteMatrix );    
        return;
    };

    // DATA SPECIFIC, SHOULD BE ABLE TO REUSE
    ComputeAllFretboardData()
    {   
        //  console.debug( "ComputeData()",this.Data.Orientation );
        //  console.debug( "this.FretNoteMatrix ", this.FretNoteMatrix.length, this.FretNoteMatrix );    
        //  console.debug( "ComputeAllFretboardData()", this.props.data.Tuning, this.props.data.ShowFretNotes, this.props.data.ShowScaleNotes );

        // /*get the frets, scale & chord data*/
        //  this.FretNoteMatrix = [];
        //  this.ScaleNoteMatrix = [];
        //  this.ArppegioNoteMatrix = [];
        //  this.ChordNoteMatrix = [];

        // SET ORDER OF STRING NOTES
        let _tuning = [];   //this.Data.Tuning; //  console.debug("_tuning",_tuning);
        if ( this.Data.Orientation === SvgChord.Orientations.Right )
        {
            for ( let i = this.Data.Tuning.length; i > 0; i-- )
            {
                _tuning.push( this.Data.Tuning[i-1] );
            }
        }
        else if (this.Data.Orientation === SvgChord.Orientations.Left)
        {
            for ( let i = 0; i < this.Data.Tuning.length; i++ )
            {
                _tuning.push( this.Data.Tuning[i] );
            }
        }
        //  console.debug("_tuning",_tuning);

        // GET ALL NOTES PRE STRING
        let _fret_notes = [];
        for ( let i = 0; i < _tuning.length; i++ )
        {
            let _note_index = this.Notes.findIndex( function ( item )
            {
                return item.toLowerCase() === _tuning[i].toLowerCase();
            }, this );

            let _start_notes = this.Notes.slice( _note_index );
            let _end_notes = this.Notes.slice( 0, _note_index );
            let _new_note_array = [..._start_notes, ..._end_notes, ..._start_notes, ..._end_notes, _start_notes[0]];
            //  console.debug( "_new_note_array", _new_note_array );

            _fret_notes[i] = _new_note_array;
        }
        //console.debug( "1. _fret_notes", _fret_notes.length, _fret_notes );
        //console.debug( "2. this.FretNoteMatrix", this.FretNoteMatrix.length, this.FretNoteMatrix );

        // ASSIGN NOTES TO FRET NOTES
        for ( let i = 0; i < _fret_notes.length; i++ )
        {
            //  console.debug( "_fret_notes", _fret_notes[i] );
            for ( let j = 0; j < _fret_notes[i].length; j++ )
            {
                //  console.debug( i, j, "_fret_notes", _fret_notes[i][j], this.FretNoteMatrix[i][j] );
                this.FretNoteMatrix[i][j].noteName = _fret_notes[i][j];
            }
        }
        //  console.debug( "this.FretNoteMatrix", this.FretNoteMatrix.length, this.FretNoteMatrix );

        //  console.debug( "this.Data.KeyScale", this.Data.KeyScale );
        //  console.debug( "this.Data.Notes", this.Data.Notes );

        // ASSIGN SCALE NOTES
        for ( let c = 0; c < this.FretNoteMatrix.length; c++ )
        {
            //  console.debug( c, this.FretNoteMatrix[c] );
            this.ScaleNoteMatrix[c] = [];
            this.ArpeggioNoteMatrix[c] = [];

            for ( let d = 0; d < this.FretNoteMatrix[c].length; d++ )
            {
                //  console.debug( d, this.FretNoteMatrix[c][d], this.Data.KeyScale );
                // get scale notes
                let _scale_note_found = this.Data.KeyScale.filter( function ( item )
                {
                    //  console.debug( "filter", item, this.FretNoteMatrix[c][d] );
                    let _rv = undefined;
                    if ( item === this.FretNoteMatrix[c][d].noteName )
                    {
                        _rv = this.FretNoteMatrix[c][d];
                    }
                    return _rv;
                }, this );
                //  console.debug( "_note_found", _note_found );

                if (_scale_note_found.length !== 0 )
                {
                    this.ScaleNoteMatrix[c].push( this.FretNoteMatrix[c][d] );
                }

                // get arpeggio notes

                let _arpeggio_note_found = this.Data.ChordNotes.filter( function ( item )
                {
                    //  console.debug( "filter", item, this.FretNoteMatrix[c][d] );
                    let _rv = undefined;
                    if ( item === this.FretNoteMatrix[c][d].noteName )
                    {
                        _rv = this.FretNoteMatrix[c][d];
                    }
                    return _rv;
                }, this );
                //  console.debug( "_arpeggio_note_found", _arpeggio_note_found );

                if (_arpeggio_note_found.length !== 0 )
                {
                    this.ArpeggioNoteMatrix[c].push( this.FretNoteMatrix[c][d] );
                }
            }
        }

        //  console.debug( "this.FretNoteMatrix", this.FretNoteMatrix.length, this.FretNoteMatrix );
        //  console.debug( "this.ScaleNoteMatrix", this.ScaleNoteMatrix.length, this.ScaleNoteMatrix );
        //  console.debug( "this.ArpeggioNoteMatrix", this.ArpeggioNoteMatrix.length, this.ArpeggioNoteMatrix );
        //  console.debug( "this.ChordNoteMatrix", this.ChordNoteMatrix.length, this.ChordNoteMatrix );
        return;
    };


    // FOR CHORDS
    // this.RootNutLine = {}
    // this.LeftFretLine = {};
    // this.RightFretLIne = {};
    // this.ChordFretLines = [];
    // this.ChordStringLines = [];

    ComputeChordFretboard()
    {
        //  console.debug( "ComputeChord()", this.Data );
        console.debug( this._fret_height_space, this._default_padding, this._string_spacing );

        this._fretboard_count = 5;
        this.FretNumber = this.Data.Fret;
        //console.debug( "this.Data.Fret", this.Data.Fret, this.FretNumber );

        this.Height = ( this._fretboard_count * this._fret_height_space ) + ( this._default_padding * 4 );
        this.Width = ( this.Data.Tuning.length * this._string_spacing );
        this.ViewBox = "0 0 " + this.Width + " " + this.Height;
        console.debug( this.Data.Layout, this.Height, this.Width );

        // SET BASIC COORDIANTES
        this.LabelTextData =
        {
            x: this.Width / 2,
            y: 22,
            width: this.Width,
            height: 50,
            rotate: 0,
            fillColor: "rgba(0,0,0,1)",
            dominantBaseline: "",
            textAnchor: "middle",
            textLength: undefined,
            fontSize: 24,
        };

        //this.StringNameTextData = 
        //{
        //    x: this.Width / 2,
        //    y: 60,
        //    width: this.Width,
        //    height: 50,
        //    rotate: 0,
        //    fillColor: "rgba(0,0,0,1)",
        //    dominantBaseline: "",
        //    textAnchor: "middle",
        //    textLength: undefined,
        //    fontSize: 24,
        //};

        //   <line x1="60" y1="100" x2="300" y2="100" stroke="black" strokeWidth="1" />
        //  console.debug( '<line x1="100" y1="90" x2="100" y2="500" />' );
        this.FretsNames = [];
        let _new_x = 0;
        let _new_y = 0;
        let _y_start = 100;
        let _new_x_left = 40;
        let _new_x_right = this.Width - 40;
        //  console.debug( "this.Data.Fret", this.Data.Fret, this._fret_height_space);

        for ( let i = 0; i < this._fretboard_count + 1; i++ )
        {
            if ( this.Data.Orientation === SvgChord.Orientations.Right )
            {
                _new_x = 6;
            }
            else if ( this.Data.Orientation === SvgChord.Orientations.Left )
            {
                _new_x = this.Width - 20;
            }

            let _fret_stroke_width = 1;
            if ( i + this.props.data.Fret === 0)
            {
                _fret_stroke_width = 6;
            }
            else
            {
                _fret_stroke_width = 1;
            }

            if ( i === 0 )
            {
                _new_y = _y_start;
            }
            else
            {
                _new_y = _y_start + (( i * 1 ) * this._fret_height_space);
            }
            //  console.debug( i, _new_y );

            let _fret = {
                x: _new_x,
                y: _new_y + 10,
                fil: "rgba(0,0,0,1)",
                stroke: "rgba(0,0,0,1)",
                strokeWidth: _fret_stroke_width,
                fontSize: 24,
                text: (i + this.props.data.Fret).toString(),
                x1: _new_x_left,
                y1: _new_y,
                x2: _new_x_right,
                y2: _new_y
            };
            //  console.debug( _fret.text);

            this.FretsNames[i] = _fret;
        }
        //  console.debug( "this.FretsNames", this.FretsNames );

        // <line x1="10" y1="90" x2="10" y2="500" stroke="black" strokeWidth="1" />
        this.BorderFrets = [
            {
                x1: this.FretsNames[0].x1,
                y1: this.FretsNames[0].y1,
                x2: this.FretsNames[0].x1,
                y2: this.FretsNames[this.FretsNames.length-1].y2 + this._fret_height_space
            },
            {
                x1: this.FretsNames[0].x2,
                y1: this.FretsNames[0].y1,
                x2: this.FretsNames[0].x2,
                y2: this.FretsNames[this.FretsNames.length-1].y2 + this._fret_height_space
            },
        ];

        // <tspan key={idx} x={item.x} y={item.y + 5}>{item.text}</tspan>
        this.ChordStringNames = [];
        for ( let i = 0; i < this.Data.Tuning.length; i++ )
        {
            let _string_name = {
                dx: 10,
                dy: 0,
                text: this.props.data.Tuning[i]
            };
            this.ChordStringNames.push( _string_name );
        }
        //  console.debug( this.StringNames );


        //  this.ComputeChordFretboardLayouts();
        //  this.ComputeAllFretboardData();
        return;
    }

    render()
    {   //  console.debug( "SvgChord.render()" );
        this.ComputeCoordinates();

        return (
            <svg className="chord-box" viewBox={this.ViewBox} >
                {/* 
                 * FULL FRETBOARD LAYOUTS 
                 */}
                {
                    this.props.data.Layout === SvgChord.LayoutTypes.Fretboard && this._debug  === true &&
                    <g>
                    <rect id="LabelRect" fill="rgba(255,255,0,0.1)" stroke="black" strokeWidth="0" 
                        x={this.LabelRectCoords.x}
                        y={this.LabelRectCoords.y}
                        height={this.LabelRectCoords.height}
                        width={this.LabelRectCoords.width} />

                    <rect id="StringNamesRect" fill="rgba(0,128,0,0.1)" stroke="black" strokeWidth="0"
                        x={this.StringNamesRect.x}
                        y={this.StringNamesRect.y}
                        height={this.StringNamesRect.height}
                        width={this.StringNamesRect.width} />

                    <rect id="FretNamesRect" fill="rgba(0,0,255,0.1)" stroke="black" strokeWidth="0"
                        x={this.FretNamesRect.x}
                        y={this.FretNamesRect.y}
                        height={this.FretNamesRect.height}
                        width={this.FretNamesRect.width} />

                    <rect id="FretboardRect" fill="rgba(255,0,0,0.1)" stroke="black" strokeWidth="0" 
                        x={this.FretboardRect.x}
                        y={this.FretboardRect.y}
                        height={this.FretboardRect.height}
                        width={this.FretboardRect.width} />
                   </g>
                }
                {
                    this.props.data.Layout === SvgChord.LayoutTypes.Fretboard &&
                    <g>
                    {/* APP TEXT DATA */}
                    <text
                        x={this.LabelTextData.x}
                        y={this.LabelTextData.y}
                        rotate={this.LabelTextData.rotate}
                        fill={this.LabelTextData.fillColor}
                        dominantBaseline={this.LabelTextData.dominantBaseline}
                        textAnchor={this.LabelTextData.textAnchor}
                        textLength={this.LabelTextData.textLength}
                        fontSize={this.LabelTextData.fontSize}>{this.LabelTextData.text}</text>

                    {/* FRET RECT */}
                    <rect x={this.FretboardRect.x}
                        y={this.FretboardRect.y}
                        height={this.FretboardRect.height}
                        width={this.FretboardRect.width}
                        fill="rgba(255,255,255,1)" stroke="rgba(0,0,0,1)" strokeWidth="0.3" 
                    />

                    {/* FRET NAME DATA */}
                    <text
                        x={this.FretsTextArea.x}
                        y={this.FretsTextArea.y}
                        rotate={this.FretsTextArea.rotate}
                        fill={this.FretsTextArea.fillColor}
                        dominantBaseline={this.FretsTextArea.dominantBaseline}
                        textAnchor={this.FretsTextArea.textAnchor}
                        textLength={this.FretsTextArea.textLength}
                        fontSize={this.FretsTextArea.fontSize}>
                        {
                            this.Frets.map( ( item, idx ) =>
                                (
                                    idx !== this.Frets.length-1 &&
                                    <tspan
                                        key={idx}
                                        x={item.x}
                                        y={item.y}
                                    >{item.text}</tspan>
                            ))
                        }
                    </text>


                    {/* FRETS <line x1="100" y1="90" x2="100" y2="500" stroke="black" strokeWidth="10" /> */}
                    {
                        this.Frets.map( ( item, idx ) =>
                            (
                                <line
                                    key={idx}
                                    x1={item.x1}
                                    y1={item.y1}
                                    x2={item.x2}
                                    y2={item.y2}
                                    stroke={item.stroke}
                                    strokeWidth={item.strokeWidth} />
                        ))
                    }

                    {/* STRING NAME DATA */}
                    <text
                        x={this.StringNameTextData.x}
                        y={this.StringNameTextData.y}
                        rotate={this.StringNameTextData.rotate}
                        fill={this.StringNameTextData.fillColor}
                        dominantBaseline={this.StringNameTextData.dominantBaseline}
                        textAnchor={this.StringNameTextData.textAnchor}
                        textLength={this.StringNameTextData.textLength}
                        fontSize={this.StringNameTextData.fontSize}>
                        {
                            this.StringNames.map( ( item, idx ) =>
                                (
                                    <tspan
                                        key={idx}
                                        x={item.x}
                                        y={item.y + 5}
                                    >{item.text}</tspan>
                            ))
                        }
                    </text>

                    {/* STRING POSITIONS <line x1="80" y1="100" x2="1450" y2="100" stroke="black" strokeWidth="10" /> */}
                    {
                        this.StringLinePositions.map( ( item, idx ) =>
                            (
                                <line
                                    key={idx}
                                    x1={item.x1}
                                    y1={item.y1}
                                    x2={item.x2}
                                    y2={item.y2}
                                    stroke={item.stroke}
                                    strokeWidth={item.strokeWidth} />
                        ))
                    }

                    {/* DEBUG NOTE POSITIONS 
                     * <rect x="50" y="50" width="40" height="40" fill="red"/>
                     * <rect x={item2.x} y={item2.y} width="40" height="40" fill="orange" stroke="black" strokeWidth="0.4" />
                     * <circle key={idx2} cx={item2.x + 20} cy={item2.y + 20} r="20"/>
                     * will need to offset x,y for different SVG element types
                     * */}
                    {
                        this.props.ShowFretNotes === true &&
                        this.FretNoteMatrix.map( ( item, idx ) =>
                        (
                            <g key={idx}>
                            {
                                this.FretNoteMatrix[idx].map( ( item2, idx2 ) =>
                                    (
                                        <g key={idx2}>
                                            <circle cx={item2.x + 20} cy={item2.y + 20} r="20" fill="rgba(255,240,240,1)" stroke="black" strokeWidth="0.1"/>
                                            <text x={item2.x + 20} y={item2.y + 27} fontSize="20" textAnchor="middle" fill="rgba(0,0,0,0.5)">{item2.noteName}</text>
                                        </g>
                                ))
                            }
                            </g>
                        ))
                    }
                    {
                        this.props.ShowScaleNotes === true &&
                        this.ScaleNoteMatrix.map( ( item, idx ) =>
                        (
                            <g key={idx}>
                            {
                                this.ScaleNoteMatrix[idx].map( ( item2, idx2 ) =>
                                    (
                                        <g key={idx2}>
                                            <circle key={idx2} cx={item2.x + 20} cy={item2.y + 20} r="20" fill="rgba(192,240,255,1)" stroke="black" strokeWidth="1"/>
                                            <text x={item2.x + 20} y={item2.y + 27} fontSize="20" textAnchor="middle" fill="rgba(0,0,0,1)">{item2.noteName}</text>
                                        </g>
                                ))
                            }
                            </g>
                        ))
                    }
                    {
                        this.props.ShowArpeggioNotes === true &&
                        this.ArpeggioNoteMatrix.map( ( item, idx ) =>
                        (
                            <g key={idx}>
                            {
                                this.ArpeggioNoteMatrix[idx].map( ( item2, idx2 ) =>
                                    (
                                        <g key={idx2}>
                                            <circle key={idx2} cx={item2.x + 20} cy={item2.y + 20} r="20" fill="aqua" stroke="black" strokeWidth="0.4"/>
                                            <text x={item2.x + 20} y={item2.y + 28} fontSize="20" textAnchor="middle">{item2.noteName}</text>
                                        </g>
                                ))
                            }
                            </g>
                        ))
                    }

                </g>
                }


                {/* 
                 * CHORD LAYOUT
                 */}
                {
                    this.props.data.Layout === SvgChord.LayoutTypes.Chord &&
                    <g>

                        {/* APP TEXT DATA 
                           <rect x={this.LabelRectCoords.x}
                            y={this.LabelRectCoords.y}
                            height={this.LabelRectCoords.height}
                            width={this.LabelRectCoords.width}
                            fill="rgba(255,0,0,0.2)" stroke="rgba(0,0,0,1)" strokeWidth="0.1" 
                        />
                         */}
                        <text
                            x={this.LabelTextData.x}
                            y={this.LabelTextData.y}
                            rotate={this.LabelTextData.rotate}
                            fill={this.LabelTextData.fillColor}
                            dominantBaseline={this.LabelTextData.dominantBaseline}
                            textAnchor={this.LabelTextData.textAnchor}
                            textLength={this.LabelTextData.textLength}
                            fontSize={this.LabelTextData.fontSize}>{this.props.data.Name}</text>


                        {/* STRING NAMES */}
                        {
                            this.ChordStringNames.map( ( item, idx ) =>
                            (
                                <g key={idx}>
                                    <text x={item.x} y={item.y} fill={item.fillColor} fontSize={item.fontSize}>{item.text}</text> 
                                    <line x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} stroke="rgba(0,0,0,1)" strokeWidth={item.strokeWidth} />
                                </g>
                            ))
                        }

                        {/* FRET NAMES DATA  */}
                        {/* FRETS 
                         * vertical - <line x1="100" y1="90" x2="100" y2="500" stroke="black" strokeWidth="10" />
                         * horizontal - <line x1="60" y1="100" x2="300" y2="100" stroke="black" strokeWidth="1" />
                         * */}
                        {
                            this.FretsNames.map( ( item, idx ) =>
                            (
                                <g key={idx}>
                                    <text x={item.x} y={item.y} fill={item.fillColor} fontSize={item.fontSize}>{item.text}</text> 
                                    <line x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} stroke="rgba(0,0,0,1)" strokeWidth={item.strokeWidth} />
                                </g>
                            ))
                        }
                        {
                            this.BorderFrets.map( ( item, idx ) =>
                            (
                                <line key={idx} x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} stroke="rgba(0,0,0,1)" strokeWidth={item.strokeWidth} />
                            ))
                        }

                    {/* STRING NAME DATA
                     *                     <text
                        x={this.StringNameTextData.x}
                        y={this.StringNameTextData.y}
                        rotate={this.StringNameTextData.rotate}
                        fill={this.StringNameTextData.fillColor}
                        dominantBaseline={this.StringNameTextData.dominantBaseline}
                        textAnchor={this.StringNameTextData.textAnchor}
                        textLength={this.StringNameTextData.textLength}
                        fontSize={this.StringNameTextData.fontSize}>
                        {
                            this.StringNames.map( ( item, idx ) =>
                                (
                                    <tspan
                                        key={idx}
                                        x={item.x}
                                        y={item.y + 5}
                                    >{item.text}</tspan>
                            ))
                        }
                    </text>
                     * */}


                    {/* STRING POSITIONS <line x1="80" y1="100" x2="1450" y2="100" stroke="black" strokeWidth="10" />
                     *                     {
                        this.StringLinePositions.map( ( item, idx ) =>
                            (
                                <line
                                    key={idx}
                                    x1={item.x1}
                                    y1={item.y1}
                                    x2={item.x2}
                                    y2={item.y2}
                                    stroke={item.stroke}
                                    strokeWidth={item.strokeWidth} />
                        ))
                    }
                     * */}


                    {/* DEBUG NOTE POSITIONS 
                     * <rect x="50" y="50" width="40" height="40" fill="red"/>
                     * <rect x={item2.x} y={item2.y} width="40" height="40" fill="orange" stroke="black" strokeWidth="0.4" />
                     * <circle key={idx2} cx={item2.x + 20} cy={item2.y + 20} r="20"/>
                     * will need to offset x,y for different SVG element types
                     * */}
                    {/*
                        this.props.ShowFretNotes === true &&
                        this.FretNoteMatrix.map( ( item, idx ) =>
                        (
                            <g key={idx}>
                            {
                                this.FretNoteMatrix[idx].map( ( item2, idx2 ) =>
                                    (
                                        <g key={idx2}>
                                            <circle cx={item2.x + 20} cy={item2.y + 20} r="20" fill="rgba(255,240,240,1)" stroke="black" strokeWidth="0.1"/>
                                            <text x={item2.x + 20} y={item2.y + 27} fontSize="20" textAnchor="middle" fill="rgba(0,0,0,0.5)">{item2.noteName}</text>
                                        </g>
                                ))
                            }
                            </g>
                        ))
                    */}
                    {/*
                        this.props.ShowScaleNotes === true &&
                        this.ScaleNoteMatrix.map( ( item, idx ) =>
                        (
                            <g key={idx}>
                            {
                                this.ScaleNoteMatrix[idx].map( ( item2, idx2 ) =>
                                    (
                                        <g key={idx2}>
                                            <circle key={idx2} cx={item2.x + 20} cy={item2.y + 20} r="20" fill="rgba(192,240,255,1)" stroke="black" strokeWidth="1"/>
                                            <text x={item2.x + 20} y={item2.y + 27} fontSize="20" textAnchor="middle" fill="rgba(0,0,0,1)">{item2.noteName}</text>
                                        </g>
                                ))
                            }
                            </g>
                        ))
                    */}
                    {/*
                        this.props.ShowArpeggioNotes === true &&
                        this.ArpeggioNoteMatrix.map( ( item, idx ) =>
                        (
                            <g key={idx}>
                            {
                                this.ArpeggioNoteMatrix[idx].map( ( item2, idx2 ) =>
                                    (
                                        <g key={idx2}>
                                            <circle key={idx2} cx={item2.x + 20} cy={item2.y + 20} r="20" fill="aqua" stroke="black" strokeWidth="0.4"/>
                                            <text x={item2.x + 20} y={item2.y + 28} fontSize="20" textAnchor="middle">{item2.noteName}</text>
                                        </g>
                                ))
                            }
                            </g>
                        ))
                   */ }

                    </g>
                }
            </svg>
        );
    }
};
