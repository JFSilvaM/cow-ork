# cow-ork

## Instalación

Instalar las dependencias:

```bash
npm install
```

Inicializar la base de datos:

```bash
npm run migrate
```

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
<strong>POST</strong>   <em>/api/login</em>
<strong>POST</strong>   <em>/api/register</em>
<strong>GET</strong>    <em>/api/users/activate/:activation_code</em>
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

<strong>GET</strong>    <em>/api/categories</em>
<strong>POST</strong>   <em>/api/categories</em>
<strong>PUT</strong>    <em>/api/categories/:id</em>
<strong>DELETE</strong> <em>/api/categories/:id</em>

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
