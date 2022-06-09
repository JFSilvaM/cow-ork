# cow-ork

- [cow-ork](#cow-ork)
  - [Instalación y uso](#instalación-y-uso)
  - [Endpoints](#endpoints)
    - [Accesibles por todos los usuarios](#accesibles-por-todos-los-usuarios)
    - [Accesibles por usuarios anónimos](#accesibles-por-usuarios-anónimos)
    - [Accesibles por usuarios registrados y administradores](#accesibles-por-usuarios-registrados-y-administradores)
    - [Accesibles por administradores](#accesibles-por-administradores)
  - [Autores](#autores)

## Instalación y uso

Instalar las dependencias:

```bash
npm install
```

Copiar el archivo `.env.example` y renombrarlo a `.env`. Probablemente sea necesario modificar el usuario y la contraseña, también se debe crear la base de datos, adicionalmente, será necesaria una cuenta en [Mailjet](https://www.mailjet.com/), y ajustar las variables de entorno según correspondan.

```
HOST=localhost
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=cow_ork
DB_USER=root
DB_PASSWORD=

JWT_SECRET=SecretCowLevel

MAILJET_API_KEY=
MAILJET_API_SECRET=
MAILJET_SENDER_NAME=Admin
MAILJET_SENDER_EMAIL=admin@cow-ork.com
```

Inicializar la base de datos:

```bash
npm run migrate
```

Al ejecutar el comando `npm run migrate`, las migraciones crearán las tablas con información que se utilizó para testear la aplicación, todos los datos han sido generados de forma aleatoria. La lista de usuarios insertada es la siguiente:

|              Correo              | Contraseña |      Rol      |
| :------------------------------: | :--------: | :-----------: |
|        admin@cow-ork.com         |   123456   | Administrador |
|     fhunnisett1@archive.org      |   123456   |    Usuario    |
|     bjefferson2@google.co.jp     |   123456   |    Usuario    |
|        bhearty3@hc360.com        |   123456   |    Usuario    |
| plambertazzi4@huffingtonpost.com |   123456   |    Usuario    |
|        bphette5@narod.ru         |   123456   |    Usuario    |
|         twiper6@fda.gov          |   123456   |    Usuario    |
|      rstrickland7@wired.com      |   123456   |    Usuario    |
| dmarwood8@nationalgeographic.com |   123456   |    Usuario    |
|      athorndale9@nsw.gov.au      |   123456   |    Usuario    |

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Endpoints

### Accesibles por todos los usuarios

<pre>
<strong>GET</strong>    <em>/api/spaces</em>
<strong>GET</strong>    <em>/api/spaces/:id</em>
</pre>

### Accesibles por usuarios anónimos

<pre>
<strong>POST</strong>   <em>/api/auth/login</em>
<strong>POST</strong>   <em>/api/auth/register</em>
<strong>GET</strong>    <em>/api/auth/activate/:activation_code</em>
</pre>

### Accesibles por usuarios registrados y administradores

<pre>
<strong>GET</strong>    <em>/api/users/:id</em>
<strong>PUT</strong>    <em>/api/users/:id</em>

<strong>GET</strong>    <em>/api/reports</em>
<strong>POST</strong>   <em>/api/reports</em>
<strong>GET</strong>    <em>/api/reports/:id</em>
<strong>PUT</strong>    <em>/api/reports/:id</em>
<strong>DELETE</strong> <em>/api/reports/:id</em>

<strong>GET</strong>    <em>/api/bookings</em>
<strong>POST</strong>   <em>/api/bookings</em>
<strong>GET</strong>    <em>/api/bookings/:id</em>
<strong>PUT</strong>    <em>/api/bookings/:id</em>
<strong>DELETE</strong> <em>/api/bookings/:id</em>
</pre>

### Accesibles por administradores

<pre>
<strong>GET</strong>    <em>/api/users</em>
<strong>DELETE</strong> <em>/api/users/:id</em>

<strong>POST</strong>   <em>/api/spaces</em>
<strong>PUT</strong>    <em>/api/spaces/:id</em>
<strong>DELETE</strong> <em>/api/spaces/:id</em>

<strong>GET</strong>    <em>/api/report_categories</em>
<strong>POST</strong>   <em>/api/report_categories</em>
<strong>PUT</strong>    <em>/api/report_categories/:id</em>
<strong>DELETE</strong> <em>/api/report_categories/:id</em>

<strong>GET</strong>    <em>/api/services</em>
<strong>POST</strong>   <em>/api/services</em>
<strong>PUT</strong>    <em>/api/services/:id</em>
<strong>DELETE</strong> <em>/api/services/:id</em>

<strong>GET</strong>    <em>/api/space_types</em>
<strong>POST</strong>   <em>/api/space_types</em>
<strong>PUT</strong>    <em>/api/space_types/:id</em>
<strong>DELETE</strong> <em>/api/space_types/:id</em>
</pre>

## Autores

- **Adrián Rey** ([@arlomba](https://github.com/arlomba))
- **João Silva** ([@JFSilvaM](https://github.com/JFSilvaM))
