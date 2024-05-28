/*
Set a buffer to all elements drawn in the group work, 
so they can be set as a background picture in the individual work.
In this way, the random attributes and loops of some functions in group work won't affect animation in the individual work.
The buffer here is related to createGraphics() below.
*/
let buffer;

//for the animation of snow
const dots = [];
const border = 2;

//class of snow (the first animation of this individual work)
//inspired by Parallax Dots in Happy Coding. 
//reference: https://happycoding.io/tutorials/p5js/creating-classes/parallax-dots
class Snow {
  constructor(layer) {
    this.layer = layer;
    this.x = random(-border, width + border);
    this.y = random(-border, height + border);
    
    // Randomly generate bright white and silver dots with silver stroke.
    this.fillColor = color(random(200, 255), random(200, 255), random(200, 255));
    this.strokeColor = color(192); // Silver
  }

  draw() {
    let snowMoveX = 0;
    let snowMoveY = 0;

    //make snowing can be controlled by mouse movement.
    //imaging the mouse is wind. Moving mouse's X position can make snoing heavier because of stonger wind.
    //But wind cannot make snowing from bottom to up. So I changed the mouseY's movement to make it drop persistently. 
    //Now you controlled the power of wind! It's cool!
    if(mouseX != 0 && mouseY != 0){
      snowMoveX = -this.layer * map(mouseX - width / 2, 0, width, 0, 5);
      snowMoveY = this.layer * 2; // Adjust speed by layer. 
    }
    this.x += snowMoveX;
    this.y += snowMoveY;

    if (this.x < -border) {
      this.x = width + random(border);
      this.y = random(0, height);
    } else if (this.x > width + border) {
      this.x = 0 - random(border);
      this.y = random(0, height);
    }
    if (this.y < -border) {
      this.y = height + random(border);
      this.x = random(0, width);
    } else if (this.y > height + border) {
      this.y = 0 - random(border);
      this.x = random(0, width);
    }
    
    // height / 1.18 is the position of the ground.
    // Snow falls to the ground, then visually disappeared. Make sense right?
    if (this.y < height / 1.18) {
      fill(this.fillColor);
      stroke(this.strokeColor);
      strokeWeight(2);
      circle(this.x, this.y, 10 / (4 - this.layer));
    }
  }
}

//lines for yellow branches and the bole. 
//Deviation exists since all coordinates are from naked eyes through the coordinate plane.
let segments = [
  {x1: 194, y1: 134, x2: 205, y2: 283}, //1
  {x1: 205, y1: 283, x2: 285, y2: 283}, //2
  {x1: 285, y1: 283, x2: 274, y2: 531}, //3
  {x1: 274, y1: 531, x2: 650, y2: 543}, //4
  {x1: 650, y1: 543, x2: 661, y2: 248}, //5
  {x1: 661, y1: 248, x2: 809, y2: 295}, //6
  {x1: 809, y1: 295, x2: 815, y2: 236}, //7
  {x1: 479, y1: 401, x2: 462, y2: 974}, //8
  {x1: 365, y1: 401, x2: 547, y2: 401}, //9
  {x1: 547, y1: 401, x2: 547, y2: 354}, //10
  {x1: 406, y1: 401, x2: 406, y2: 342}, //11
  {x1: 297, y1: 975, x2: 620, y2: 975}, //12
]

//coordinates for the center of circles and circles' diameter.
//Deviation exists since all coordinates are from naked eyes through the coordinate plane.
let circles = [
  //Yuchen
  {x: 816, y: 256, size: 38}, //1
  {x: 787, y: 288, size: 44}, //2
  {x: 739, y: 267, size: 66}, //3
  {x: 691, y: 260, size: 37}, //4
  {x: 652, y: 271, size: 46}, //5
  {x: 658, y: 342, size: 93}, //6
  {x: 650, y: 413, size: 56}, //7
  {x: 640, y: 474, size: 74}, //8
  {x: 615, y: 536, size: 70}, //9
  {x: 561, y: 538, size: 46}, //10
  {x: 508, y: 550, size: 66}, //11
  {x: 472, y: 496, size: 46}, //12
  {x: 477, y: 440, size: 74}, //13
  {x: 524, y: 404, size: 46}, //14
  {x: 549, y: 371, size: 34}, //15
  {x: 433, y: 401, size: 50}, //16
  {x: 386, y: 400, size: 38}, //17
  {x: 412, y: 362, size: 38}, //18

  //Yishu
  {x: 190, y: 182, size: 96}, //19
  {x: 204, y: 256, size: 54}, //20
  {x: 253, y: 286, size: 60}, //21
  {x: 282, y: 328, size: 42}, //22
  {x: 268, y: 384, size: 76}, //23
  {x: 282, y: 476, size: 110}, //24
  {x: 344, y: 534, size: 64}, //25
  {x: 403, y: 544, size: 56}, //26
  {x: 452, y: 538, size: 44}, //27

  //George
  {x: 485, y: 630, size: 100}, //28
  {x: 455, y: 740, size: 136}, //29
  {x: 462, y: 834, size: 58}, //30
  {x: 472, y: 886, size: 50}, //31
  {x: 442, y: 936, size: 74}, //32
  {x: 506, y: 960, size: 60}, //33
  {x: 578, y: 970, size: 82}, //34
  {x: 396, y: 968, size: 40}, //35
  {x: 336, y: 966, size: 76}, //36
]

//points of rectangles for the green ground
let groundPoints = [
  {x: 52, y: 990},
  {x: 52, y: 1110},
  {x: 857, y: 1110},
  {x: 857, y: 990},
  {x: 780, y: 990},
  {x: 780, y: 1110},
  {x: 780, y: 990},
  {x: 160, y: 990},
  {x: 160, y: 1110},
  {x: 160, y: 990}
]

//This is for the second animation of this individual work: the disappearance of apples.
//Creates a Boolean array called visible with the same length as the array circles.
//This array records whether each circle is visible. ALl circles are set as true initially.
let visible = new Array(circles.length).fill(true);

function setup() {
  createCanvas(914, 1300); // 2x amplification from the original size (457x1300)
  //createGraphics() creates an offscreen drawing canvas (graphics buffer) and returns it as a p5.Graphics object. 
  //Drawing to a separate graphics buffer can be helpful for performance and for organizing code.
  //reference: p5.js ref. https://p5js.org/reference/#/p5/createGraphics
  buffer = createGraphics(914, 1300);

  buffer.background(169, 205, 201); //all RGB parameters are derived from https://pixspy.com/
  drawBG(buffer, 55, 44, 800, 48, 3, 50, 67, 87); //draw the top background
  drawGradientRect(buffer, 55, 92, 800, 584, color(210, 210, 198), color(246, 240, 224));  //the gradient white background
  drawGradientRect(buffer, 55, 676, 800, 560, color(234, 224, 189), color(218, 203, 172));  //the gradient yellow background
  drawBG(buffer, 80, 1115, 76, 69, 3, 50, 67, 87); //draw signature's background
  drawBG(buffer, 55, 1235, 800, 15, 3, 50, 67, 87); //draw the bottom background
  DrawPoints(buffer, 50, 44, 810, 1208, 3, 67, 96, 114); //draw background texture

  //follow this sequence to avoid covering
  ourGroupName(buffer);
  drawGround(buffer);
  drawTreeRoot(buffer);
  drawSemiCircles(buffer);

  // 3 layers and 400 dots are set to make snowing more vividly.
  for (let layer = 1; layer <= 3; layer++) {
    for (let i = 0; i < 400; i++) {
      dots.push(new Snow(layer));
    }
  }
  colorMode(RGB);
}

/*
we know this is not the ideal way to make window responsive. 
But since most elements in this project have a fixed position, 
it's hard to change them all in a systematic way through one scale factor.
Therefore, we are inspired by Chrome's responsive dimension and created a CSS style in html.
*/
function windowResized() {
}

function draw() {
  //many elements in the group work are contained in the buffer, becoming the background image.
  image(buffer, 0, 0);

  //The two functions below are contained in the buffer initially as a part of the background.
  //I put them out of the buffer, so they can be animated now.
  //This is for the second animation.
  drawApples();
  drawTreeBranches();

  //make snow moving. This is for the first animation.
  snowMove();

}

//use for...of loops to make all dots in the class Snow move.
function snowMove(){
  for (const dot of dots) {
    dot.draw();
  }
}

function drawBG(pg, x, y, w, h, a, r, g, b) {
  pg.fill(r, g, b);
  pg.rect(x, y, w, h, a)
  pg.noFill();
  pg.noStroke();
}

function drawGradientRect(pg, x, y, w, h, c1, c2) {
  for (let i = 0; i <= h; i += 0.3) {
    let inter = map(i, 0, h, 0, 1);
    //lerpColor(c1, c2, amt), blends two colors to find a third color between them.
    //reference: https://p5js.org/reference/#/p5/lerpColor
    let c = lerpColor(c1, c2, inter);
    pg.stroke(c);
    pg.line(x, y + i, x + w, y + i);
  }
}

//use Perlin Noise to draw background points and texture
function DrawPoints(pg, sx, sy, rectWidth, rectHeight, density, r, g, b) {
  pg.strokeWeight(1);
  // Outer loop for potential iterative enhancements, currently runs once
  for (let i = 0; i < 1; i++) {
    // Set the stroke color to the given RGB values
    pg.stroke(r, g, b);
    // Loop through the width of the rectangle
    for (let x = 1; x < rectWidth; x++) {
      // Loop through the height of the rectangle
      for (let y = 0; y < rectHeight; y++) {
        // Generate a noise value based on the current position
        let n = noise(x * 0.02, y * 0.02);
        if (random(1) > 0.9 - 0.01 * i - n / 5) {
          // Randomize stroke weight to simulate texture
          pg.strokeWeight(
            random(
              0.2 + density - n / 10,
              0.3 + density - n / 10
            )
          );
          // Draw the point with a random offset to create a more natural texture
          pg.point(sx + x + random(-2, 2), sy + y + random(-3, 3));
        }
      }
    }
  }
}

//our group name
function ourGroupName(pg) {
  pg.fill(86, 154, 115);
  pg.textSize(15);
  pg.noStroke();
  pg.text("Tut 10", 93, 1140);
  pg.text("Group E", 93, 1160);
  pg.endShape();
}

//the green ground
function drawGround(pg) {
  pg.beginShape();
  for (let pt of groundPoints) {
    pg.stroke(59, 61, 59); //black
    pg.strokeWeight(6);
    pg.vertex(pt.x, pt.y);
  }
  pg.endShape(CLOSE);
}

//tree root, drawn by loops of rectangle
function drawTreeRoot(pg) {
  let numRect = 6;
  //The coordinates and size of the first rectangle on the left
  let baseX = 210, baseY = 975, baseW = 80, baseH = 120;
  let colors = [
    pg.color(214, 181, 101), //yellow
    pg.color(247, 73, 73), //red
    pg.color(94, 161, 116), //green
    pg.color(230, 198, 114), //yellow
    pg.color(94, 161, 116), //green
    pg.color(214, 181, 101) //yellow
  ];
  for (let i = 0; i < numRect; i++) {
    pg.fill(colors[i]);
    pg.stroke(59, 61, 59); //black
    pg.strokeWeight(6);
    pg.rect(baseX + baseW * i + 7, baseY, baseW, baseH);
  }
}

//semi-circles in rectangles
function drawSemiCircles(pg) {
  let numSemiCircles = 6;
  //set the first semi-circle for looping
  let baseCX = 257, baseCY = 1095, baseCW = 80, baseCH = 60;
  //an color array for different arcs.
  let colors = [
    pg.color(94, 161, 116), //green
    pg.color(214, 181, 101), //yellow
    pg.color(247, 73, 73), //red
    pg.color(247, 73, 73), //red
    pg.color(214, 181, 101), //yellow
    pg.color(94, 161, 116) //green
  ]
  for (let i = 0; i < numSemiCircles; i++) {
    pg.stroke(246, 189, 139);
    pg.strokeWeight(4);
    pg.fill(colors[i]);
    //use arc to draw semi-circles. Reference: https://p5js.org/reference/#/p5/arc
    pg.arc(baseCX + baseCW * i, baseCY, baseCW, baseCH + random(-30, 80), PI, TWO_PI, OPEN);
  }
}

//tree branches and trunk
//this function is not in the buffer now for the operation of the second animation.
function drawTreeBranches() {
  for (let seg of segments) {
    stroke(246, 189, 139); //yellow
    strokeWeight(4);
    line(seg.x1, seg.y1, seg.x2, seg.y2);
  }
}

//all circles/apples
//this function is not in the buffer now for the operation of the second animation.
function drawApples() {
  //call an index i, which is used to check if circles drawn by for...of loops are visible.
  //This is for the second animation since for...of loops cannot offer the index of one specific circle.
  //But to make circles disappear one by one, I need the index.
  let i = 0;
  for (let circle of circles) {
    //Here it is. Check if circles are visible.  
    if(visible[i]){ 
      stroke(38, 49, 53); //black
      strokeWeight(6);
      noFill();
      ellipse(circle.x, circle.y, circle.size);

      //find points of intersection and calculate their polar coordinates
      let intersections = [];
      for (let seg of segments) {
       //concat can concatenate two arrays. Here, it concatenates intersections and lineEllipseIntersection.
       //it help us find and record all intersections.
       //reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
       intersections = intersections.concat(lineEllipseIntersection(circle.x, circle.y, circle.size / 2, seg.x1, seg.y1, seg.x2, seg.y2));
      }

      //calculate polar coordinates
      if (intersections.length === 2) {
       //atan2(y, x) calculates the angle formed by a point, the origin, and the positive x-axis.
       //it returns the arc tangent of the given point.
       //reference: https://p5js.org/reference/#/p5/atan2
       let angle1 = atan2(intersections[0].y - circle.y, intersections[0].x - circle.x);
       let angle2 = atan2(intersections[1].y - circle.y, intersections[1].x - circle.x);

       //create two arcs that constitute the circle according to angle1 and angle2
       //fill green or red in two arcs randomly
        if (random(1) < 0.5) {
         fill(137, 184, 114); //green
         //the left semi-circle of each circle.
         arc(circle.x, circle.y, circle.size, circle.size, angle1, angle2, OPEN);
         fill(253, 94, 99); //red
         //the right semi-circle of each circle.
         arc(circle.x, circle.y, circle.size, circle.size, angle2, angle1 + TWO_PI, OPEN);
        }
        else {
         fill(253, 94, 99); //red
         arc(circle.x, circle.y, circle.size, circle.size, angle1, angle2, OPEN);
         fill(137, 184, 114); //green
         arc(circle.x, circle.y, circle.size, circle.size, angle2, angle1 + TWO_PI, OPEN);
        }
      } 
    }
    i++; // make the index increase once when drawing each circle, so we can know the exact index of every circle.
  } 
}

function keyPressed() {
  //When you pressed d or D, one random apple will disappear.
  //d means drop, so you can imagine the wind controlled by mouse blows an apple off.
  //By simply clicking a key, you will determine the fate of the tree in the wind and snow.
  if (key === 'd' || key === 'D') {
    let remaining = []; //Create an empty array to store indexes of visible circles.
    let i = 0;
    for (let isVisible of visible) {
      if (isVisible) {
        remaining.push(i); //if the circle is visible, its index will be included in the array.
      }
      i++;
    }
    //since all circles were set as true initially, all circles are in the array remaining. 
    //Now, select a random index of the circle and turn it to invisible by clicking d or D.
    //then draw rest apples. So visually one apple disappeared.
    if (remaining.length > 0) {
      let randomApple = floor(random(remaining.length));
      visible[remaining[randomApple]] = false; 
      drawApples();
    }
  }
}

/*
The principle of mathematics for the function below:
The line cuts through the circle, intersecting it in two points.
The equation of a straight line: 𝑦=𝑚𝑥+𝑏, where 𝑚 is the line’s slope and 𝑏 its 𝑦-intercept. 
The equation of a circle in standard form: (𝑥−ℎ)^2+(𝑦−𝑘)^2=𝑟^2. (ℎ,𝑘) is the center of the circle and 𝑟 is radius,
or in general form: 𝑥^2+𝑦^2+𝐷𝑥+𝐸𝑦+𝐹=0, with constants 𝐷,𝐸,and 𝐹.

When the line and the circle intersect at a point 𝑃,
substitute “𝑚𝑥+𝑏” for 𝑦 in the circle equation to calculate the coordinates of 𝑃. 
The result of this substitution is: 𝐴𝑥^2+𝐵𝑥+𝐶=0.
The roots of this quadratic equation are the 𝑥-coordinates of the intersection points of the line with the circle. 
The number of roots a quadratic equation has over the real numbers is controlled by its discriminant Δ=𝐵^2−4𝐴𝐶.
When Δ>0, the line intersects the circle twice.

reference: Lesson Explainer: Intersections of Circles and Lines (nagwa)
https://www.nagwa.com/en/explainers/987161873194/#:~:text=The%20discriminant%20%CE%94%20%3D%20%F0%9D%90%B5%20%E2%88%92%204,and%20the%20circle%20are%20disjoint.
*/

//find intersection points
//the production of this function is from ChatGPT.https://chatgpt.com/?oai-dm=1
function lineEllipseIntersection(cx, cy, r, x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let A = dx * dx + dy * dy;
  let B = 2 * (dx * (x1 - cx) + dy * (y1 - cy));
  let C = (x1 - cx) * (x1 - cx) + (y1 - cy) * (y1 - cy) - r * r;
  let det = B * B - 4 * A * C;
  let intersections = [];

  if (det >= 0) {
    //sqrt() calculates the square root of a number
    //reference: https://p5js.org/reference/#/p5/sqrt
    let t1 = (-B + sqrt(det)) / (2 * A);
    let t2 = (-B - sqrt(det)) / (2 * A);

    if (t1 >= 0 && t1 <= 1) {
      intersections.push({ x: x1 + t1 * dx, y: y1 + t1 * dy });
    }
    if (t2 >= 0 && t2 <= 1) {
      intersections.push({ x: x1 + t2 * dx, y: y1 + t2 * dy });
    }
  }
  return intersections;
}
