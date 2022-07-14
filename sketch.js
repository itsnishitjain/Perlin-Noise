var inc = 0.1;
var scl = 10;
var cols, rows;

var fr;
var zoff = 0;

var particle = [];
var flowfield = [];

function setup() {
	createCanvas(1300, 800);
	cols = floor(width/scl);
	rows = floor(height/scl);
	fr = createP('');

	flowfield = new Array(cols * rows);

	for(var i = 0; i < 10000; i++){
		particle[i] = new Particle();
	}
	background(2, 8, 26);
}

function draw() {
	var yoff = 0;

	for(var y = 0; y < rows; y++){
		var xoff = 0;
		for(var x = 0; x < cols; x++){
			var index = (x + y*cols);
			var angle = noise(xoff, yoff, zoff) * TWO_PI;
			var v = p5.Vector.fromAngle(angle);
			v.setMag(10);
			flowfield[index] = v;
			xoff += inc;
			stroke(0, 50);
			// push();
			// translate(x * scl, y * scl);
			// rotate(v.heading());
			// strokeWeight(1);
			// line(0, 0, scl, 0);
			// pop();
		}
		yoff += inc;
		zoff += 0.0003;
	}
	for(var i = 0; i < particle.length; i++){
		particle[i].follow(flowfield);
		particle[i].update();
		particle[i].edges();
		particle[i].show();
	}

	fr.html(floor(frameRate()));
}
