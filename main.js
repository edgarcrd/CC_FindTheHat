const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor() {
    this._field = [];
  }

  generateField (width, height, nHoles) {
    //place field
    for (let i = 0; i < height; i++) {
      this._field[i] = [];
      for (let j = 0; j <= width; j++) {
        this._field[i][j] = fieldCharacter;
      }
    }

    //place holes
    for (let h = 0; h < nHoles; h++) {
      let row =  this.generateRandom(height)
      let col =  this.generateRandom(width)
      this._field[row][col] === fieldCharacter ? this._field[row][col] = hole : h--
    }

    //place hat
    this._field[height-1][width] = hat

    //place path Character
    this._field[0][0] = pathCharacter

    console.clear();
    this.print();
    return this._field;
  }

  generateRandom(num) {
    return Math.floor(Math.random() * num);
  }

  print() {
    return this._field.forEach(el => console.log(el.join('')));
  }

  game() {
    let x = 0;
    let y = 0;
    while (this._field[x][y] === fieldCharacter || this._field[x][y] === pathCharacter) {
      const direction = prompt('Which way?');
      if (direction === 'r') {
        if (this._field[x][y + 1] === fieldCharacter) {
          this._field[x][y + 1] = pathCharacter;
          y += 1
          console.clear();
          this.print()
        } else if (this._field[x][y + 1] === hole) {
          console.log('Loser');
          return
        } else if (this._field[x][y + 1] === hat) {
          console.log('YOU WIN!!!');
          return
        }
      } else if (direction === 'd') {
        if (this._field[x + 1][y] === fieldCharacter) {
          this._field[x + 1][y] = pathCharacter;
          x += 1
          console.clear();
          this.print()
        } else if (this._field[x + 1][y] === hole) {
          console.log('Loser');
          return
        } else if (this._field[x + 1][y] === hat) {
          console.log('YOU WIN!!!');
          return
        }
      } else if (direction === 'u') {
        if (this._field[x - 1][y] === fieldCharacter) {
          this._field[x - 1][y] = pathCharacter;
          x -= 1
          console.clear();
          this.print()
        } else if (this._field[x - 1][y] === hole) {
          console.log('Loser');
          return
        } else if (this._field[x - 1][y] === hat) {
          console.log('YOU WIN!!!');
          return
        }
      } else if (direction === 'l') {
        if (this._field[x][y - 1] === fieldCharacter) {
          this._field[x][y - 1] = pathCharacter;
          y -= 1
          console.clear();
          this.print()
        } else if (this._field[x][y - 1] === hole) {
          console.log('Loser');
          return
        } else if (this._field[x][y - 1] === hat) {
          console.log('YOU WIN!!!');
          return
        }
      }
    }
  }

}

  const myField = new Field();
  myField.generateField(10, 10, 10);

  //const myField = Field.generateField(10, 10, 10)

  myField.game();