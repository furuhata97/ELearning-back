<h1 align="center">
    <img alt="E-Learning API" src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F00ecd336-c672-436b-a871-017e19843232%2FelearningBkg.png?table=block&id=7ee841a8-5566-410f-909e-ffcb94ae9dd8&width=3840&userId=&cache=v2" />
    <br>
    E-Learning API Node
</h1>

<h4 align="center">
  A NodeJS API that allows users to register and authenticate, in addition to allowing users to register, update and list courses and classes
</h4>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

## :rocket: Technologies

This project was developed as bonus app received after completing [RocketSeat GoStack Bootcamp](https://rocketseat.com.br/bootcamp) with the following technologies:

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Docker](https://www.docker.com/docker-community)
- [Multer](https://github.com/expressjs/multer)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [Celebrate](https://github.com/arb/celebrate)
- [class-transformer](https://github.com/typestack/class-transformer)
- [cookie-parser](https://github.com/expressjs/cookie-parser)
- [cors](https://expressjs.com/en/resources/middleware/cors.html)
- [csurf](https://github.com/expressjs/csurf)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [ioredis](https://github.com/luin/ioredis)
- [Node Redis](https://redis.js.org/)
- [node-postgres](https://node-postgres.com/)
- [node-rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible)
- [TSyringe](https://github.com/microsoft/tsyringe)
- [uuid](https://github.com/uuidjs/uuid)
- [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v12.16][nodejs] or higher + [Yarn v1.22][yarn] or higher installed on your computer. Assure to create the postgres and redis containers with Docker. Also create the .env and ormconfig.json files.

Creating docker container for redis and postgres (be sure to have Docker installed)

```bash
# Create postgres container
$ docker run --name your_container_name -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres

# Create redis container
$ docker run --name your_redis_container_name -p 6379:6379 -d -t redis:alpine
```

Executing API from command line:

```bash
# Clone this repository
$ git clone https://github.com/furuhata97/ELearning-back

# Go into the repository
$ cd ELearning-back

# Install dependencies
$ yarn install

# Run migrations
$ yarn typeorm migration:run

# Run the server
$ yarn dev:server
```

## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/furuhata97/ELearning-back/blob/main/LICENSE) for more information.

---

Made by Gustavo Furuhata :wave: [Get in touch!](https://www.linkedin.com/in/gustavo-furuhata/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
