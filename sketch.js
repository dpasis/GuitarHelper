let guitar;
let sketchHeight = 400;
let font, fontSize = 60;

function preload() {
  font = loadFont("assets/SourceSansPro-Regular.otf");
}

function setup() {
  createCanvas(windowWidth, sketchHeight);
  frameRate(30);
  guitar = new Guitar( 1600, 200, 100 );

  // Set text characteristics
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);

}

let c = ['A', 'B', 'C', 'D', 'E', 'Em', 'F', 'G', 'Am', 'AM7', 'C#m'];
let len = c.length;
let count = 0;
function draw() {

  background(0);
  guitar.show();
  guitar.update();

  if(guitar.currentChord.value) {
    fill(255);
    textSize(50);
    text( guitar.currentChord.value || "" , windowWidth * 0.5, guitar.startPointY - 25);
  }

  if(guitar.tab.data.x > 0 && guitar.tab.data.y > 0) {
    fill(255);
    textSize(50);
    text( ( guitar.stringIndex[ guitar.tab.string ].label +' '+ guitar.tab.fret) || "" , sketchWidth * 0.5, guitar.startPointY - 25);
  }

  if(count%60 == 1) {
    let _c = c[ Math.floor( Math.random() * len ) ];
    guitar.setChord( _c );
  }

  count++;

}


// let tabs = [ 
//   [11, 'A'], 
//   [13, 'A'], 
//   [11, 'D'], 
//   [11, 'G'],
//   [11, 'D'],
//   [13, 'D'],
//   [14, 'G'],
//   [11, 'A'], 
//   [13, 'A'],
//   [11, 'G'],
//   [11, 'A'], 
//   [13, 'A'],
//   [11, 'D'],
//   [16, 'e'],
// ];

// let tabLen = tabs.length - 1;

// var timer;
// var counter = 76;
// var seconds, minutes;
// let tabI = 0;
// function timeIt() {

  // guitar.setTab( parseInt(tabs[tabI][0]), tabs[tabI][1] );
  
//   tabI++;
//   if(tabI > tabLen) {
//     tabI = 0;
//   }
// }