// CUSTOM WEBGL UTILITY CLASS
export default class WGLU
{
  constructor ( props )
  {
    console.debug( 'WebGL_Utilities', props );
  }
  static CreateVertexBuffer = function (webglContext, vertices)
  { // Create an empty buffer object and store vertex data
    console.debug( 'CreateVertexBuffer', webglContext, vertices );

    const _vertex_buffer = webglContext.createBuffer();
    webglContext.bindBuffer( webglContext.ARRAY_BUFFER, _vertex_buffer );
    webglContext.bufferData( webglContext.ARRAY_BUFFER, new Float32Array( vertices ), webglContext.STATIC_DRAW );
    webglContext.bindBuffer( webglContext.ARRAY_BUFFER, null );
    return _vertex_buffer;
  };
  static CreateIndexBuffer = function ( webglContext, indices )
  { // Create an empty buffer object and store indices data
    console.debug( 'CreateIndexBuffer', webglContext, indices );

    const _index_buffer = webglContext.createBuffer();
    webglContext.bindBuffer( webglContext.ELEMENT_ARRAY_BUFFER, _index_buffer );
    webglContext.bufferData( webglContext.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), webglContext.STATIC_DRAW );
    webglContext.bindBuffer( webglContext.ELEMENT_ARRAY_BUFFER, null );
    return _index_buffer;
  };
  static CreateColorBuffer = function ( webglContext, colorData )
  { // Create an empty buffer object and store indices data
    console.debug( 'CreateColorBuffer', webglContext, colorData );

    const _color_buffer = webglContext.createBuffer();
    webglContext.bindBuffer( webglContext.ARRAY_BUFFER, _color_buffer );
    webglContext.bufferData( webglContext.ARRAY_BUFFER, new Float32Array( colorData ), webglContext.STATIC_DRAW );
    return _color_buffer;
  };
  static CreateVertexShader = function ( wglCxt, vertexShaderCode )
  {
    console.debug( 'CreateVertexShader', wglCxt, vertexShaderCode );

    const _vert_shader = wglCxt.createShader( wglCxt.VERTEX_SHADER );
    wglCxt.shaderSource( _vert_shader, vertexShaderCode  );
    wglCxt.compileShader( _vert_shader );
    return _vert_shader;
  };
  static CreateFragmentShader = function ( wglCxt, fragmentShaderCode )
  {
    console.debug( 'CreateFragmentShader', wglCxt, fragmentShaderCode );

    const _frag_shader = wglCxt.createShader( wglCxt.FRAGMENT_SHADER );
    wglCxt.shaderSource( _frag_shader, fragmentShaderCode );
    wglCxt.compileShader( _frag_shader );
    return _frag_shader;
  };
  static CreateShaderProgram = function ( wglCxt, vShader, fShader )
  {
    console.debug( 'CreateShaderProgram', wglCxt, vShader, fShader );

    // Create a shader program object to store the combined shader program
    // Attach a vertex shader
    // Attach a fragment shader
    // Link both the programs
    // Use the combined shader program object
    const _shader_program = wglCxt.createProgram();
    wglCxt.attachShader( _shader_program, vShader );
    wglCxt.attachShader( _shader_program, fShader );
    wglCxt.linkProgram( _shader_program );
    wglCxt.useProgram( _shader_program );
    return _shader_program;
  };
  static BindBuffers = function ( wCtxt, vBuffer, iBuffer )
  {
    //  Associating shaders to buffer objects
    //  Bind vertex buffer object
    //  Bind index buffer object
    console.debug( 'BindBuffers', wCtxt, vBuffer, iBuffer );

    wCtxt.bindBuffer( wCtxt.ARRAY_BUFFER, vBuffer );
    wCtxt.bindBuffer( wCtxt.ELEMENT_ARRAY_BUFFER, iBuffer );
    return;
  };
  static BindColorBuffers = function ( wCtxt, cBuffer )
  {
    //  Associating shaders to buffer objects
    //  Bind vertex buffer object
    //  Bind index buffer object
    console.debug( 'BindColorBuffers', wCtxt, cBuffer );
    //      this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, _color_buffer );
    wCtxt.bindBuffer( wCtxt.ARRAY_BUFFER, cBuffer );
    return;
  };
  static SetAttributeLocation = function ( wCtxt, shaderProgram, attribName )
  {
    console.debug( 'SetCoordinatesAttributeLocation', wCtxt, shaderProgram, attribName );
    // Get the attribute location
    // point an attribute to the currently bound VBO
    // Enable the attribute
    const _att = wCtxt.getAttribLocation( shaderProgram, attribName  );
    wCtxt.vertexAttribPointer( _att, 3, wCtxt.FLOAT, false, 0, 0 );
    wCtxt.enableVertexAttribArray( _att );
    return;
  };
  static DrawViewport = function ( wCtxt, top, left, h, w, idxLength, elementType)
  {
    console.debug( 'DrawViewport', wCtxt, top, left, h, w, idxLength, elementType );
    // Clear the canvas, RGBA
    // Enable the depth test
    // Clear the color buffer bit
    // Set the view port
    // Draw the triangle
    //this.WGL.clearColor( 0, 0, 0, 1 );
    //this.WGL.enable( this.WGL.DEPTH_TEST );
    //this.WGL.clear( this.WGL.COLOR_BUFFER_BIT );
    //this.WGL.viewport( 0, 0, this.CanvasSize, this.CanvasSize );
    //this.WGL.drawElements( this.WGL.TRIANGLES, indices.length, this.WGL.UNSIGNED_SHORT, 0 );
    wCtxt.clearColor( 0, 0, 0, 1 );
    wCtxt.enable( wCtxt.DEPTH_TEST );
    wCtxt.clear( wCtxt.COLOR_BUFFER_BIT );
    wCtxt.viewport( top, left, h, w );
    wCtxt.drawElements( elementType, idxLength, wCtxt.UNSIGNED_SHORT, 0 );
    return;
  };
};
