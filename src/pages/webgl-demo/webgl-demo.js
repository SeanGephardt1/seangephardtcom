//	https://www.tutorialspoint.com/webgl/webgl_interactive_cube.htm
//  https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL
//  http://learnwebgl.brown37.net/07_cameras/camera_linear_motion.html
//  https://github.com/dlebech/ball-webgl
//  https://www.udemy.com/course/threejs-programming/?matchtype=e&msclkid=8fa1ec9d56711cde15a28cba5a4624c7
//  https://github.com/SonarSystems/three.js-Crash-Course
//  https://webglfundamentals.org/


import React from 'react';
import SubNav from '../../controls/nav/sub-nav.js';
import './webgl-demo.css';

export default class WebGLDemo extends React.Component
{
	static defaultProps = {
		Title: "WebGL demo",
		LinkTitle: "WebGL demo",
		Href: "/portfolio/webgl-demos/",
		Icon: "" // SVG.AppNavButtons.About
	};
	constructor( props )
	{
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );

		this.Canvas = React.createRef();
		this.WGL = undefined;
        this.CanvasSize = 1000;

        document.title = this.Title;
		return;
	};
	componentDidMount() 
	{
		console.debug( "WebGLDemo.componentDidMount()", this.Canvas.current );

		this.WGL = this.Canvas.current.getContext( "experimental-webgl" );

         let vertices = [
             -0.5, 0.5, 0.0,
             -0.5, -0.5, 0.0,
             0.5, -0.5, 0.0,
             0.5, 0.5, 0.0
         ];

        let colors = [0,0,1, 1,0,0, 0,1,0, 1,0,1];
        let indices = [3, 2, 1, 3, 1, 0];
          
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
        let color_buffer = this.WGL.createBuffer ();
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, color_buffer );
        this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( colors ), this.WGL.STATIC_DRAW );

         // Shaders 
         // vertex shader source code
         let vertCode = 'attribute vec3 coordinates;'+
            'attribute vec3 color;'+
            'varying vec3 vColor;'+
            'void main(void) {' +
               ' gl_Position = vec4(coordinates, 1.0);' +
               'vColor = color;'+
            '}';
        // Create a vertex shader object
        let vertShader = this.WGL.createShader( this.WGL.VERTEX_SHADER );
        // Attach vertex shader source code
        this.WGL.shaderSource( vertShader, vertCode );
        // Compile the vertex shader
        this.WGL.compileShader(vertShader);

         // fragment shader source code
         let fragCode = 'precision mediump float;'+
            'varying vec3 vColor;'+
            'void main(void) {'+
               'gl_FragColor = vec4(vColor, 1.);'+
            '}';          
        // Create fragment shader object
        let fragShader = this.WGL.createShader( this.WGL.FRAGMENT_SHADER );
        // Attach fragment shader source code
        this.WGL.shaderSource( fragShader, fragCode );
        // Compile the fragmentt shader
        this.WGL.compileShader( fragShader );

        // Create a shader program object to
        // store the combined shader program
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
        this.WGL.enableVertexAttribArray(color);

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
		return;
	};
	componentWillUnmount()
	{	//console.debug( "AppLoader.componentWillUnmount()", this.AnimationID );
		return;
	};

    render()
	{
		return (
			<div className="page-layout">
				<SubNav />

				<div className="canvas-demo-header">{this.Title}</div>

				<div className="canvas-panel">
					<canvas id="html-5-canvas"
						className="canvas-2d"
						ref={this.Canvas}
						height={this.CanvasSize}
						width={this.CanvasSize}>
					</canvas>
				</div>					
			</div>
        );
    }
};