// TODO: write code here

// // comment this to pass build
// const unusedVariable = "variable";

// // for demonstration purpose only
// export default function demo(value) {
//   return `Demo: ${value}`;
// }

// console.log("app.js included");

//Гоблин будет считаться отдельным элементом, необходимо удалить в index.html 1 div
// const gameArea = document.querySelector('.game-area');
// const goblin = document.createElement('div');
// goblin.className = 'goblin';

// // Добавляем гоблина на игровое поле
// gameArea.appendChild(goblin);

// function moveGoblin() {
//   const coorХ = Math.floor(Math.random() * 4);
//   const coorУ = Math.floor(Math.random() * 4);
//   goblin.style.gridColumn = coorХ + 1;
//   goblin.style.gridRow = coorУ + 1;
// }

// setInterval(moveGoblin, 2000);

// moveGoblin();

// const gameArea = document.querySelector('.game-area');
// const cells = gameArea.querySelectorAll('div');

// // Функция для перемещения гоблина в рандомную позицию
// function moveGoblin() {
//   // Удаляем гоблина у всех ячеек
//   cells.forEach(cell => cell.classList.remove('goblin'));

//   // Рандомная позиция
//   const randomIndex = Math.floor(Math.random() * cells.length);
//   const targetArea = cells[randomIndex];
  
//   // Вставляем гоблина в ячейку
//   targetArea.classList.add('goblin');
// }

// setInterval(moveGoblin, 2000);
// moveGoblin()

//class GameBoard {

//}

export function initGame() {
  const game = new GameController();
  game.startGame();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initGame);
}


class GoblinPosition {
  constructor(gameAreaSelector = '.game-area') {
    this.gameArea = document.querySelector(gameAreaSelector);
    //this.cells = this.gameArea.querySelectorAll('div');
    this.cells = [];
    this.currentPosition = null;
    this.drawBoard();
  }

  drawBoard() {
    this.gameArea.innerHTML = '';
    this.cells = [];

    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.cells.push(cell);
      this.gameArea.appendChild(cell);
    }
  }

  getRandomPosition() {
    return Math.floor(Math.random() * this.cells.length);
  }

  moveGoblin() {
    // Удаляем гоблина
    if (this.currentPosition !== null) {
      this.cells[this.currentPosition].classList.remove('goblin');
    }
    
    // Рандомная позиция
    this.currentPosition = this.getRandomPosition();
      
    // Вставляем гоблина в ячейку
    this.cells[this.currentPosition].classList.add('goblin');
  }

  removeGoblin() {
    if (this.currentPosition !== null) {
      this.cells[this.currentPosition].classList.remove('goblin');
      this.currentPosition = null;
    }
  }

  isGoblinInCell(cellIndex) {
    return this.currentPosition === cellIndex;
  }
}

class GameController {
  constructor() {
    this.goblin = new GoblinPosition();
    this.score = 0;
    this.clickMisses = 0;    // клик мимо
    this.timeMisses = 0;     // не успел
    this.maxTotalMisses = 5; // максимум промахов
    this.intervalId = null;
    this.gameActive = false;
    this.initializeGame();
  }

  initializeGame() {
    this.addClickHandler();
    this.updateStats();
  }

  startGame() {
    this.gameActive = true;
    this.score = 0;
    this.clickMisses = 0;
    this.timeMisses = 0;
    this.updateStats();
    this.goblin.moveGoblin();
    this.intervalId = setInterval(() => {
      if (this.goblin.currentPosition !== null) {
        this.timeMisses++;
        this.updateStats();
        if (this.getTotalMisses() >= this.maxTotalMisses) {
          this.endGame();
          return;
        }
      }
      this.goblin.moveGoblin();
    }, 1000);
  }

  addClickHandler() {
    this.goblin.gameArea.addEventListener('click', (e) => {
      if (!this.gameActive) return;
      const clickedCell = Array.from(this.goblin.cells).indexOf(e.target);
      if (this.goblin.isGoblinInCell(clickedCell)) {
        this.score++;
        this.updateStats();
        this.goblin.removeGoblin();
      } else {
        this.clickMisses++;
        this.updateStats();
        if (this.getTotalMisses() >= this.maxTotalMisses) {
          this.endGame();
        }
      }
    });
  }

  updateStats() {
    const scoreElement = document.querySelector('.Score');
    const missesElement = document.querySelector('.Miss');
    if (scoreElement) {
      scoreElement.textContent = `Счет: ${this.score}`;
    }
    if (missesElement) {
      missesElement.textContent = `Промахи: ${this.getTotalMisses()}/${this.maxTotalMisses} (клики: ${this.clickMisses}, время: ${this.timeMisses})`;
    }
  }

  getTotalMisses() {
    return this.clickMisses + this.timeMisses;
  }

  endGame() {
    this.gameActive = false;
    clearInterval(this.intervalId);
    this.goblin.removeGoblin();
    alert(`Игра окончена!\nНечисти уничтожено: ${this.score}\nСбежало гоблинов: ${this.getTotalMisses()}`);
  }
}

// const game = new GameController();
// game.startGame();
document.addEventListener('DOMContentLoaded', () => {
  const game = new GameController();
  game.startGame();
});