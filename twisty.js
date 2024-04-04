//
//CSE 470 HW 1 TWISTY!  
//
/*
Written by: HW470: Yusra Mannan
Date: Jan 20, 2024

Description: 
This program executes and displays a twisting flower. The flower is composed of 24 triangles, all of which rotate and fade except for the central 4 triangles. These 4 triangles form a square which maintains its solid colors of yellow and orange as the rest of the flower twists around it. The vertex shader controls the rotation and fading of the geometry.
*/

var canvas;
var gl;

//store the vertices
//Each triplet represents one triangle
var vertices = [];

//store a color for each vertex
var colors = [];

//HW470: control the rotation
//(Your variable here)
 

//HW470: control the redraw rate
var delay = 40;
var program;

// =============== function init ======================
 
// When the page is loaded into the browser, start webgl stuff
window.onload = function init()
{
	// notice that gl-canvas is specified in the html code
    canvas = document.getElementById( "gl-canvas" );
    
	// gl is a canvas object
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	// Track progress of the program with print statement
    console.log("Opened canvas");
        
    //HW470:
    // Define  data for object 
	// See HW specs for number of vertices  required
	// Recommendation: each set of three points corresponds to a triangle.
	// Here is one triangle. You can use parametric equations, for example of a circle to generate (x,y) values
	
    vertices = [
        // vec2( 0.25, -0.25 ), 
        // vec2( 0.0, 0.25 ),
        // vec2( -0.25, -0.25 ),
		
		//triangle 1
		vec2( 0.0, 0.0),
		vec2( 0.125, 0.125),
		vec2( -0.125, 0.125),
		
		//triangle 2
		vec2( 0.0, 0.0),
		vec2( 0.125, -0.125),
		vec2( 0.125, 0.125),
		
		//triangle 3
		vec2( 0.0, 0.0),
		vec2( -0.125, -0.125),
		vec2( 0.125, -0.125),
		
		//triangle 4
		vec2( 0.0, 0.0),
		vec2( -0.125, 0.125),
		vec2( -0.125, -0.125),
		
		//triangle 5
		vec2( 0.0, 0.75),
		vec2( 0.125, 0.125),
		vec2( -0.125, 0.125),
		
		//triangle 6
		vec2( 0.75, 0.0),
		vec2( 0.125, -0.125),
		vec2( 0.125, 0.125),
		
		//triangle 7
		vec2( 0.0, -0.75),
		vec2( -0.125, -0.125),
		vec2( 0.125, -0.125),
		
		//triangle 8
		vec2( -0.75, 0.0),
		vec2( -0.125, 0.125),
		vec2( -0.125, -0.125),
		
		//triangle 9
		vec2( -0.125, 0.125),
		vec2( -0.25, 0.125),
		vec2( -0.125, 0.25),
		
		//triangle 10
		vec2( 0.125, 0.125),
		vec2( 0.125, 0.25),
		vec2( 0.25, 0.125),
		
		//triangle 11
		vec2( 0.125, -0.125),
		vec2( 0.25, -0.125),
		vec2( 0.125, -0.25),
		
		//triangle 12
		vec2( -0.125, -0.125),
		vec2( -0.125, -0.25),
		vec2( -0.25, -0.125),
		
		//triangle 13
		vec2( -0.5, 0.5),
		vec2( -0.125, 0.25),
		vec2( -0.25, 0.125),
		
		//triangle 14
		vec2( 0.5, 0.5),
		vec2( 0.25, 0.125),
		vec2( 0.125, 0.25),
		
		//triangle 15
		vec2( 0.5, -0.5),
		vec2( 0.125, -0.25),
		vec2( 0.25, -0.125),
		
		//triangle 16
		vec2( -0.5, -0.5),
		vec2( -0.25, -0.125),
		vec2( -0.125, -0.25),
		
		//triangle 17
		vec2( -0.125, 0.125),
		vec2( -0.125, 0.25),
		vec2( 0.0, 0.75),
		
		//triangle 18
		vec2( 0.125, 0.125),
		vec2( 0.125, 0.25),
		vec2( 0.0, 0.75),

		//triangle 19
		vec2( 0.125, 0.125),
		vec2( 0.25, 0.125),
		vec2( 0.75, 0.0),
		
		//triangle 20
		vec2( 0.125, -0.125),
		vec2( 0.25, -0.125),
		vec2( 0.75, 0.0),
		
		//triangle 21
		vec2( 0.125, -0.125),
		vec2( 0.125, -0.25),
		vec2( 0.0, -0.75),
		
		//triangle 22
		vec2( -0.125, -0.125),
		vec2( -0.125, -0.25),
		vec2( 0.0, -0.75),
		
		//triangle 23
		vec2( -0.125, -0.125),
		vec2( -0.25, -0.125),
		vec2( -0.75, 0.0),
		
		//triangle 24
		vec2( -0.125, 0.125),
		vec2( -0.25, 0.125),
		vec2( -0.75, 0.0),
    ];
	 
	
	//HW470: Create colors for the core and outer parts
	// See HW specs for the number of colors needed
	// for(var i=0; i < vertices.length; i++) {
		// colors.push(vec3(1.0, 0.0, 0.0));
	// };
	 
for (var i = 0; i < vertices.length; i += 3) {
    if (i >= 0 && i <= 2) {
        // orange for triangle 1
        colors.push(vec3(1.0, 0.50, 0.0));
        colors.push(vec3(1.0, 0.50, 0.0));
        colors.push(vec3(1.0, 0.50, 0.0));
    } else if (i >= 3 && i <= 5) {
        // yellow for triangle 4
        colors.push(vec3(1.0, 1.0, 0.0));
        colors.push(vec3(1.0, 1.0, 0.0));
        colors.push(vec3(1.0, 1.0, 0.0));
    } else if (i >= 6 && i <= 8) {
       // orange for triangle 3
        colors.push(vec3(1.0, 0.50, 0.0));
        colors.push(vec3(1.0, 0.50, 0.0));
        colors.push(vec3(1.0, 0.50, 0.0));
    } else if (i >= 9 && i <= 11) {
		// yellow for triangle 4
        colors.push(vec3(1.0, 1.0, 0.0));
        colors.push(vec3(1.0, 1.0, 0.0));
        colors.push(vec3(1.0, 1.0, 0.0));
    } else if (i >= 12 && i <= 14) {
        // blue for triangle 5
        colors.push(vec3(0.0, 0.2, 0.7));
        colors.push(vec3(0.0, 0.2, 0.7));
        colors.push(vec3(0.0, 0.2, 0.7));
    } else if (i >= 15 && i <= 17) {
        // lighter blue for triangle 6
        colors.push(vec3(0.0, 0.7, 0.9));
        colors.push(vec3(0.0, 0.7, 0.9));
        colors.push(vec3(0.0, 0.7, 0.9));
    } else if (i >= 18 && i <= 20) {
        // blue for triangle 7
        colors.push(vec3(0.0, 0.2, 0.7));
        colors.push(vec3(0.0, 0.2, 0.7));
        colors.push(vec3(0.0, 0.2, 0.7));;
    } else if (i >= 21 && i <= 23) {
        // lighter blue for triangle 8
        colors.push(vec3(0.0, 0.7, 0.9));
        colors.push(vec3(0.0, 0.7, 0.9));
        colors.push(vec3(0.0, 0.7, 0.9));
    } else if (i >= 24 && i <= 26) {
        // Dark green for triangle 9
        colors.push(vec3(0.0, 0.5, 0.0));
        colors.push(vec3(0.0, 0.5, 0.0));
        colors.push(vec3(0.0, 0.5, 0.0));
    } else if (i >= 27 && i <= 29) {
        // Light green for triangle 10
        colors.push(vec3(0.5, 1.0, 0.5));
        colors.push(vec3(0.5, 1.0, 0.5));
        colors.push(vec3(0.5, 1.0, 0.5));
    } else if (i >= 30 && i <= 32) {
        // Dark green for triangle 11
        colors.push(vec3(0.0, 0.5, 0.0));
        colors.push(vec3(0.0, 0.5, 0.0));
        colors.push(vec3(0.0, 0.5, 0.0));
    } else if (i >= 33 && i <= 35) {
        // Light green for triangle 12
        colors.push(vec3(0.5, 1.0, 0.5));
        colors.push(vec3(0.5, 1.0, 0.5));
        colors.push(vec3(0.5, 1.0, 0.5));
    } else if (i >= 36 && i <= 38) {
        // Dark green for triangle 13
        colors.push(vec3(0.0, 0.5, 0.0));
        colors.push(vec3(0.0, 0.5, 0.0));
        colors.push(vec3(0.0, 0.5, 0.0));
    } else if (i >= 39 && i <= 41) {
        // Light green for triangle 14
        colors.push(vec3(0.5, 1.0, 0.5));
        colors.push(vec3(0.5, 1.0, 0.5));
        colors.push(vec3(0.5, 1.0, 0.5));
    } else if (i >= 42 && i <= 44) {
        // Dark green for triangle 15
        colors.push(vec3(0.0, 0.5, 0.0));
        colors.push(vec3(0.0, 0.5, 0.0));
        colors.push(vec3(0.0, 0.5, 0.0));
    } else if (i >= 45 && i <= 47) {
        // Light green for triangle 16
        colors.push(vec3(0.5, 1.0, 0.5));
        colors.push(vec3(0.5, 1.0, 0.5));
        colors.push(vec3(0.5, 1.0, 0.5));
    } else if (i >= 48 && i <= 50) {
        // dark blue for triangle 17
        colors.push(vec3(0.0, 0.1, 0.2));
        colors.push(vec3(0.0, 0.1, 0.2));
        colors.push(vec3(0.0, 0.1, 0.2));
    } else if (i >= 51 && i <= 53) {
        // dark blue for triangle 18
        colors.push(vec3(0.0, 0.1, 0.2));
        colors.push(vec3(0.0, 0.1, 0.2));
        colors.push(vec3(0.0, 0.1, 0.2));
    } else if (i >= 54 && i <= 56) {
        // light dark blue for triangle 19
        colors.push(vec3(0.0, 0.3, 0.4));
        colors.push(vec3(0.0, 0.3, 0.4));
        colors.push(vec3(0.0, 0.3, 0.4));
    } else if (i >= 57 && i <= 58) {
        // light dark blue for triangle 20
        colors.push(vec3(0.0, 0.3, 0.4));
        colors.push(vec3(0.0, 0.3, 0.4));
        colors.push(vec3(0.0, 0.3, 0.4));
    }  else if (i >= 59 && i <= 61) {
        // dark blue for triangle 21
        colors.push(vec3(0.0, 0.1, 0.2));
        colors.push(vec3(0.0, 0.1, 0.2));
        colors.push(vec3(0.0, 0.1, 0.2));
	}   else if (i >= 62 && i <= 64) {
        // dark blue for triangle 22
        colors.push(vec3(0.0, 0.1, 0.2));
        colors.push(vec3(0.0, 0.1, 0.2));
        colors.push(vec3(0.0, 0.1, 0.2));
	}  else if (i >= 65 && i <= 67) {
        // light dark blue for triangle 23
        colors.push(vec3(0.0, 0.3, 0.4));
        colors.push(vec3(0.0, 0.3, 0.4));
        colors.push(vec3(0.0, 0.3, 0.4));
	}   else if (i >= 68 && i <= 70) {
        // light dark blue for triangle 24
        colors.push(vec3(0.0, 0.3, 0.4));
        colors.push(vec3(0.0, 0.3, 0.4));
        colors.push(vec3(0.0, 0.3, 0.4));
	} 
}


	
	// HW470: Print the input vertices and colors to the console
console.log("Input vertices and colors:");
console.log(vertices);
console.log(colors);
	 

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
	// Background color to white
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Define shaders to use  
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
	//
	// color buffer: create, bind, and load
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
	
	// Associate shader variable for  r,g,b color
	var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    
    // vertex buffer: create, bind, load
    var vbuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vbuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate shader variables for x,y vertices	
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	//HW470: associate shader explode variable ("Loc" variables defined here) 
     

    console.log("Data loaded to GPU -- Now call render");

    render();
};

var rotationAngle = 0.0;
var rotationDirection = 1.0; // 1.0 for counterclockwise, -1.0 for clockwise

// =============== function render ======================

function render() {
    // clear the screen 
    gl.clear(gl.COLOR_BUFFER_BIT);

    //HW470: send uniform(s) to vertex shader
    var uRotationAngle = gl.getUniformLocation(program, "uRotationAngle");
    gl.uniform1f(uRotationAngle, rotationAngle);

    //HW470: draw the object
    // You will need to change this to create the twisting outer parts effect
    // Hint: you will need more than one draw function call
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length);

    // Update rotation angle and direction
    rotationAngle += 1.0 * rotationDirection;

    // Check if reached 90 degrees counterclockwise
    if (rotationAngle <= -90.0) {
        rotationAngle = -90.0;

        // Reverse rotation direction to turn clockwise
        rotationDirection *= -1.0;
		
    } else if (rotationAngle >= 0.0) {
        rotationAngle = 0.0;

        // Reverse rotation direction to turn counterclockwise
        rotationDirection *= -1.0;
    }

	
	//re-render after delay
	setTimeout(function (){requestAnimFrame(render);}, delay);
}
