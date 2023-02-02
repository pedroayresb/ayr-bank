# AyrBank

O AyrBank é um aplicativo de transferência de dinheiro entre usuários, permitindo que você envie e receba dinheiro de outras pessoas cadastradas na plataforma. Com o AyrBank, você tem acesso ao seu histórico de transferências, pode realizar novas transferências a qualquer momento e ficar logado na plataforma por 24 horas.

## Tecnologias Utilizadas

O AyrBank é desenvolvido usando as seguintes tecnologias:

 - JavaScript
 - TypeScript
 - Docker
 - Node.js
 - PostgreSQL
 - Sequelize
 - JWS
 - React
 - Nginx

## Características
**Cadastro e Login**: É possível se cadastrar na plataforma e fazer login usando suas credenciais.

**Histórico de Transferências**: Você tem acesso ao seu histórico de transferências, permitindo que você visualize todas as transferências realizadas a qualquer momento.

**Transferências entre Usuários**: É possível realizar transferências entre dois usuários cadastrados na plataforma, basta informar o nome da pessoa que você deseja transferir o dinheiro.

**Acesso à Plataforma por 24 horas**: Uma vez logado, você tem acesso à plataforma por 24 horas, sem precisar fazer login novamente.

## Instalação

Para instalar o AyrBank em sua máquina, siga os seguintes passos:

### Execução com o Docker

#### Execute o compose

```bash
docker compose up
```
Certifique-se de que as portas `3000`, `3050`, `5000` e `5432` estejam abertas, elas são as necessarias para a execução com o Docker

Agora, você pode acessar o AyrBank em seu navegador, usando o endereço http://localhost:3050.

