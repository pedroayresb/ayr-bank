# Bem Vindo ao repositório do Projeto NG-Project!

Este projeto foi desenvolvido por [Pedro Ayres](https://www.linkedin.com/in/pedroayresb/). 

## O que foi desenvolvido?

O projeto é um aplicativo de transferência de dinheiro entre dois usuários. Você se cadastra e faz login, tem acesso ao seu histórico de transferências, pode realizar transferências entre dois usuários cadastrados, isso tudo ficando logado na plataforma por 24 horas.

# Sobre o projeto

<details>
  <summary><strong>Sobre o projeto</strong></summary>

O projeto utiliza das tecnologias; JavaScript, TypeScript, Docker, Node.js, Postgres, Sequelize, JWS e React.

  <br />
</details>

<details>
  <summary><strong>Para rodar o projeto</strong></summary>

Com o docker instalado, na pasta inicial do projeto, execute o `docker compose up`. Tenha certeza de que as portas `3050`, `5000` e `5042` estejam disponíveis para execução. 
Para rodar o banco de dados, execute `docker exec -it ng-project-sqlize-api-1 bash`, `cd app` e `USERNAME=postgres PASSWORD=postgres_password HOST=postgres DATABASE=ng-project npm run dev` e a database deve ser iniciada normalmente.

Para rodar o front end, entre no `localhost:3050` depois de iniciar o banco de dados e tudo deve estar rodando corretamente


  <br />
</details>
