class Guitar {
  
  constructor(width, height, startY) {
    this.startPointX = 50;
    this.startPointY = startY || height;
    this.width = width;
    this.height = height;
    this.fretLength = 21;
    this.frets = [];
    this.tab = { 'fret': 0, 'string': null, data: {'x': 0, 'y': 0} };
    this.fretPoints = [];
    this.currentChord = { 'value': null, 'data': [], 'hits': null };

    this.tuning = ['E', 'B', 'G', 'D', 'A', 'E'];
    this.stringIndex = {
      'e': { 'label': 'E', data: {} }, 
      'B': { 'label': 'B', data: {} }, 
      'G': { 'label': 'G', data: {} }, 
      'D': { 'label': 'D', data: {} }, 
      'A': { 'label': 'A', data: {} }, 
      'E': { 'label': 'E', data: {} }
    };
    this.currentPoints = null;
    this.capoPosition = 0;
  }

  /**
   * 
   * @param {*} chord 
   * @description A method to map the position of the fingers and the fret number
   */
  getChord( chord ) {
    switch( chord ) {
      case 'A':
        return {
          'e': { 'v': 0 },
          'B': { 'v': 2, 'idx': 4 },
          'G': { 'v': 2, 'idx': 2 },
          'D': { 'v': 2, 'idx': 3 },
          'A': { 'v': 0 },
          'E': { 'v': null }
        };

      case 'Am':
        return {
          'e': { 'v': 0 },
          'B': { 'v': 1, 'idx': 1 },
          'G': { 'v': 2, 'idx': 2 },
          'D': { 'v': 2, 'idx': 3 },
          'A': { 'v': 0 },
          'E': { 'v': null }
        };

      case 'AM7':
        return {
          'e': { 'v' : 0 },
          'B': { 'v' : 2, 'idx': 3 },
          'G': { 'v' : 1, 'idx': 1 },
          'D': { 'v' : 2, 'idx': 2 },
          'A': { 'v': 0 },
          'E': { 'v': null }
        };

      case 'B':
        return {
          'e': { 'v': 2, 'idx': 1},
          'B': { 'v': 4, 'idx': 4},
          'G': { 'v': 4, 'idx': 3},
          'D': { 'v': 4, 'idx': 2},
          'A': { 'v': 2, 'idx': 1},
          'E': { 'v': null},
        };

      case 'C':
        return {
          'e': { 'v': 0 },
          'B': { 'v': 1, 'idx': 1},
          'G': { 'v': 0 },
          'D': { 'v': 2, 'idx': 2},
          'A': { 'v': 3, 'idx': 3},
          'E': { 'v': null},
        };

      case 'C#m':
        return {
          'e': { 'v': 4, 'idx': 1 },
          'B': { 'v': 5, 'idx': 2 },
          'G': { 'v': 6, 'idx': 4 },
          'D': { 'v': 6, 'idx': 3 },
          'A': { 'v': 4, 'idx': 1},
          'E': { 'v': null},
        };  

      case 'D':
        return {
          'e': { 'v': 2, 'idx': 2 },
          'B': { 'v': 3, 'idx': 3 },
          'G': { 'v': 2, 'idx': 1 },
          'D': { 'v': 0 },
          'A': { 'v': null },
          'E': { 'v': null},
        };

      case 'Dm':
        return {
          'e': { 'v': 1, 'idx': 1 },
          'B': { 'v': 3, 'idx': 3 },
          'G': { 'v': 2, 'idx': 2 },
          'D': { 'v': 0 },
          'A': { 'v': null },
          'E': { 'v': null },
        };

      case 'E':
        return {
          'e': { 'v': 0 },
          'B': { 'v': 0 },
          'G': { 'v': 1, 'idx': 1 },
          'D': { 'v': 2, 'idx': 3 },
          'A': { 'v': 2, 'idx': 2 },
          'E': { 'v': 0 },
        };

      case 'Em':
        return {
          'e': { 'v': 0 },
          'B': { 'v': 0 },
          'G': { 'v': 0 },
          'D': { 'v': 2, 'idx': 3 },
          'A': { 'v': 2, idx: 2 },
          'E': { 'v': 0 },
        };

      case 'F':
        return {
          'e': { 'v': 1, 'idx': 1 },
          'B': { 'v': 1, 'idx': 1 },
          'G': { 'v': 2, 'idx': 2 },
          'D': { 'v': 3, 'idx': 4 },
          'A': { 'v': 3, idx: 3 },
          'E': { 'v': 1, 'idx': 1 },
        };

      case 'G':
        return {
          'e': { 'v': 3, 'idx': 4 },
          'B': { 'v': 3, 'idx': 3 },
          'G': { 'v': 0 },
          'D': { 'v': 0 },
          'A': { 'v': 2, 'idx': 1 },
          'E': { 'v': 3, 'idx': 2 },
        };
 
      case 'Open':
        return {
          'e': { 'v': 0 },
          'B': { 'v': 0 },
          'G': { 'v': 0 },
          'D': { 'v': 0 },
          'A': { 'v': 0 },
          'E': { 'v': 0 }
        };

    }

    // mute string if unknown chord
    return {
      'e': { 'v': null },
      'B': { 'v': null },
      'G': { 'v': null },
      'D': { 'v': null },
      'A': { 'v': null },
      'E': { 'v': null }
    };

  }

  setup() {

    let startX = this.startPointX;
    let startY = this.startPointY + this.height;
    let centerY = this.startPointY + this.height * 0.5;
    let heightPerString = Math.floor( this.height / 6 );
    let strokeW = 2;

    let guitarH = this.startPointY + (this.height/6);

    let frets = [];
    let guitarW = this.width;

    for(let i=0; i<this.fretLength; i++) {
      let fretWidth = Math.ceil( guitarW / this.fretLength ) + 10;
      frets.push(fretWidth);
      guitarW -= fretWidth - 15;
    }

    strokeWeight(3);
    stroke(214, 216, 210);
    let count = 1;
    let fretLen = this.fretLength;

    this.frets = [];
    this.fretPoints = [];
    
    frets.forEach( (width) => {
      this.frets.push(
        { 'x1': startX, 'y1': startY + 2, 'x2': startX, 'y2': guitarH - 4 }
      )

      if(count <= 9 && count%2 == 1) {
        this.fretPoints.push(
          { 'x': startX + (width * 0.5), 'y': centerY + (heightPerString * 0.5) }
        )
      }

      if(count == 12) {
        this.fretPoints.push(
          { 'x': startX + (width * 0.5), 'y': centerY - (heightPerString * 1.50) }
        )
        this.fretPoints.push(
          { 'x': startX + (width * 0.5), 'y': centerY + (heightPerString * 2.50) }
        )
      }

      if(count > 14 && count%2 == 1 && count < fretLen) {
        this.fretPoints.push(
          { 'x': startX + (width * 0.5), 'y': centerY + (heightPerString * 0.5) }
        )
      }

      count++;
      startX += width;
    });

    // draw strings

    guitarW = startX;

    startX = this.startPointX;
    for(let _string in this.stringIndex) {
      this.stringIndex[_string].data = {
        'x1': startX,
        'y1': startY,
        'x2': guitarW,
        'y2': startY,
      };
      startY -= heightPerString;
    }

  }

  show() {

    this.setup();
    
    stroke(206, 206, 206);
    
    this.frets.forEach( (fret, i) => {
      let x = 0;
      if( this.fretLength > (i+1) ) {
        x = (fret.x1 + this.frets[i+1].x1) * 0.5;
      } else {
        x = fret.x1 + (fret.x1 - this.frets[i-1].x1) * 0.5;
      }

      stroke(255, 208, 97);
      line(fret.x1, fret.y1, fret.x2, fret.y2);
      textSize(20);
      fill(255);
      noStroke();
      text( (i+1).toString() , x, fret.y2 - 15);

    });

    this.fretPoints.forEach( (pt) => {
      stroke(255, 208, 97);
      ellipse( pt.x, pt.y, 6, 6);
    });

    let strokeW = 1;
    for(let _string in this.stringIndex) {
      let data = this.stringIndex[_string].data;
      let label = this.stringIndex[_string].label;
      stroke(255, 0, 0);

      if( (this.currentChord.hits && 
        this.currentChord.hits[_string].v != null) 
        || this.tab.string == _string 
      ) {

        stroke(0, 255, 0);

      }

      strokeWeight(strokeW++);
      line(data.x1, data.y1, data.x2, data.y2);

      textSize(20);
      fill(255);
      noStroke();
      text( label , data.x1 - 15, data.y1 - 2);
    }

    for(let k in this.currentChord.data) {
      let pos = this.currentChord.data[k];
      this.setFretPoint( pos, 15 );

      textSize(18);
      fill(255);
      noStroke();
      text( pos.index , pos.x, pos.y - 2);
    }

    if(this.tab.data.x > 0 && this.tab.data.y > 0 )
      this.setFretPoint(this.tab.data);

  }

  setChord(chord) {
    let c = this.getChord(chord);

    this.currentChord.value = chord;
    this.currentChord.data = [];
    this.currentChord.hits = c;

    for(let _string in c) {
      if(c[_string].v != null && c[_string].v != 0) {
        
        let fret = this.frets[c[_string].v];
        let prevFret = this.frets[c[_string].v - 1];

        this.currentChord.data.push(
          { 
            'x': fret.x1 - ((fret.x1 - prevFret.x1) * 0.5), 
            'y': this.stringIndex[_string].data.y1,
            'index': c[_string].idx,
          }
        );

      }
    }

  }

  setFretPoint( pos, diameter = 6 ) {
    fill(0, 0, 250);
    stroke(0, 0, 250);
    ellipse( pos.x, pos.y, diameter, diameter);
  }

  setTab( fretNumber, stringIndex ) {
    if(!this.stringIndex[stringIndex]) return;

    let fret = this.frets[fretNumber];
    let prevFret = this.frets[fretNumber - 1];

    this.currentChord.value = "";
    this.currentChord.data = [];
    // this.currentChord.hits = c;

    this.tab = { 
      'fret': fretNumber,
      'string': stringIndex,
      data: {
        'x': fret.x1 - ((fret.x1 - prevFret.x1) * 0.5), 
        'y': this.stringIndex[stringIndex].data.y1
      }
    };
    
  }

  update() {
    // this.startPointX += 1;
  }

}