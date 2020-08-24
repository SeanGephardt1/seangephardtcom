import React from 'react';
import './svg-chord.css';

export default class SvgChord extends React.Component
{
    static LayoutTypes = { Fretboard: "fretboard", Chord: "chord", ExtendedChord: "extchord" };
    static Orientations = { Left: "left", Right: "right" };
    static defaultProps = {
        Tuning: ["E", "A", "D", "G", "B", "E"],
        KeyScale: ["C", "D", "E", "F", "G", "A", "B"],
        Name: "TESTNG",
        Notes: [],
        Fret: 0,
        Layout: SvgChord.LayoutTypes.Fretboard,
        Orientation: SvgChord.Orientations.Right,
        ShowFretNotes: true,
        ShowScaleNotes: true,
        ShowChordNotes: true
    };
    constructor( props )
    {
        super( props );
        this.state = {};
        this.Notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

        this._debug = false;

        this._default_note_radius = 20;
        this._fretboard_count = 24;
        this._chord_fret_count = 5;
        this._ext_chord_count = 8;

        this._default_padding = 50;
        this._fret_height_space = 60;
        this._string_spacing = 50;
        //  console.debug( "this.props.data", this.props.data );
        this.Data = ( this.props.data || SvgChord.defaultProps );

        this.DisplayFretboardData = this.Data.ShowFretNotes;
        this.DisplayScaleData = this.Data.ShowScaleNotes;
        this.DispayChordData = this.Data.ShowChordNotes;
        //  TBD this.DisplayArpeggioData = true;

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
            textAnchor: "middle",
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

        this.FretNamesRect = {
            x: 80,
            y: 80,
            height: 50,
            width: 100
        };
        this.FretNames = [];

        this.FretboardRect = {
            x: 100,
            y: 100,
            height: 100,
            width: 100
        };
        this.Frets = [];

        this.FretNoteMatrix = [];
        this.ScaleNoteMatrix = [];
        this.ArppegioNoteMatrix = [];
        this.ChordNoteMatrix = [];

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
    {   //  console.debug( "SvgChord.ComputeCoordinates()" );
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

    ComputeFullFretboard()
    {   //  console.debug( "ComputeFretboard()" );
        this._fretboard_count = 24;
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
        this.ComputeAllFretboardData();
        return;
    };
    ComputeAreaLayouts()
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
            textLength: "50%",
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
            _string_names_left = this.Width - ( _string_names_padding * 3 );
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

            let _ss = ( _string_space * (i+1)) + this.StringNameTextData.y;// + this._string_spacing );
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
            x: this.FretNamesRect.x ,
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
    ComputeAllFretboardData()
    {   
        console.debug( "ComputeData()", this.Data.Tuning, this.Data.Orientation );
        console.debug( "this.FretNoteMatrix ", this.FretNoteMatrix.length, this.FretNoteMatrix );    

        // /*get the frets, scale & chord data*/
        //  this.FretNoteMatrix = [];
        //  this.ScaleNoteMatrix = [];
        //  this.ArppegioNoteMatrix = [];
        //  this.ChordNoteMatrix = [];

        
        for ( let i = 0; i < this.Data.Tuning.length; i++ )
        {
            let _note_index = this.Notes.findIndex( function ( item )
            {
                return item.toLowerCase() === this.Data.Tuning[i].toLowerCase();
            }, this );

            let _start_notes = this.Notes.slice( _note_index );
            let _end_notes = this.Notes.slice( 0, _note_index );
            let _new_note_array = [..._start_notes, ..._end_notes, ..._start_notes, ..._end_notes];
            console.debug( "_new_note_array", _new_note_array );

            //  this.FretboardData[i] = _new_note_array;
        }

        //console.debug( "this.FretboardData", this.FretboardData.length, this.FretboardData );

        return;
    };




    // FOR CHORDS
    ComputeChordFretboard()
    {
        console.debug( "ComputeChord()" );

        if ( this.Data.Layout === SvgChord.LayoutTypes.Chord )
        {
            this._fretboard_count = 5;
        }
        else if (this.Data.Layout === SvgChord.LayoutTypes.ExtendedChord)
        {
            this._fretboard_count = 8;
        }
        this.FretNumber = this.Data.Fret;

        this.Height = ( this._fretboard_count * this._fret_height_space ) + ( this._default_padding * 2 );
        this.Width = ( this.Data.Tuning.length * this._string_spacing );
        this.ViewBox = "0 0 " + this.Width + " " + this.Height;
        //  console.debug( this.Data.Layout, this.Height, this.Width );

        this.LabelRectCoords = {
            x: 0,
            y: 0,
            height: 40,
            width: this.Width
        };

        if ( this.Data.Orientation === SvgChord.Orientations.Right )
        {
            this.StringNamesRect = {
                x: 50,
                y: this.LabelRectCoords.height,
                height: this.LabelRectCoords.height,
                width: this.Width - 50
            };

            this.FretNamesRect = {
                x: 0,
                y: this.LabelRectCoords.height + this.StringNamesRect.height,
                height: this.Height - this.LabelRectCoords.height + this.StringNamesRect.height,
                width: 50
            };

            this.FretboardRect = {
                x: this.FretNamesRect.width,
                y: this.LabelRectCoords.height + this.StringNamesRect.height,
                height: this.Height - this.LabelRectCoords.height + this.StringNamesRect.height,
                width: this.Width - this.FretNamesRect.width
            };
        }
        else if ( this.Data.Orientation === SvgChord.Orientations.Left )
        {
            this.StringNamesRect = {
                x: 0,
                y: this.LabelRectCoords.height,
                height: this.LabelRectCoords.height,
                width: this.Width - 50
            };

            this.FretNamesRect = {
                x: this.Width - 50,
                y: this.LabelRectCoords.height + this.StringNamesRect.height,
                height: this.Height - this.LabelRectCoords.height + this.StringNamesRect.height,
                width: 50
            };

            this.FretboardRect = {
                x: 0,
                y: this.LabelRectCoords.height + this.StringNamesRect.height,
                height: this.Height - this.LabelRectCoords.height + this.StringNamesRect.height,
                width: this.Width - this.FretNamesRect.width
            };
        }
        return;
    }

    OLD_ComputeFretboardLayout()
    {   //  console.debug( "ComputeFretboardLayout", this.Data);

        //if ( this.Data.Layout === SvgChord.LayoutTypes.Fretboard )
        //{
        //    this.Height = ( this._default_padding * 4 ) + ( this.Data.Tuning.length * this._string_spacing );
        //    this.Width = ( this._default_padding * 2 ) + ( ( this._fretboard_count  ) * this._fret_height_space );
        //    this.ViewBox = "0 0 " + this.Width + " " + this.Height;

        //    this.LayoutText.x = ( this.Width / 3 );
        //    this.LayoutText.y = 30;
        //    this.LayoutText.Key = "Key Scale: " + this.Data.KeyScale;
        //    this.LayoutText.Chord = "Chord name: " + this.Data.Notes;

        //    this.FretsText.x = 20;
        //    this.FretsText.y = 40;

        //    this.FretboardRect.x = ( this._default_padding * 2 );
        //    this.FretboardRect.y = (this._default_padding * 2) - 10;
        //    this.FretboardRect.width = this.Width - ( this._default_padding * 2 ) - 10;
        //    this.FretboardRect.height = this.Height - ( this._default_padding * 2 );

        //    this.ComputeFretsAndStrings();
        //}
        //else if ( this.Data.Layout === SvgChord.LayoutTypes.Chord || SvgChord.LayoutTypes.ExtendedChord )
        //{
        //    this.Height = ( this._default_padding * 2 ) + ( (this._fretboard_count -1) * this._fret_height_space ) ;
        //    this.Width = ( this._default_padding * 2 ) + ( this.Data.Tuning.length * this._string_spacing );
        //    this.ViewBox = "0 0 " + this.Height + " " + this.Width;

        //    this.FretboardRect.x = 100;
        //    this.FretboardRect.y = 100;
        //    this.FretboardRect.width = 300;
        //    this.FretboardRect.height = 300;

        //    this.LayoutText.x = 20;
        //    this.LayoutText.y = 70;
        //    this.LayoutText.text = "Key of C";
        //}

        //console.debug( "this.Height", this.Height, "this.Width", this.Width, "this.ViewBox", this.ViewBox );

        //this.ComputeFretboardData();
        //this.ComputeScaleLayout();
        //this.ComputeChordLayout();
        return;
    };
    OLD_ComputeFretsAndStrings()
    {   //  console.debug( "ComputeFretsAndStrings( fretRect )", this._fretboard_count, this.FretboardRect );

        // FRETS - <line x1="100" y1="70" x2="100" y2="450" stroke="red" />
        let _fret_spacing = Math.round( this.FretboardRect.width / this._fretboard_count );
        let _top = this.FretboardRect.y;
        let _bottom = this.FretboardRect.height + this.FretboardRect.y;

        for ( let i = 0; i < this._fretboard_count; i++ )
        {
            let _left = 0;

            if ( i === 0 )
            {
                _left = this.FretboardRect.x;
            }
            else
            {
                _left = ( i * _fret_spacing ) + ( this.FretboardRect.x );
            }

            let _fret = {
                Number: i,
                x1: _left,
                y1: _top,
                x2: _left,
                y2: _bottom
            };

            this.FretPositions[i] = _fret;
        }
        //  console.debug( "this.FretPositions", this.FretPositions );

        // STRINGS - <line x1="80" x2="1450" y1="100" y2="100" stroke="red" />
        let _string_spacing = Math.round( this.FretboardRect.height / this.Data.Tuning.length );
        //  console.debug( "_string_spacing", _string_spacing );

        for ( let i = 0; i < this.Data.Tuning.length; i++ )
        {
            //  console.debug( "this.Data.Tuning", this.Data.Tuning[i] );
            let _string_top = this.FretboardRect.y + ( _string_spacing * i ) + 30;
            //  console.debug( "_string_top", _string_top );

           //    let _string_guage = i + (this.Data.Tuning.length / 2);
            let _string_guage = ( i +  1);//i + (this.Data.Tuning.length / 2);
            //  console.debug( "_string_guage", _string_guage);

            const _string = {
                x1: this.FretboardRect.x,
                x2: ( this.FretboardRect.x + this.FretboardRect.width ),
                y1: _string_top,
                y2: _string_top,
                Style: { 'strokeWidth': _string_guage, 'stroke': 'rgba(0,0,0,0.4)' },
            };
            //  console.debug( "_string", _string );
            this.StringPositions[i] = _string;
        }
        //  .debug( "this.StringPositions", this.StringPositions );

        // STRING NAMES
        const _temp_tuning = this.Data.Tuning.reverse();

        for ( let i = 0; i < _temp_tuning.length; i++ )
        {
            //  console.debug( "this.Data.Tuning", this.Data.Tuning[i] );
            let _string_top = this.FretboardRect.y + ( _string_spacing * i ) + 47;

            const _string = {
                x1: 14,
                x2: 40,
                y1: _string_top,
                y2: _string_top,
                Name: _temp_tuning[i]
            };
            this.StringNames[i] = _string;
        }

        return;
    };    
    OLD_ComputeFretboardData()
    {   //  console.debug( "ComputeFretboardMatrix", this.Data.Tuning );
        
        for ( let i = 0; i < this.Data.Tuning.length; i++ )
        {
            let _note_index = this.Notes.findIndex( function ( item )
            {
                return item.toLowerCase() === this.Data.Tuning[i].toLowerCase();
            }, this );

            let _start_notes = this.Notes.slice( _note_index );
            let _end_notes = this.Notes.slice( 0, _note_index );
            let _new_note_array = [..._start_notes, ..._end_notes, ..._start_notes, ..._end_notes];
            //  console.debug( "_new_note_array", _new_note_array );

            this.FretboardData[i] = _new_note_array;
        }

        //console.debug( "this.FretboardData", this.FretboardData.length );
        //console.debug( "this.FretPositions", this.FretPositions.length );
        //console.debug( "this.StringPositions", this.StringPositions.length );

        // get fretboard left positions & strings top positions.
        const _fretboard_left_pos = [];
        const _strings_top_pos = [];

        this.FretPositions.forEach( function ( v, i, a )
        {   //  console.debug( i, v );
            _fretboard_left_pos.push( v.x1 );
        } );
        //  console.debug( "_fretboard_left_pos", _fretboard_left_pos );

        this.StringPositions.forEach( function ( v, i, a )
        {   //  console.debug( i, v );
            _strings_top_pos.push( v.y1 );
        } );
        //  console.debug( "_strings_top_pos", _strings_top_pos );

        let _fb_matrix = [];
        for ( let f = 0; f < this.FretboardData.length; f++ )
        {
            //  console.debug( this.FretboardData[f].length );
            _fb_matrix[f] = [];
            //  console.debug( "_strings_top_pos", _strings_top_pos[f] );

            for ( let b = 0; b < this.FretboardData[f].length; b++ )
            {
                //  console.debug( this.FretboardData[f][b] );
                let _fb_left = _fretboard_left_pos[b];

                let _note = {
                    Name: this.FretboardData[f][b],
                    cx: _fb_left - 26,
                    cy: _strings_top_pos[f],
                    r: 18,
                    note: this.FretboardData[f][b],
                    //fill: this.FretNoteStyle
                };
                //  console.debug( "_note", _note );
                _fb_matrix[f][b] = _note;
            }
        }
        //  console.debug( "_fb_matrix", _fb_matrix );

        this.FretboardMatrix = _fb_matrix;
        //  console.debug( "this.FretboardMatrix", this.FretboardMatrix );

        return;
    };
    OLD_ComputeScaleLayout()
    {   //  console.debug( "ComputeScaleLayout()::this.FretboardData", this.FretboardMatrix.length, this.FretboardMatrix );
        // SETUP SCALE MATRIX
        for ( let c = 0; c < this.FretboardMatrix.length; c++ )
        {
            //console.debug( c, this.FretboardMatrix[c] );
            this.ScaleData[c] = [];

            for ( let d = 0; d < this.FretboardMatrix[c].length; d++ )
            {
                //  console.debug( d, this.FretboardMatrix[c][d], chordData.Notes );
                this.ScaleData[c][d] = this.FretboardMatrix[c][d];

                let _note_found = this.Data.KeyScale.filter( function ( item )
                {
                    return item === this.FretboardMatrix[c][d].Name;
                }, this );
                //  console.debug( "_note_found", _note_found );

                if ( _note_found.length === 0 )
                {
                    this.ScaleData[c][d] = null;
                }
            }
        }
        //  console.debug( "this.ScaleData", this.ScaleData.length, this.ScaleData );
        return;
    }
    OLD_ComputeChordLayout()
    {   //  console.debug( "ComputeChordLayout" );
        for ( let c = 0; c < this.FretboardMatrix.length; c++ )
        {
            //console.debug( c, this.FretboardMatrix[c] );
            this.ChordData[c] = [];

            for ( let d = 0; d < this.FretboardMatrix[c].length; d++ )
            {
                //  console.debug( d, this.FretboardMatrix[c][d], chordData.Notes );
                this.ChordData[c][d] = this.FretboardMatrix[c][d];

                let _note_found = this.Data.Notes.filter( function ( item )
                {
                    return item === this.FretboardMatrix[c][d].Name;
                }, this );
                //  console.debug( "_note_found", _note_found );

                if ( _note_found.length === 0 )
                {
                    this.ChordData[c][d] = null;
                }
            }
        }
        //  console.debug( "this.ChordData", this.ChordData.length, this.ChordData );
        return;
    };

    render()
    {
        //  console.debug( "SvgChord.render()", this.props.data.Layout, this.props.data.Orientation );
        this.ComputeCoordinates();
        //  console.debug( "SvgChord.render()", this.Height, this.Width, this.ViewBox );

        return (
            <svg className="chord-box" viewBox={this.ViewBox} >
                {
                    this._debug  === true &&
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
                                        y={item.y}
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
                        this.FretNoteMatrix.map( ( item, idx ) =>
                        (
                            <g key={idx}>
                            {
                                this.FretNoteMatrix[idx].map( ( item2, idx2 ) =>
                                    (
                                        <g key={idx2}>
                                            <circle key={idx2} cx={item2.x + 20} cy={item2.y + 20} r="20" fill="orange" stroke="black" strokeWidth="0.4"/>
                                            <text x={item2.x + 20} y={item2.y + 28} fontSize="20" textAnchor="middle">{item2.noteName}</text>
                                        </g>
                                ))
                            }
                            </g>
                        ))
                    }
                </g>
            </svg>
        );
    }
};
