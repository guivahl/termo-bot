# termo-bot

O projeto tem como idea principal a automação do jogo [Termo](https://term.ooo/).

O foco principal foi o estudo e implementação das tecnologias utilizadas, visando o aprendizado das mesmas em um cenário real.

### Tecnologias
- [Node.JS](https://nodejs.org/en/) = 17.4.0 version
    - [Puppeteer](https://pptr.dev/)
- [Yarn](https://yarnpkg.com/) >= 1.22.5 version
- [Postgres](https://yarnpkg.com/) >= 13 version

- [Twitter API](https://developer.twitter.com/en)
### Configuração

- É necessário a criação de um banco de dados Postgres
- Duplique o arquivo `.env.example` e renomeie o arquivo para `.env`

```
# Descrição variáveis de ambiente

# URL para conexão ao banco de dados. Exemplo: postgresql://user:password@localhost:5432/database
DATABASE_CONNECTION=

# Credenciais para utilização da API do Twitter.
TWITTER_APP_KEY=
TWITTER_APP_SECRET=
TWITTER_APP_ACCESS_TOKEN=
TWITTER_APP_ACCESS_SECRET=

```

### Execução

- Instale os pacotes necessários com o comando `yarn`
- Execute `yarn start`