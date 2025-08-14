# To-Do List

Uma aplicação web completa e dinâmica para gestão de tarefas, construída com um front-end interativo em JavaScript puro e um back-end robusto com Node.js, Express e MySQL.

## ✒️ Sobre o Projeto

Este projeto é uma lista de tarefas (To-Do List) que vai além do básico. Ele permite que os utilizadores criem, visualizem, editem e apaguem tarefas, que são armazenadas de forma persistente num banco de dados MySQL. A interface foi desenvolvida para ser limpa e intuitiva, comunicando-se com uma API RESTful para manipular os dados.

O principal objetivo foi construir uma aplicação full stack funcional, demonstrando a integração entre um front-end dinâmico e um back-end com persistência de dados.

## ✨ Funcionalidades

  * **Criar Tarefas Detalhadas:** Adicione tarefas com título, descrição, status, prioridade e data de entrega.
  * **Visualização Completa:** Veja todas as tarefas numa lista organizada que exibe todos os detalhes importantes.
  * **Edição Intuitiva:** Modifique qualquer campo de uma tarefa existente de forma simples e rápida.
  * **Remoção de Tarefas:** Apague tarefas que já não são necessárias.
  * **Persistência de Dados:** Todas as tarefas são guardadas num banco de dados MySQL, garantindo que a informação não se perde.
  * **API RESTful:** O back-end expõe endpoints claros e bem definidos para todas as operações CRUD (Create, Read, Update, Delete).

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

#### **Front-End**

  * HTML5
  * CSS3
  * JavaScript (Vanilla JS)
  * Fetch API para requisições assíncronas

#### **Back-End**

  * [Node.js](https://nodejs.org/)
  * [Express.js](https://expressjs.com/pt-br/)
  * [CORS](https://www.npmjs.com/package/cors)

#### **Banco de Dados**

  * MySQL
  * Driver [mysql2](https://www.npmjs.com/package/mysql2) para Node.js

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para ter o projeto a correr localmente.

### **Pré-requisitos**

Antes de começar, certifique-se de que tem as seguintes ferramentas instaladas:

  * [Node.js](https://nodejs.org/) (que inclui o npm)
  * Um servidor de banco de dados [MySQL](https://www.mysql.com/)

### **Instalação**

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2.  **Configure o Back-End:**

      * Navegue para a pasta raiz do projeto no seu terminal.
      * Instale as dependências do Node.js:
        ```bash
        npm install
        ```
      * Crie o seu banco de dados no MySQL.
      * Execute o script `db.sql` para criar a tabela `tarefas`.
      * Abra o ficheiro `server.js` e configure a sua ligação com o banco de dados, alterando os campos `user`, `password` e `database`:
        ```javascript
        const connection = mysql.createPool({
            host: 'localhost',
            user: 'seu_usuario_mysql',
            password: 'sua_senha_mysql',
            database: 'seu_banco_de_dados'
        }).promise();
        ```
      * Inicie o servidor do back-end:
        ```bash
        node server.js
        ```
      * O terminal deverá exibir a mensagem: `Servidor CONECTADO AO BANCO DE DADOS rodando na porta 3000`.

3.  **Inicie o Front-End:**

      * Abra o ficheiro `public/index.html` no seu navegador.
      * (Recomendado) Utilize uma extensão como o "Live Server" no VS Code para iniciar o front-end.

Pronto\! A aplicação deve estar totalmente funcional.

-----
