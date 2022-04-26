//	https://www.tutorialspoint.com/webgl/webgl_interactive_cube.htm
//  https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL
//  http://learnwebgl.brown37.net/07_cameras/camera_linear_motion.html
//  https://github.com/dlebech/ball-webgl
//  https://www.udemy.com/course/threejs-programming/?matchtype=e&msclkid=8fa1ec9d56711cde15a28cba5a4624c7
//  https://github.com/SonarSystems/three.js-Crash-Course
//  https://webglfundamentals.org/


import React from 'react';
import WebGL_Utilities from './wgl-util.js';
import './webgl-demo.css';

export default class WebGLDemo extends React.Component
{
  static defaultProps = {
    Title: "WebGL Demo",
    LinkTitle: "WebGL Demo",
    Href: "portfolio/webgl-demo",
    Icon: ""
  };
  constructor ( props )
  {
    super( props );
    document.title = this.props.Title;

    this.Canvas = React.createRef();
    this.WGL = undefined;
    //  this.WGL_UTIL = WebGL_Utilities;
    this.CanvasSize = 1000;

    this._default_indices = [ 3, 2, 1, 3, 1, 0 ];
    this._default_square_vertices = [
      -0.75, 0.75, 0.0,   //  top left
      -0.75, -0.75, 0.0,  //  bottom left
      0.75, -0.75, 0.0,   //  bottom right
      0.75, 0.75, 0.0     //  top right
      ];
    this._default_colors = [
      1, 0, 0,  //  RED
      0, 0, 1,  //  BLUE
      0, 1, 0,  //  GREEN
      1, 1, 0   //  BLACK TOP RIGHT CORNER, 1,0,0 = NOP FADE IN TRC, 1,1,0 ADDED YELLOW/WHITE FADE, 1,1,1 ADD WHITE
    ];

    this._vert_code = 'attribute vec3 coordinates; attribute vec3 color; varying vec3 vColor; void main(void) { gl_Position = vec4(coordinates, 1.0); vColor = color; }';
    this._frag_code = 'precision mediump float; varying vec3 vColor;  void main(void) { gl_FragColor = vec4(vColor, 1.0); }';

    // HOC props & state
    this._activate_btn_text_default = "Activate";
    this._activate_btn_text_stop = "Pause";

    this.state = {
      activateBtnRunning: false,
      activateBtnText: this._activate_btn_text_default
    };
    return;
  };

  /* WEBGL SPECIFIC FUNCTIONS & METHODS */
  GetRandomSquareVertices()
  {
    //  let _pos_num = Math.random().toPrecision( 2 );
    //  let _neg_num = -_pos_num;
    //  console.debug( _pos_num, _neg_num );

    //let _rv = [
    //  _neg_num, _pos_num, 0,
    //  _neg_num, _neg_num, 0,
    //  _pos_num, _neg_num, 0,
    //  _pos_num, _pos_num, 0
    //];
    //console.debug( "_rv", _rv );
    return this._default_square_vertices;
  };
  GetRandomColors()
  {
    // let _rv = this._default_colors;
    let _rv = [
      Math.random().toPrecision( 3 ), Math.random().toPrecision( 3 ), Math.round( Math.random().toPrecision( 3 ) ),
      Math.round( Math.random().toPrecision( 3 ) ), Math.random().toPrecision( 3 ), Math.random().toPrecision( 3 ),
      Math.random().toPrecision( 3 ), Math.round( Math.random().toPrecision( 3 ) ), Math.random().toPrecision( 3 ),
      Math.random().toPrecision( 3 ), Math.random().toPrecision( 3 ), Math.random().toPrecision( 3 )
    ];
    //  console.debug( "_rv", _rv );
    return _rv;
  };
  GetRandomIndices()
  {
    let _rv = [ 3, 2, 1, 3, 1, 0 ];

   //  console.debug( "GetRandomIndices()::_rv", _rv );
    return _rv;
  };
  RenderNewColors()
  {
    this.WGL = this.Canvas.current.getContext( "experimental-webgl" );

    let vertices = this.GetRandomSquareVertices();
    let colors = this.GetRandomColors();
    let indices = this.GetRandomIndices();

    // Create an empty buffer object and store vertex data
    var vertex_buffer = this.WGL.createBuffer();
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, vertex_buffer );
    this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( vertices ), this.WGL.STATIC_DRAW );
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, null );

    // Create an empty buffer object and store Index data
    let Index_Buffer = this.WGL.createBuffer();
    this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, Index_Buffer );
    this.WGL.bufferData( this.WGL.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), this.WGL.STATIC_DRAW );
    this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, null );

    // Create an empty buffer object and store color data
    let color_buffer = this.WGL.createBuffer();
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, color_buffer );
    this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( colors ), this.WGL.STATIC_DRAW );

    // Shaders 
    // Create a vertex shader object
    let vertShader = this.WGL.createShader( this.WGL.VERTEX_SHADER );
    // Attach vertex shader source code
    this.WGL.shaderSource( vertShader, this._vert_code );
    // Compile the vertex shader
    this.WGL.compileShader( vertShader );

    // Create fragment shader object
    let fragShader = this.WGL.createShader( this.WGL.FRAGMENT_SHADER );
    // Attach fragment shader source code
    this.WGL.shaderSource( fragShader, this._frag_code );
    // Compile the fragmentt shader
    this.WGL.compileShader( fragShader );

    // Create a shader program object to store the combined shader program
    let shaderProgram = this.WGL.createProgram();
    // Attach a vertex shader
    this.WGL.attachShader( shaderProgram, vertShader );
    // Attach a fragment shader
    this.WGL.attachShader( shaderProgram, fragShader );

    // Link both the programs
    this.WGL.linkProgram( shaderProgram );
    // Use the combined shader program object
    this.WGL.useProgram( shaderProgram );

    /* ======== Associating shaders to buffer objects =======*/
    // Bind vertex buffer object
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, vertex_buffer );
    // Bind index buffer object
    this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, Index_Buffer );
    // Get the attribute location
    let coord = this.WGL.getAttribLocation( shaderProgram, "coordinates" );
    // point an attribute to the currently bound VBO
    this.WGL.vertexAttribPointer( coord, 3, this.WGL.FLOAT, false, 0, 0 );
    // Enable the attribute
    this.WGL.enableVertexAttribArray( coord );

    // bind the color buffer
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, color_buffer );
    // get the attribute location
    let color = this.WGL.getAttribLocation( shaderProgram, "color" );
    // point attribute to the volor buffer object
    this.WGL.vertexAttribPointer( color, 3, this.WGL.FLOAT, false, 0, 0 );
    // enable the color attribute
    this.WGL.enableVertexAttribArray( color );

    /*============Drawing the Quad====================*/
    // Clear the canvas, RGBA
    this.WGL.clearColor( 0, 0, 0, 1 );
    // Enable the depth test
    this.WGL.enable( this.WGL.DEPTH_TEST );
    // Clear the color buffer bit
    this.WGL.clear( this.WGL.COLOR_BUFFER_BIT );
    // Set the view port
    this.WGL.viewport( 0, 0, this.CanvasSize, this.CanvasSize );
    // Draw the triangle
    this.WGL.drawElements( this.WGL.TRIANGLES, indices.length, this.WGL.UNSIGNED_SHORT, 0 );
  };

  SetDefaultWebGLInstance()
  {
    this.WGL = this.Canvas.current.getContext( "experimental-webgl" );

    let vertices = this._default_square_vertices;
    let colors = this._default_colors;
    let indices = this._default_indices;

    // Create an empty buffer object and store vertex data
    var vertex_buffer = this.WGL.createBuffer();
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, vertex_buffer );
    this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( vertices ), this.WGL.STATIC_DRAW );
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, null );

    // Create an empty buffer object and store Index data
    let Index_Buffer = this.WGL.createBuffer();
    this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, Index_Buffer );
    this.WGL.bufferData( this.WGL.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), this.WGL.STATIC_DRAW );
    this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, null );

    // Create an empty buffer object and store color data
    let color_buffer = this.WGL.createBuffer();
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, color_buffer );
    this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( colors ), this.WGL.STATIC_DRAW );

    // Shaders 
    // Create a vertex shader object
    let vertShader = this.WGL.createShader( this.WGL.VERTEX_SHADER );
    // Attach vertex shader source code
    this.WGL.shaderSource( vertShader, this._vert_code );
    // Compile the vertex shader
    this.WGL.compileShader( vertShader );

    // Create fragment shader object
    let fragShader = this.WGL.createShader( this.WGL.FRAGMENT_SHADER );
    // Attach fragment shader source code
    this.WGL.shaderSource( fragShader, this._frag_code );
    // Compile the fragmentt shader
    this.WGL.compileShader( fragShader );

    // Create a shader program object to store the combined shader program
    let shaderProgram = this.WGL.createProgram();
    // Attach a vertex shader
    this.WGL.attachShader( shaderProgram, vertShader );
    // Attach a fragment shader
    this.WGL.attachShader( shaderProgram, fragShader );

    // Link both the programs
    this.WGL.linkProgram( shaderProgram );
    // Use the combined shader program object
    this.WGL.useProgram( shaderProgram );

    /* ======== Associating shaders to buffer objects =======*/
    // Bind vertex buffer object
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, vertex_buffer );
    // Bind index buffer object
    this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, Index_Buffer );
    // Get the attribute location
    let coord = this.WGL.getAttribLocation( shaderProgram, "coordinates" );
    // point an attribute to the currently bound VBO
    this.WGL.vertexAttribPointer( coord, 3, this.WGL.FLOAT, false, 0, 0 );
    // Enable the attribute
    this.WGL.enableVertexAttribArray( coord );

    // bind the color buffer
    this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, color_buffer );
    // get the attribute location
    let color = this.WGL.getAttribLocation( shaderProgram, "color" );
    // point attribute to the volor buffer object
    this.WGL.vertexAttribPointer( color, 3, this.WGL.FLOAT, false, 0, 0 );
    // enable the color attribute
    this.WGL.enableVertexAttribArray( color );

    /*============Drawing the Quad====================*/
    // Clear the canvas, RGBA
    this.WGL.clearColor( 0, 0, 0, 1 );
    // Enable the depth test
    this.WGL.enable( this.WGL.DEPTH_TEST );
    // Clear the color buffer bit
    this.WGL.clear( this.WGL.COLOR_BUFFER_BIT );
    // Set the view port
    this.WGL.viewport( 0, 0, this.CanvasSize, this.CanvasSize );
    // Draw the triangle
    this.WGL.drawElements( this.WGL.TRIANGLES, indices.length, this.WGL.UNSIGNED_SHORT, 0 );
  };



  /* BUTTON HANDLERS */
  OnClick_ResetDefaults( e )
  { //  console.debug( 'OnClick_ResetDefaults', e );
    this.SetDefaultWebGLInstance();
    this.setState( {
      activateBtnRunning: false,
      activateBtnText: this._activate_btn_text_default
    } );
    return;
  }
  OnClick_ChangeWGLColors( e )
  { //  console.debug( 'OnClick_ChangeWGLColors');
    this.RenderNewColors();
    return;
  };
  OnClick_ActivateRotation( e )
  {
    console.debug( 'OnClick_ActivateRotation', this.state.activateBtnRunning );

    let _temp_text;

    if ( this.state.activateBtnRunning === false )
    {
      _temp_text = this._activate_btn_text_stop;
    }
    else if ( this.state.activateBtnRunning === true )
    {
      _temp_text = this._activate_btn_text_default;
    }

    this.setState( {
      activateBtnRunning: !this.state.activateBtnRunning,
      activateBtnText: _temp_text
    } );
    return;
  };

  /* REACT LIFECYCLE */
  componentDidMount() 
  { //	console.debug( "WebGLDemo.componentDidMount()", this.Canvas.current );
    this.SetDefaultWebGLInstance();
    return;
  };
  componentWillUnmount()
  {	//console.debug( "AppLoader.componentWillUnmount()", this.AnimationID );
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
            onClick={ this.OnClick_ChangeWGLColors.bind( this ) }>Generate new colors</button>
          <button
            tabIndex="0"
            className="app-btn"
            onClick={ this.OnClick_ActivateRotation.bind( this ) }>{ this.state.activateBtnText }</button>
          <button
            tabIndex="0"
            className="app-btn"
            onClick={ this.OnClick_ResetDefaults.bind( this ) }>Reset to default</button>
        </div>

      </div>
    );
  }
};