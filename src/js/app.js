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

const gameArea = document.querySelector('.game-area');
const cells = gameArea.querySelectorAll('div');

// Функция для перемещения гоблина в рандомную позицию
function moveGoblin() {
  // Удаляем гоблина у всех ячеек
  cells.forEach(cell => cell.classList.remove('goblin'));

  // Рандомная позиция
  const randomIndex = Math.floor(Math.random() * cells.length);
  const targetArea = cells[randomIndex];
  
  // Вставляем гоблина в ячейку
  targetArea.classList.add('goblin');
}

setInterval(moveGoblin, 2000);
moveGoblin()