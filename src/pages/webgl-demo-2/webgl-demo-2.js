import React, { Component } from "react";
import { mat4 } from "gl-matrix";

export default class WebGLRenderer extends Component {
	static defaultProps = {
		Title: "WebGL Demo 2",
		LinkTitle: "WebGL Demo 2",
		Href: "/portfolio/webgl-demo-2",
	};
	constructor(props) {
		super(props);
		this.Title = this.props.Title || this.defaultProps.Title;
		this.LinkTitle = this.props.LinkTitle || this.defaultProps.LinkTitle;
		this.Href = this.props.Href || this.defaultProps.Href;
		document.title = this.Title;
		return;
	}
	componentDidMount() {
		this.initWebGL();
	}

	initWebGL() {
		const canvas = this.canvas;
		const gl = canvas.getContext("webgl");

		if (!gl) {
			console.error("WebGL not supported");
			return;
		}

		// Vertex shader program
		const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec3 aVertexNormal;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      uniform mat4 uNormalMatrix;
      varying highp vec3 vReflection;
      void main(void) {
        vec4 vertexPosition = uModelViewMatrix * aVertexPosition;
        vec3 transformedNormal = normalize(vec3(uNormalMatrix * vec4(aVertexNormal, 1.0)));
        vReflection = reflect(vertexPosition.xyz, transformedNormal);
        gl_Position = uProjectionMatrix * vertexPosition;
      }
    `;

		// Fragment shader program
		const fsSource = `
      precision mediump float;
      varying highp vec3 vReflection;
      uniform samplerCube uCubeMap;
      void main(void) {
        gl_FragColor = textureCube(uCubeMap, vReflection);
      }
    `;

		// Initialize shaders
		const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
		const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

		// Create the shader program
		const shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
			return;
		}

		// Use the shader program
		gl.useProgram(shaderProgram);

		// Collect shader attributes and uniforms
		const programInfo = {
			program: shaderProgram,
			attribLocations: {
				vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
				vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
			},
			uniformLocations: {
				projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
				modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
				normalMatrix: gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
				cubeMap: gl.getUniformLocation(shaderProgram, "uCubeMap"),
			},
		};

		// Set up the buffers
		const buffers = this.initBuffers(gl);

		// Load the cubemap texture
		const cubeMapTexture = this.initCubeMap(gl);

		// Draw the scene
		this.drawScene(gl, programInfo, buffers, cubeMapTexture);
	}

	loadShader(gl, type, source) {
		const shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}

		return shader;
	}

	initBuffers(gl) {
		// Create a buffer for the cube's positions.
		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		const positions = [
			// Front face
			-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
			// Back face
			-1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
			// Top face
			-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
			// Bottom face
			-1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
			// Right face
			1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
			// Left face
			-1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

		// Create a buffer for the cube's normals.
		const normalBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
		const vertexNormals = [
			// Front
			0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
			// Back
			0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
			// Top
			0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
			// Bottom
			0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
			// Right
			1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
			// Left
			-1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);

		// Create a buffer for the cube's indices.
		const indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		const indices = [
			0,
			1,
			2,
			0,
			2,
			3, // front
			4,
			5,
			6,
			4,
			6,
			7, // back
			8,
			9,
			10,
			8,
			10,
			11, // top
			12,
			13,
			14,
			12,
			14,
			15, // bottom
			16,
			17,
			18,
			16,
			18,
			19, // right
			20,
			21,
			22,
			20,
			22,
			23, // left
		];
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

		return {
			position: positionBuffer,
			normal: normalBuffer,
			indices: indexBuffer,
		};
	}

	initCubeMap(gl) {
		const texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

		const faceInfos = [
			{
				target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
				url: "./pos-x.jpg",
			},
			{
				target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
				url: "./neg-x.jpg",
			},
			{
				target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
				url: "./pos-y.jpg",
			},
			{
				target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
				url: "./neg-y.jpg",
			},
			{
				target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
				url: "./pos-z.jpg",
			},
			{
				target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
				url: "./neg-z.jpg",
			},
		];

		faceInfos.forEach((faceInfo) => {
			const { target, url } = faceInfo;
			//  console.debug(target, url);

			// Upload the canvas to the cubemap face.
			const level = 0;
			const internalFormat = gl.RGBA;
			const width = 512;
			const height = 512;
			const format = gl.RGBA;
			const type = gl.UNSIGNED_BYTE;

			// Setup each face so it's immediately renderable
			gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

			// Asynchronously load an image
			const image = new Image();
			image.src = url;
			image.onload = () => {
				gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
				gl.texImage2D(target, level, internalFormat, format, type, image);
				gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
			};
		});

		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		//  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);

		return texture;
	}

	drawScene(gl, programInfo, buffers, cubeMapTexture) {
		gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
		gl.clearDepth(1.0); // Clear everything
		gl.enable(gl.DEPTH_TEST); // Enable depth testing
		gl.depthFunc(gl.LEQUAL); // Near things obscure far things

		// Clear the canvas before we start drawing on it.
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Create a perspective matrix, a special matrix that is used to simulate the distortion of perspective in a camera.
		const fieldOfView = (45 * Math.PI) / 180; // in radians
		const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
		const zNear = 0.1;
		const zFar = 100.0;
		const projectionMatrix = mat4.create();

		mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

		// Set the drawing position to the "identity" point, which is the center of the scene.
		const modelViewMatrix = mat4.create();

		// Move the drawing position a bit to where we want to start drawing the square.
		mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);

		// Rotate the cube
		mat4.rotate(modelViewMatrix, modelViewMatrix, 0.01, [0, 0, 1]);
		mat4.rotate(modelViewMatrix, modelViewMatrix, 0.01, [0, 1, 0]);

		// Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute.
		{
			const numComponents = 3; // pull out 3 values per iteration
			const type = gl.FLOAT; // the data in the buffer is 32bit floats
			const normalize = false; // don't normalize
			const stride = 0; // how many bytes to get from one set of values to the next
			const offset = 0; // how many bytes inside the buffer to start from
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
			gl.vertexAttribPointer(
				programInfo.attribLocations.vertexPosition,
				numComponents,
				type,
				normalize,
				stride,
				offset
			);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
		}

		// Tell WebGL how to pull out the normals from the normal buffer into the vertexNormal attribute.
		{
			const numComponents = 3; // pull out 3 values per iteration
			const type = gl.FLOAT; // the data in the buffer is 32bit floats
			const normalize = false; // don't normalize
			const stride = 0; // how many bytes to get from one set of values to the next
			const offset = 0; // how many bytes inside the buffer to start from
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
			gl.vertexAttribPointer(programInfo.attribLocations.vertexNormal, numComponents, type, normalize, stride, offset);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
		}

		// Tell WebGL which indices to use to index the vertices
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

		// Set the shader uniforms
		gl.useProgram(programInfo.program);

		gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
		gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

		// Compute the normal matrix and set it
		const normalMatrix = mat4.create();
		mat4.invert(normalMatrix, modelViewMatrix);
		mat4.transpose(normalMatrix, normalMatrix);
		gl.uniformMatrix4fv(programInfo.uniformLocations.normalMatrix, false, normalMatrix);

		// Bind the cubemap texture
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeMapTexture);
		gl.uniform1i(programInfo.uniformLocations.cubeMap, 0);

		{
			const vertexCount = 36;
			const type = gl.UNSIGNED_SHORT;
			const offset = 0;
			gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
		}
	}

	render() {
		return (
			<canvas
				ref={(canvas) => {
					this.canvas = canvas;
				}}
				width="800"
				height="600"
			/>
		);
	}
}
