Game-wheel — сервис для выбора случайны игры из стима. 

Бэкенд часть приложения находится на https://github.com/OneBrov/game-wheel-backend, использует SteamSpy API, SteamAPI, а также HLTB, для получения информации о играх.
Эта информация хранится в PostgreSQL БД, при запросе с фронтенда, производятся запросы к БД, с помощью typeORM. 
Бэкенд реализован с помощью Nestjs, postgreSQL, typeORM.

Фронтенд часть использует React + TS + MUI. Для роутинга в приложении используется React Router v6, а для хранения состоянии 'колеса' с играми используется Redux Toolkit.

Пример работы приложения можно увидеть на https://onebrov.github.io/game-wheel-frontend/
