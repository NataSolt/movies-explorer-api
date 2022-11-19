# movies-explorer-api

## О проекте:

Данный проект является дипломной работой на курсе веб-разработчик Яндекс.Практикума.

## Используемые технологии:

* ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
* ![MongoDB](https://img.shields.io/badge/-MongoDB-56a14b?logo=mongodb&logoColor=white)
* ![Node](https://img.shields.io/badge/-Node.js-469837?logo=Node.js&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/-JavaScript-f3de35?logo=javaScript&logoColor=black)
* ![API](https://img.shields.io/badge/-api-yellow)

## Функциональность:
* Регистрация
* Авторизация
* Обновление данных пользователя
* Получение информации о текущем пользователе
* Получение списка фильмов
* Удаление фильма
* Создание фильма
* Валидация входящих данных
* Обработка ошибок

## Директории:

`/routes` — папка с файлами роутера  

`/controllers` — папка с файлами контроллеров пользователя и карточки  

`/models` — папка с файлами описания схем пользователя и карточки  

`/errors` — папка с кастомными ошибками  

`/utils` — папка с константами и файлом конфига  

`/middlewares` — папка с мидлварами:
* аутентификация
* центральный обработчик ошибок
* логгер
* валидация

## Запуск проекта:

Для запуска на локальной машине необходимо:</br>
1. Установить npm зависимости:</br>
```sh
npm install
```
2. Запустить MongoDB:
```sh
npm run mongod
```
3. Запустить в режиме разработки:</br>
```sh
npm run start — запускает сервер
npm run dev — запускает сервер с hot-reload
```

Запросы к API осуществляются по адресу: https://api.poiskkino.nomoredomains.sbs

Публичный IP адрес: 85.252.130.241
