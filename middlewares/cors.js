// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://api.stremaus.nomoredomains.xyz',
  'http://api.stremaus.nomoredomains.xyz',
  'https://stremaus.nomoredomains.xyz',
  'http://stremaus.nomoredomains.xyz',
  'http://localhost:3000',
  'http://localhost:3001',
];

module.exports = (req, res, next) => {
  // Сохраняем источник запроса в переменную origin
  const { origin } = req.headers;
  // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const { method } = req;
  // Сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // Проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};
