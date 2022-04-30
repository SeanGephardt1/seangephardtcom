//	https://www.tutorialspoint.com/webgl/webgl_interactive_cube.htm
//  https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL
//  http://learnwebgl.brown37.net/07_cameras/camera_linear_motion.html
//  https://github.com/dlebech/ball-webgl
//  https://www.udemy.com/course/threejs-programming/?matchtype=e&msclkid=8fa1ec9d56711cde15a28cba5a4624c7
//  https://github.com/SonarSystems/three.js-Crash-Course
//  https://webglfundamentals.org/

import React from 'react';
//  import WebGL_Utilities from './wgl-util.js';
import './webgl-demo.css';

export default class WebGLDemo extends React.Component
{
  static defaultProps = {
    Title: "WebGL Demo",
    LinkTitle: "WebGL Demo",
    Href: "portfolio/webgl-demo",
    Description: "Playing with WebGL shaders",
    Icon: ""
  };
  constructor ( props )
  {
    super( props );
    document.title = this.props.Title;

    this.CanvasSize = 1000;
    this.Canvas = React.createRef();

    this.WGL = undefined;
    //  this.WGL_UTIL = WebGL_Utilities;

    this._vert_code = 'attribute vec3 coordinates; attribute vec3 color; varying vec3 vColor; void main(void) { gl_Position = vec4(coordinates, 1.0); vColor = color; }';
    this._frag_code = 'precision mediump float; varying vec3 vColor;  void main(void) { gl_FragColor = vec4(vColor, 1.0); }';
    this._req_ani_id = undefined;
    this._test_count = 0;

    // A GOOD NUMBER FOR RETURNING TO THE ORGINALLY GENERATED COLOR MATRIX
    this._test_count_max = 200;

    //  
    this._default_indices = [ 3, 2, 1, 3, 1, 0 ];
    //  this._default_indices = [ 0, 0, 0, 0, 0, 0 ];

    //  0.0-1.0 FROM CENTER TO EDGES
    this._default_square_vertices = [
      -0.9, 0.9, 0.0,   //  top left
      -0.9, -0.9, 0.0,  //  bottom left
      0.9, -0.9, 0.0,   //  bottom right
      0.9, 0.9, 0.0     //  top right
    ];

    //0, 0, 0,  //  LEFT TOP
    //0, 0, 0,  //  LEFT BOTTOM
    //0, 0, 0,  //  RIGHT BOTTOM
    //0, 0, 0   //  RIGHT TOP

    //0, 0, 0,  //  BLACK
    //1, 1, 1,  //  WHITE

    //1, 0, 0,  //  RED
    //1, 1, 0,  //  YELLOW
    //1, 1, 1,  //  WHITE

    //0, 1, 0,  //  LIME GREEN
    //0, 1, 1,  //  AQUA BLUE

    //0, 0, 1,  //  BLUE
    //1, 0, 1,  //  PURPLE

    this._default_colors = [
      1, 0, 0,  //  LEFT TOP
      0, 0, 1,  //  LEFT BOTTOM
      0, 1, 0,  //  RIGHT BOTTOM
      1, 1, 0   //  RIGHT TOP
    ];
    this._stepped_color_matrix = [ ...this._default_colors ];

    //  FOR HANDLING THE DIRECTION OF THE COLOR INCREMENTS
    //  0 == increment up, -1 == increment down
    this._step_color_dir = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ];

    // HOC props & state
    this._activate_btn_text_default = "Animate random colors";
    this._activate_btn_text_stop = "Pause";

    this.state = {
      activateBtnRunning: false,
      activateBtnText: this._activate_btn_text_default
    };
    return;
  };

  /* ANIMATION SPECIFIC FUNCTIONS */
  GetRandomColors()
  {
    let _rv = [
      parseFloat( Math.random().toPrecision( 2 ) ),
      parseFloat( Math.random().toPrecision( 2 ) ),
      parseFloat( Math.random().toPrecision( 2 ) ),

      parseFloat( Math.random().toPrecision( 2 ) ),
      parseFloat( Math.random().toPrecision( 2 ) ),
      parseFloat( Math.random().toPrecision( 2 ) ),

      parseFloat( Math.random().toPrecision( 2 ) ),
      parseFloat( Math.random().toPrecision( 2 ) ),
      parseFloat( Math.random().toPrecision( 2 ) ),

      parseFloat( Math.random().toPrecision( 2 ) ),
      parseFloat( Math.random().toPrecision( 2 ) ),
      parseFloat( Math.random().toPrecision( 2 ) )
    ];
    this._stepped_color_matrix = [ ..._rv ];
    this.ValidateColorDirectionArray();
    //  console.debug( "GetRandomColors()", this._stepped_color_matrix, this._step_color_dir );
    return _rv;
  };
  ValidateColorDirectionArray()
  { //  console.debug( 'ValidateColorDirectionArray()', this._stepped_color_matrix, this._step_color_dir );
    for ( let i = 0; i < this._stepped_color_matrix.length; i++ )
    { //  console.debug( i, this._stepped_color_matrix[ i ], this._step_color_dir[ i ] );
      if ( parseFloat( this._stepped_color_matrix[ i ] ) <= 0.0 )
      {
        this._step_color_dir[ i ] = 0;
      }
      else if ( parseFloat( this._stepped_color_matrix[ i ] ) >= 1.0 )
      {
        this._step_color_dir[ i ] = -1;
      }
    } //  console.debug( 'ValidateColorDirectionArray()', this._stepped_color_matrix, this._step_color_dir );
    return;
  };
  IncrementColors()
  { //  console.debug( 'IncrementColors()');
    //  console.debug( "IncrementColors()1", this._stepped_color_matrix, this._step_color_dir );
    this.ValidateColorDirectionArray();

    for ( let i = 0; i < this._stepped_color_matrix.length; i++ )
    {
      //  console.debug( 'start->i=', i, "c=", this._stepped_color_matrix[ i ], Number( this._stepped_color_matrix[ i ] ).toFixed( 2 ) );
      let _v = 0;

      if ( this._step_color_dir[ i ] === 0 )
      {
        _v = parseFloat( ( this._stepped_color_matrix[ i ] + 0.01 ).toFixed( 2 ) );
      }
      else if ( this._step_color_dir[ i ] === -1 )
      {
        _v = parseFloat( ( this._stepped_color_matrix[ i ] - 0.01 ).toFixed( 2 ) );
      }

      if ( _v <= 0.0 )
      {
        this._step_color_dir[ i ] = 0;
      }
      else if ( _v >= 1.0 )
      {
        this._step_color_dir[ i ] = -1;
      }

      this._stepped_color_matrix[ i ] = _v;
    }
    return this._stepped_color_matrix;
  };

  //  WEBGL CONTEXTUAL FUNCTIONS
  CancelAnimationFrames()
  { //  console.debug( 'CancelAnimationFrames()' );
    window.cancelAnimationFrame( this._req_ani_id );
    return;
  };
  ResetColorMatrixAndColorDirections()
  { //  console.debug( 'ResetColorMatrixAndColorDirections()' );
    //  this._default_indices = [ 3, 2, 1, 3, 1, 0 ];
    this._stepped_color_matrix = [ ...this._default_colors ];
    this._step_color_dir = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ];
    this.ValidateColorDirectionArray();
    //  console.debug( 'ResetColorMatrixAndColorDirections()',  this._default_square_vertices, this._default_colors, this._default_indices );
    return;
  };
  CreateWebGLContext()
  { //  console.debug( 'CreateWebGLContext()' );
    this.WGL = this.Canvas.current.getContext( "experimental-webgl" );
    return;
  };

  //  WebGL drawing functions
  InitWebGLRender()
  { //  console.debug( 'InitWebGLRender()' );
    this.CancelAnimationFrames();
    this.ResetColorMatrixAndColorDirections();
    this.CreateWebGLContext();
    this.DrawDefault( this._default_square_vertices, this._default_colors, this._default_indices );
    return;
  };
  DrawDefault( vertices, colors, indices )
  { //  console.debug( 'DrawDefault(v,c,i);', vertices, colors, indices );
    //  console.debug( "DrawDefault(v,c,i)::v", vertices );
    //  console.debug( "_default_colors", this._default_colors );
    //  console.debug( "_stepped_color_matrix", this._stepped_color_matrix );
    //  console.debug( "colors", colors );
    //  console.debug( "DrawDefault(v,c,i)::i", indices );

    // Create an empty buffer object and store vertex data
    const _vertex_buffer = this.WGL.createBuffer();
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, _vertex_buffer );
    this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( vertices ), this.WGL.STATIC_DRAW );
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, null );

    // Create an empty buffer object and store Index data
    const _index_buffer = this.WGL.createBuffer();
    this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, _index_buffer );
    this.WGL.bufferData( this.WGL.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), this.WGL.STATIC_DRAW );
    this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, null );

    // Create an empty buffer object and store color data
    const _color_buffer = this.WGL.createBuffer();
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, _color_buffer );
    this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( colors ), this.WGL.STATIC_DRAW );

    // Shaders 
    // Create a vertex shader object
    // Attach vertex shader source code
    // Compile the vertex shader
    const _vert_shader = this.WGL.createShader( this.WGL.VERTEX_SHADER );
    this.WGL.shaderSource( _vert_shader, this._vert_code );
    this.WGL.compileShader( _vert_shader );

    // Create fragment shader object
    // Attach fragment shader source code
    // Compile the fragmentt shader
    const _frag_shader = this.WGL.createShader( this.WGL.FRAGMENT_SHADER );
    this.WGL.shaderSource( _frag_shader, this._frag_code );
    this.WGL.compileShader( _frag_shader );

    // Create a shader program object to store the combined shader program
    // Attach a vertex shader
    // Attach a fragment shader
    const _shader_program = this.WGL.createProgram();
    this.WGL.attachShader( _shader_program, _vert_shader );
    this.WGL.attachShader( _shader_program, _frag_shader );

    // Link both the programs
    // Use the combined shader program object
    this.WGL.linkProgram( _shader_program );
    this.WGL.useProgram( _shader_program );

    /* ======== Associating shaders to buffer objects =======*/
    // Bind vertex buffer object
    // Bind index buffer object
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, _vertex_buffer );
    this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, _index_buffer );

    // Get the attribute location
    // point an attribute to the currently bound VBO
    // Enable the attribute
    const _coords = this.WGL.getAttribLocation( _shader_program, "coordinates" );
    this.WGL.vertexAttribPointer( _coords, 3, this.WGL.FLOAT, false, 0, 0 );
    this.WGL.enableVertexAttribArray( _coords );

    // bind the color buffer
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, _color_buffer );

    // get the attribute location
    // point attribute to the volor buffer object
    // enable the color attribute
    const _color = this.WGL.getAttribLocation( _shader_program, "color" );
    this.WGL.vertexAttribPointer( _color, 3, this.WGL.FLOAT, false, 0, 0 );
    this.WGL.enableVertexAttribArray( _color );

    // Clear the canvas, RGBA
    // Enable the depth test
    // Clear the color buffer bit
    // Set the view port
    // Draw the triangle
    this.WGL.clearColor( 0, 0, 0, 1 );
    this.WGL.enable( this.WGL.DEPTH_TEST );
    this.WGL.clear( this.WGL.COLOR_BUFFER_BIT );
    this.WGL.viewport( 0, 0, this.CanvasSize, this.CanvasSize );
    this.WGL.drawElements( this.WGL.TRIANGLES, indices.length, this.WGL.UNSIGNED_SHORT, 0 );
    return;
  };

  //  RequestAnimationFrame Loop
  RenderAnimationLoop()
  { //  console.debug( 'RenderColorAnimation', this._req_ani_id, this._test_count_max, this._test_count );
    if ( this._test_count < this._test_count_max )
    {
      const _inc_colors = this.IncrementColors();

      this.DrawDefault( this._default_square_vertices, _inc_colors, this._default_indices );

      this._test_count++;
      this._req_ani_id = window.requestAnimationFrame( () => this.RenderAnimationLoop() );
    }
    else
    { //  console.debug( 'RenderColorAnimation::STOPPED', this._req_ani_id, this._test_count_max, this._test_count );
      //  console.debug( 'RenderColorAnimation::STOPPED', this._default_colors, this._stepped_color_matrix );
      window.cancelAnimationFrame( this._req_ani_id );
      this._test_count = 0;
      this.setState( {
        activateBtnRunning: !this.state.activateBtnRunning,
        activateBtnText: this._activate_btn_text_default
      } );
    }
    return;
  };

  /* BUTTON HANDLERS */
  OnClick_CreateRandomColorMatrix( e )
  { //  console.debug( 'OnClick_ChangeWGLColors()' );
    const _rnd_colors = this.GetRandomColors();
    this.DrawDefault( this._default_square_vertices, _rnd_colors, this._default_indices );
    return;
  };
  OnClick_ActivateRotation( e )
  { //  console.debug( 'OnClick_ActivateRotation' );
    let _temp_text;

    if ( this.state.activateBtnRunning === false )
    {
      this._req_ani_id = window.requestAnimationFrame( () => this.RenderAnimationLoop() );
      _temp_text = this._activate_btn_text_stop;
    }
    else if ( this.state.activateBtnRunning === true )
    {
      window.cancelAnimationFrame( this._req_ani_id );
      _temp_text = this._activate_btn_text_default;
    }

    this.setState( {
      activateBtnRunning: !this.state.activateBtnRunning,
      activateBtnText: _temp_text
    } );
    return;
  };
  OnClick_ResetDefaults( e )
  { // console.debug( 'OnClick_ResetDefaults()', );
    this.ResetColorMatrixAndColorDirections();
    this.DrawDefault( this._default_square_vertices, this._default_colors, this._default_indices );

    // RESET BUTTON STATES
    this.setState( {
      activateBtnRunning: false,
      activateBtnText: this._activate_btn_text_default
    } );
    return;
  }

  /* REACT LIFECYCLE */
  componentDidMount() 
  { //	console.debug( "WebGLDemo.componentDidMount()", this.Canvas.current );
    this.InitWebGLRender();
    return;
  };
  componentWillUnmount()
  {	//  console.debug( "componentWillUnmount()", this._req_ani_id );
    this.CancelAnimationFrames();
    return;
  };
  render()
  {
    return (
      <div className="page-layout padding30">

        <div className="header centered">{ this.props.Title }</div>

        <div className="canvas-panel">
          <canvas id="html5-canvas"
            className="canvas-2d"
            ref={ this.Canvas }
            height={ this.CanvasSize }
            width={ this.CanvasSize }>
          </canvas>
        </div>

        <div className="canvas-panel">
          <button
            tabIndex="0"
            className="app-btn"
            onClick={ this.OnClick_CreateRandomColorMatrix.bind( this ) }
            onKeyPress={ this.OnClick_CreateRandomColorMatrix.bind( this ) }
            disabled={ this.state.activateBtnRunning }>Generate random colors</button>
          <button
            tabIndex="0"
            className="app-btn"
            onClick={ this.OnClick_ActivateRotation.bind( this ) }
            onKeyPress={ this.OnClick_ActivateRotation.bind( this ) }
          >{ this.state.activateBtnText }</button>
          <button
            tabIndex="0"
            className="app-btn"
            onClick={ this.OnClick_ResetDefaults.bind( this ) }
            onKeyPress={ this.OnClick_ResetDefaults.bind( this ) }
            disabled={ this.state.activateBtnRunning }>Reset to default</button>
        </div>

      </div>
    );
  }
};