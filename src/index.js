const http = require('node:http');
const getUsers = require('./modules/users');
require('dotenv').config();

// Устанавливаем порт: берём из .env или используем значение по умолчанию
const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  // Обработка favicon
  if (request.url === '/favicon.ico') {
    response.statusCode = 204;
    response.end();
    return;
  }

  // Создаём URL-объект
  const url = new URL(request.url, `http://127.0.0.1:${PORT}`);
  const params = url.searchParams;

  // Проверяем параметр ?users
  if (params.has('users')) {
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.setHeader('Content-Type', 'application/json');
    response.write(getUsers());
    response.end();
    return;
  }

  // Проверяем параметр ?hello
  if (params.has('hello')) {
    const name = params.get('hello');

    if (name) {
      // ?hello=<name> — возвращаем приветствие
      response.statusCode = 200;
      response.statusMessage = 'OK';
      response.setHeader('Content-Type', 'text/plain');
      response.write(`Hello, ${name}.`);
    } else {
      // ?hello без имени — ошибка 400
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
      response.setHeader('Content-Type', 'text/plain');
      response.write('Enter a name');
    }
    response.end();
    return;
  }

  // Если есть какие‑то другие параметры — ошибка 500
  if (params.keys().next().value) {
    response.statusCode = 500;
    response.statusMessage = 'Error';
    response.end(); // Пустой ответ
    return;
  }

  // Если нет параметров — приветствие по умолчанию
  response.statusCode = 200;
  response.statusMessage = 'OK';
  response.setHeader('Content-Type', 'text/plain');
  response.write('Hello, World!');
  response.end();
});

server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${PORT}`);
});