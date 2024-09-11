Для проектной работы мы выбрали фреймворк Webpack ModuleFederation, как популярное решение имеющее большое комьюнити.
Проект состоит их хоста и трех микрофронтендов.
  host - Хост
  microfrontend-auth - Микрофронтенд авторизации
  microfrontend-places - Микрофронтенд мест
  microfrontend-profile - Микрофронтенд с профилем пользователя

Сначала необходимо запускать микрофронтенды, потом host, а также backend.
Пример запуска microfrontend-auth (из директории проекта)
  cd frontend
  cd microfrontend-auth
  npm i
  npm run start

Все остальные сервисы (включая backend) запускаются аналогично. Переходим в папку сервиса, устанавливаем зависимости и запускаем с помощью npm run start

Структуры проекта
  /frontend
    /host
      /src
        /blocks          //Стили для компонентов
          /footer
          /header
          /page
        /components
          App.jsx        //Главный компонент host, управляющий маршрутизацией
          Footer.js
          Header.js
          Main.jsx       //Компонент. Контентная часть. Сюда подключаются Profile и Places
        /images
          logo.svg
        /vendor          //Стили общие для приложения
          fonts
          fonts.css
          normailize.css
        index.css        //В этом файле подключаются общие стили и стили используемых компонентов
        index.html       //Стартовый html куда монтируется приложение
        index.js         //Точка входа в приложение
      package.json
      webpack.config.js  //Настройки сборки приложения, в частности ModuleFederationPlugin

    /microfrontend-auth
      /src
        /blocks          //Стили для компонентов
          /auth-form
          /popup
        /components
          AuthListener.js //Компонент для получения/передачи событий host <-> auth
          InfoTooltip.js  //Попап с ошибками при регистрации/авторизации
          Login.js        //Форма авторизации
          Register.js     //Форма регистрации
        /images
          close.svg
          error-icon.svg
          success-icon.svg
        /utils
          auth.js         //Утилиты для аутентификации
      package.json
      webpack.config.js   //Настройки сборки приложения, в частности ModuleFederationPlugin

    /microfrontend-places
      /src
        /blocks           //Стили для компонентов
          /card
          /places
          /popup
        /components
          AddPlacePopup.js //Попап добавления места
          Card.js
          ImagePopup.js    //Попап с фото
          Places.js        //Основной компонент микрофронтенда
          PopupWithForm.js
        /images
          close.svg
          delete-icon.svg
          error-icon.svg
          like-active.svg
          like-inactive.svg
          success-icon.svg
        /utils
          api.js           //Утилиты для работы с местами. Получение, добавление, удаление, лайки.
      package.json
      webpack.config.js    //Настройки сборки приложения, в частности ModuleFederationPlugin

    /microfrontend-profile
      /src
        /blocks            //Стили для компонентов
          /popup
          /profile
        /components
          EditAvatarPopup.js  //Попап изменения аватара
          EditProfilePopup.js //Попап изменения профиля
          PopupWithForm.js
          Profile.js          //Основной компонент микрофронтенда
        /images
          add-icon.svg
          close.svg
          edit-icon.svg
          error-icon.svg
          success-icon.svg
        /utils
          api.js              //Утилиты для работы с профилем
      package.json
      webpack.config.js       //Настройки сборки приложения, в частности ModuleFederationPlugin