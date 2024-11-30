module.exports = {
    testEnvironment: 'jsdom', // Указывает окружение для работы с DOM (например, для работы с `document`)
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest', // Использует Babel для обработки файлов с расширением .js, .jsx, .ts, .tsx
    },
  };