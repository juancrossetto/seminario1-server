# Passenger App Server

Repositorio de Servidor para Passenger.
El mismo fue desarrollado en NodeJS con MongoDB Atlas, hosteado en Heroku.
Ademas contiene un proceso batch realizado con Cron que corre cada 6 hs por el tema de notificaciones.

## Despliegue

Para poder levantar el servidor, realice lo siguientes pasos:

### Clonar repositorio

- Clonar este repositorio a tu maquina local, abriendo una consola y ejecutando:
  `git clone https://github.com/juancrossetto/seminario1-server.git`

### Configuración

- En el destino donde se clono el repositorio, abrir una consola con permisos de administrador y ejecutar el siguiente comando:

```bash
npm install
```

- Luego una vez instaladas las dependencias de node, ejecutar el siguiente comando:

```bash
npm run dev
```

La aplicación se ejecutará en el puerto 4000 y estara conectada a una Base de Datos de MongoDB en la Nube.
