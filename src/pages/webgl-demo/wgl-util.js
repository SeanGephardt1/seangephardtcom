// CUSTOM WEBGL UTILITY CLASS
//	https://www.tutorialspoint.com/webgl/webgl_interactive_cube.htm
//  https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL
//  http://learnwebgl.brown37.net/07_cameras/camera_linear_motion.html
//  https://github.com/dlebech/ball-webgl
//  https://www.udemy.com/course/threejs-programming/?matchtype=e&msclkid=8fa1ec9d56711cde15a28cba5a4624c7
//  https://github.com/SonarSystems/three.js-Crash-Course
//  https://webglfundamentals.org/

export default class WGLU
{
  constructor ( props )
  {
    console.debug( 'WebGL_Utilities', props );
  }

  static CreateVertexBuffer = function ( ctxt, vertexData )
  { //  Create an empty buffer object and store vertex data
    //  console.debug( 'CreateVertexBuffer', ctxt, vertexData);
    const _v_buffer = ctxt.createBuffer();
    ctxt.bindBuffer( ctxt.ARRAY_BUFFER, _v_buffer );
    ctxt.bufferData( ctxt.ARRAY_BUFFER, new Float32Array( vertexData ), ctxt.STATIC_DRAW );
    ctxt.bindBuffer( ctxt.ARRAY_BUFFER, null );
    return _v_buffer;
  };
  static CreateIndexBuffer = function ( ctxt, indexData )
  { //  Create an empty buffer object and store indices data
    //  console.debug( 'CreateIndexBuffer', ctxt, indices );
    const _idx_buffer = ctxt.createBuffer();
    ctxt.bindBuffer( ctxt.ELEMENT_ARRAY_BUFFER, _idx_buffer );
    ctxt.bufferData( ctxt.ELEMENT_ARRAY_BUFFER, new Uint16Array( indexData ), ctxt.STATIC_DRAW );
    ctxt.bindBuffer( ctxt.ELEMENT_ARRAY_BUFFER, null );
    return _idx_buffer;
  };
  static CreateColorBuffer = function ( ctxt, colorData )
  { //  Create an empty buffer object and store indices data
    //  console.debug( 'CreateColorBuffer', ctxt, colorData );
    const _c_buffer = ctxt.createBuffer();
    ctxt.bindBuffer( ctxt.ARRAY_BUFFER, _c_buffer );
    ctxt.bufferData( ctxt.ARRAY_BUFFER, new Float32Array( colorData ), ctxt.STATIC_DRAW );
    return _c_buffer;
  };

  static CreateShader = function ( ctxt, shaderType, shaderCode )
  { //  console.debug( 'CreateShader', ctxt, shaderType, shaderCode );
    const _shader = ctxt.createShader( shaderType );
    ctxt.shaderSource( _shader, shaderCode );
    ctxt.compileShader( _shader );
    return _shader;
  };
  static CreateShaderProgram = function ( ctxt, vShader, fShader )
  {
    //  Create a shader program object to store the combined shader program
    //   Attach a vertex shader
    //  Attach a fragment shader
    //  Link both the programs
    //  Use the combined shader program object
    //  console.debug( 'CreateShaderProgram', ctxt, vShader, fShader );
    const _shader_program = ctxt.createProgram();
    ctxt.attachShader( _shader_program, vShader );
    ctxt.attachShader( _shader_program, fShader );
    ctxt.linkProgram( _shader_program );
    ctxt.useProgram( _shader_program );
    return _shader_program;
  };

  static BindVertexAndIndexBuffers = function ( ctxt, vBuffer, iBuffer, shaderProg )
  {
    //  Associating shaders to buffer objects
    //  Bind vertex buffer object
    //  Bind index buffer object
    //  console.debug( 'BindVertIdxBuffers', ctxt, vBuffer, iBuffer );

    ctxt.bindBuffer( ctxt.ARRAY_BUFFER, vBuffer );
    ctxt.bindBuffer( ctxt.ELEMENT_ARRAY_BUFFER, iBuffer );

    const _att = ctxt.getAttribLocation( shaderProg, "coordinates" );
    ctxt.vertexAttribPointer( _att, 3, ctxt.FLOAT, false, 0, 0 );
    ctxt.enableVertexAttribArray( _att );
    return;
  };
  static BindColorBuffers = function ( ctxt, cBuffer, shaderProg )
  {
    //  Associating shaders to buffer objects
    //  Bind color buffer object
    //  console.debug( 'BindColorBuffers', ctxt, cBuffer );
    ctxt.bindBuffer( ctxt.ARRAY_BUFFER, cBuffer );

    const _att = ctxt.getAttribLocation( shaderProg, "color" );
    ctxt.vertexAttribPointer( _att, 3, ctxt.FLOAT, false, 0, 0 );
    ctxt.enableVertexAttribArray( _att );
    return;
  };

  static DrawViewPort = function ( ctxt, top, left, height, width, idxLength, elementType )
  {
    //  Clear the canvas, RGBA
    //  Enable the depth test
    //  Clear the color buffer bit
    //  Set the view port
    //  Draw the triangle
    //  this.WGL.clearColor( 0, 0, 0, 1 );
    //  this.WGL.enable( this.WGL.DEPTH_TEST );
    //  this.WGL.clear( this.WGL.COLOR_BUFFER_BIT );
    //  this.WGL.viewport( 0, 0, this.CanvasSize, this.CanvasSize );
    //  this.WGL.drawElements( this.WGL.TRIANGLES, indices.length, this.WGL.UNSIGNED_SHORT, 0 );
    //  console.debug( 'DrawViewport', ctxt, top, left, height, width, idxLength, elementType );
    //  console.debug( 'DrawViewport' );
    ctxt.clearColor( 0, 0, 0, 1 );
    ctxt.enable( ctxt.DEPTH_TEST );
    ctxt.clear( ctxt.COLOR_BUFFER_BIT | ctxt.DEPTH_BUFFER_BIT );
    ctxt.viewport( top, left, height, width );
    ctxt.drawElements( elementType, idxLength, ctxt.UNSIGNED_SHORT, 0 );
    return;
  };
};