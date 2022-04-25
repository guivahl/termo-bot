# termo-bot

O projeto tem como idea principal a automação do jogo [Termo](https://term.ooo/).

O foco principal foi o estudo e implementação das tecnologias utilizadas, visando o aprendizado das mesmas em um cenário real.

### Tecnologias (versões que utilizei)
- [Node.JS](https://nodejs.org/en/) = 17.4.0 version
    - [Puppeteer](https://pptr.dev/)
- [Docker](https://www.docker.com/) >= 20.10.1 version
- [Yarn](https://yarnpkg.com/) >= 1.22.5 version
- [Postgres](https://yarnpkg.com/) >= 13 version

- [Twitter API](https://developer.twitter.com/en)
### Configuração

- É necessário a criação de um banco de dados Postgres
- Duplique o arquivo `.env.example` e renomeie o arquivo para `.env`

```
# Descrição variáveis de ambiente

# URL para conexão ao banco de dados. Exemplo: postgresql://user:password@localhost:5432/database
DATABASE_CONNECTION= postgresql://postgres:docker@localhost:6666/termo

# Credenciais para utilização da API do Twitter.
TWITTER_APP_KEY=
TWITTER_APP_SECRET=
TWITTER_APP_ACCESS_TOKEN=
TWITTER_APP_ACCESS_SECRET=

```


Antes de executar o programa, é necessário executar os seguintes comandos utilizando Docker:
1. `docker build -t my-postgres-db .`
2. `docker run -d -p 6666:5432 my-postgres-db`

### Execução

- Instale os pacotes necessários com o comando `yarn`
- Execute `yarn start`