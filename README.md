<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Repositório para a criação de uma API de um board onde pode-se ter tasks e subtasks.
Desenvolvido para a disciplina de Programação Web e Mobile.
- **Regras de negócio**:
    - É possível criar tasks e subtasks;
    - As tasks possuem nome, descrição e tipo obrigatoriamente. Opcionalmente possuem um pai (caso possua, será uma subtask);
    - Subtasks não podem ter subtasks;
    - Não é possível excluir uma task que possui subtasks;
    - Não é possível adicionar um pai (PUT) à uma task que possui subtaks.
##
##
## Exceptions
- **Buscar task types | GET /task-type**
	- 200 Sucesso
##
- **Criar task | POST /task**
	- 201 Sucesso
	- 404 TypeId não existe
	- 404 ParentId não existe
	- 400 O id informado como ParentId possui pai
##
- **Atualizar task | PUT /task/:id**
	- 200 Sucesso
	- 404 TaskId não existe
	- 404 TypeId não existe
	- 404 ParentId não existe
	- 400 ParentId tem pai
	- 400 ParentId é o id da task que está sendo atualizada
	- 400 No body foi enviado um ParentId válido, mas a task que está sendo atualizada possui subtasks
##
- **Excluir task | DELETE /task/:id**
	- 201 Sucesso
	- 404 TaskId não existe
	- 400 A task possui subtasks
##
- **Buscar todas as tasks | GET /task/all**
	- 200 Sucesso
##
- **Buscar tasks pai /task/roots**
	- 200 Sucesso
##
- **Buscar task por Id /task/:id**
	- 200 Sucesso
	- 404 TaskId não existe
##
##
## Installation

```bash
$ npm install
```
##
##
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
##
##
## License

Nest is [MIT licensed](LICENSE).
