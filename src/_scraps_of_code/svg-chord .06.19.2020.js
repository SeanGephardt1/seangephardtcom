import React from 'react';
import './svg-chord.css';

export default class SvgChord extends React.Component
{
    static LayoutTypes = { Fretboard: "fretboard", Chord: "chord", ExtendedChord: "extchord" };
    static Orientations = { Left: "left", Right: "right" };
    static defaultProps = {
            Tuning: ["E", "A", "D", "G", "B", "E"],
            KeyScale: ["C", "D", "E", "F", "G", "A", "B"],
            Fret: 0,
            Name: "C Major",
            Notes: ["C", "E", "G"],
            Layout: SvgChord.LayoutTypes.Fretboard,
            Orientation: SvgChord.Orientations.Right,
            ShowFretNotes: false,
            ShowScaleNotes: false,
            ShowChordNotes: true
    };
    constructor( props )
    {
        super( props );

        this.Notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

        this.Data = ( this.props.data || SvgChord.defaultProps );

        this.Height = 100;
        this.Width = 100;
        this.ViewBox = "0 0 " + this.Height + " " + this.Width;
        this.Padding = 40;

        this.FretboardCount = 24;
        this.ChordFretboardCount = 5;

        this.FretHeightSpace = 60;
        this.StringVerticalSpace = 50;

        //  BASIC DEFAULTS
        //  <text x="20px" y="34px" fill="black" fontSize="26px">{this.Data.Name}</text>
        //  <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
        //  <rect x="120" width="100" height="100" rx="15" />
        this.LayoutText = { x: 20, y: 40, fill: "black", size: 26, Key: "Key Scale: ", Chord: " Chord notes: "};
        this.FretsText = { x: 20, y: 40, fill: "black", size: 20 };
        this.NotesText = { x: 20, y: 40, fill: "black", size: 24 };

        this.FretboardRect = {
            x: 100,
            y:100,
            width: 300,
            height: 300,
            style: { "fill": "var(--default-white-02)", "strokeWidth": "1px", "stroke": "var(--default-black)" },
        };

        this._default_note_radius = 20;

        // TESTING CHORD LAYOUT
        //this.Note1 = { name: "E", position: 2, fill: "white", stroke: "black", strokeWidth: 1, cx: 56, cy: 100, r: this._default_note_radius };
        //this.Note2 = { name: "C", position: 1, fill: "black", stroke: "white", strokeWidth: 0,cx: 110, cy: 164, r: this._default_note_radius };
        //this.Note3 = { name: "G", position: 3, fill: "white", stroke: "black", strokeWidth: 1,cx: 56, cy: 226, r: this._default_note_radius };
        //this.Note4 = { name: "E", position: 2, fill: "black", stroke: "white", strokeWidth: 0,cx: 166, cy: 290, r: this._default_note_radius };
        //this.Note5 = { name: "C", position: 1, fill: "black", stroke: "white", strokeWidth: 0,cx: 220, cy: 352, r: this._default_note_radius };
        //this.Note6 = { name: "E", position: 2, fill: "white", stroke: "black", strokeWidth: 1,cx: 56, cy: 416, r: this._default_note_radius };

        //this.TestChord =  [
        //    this.Note1,
        //    this.Note2,
        //    this.Note3,
        //    this.Note4,
        //    this.Note5,
        //    this.Note6
        //];
        this.TestChord = [];

        // data arrays - refactoring
        // layouts
        this.FretPositions = [];
        this.StringPositions = [];
        this.StringNames = [];

        // data
        this.DisplayFretboardData = this.Data.ShowFretNotes;
        this.DisplayScaleData = this.Data.ShowScaleNotes;
        this.DispayChordData = this.Data.ShowChordNotes;
        //  TBD this.DisplayArpeggioData = true;

        this.FretboardMatrix = [];
        this.FretboardData = [];
        this.ScaleData = [];
        this.ChordData = [];

        //  INIT 
        this.CreateStyles();
        //  THIS WORKS FOR THE BASIC LAYOUT OF A 24 FRET BOARD - this.ComputeFretboardLayout();
        this.ComputeCoordinates();
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
    {
        console.debug( "ComputeCoordinates()" );
        return;
    };

    ComputeFretboardLayout()
    {   //  console.debug( "ComputeFretboardLayout", this.Data);

        if ( this.Data.Layout === SvgChord.LayoutTypes.Fretboard )
        {
            this.Height = ( this.Padding * 4 ) + ( this.Data.Tuning.length * this.StringVerticalSpace );
            this.Width = ( this.Padding * 2 ) + ( ( this.FretboardCount  ) * this.FretHeightSpace );
            this.ViewBox = "0 0 " + this.Width + " " + this.Height;

            this.LayoutText.x = ( this.Width / 3 );
            this.LayoutText.y = 30;
            this.LayoutText.Key = "Key Scale: " + this.Data.KeyScale;
            this.LayoutText.Chord = "Chord name: " + this.Data.Notes;

            this.FretsText.x = 20;
            this.FretsText.y = 40;

            this.FretboardRect.x = ( this.Padding * 2 );
            this.FretboardRect.y = (this.Padding * 2) - 10;
            this.FretboardRect.width = this.Width - ( this.Padding * 2 ) - 10;
            this.FretboardRect.height = this.Height - ( this.Padding * 2 );

            this.ComputeFretsAndStrings();
        }
        else if ( this.Data.Layout === SvgChord.LayoutTypes.Chord || SvgChord.LayoutTypes.ExtendedChord )
        {
            this.Height = ( this.Padding * 2 ) + ( (this.FretboardCount -1) * this.FretHeightSpace ) ;
            this.Width = ( this.Padding * 2 ) + ( this.Data.Tuning.length * this.StringVerticalSpace );
            this.ViewBox = "0 0 " + this.Height + " " + this.Width;

            this.FretboardRect.x = 100;
            this.FretboardRect.y = 100;
            this.FretboardRect.width = 300;
            this.FretboardRect.height = 300;

            this.LayoutText.x = 20;
            this.LayoutText.y = 70;
            this.LayoutText.text = "Key of C";
        }

        //console.debug( "this.Height", this.Height, "this.Width", this.Width, "this.ViewBox", this.ViewBox );

        this.ComputeFretboardData();
        this.ComputeScaleLayout();
        this.ComputeChordLayout();
        return;
    };
    ComputeFretsAndStrings()
    {   //  console.debug( "ComputeFretsAndStrings( fretRect )", this.FretboardCount, this.FretboardRect );

        // FRETS - <line x1="100" y1="70" x2="100" y2="450" stroke="red" />
        let _fret_spacing = Math.round( this.FretboardRect.width / this.FretboardCount );
        let _top = this.FretboardRect.y;
        let _bottom = this.FretboardRect.height + this.FretboardRect.y;

        for ( let i = 0; i < this.FretboardCount; i++ )
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
    
    ComputeFretboardData()
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
    ComputeScaleLayout()
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
    ComputeChordLayout()
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
        return (
            <svg className="chord-box" viewBox={this.ViewBox} width={this.Width} height={this.Height}>

                {/* SCALE & CHORD TEXT */}
                <text
                    x={this.LayoutText.x}
                    y={this.LayoutText.y}
                    fill={this.LayoutText.fill}
                    fontSize={this.LayoutText.size}>{this.LayoutText.Key} | {this.LayoutText.Chord}</text>

                {/* GENERAL FRETBAORD LAYOUT */}
                <rect
                    x={this.FretboardRect.x}
                    y={this.FretboardRect.y}
                    width={this.FretboardRect.width}
                    height={this.FretboardRect.height}
                    style={this.FretboardRect.style}
                />

                {/* FRETS TEXT */}
                <text
                    x={this.FretsText.x}
                    y={this.FretsText.y}
                    fill="rgba(0,0,0,1)"
                    fontSize={this.FretsText.size}>
                    {
                        this.FretPositions.map( ( item, i ) =>
                            <tspan
                                key={i}
                                x={item.x1 - 6}
                                y={item.y1 - 10}
                            >{item.Number}
                            </tspan>
                        )
                    }
                </text>

                {/* FRET LINES - <line x1="100" y1="70" x2="100" y2="450" stroke="red" /> */}
                {
                    this.FretPositions.map( ( item, i ) =>
                        <line
                            key={i}
                            fill="rgba(255,0,0,1)"
                            stroke="rgba(0,0,0,1)"
                            x1={item.x1}
                            x2={item.x2}
                            y1={item.y1}
                            y2={item.y2} />
                    )
                }


                {/* STRING NAME TEXT */}
                <text
                    x={this.NotesText.x}
                    y={this.NotesText.y}
                    fill={this.NotesText.fill}
                    fontSize={this.NotesText.size}>
                    {
                        this.StringNames.map( ( item, i ) =>
                            <tspan
                                key={i}
                                fill="rgba(0,0,0,1)"
                                stroke="rgba(0,0,0,1)"
                                strokeWidth="0"
                                x={item.x1 - 6}
                                y={item.y1 - 10}
                            >{item.Name}
                            </tspan>
                        )
                    }
                </text>

                {/* STRINGS - <line x1="80" y1="100" x2="1450" y2="100" stroke="red" /> */}
                {
                    this.StringPositions.map( ( item, idx ) => (
                        <line
                            key={idx}
                            x1={item.x1}
                            y1={item.y1}
                            x2={item.x2}
                            y2={item.y2}
                            style={item.Style} />
                    ) )
                }

                {/* TEST CHORD LAYOUT */
                    this.TestChord.length !== 0 &&
                    this.TestChord.map( ( item2, idx2 ) =>
                        <g key={idx2}>
                            <circle
                                cx={item2.cx}
                                cy={item2.cy}
                                r={item2.r}
                                fill={item2.fill}
                                stroke={item2.stroke}
                                strokeWidth={item2.strokeWidth} />
                            <text
                                x={item2.cx - 12}
                                y={item2.cy + 5}
                                fill={item2.stroke}
                                fontSize="15"
                                >{item2.name}-{item2.position}</text>
                        </g>
                     )
                }

                {/* 
                 * ALL FRETS DATA 
                 *  <circle cx={item2.cx} cy={item2.cy} r={item2.r} fill={this.FretNoteCircleFill} />
                 *  <rect x={item2.cx - 21} y={item2.cy - 20} height="40" width="40" fill={this.FretNoteCircleFillColor} strokeWidth="0" stroke="rgba(0,0,0,1)" />
                 * */}
                {
                    this.DisplayFretboardData === true && 
                    this.FretboardMatrix.map( ( item, idx ) => (
                        <g key={idx} id={idx} datalength={item.length}>
                            {
                                item.map( ( item2, idx2 ) =>
                                    (
                                        item2 !== null &&
                                        <g key={idx2}>                                           
                                            <circle cx={item2.cx} cy={item2.cy} r={item2.r} fill={this.FretNoteCircleFillColor} strokeWidth={this.FretNoteStrokeWidth} stroke={this.FretNoteStrokeColor}/>
                                            {
                                                item2.note.length === 1 &&
                                                <text y={item2.cy + 5} x={item2.cx - 5} fill={this.FretNoteTextFillColor}>{item2.note}</text>
                                            }
                                            {
                                                item2.note.length === 2 &&
                                                <text y={item2.cy + 5} x={item2.cx - 10} fill={this.FretNoteTextFillColor}>{item2.note}</text>
                                            }
                                        </g>
                                    ))
                            }
                       </g>
                    ) )
                }
                {/* 
                 * SCALE DATA
                 * <circle cx={item2.cx} cy={item2.cy} r={item2.r} />
                 * <rect x={item2.cx - 21} y={item2.cy - 20} height="40" width="40" fill={this.ScaleNoteCircleFillColor} />
                 * */
                    this.DisplayScaleData === true &&
                    this.ScaleData.map( ( item, idx ) => (
                        <g key={idx} id={idx} datalength={item.length}>
                            {
                                item.map( ( item2, idx2 ) =>
                                    (
                                        item2 !== null &&
                                        <g key={idx2}>
                                            <circle cx={item2.cx} cy={item2.cy} r={item2.r} fill={this.ScaleNoteCircleFillColor} strokeWidth={this.ScaleNoteStrokeWidth} stroke={this.ScaleNoteStrokeColor} />
                                            {
                                                item2.note.length === 1 &&
                                                <text y={item2.cy + 5} x={item2.cx - 5} fill={this.ScaleNoteTextFillColor}>{item2.note}</text>
                                            }
                                            {
                                                item2.note.length === 2 &&
                                                <text y={item2.cy + 5} x={item2.cx - 10} fill={this.ScaleNoteTextFillColor}>{item2.note}</text>
                                            }
                                        </g>
                                    ))
                            }
                       </g>
                    ) )
                }
                {/* CHORD DATA */
                    this.DispayChordData === true &&
                    this.ChordData.map( ( item, idx ) => (
                        <g key={idx} id={idx} datalength={item.length}>
                            {
                                item.map( ( item2, idx2 ) =>
                                    (
                                        item2 !== null &&
                                        <g key={idx2}>
                                            <circle cx={item2.cx} cy={item2.cy} r={item2.r} fill={this.ChordNoteCircleFillColor} strokeWidth={this.ChordNoteStrokeWidth} stroke={this.ChordNoteStrokeColor} />
                                            {
                                                item2.note.length === 1 &&
                                                <text y={item2.cy + 5} x={item2.cx - 5} fill={this.ChordNoteTextFillColor}>{item2.note}</text>
                                            }
                                            {
                                                item2.note.length === 2 &&
                                                <text y={item2.cy + 5} x={item2.cx - 10} fill={this.ChordNoteTextFillColor}>{item2.note}</text>
                                            }
                                        </g>
                                    ))
                            }
                       </g>
                    ) )
                }
            </svg>
        );
    }
};
