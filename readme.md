# Rest API en typescript para mongodb

## Variables de entorno

Algunas variables de entorno (crear fichero .ENV):
  - PORT = `puerto del servidor web`
  - DB_URI = `cadena de conexion con la base de datos`

## Iniciar proyecto

Para iniciar el proyecto necesitamos tener node y mongodb instalado en nustra maquina y ejecutar `npm run dev` para iniciar el proyecto en modo desarrollo, o bien `npm start` para modo produccion.

Para evitar tener que instalar estas herramientas en caso de no tenerlas, ejecutar el docker compose de desarrollo con el comando:
```bash
docker compose -f docker-compose-dev.yml up
```

El comando creara y ejecutara dos contenedores de docker. El primero es para mongodb (base de datos) y el segundo consiste en una imagen del proyecto (la cual ademas permite el hot reload gracias a un volume y la dependencia ts-node-dev del proyecto)

Si no disponemos tampoco de docker, la forma mas sencilla la forma mas sencilla de configurar el entorno es instalar docker desktop:

```bash
sudo apt update
sudo apt install ./docker-desktop-<version>-<arch>.deb
```

Docker desktop [para windows](https://www.docker.com/products/docker-desktop/)

Para ejecutar el servicio abrir docker desktop o bien ejecutar en el caso de Linux:

```bash
systemctl --user start docker-desktop
```

Mas informacion de la instalacion [aqui](https://docs.docker.com/desktop/install/ubuntu/)
