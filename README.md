<h2>Запуск</h2>
<h3>Запуск бэкенда в режиме разработчика</h3>
<ol>
<li>Перейти в директорию <code>back</code></li>
<li>Выполнить <code>npm install</code></li>
<li>Выполнить <code>npm run dev</code></li>
</ol>


<h3>Запуск бэкенда в режиме разработчика</h3>
<ol>
<li>Перейти в директорию <code>front</code></li>
<li>Выполнить <code>npm install</code></li>
<li>Выполнить <code>npm start</code></li>
</ol>

<h3>Подключение базы данных</h3>
По умолчанию приложение будет хранить данные в процессе. Чтобы подключить базу данных, необходимо:
<ol>
<li>Перейти в директорию <code>back</code></li>
<li>Заполнить параметры для подключения к БД в <code>.env</code> (переменная <code>DATABASE_URL</code>)</li>
<li>Выполнить <code>npx prisma migrate dev</code></li>
<li>В файле <code>src/config.ts</code> поменять значение переменной <code>storageType</code> с <code>localstorage</code> на <code>db</code></li>
</ol>
