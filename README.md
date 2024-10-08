---

# BentoTwitter - Simples API de Rede Social

Projeto desenvolvido como estudo para a escola Bento Quirino de Campinas. Esta é uma API de rede social onde os usuários podem criar contas, fazer publicações, curtir e comentar em postagens.

## Instalação e Configuração

### Requisitos

- Node.js (v16 ou superior)
- npm (v7 ou superior)
- SQLite3

### Passo a passo de instalação

1. **Clonar o repositório**:
   ```bash
   cd Rede_Social_Y
   ```

2. **Instalar as dependências**:
   ```bash
   npm install
   ```

3. **Configurar as variáveis de ambiente**:
   - Copie o arquivo `.env.example` e renomeie para `.env`. 
   - Configure a variável de ambiente `DATABASE_URL` para apontar para o banco de dados SQLite.

4. **Sincronizar o banco de dados**:
   - Execute o comando para sincronizar as tabelas no banco de dados:
     ```bash
     npm run dev
     ```

5. **Rodar a aplicação**:
   ```bash
   npm start
   ```

A API estará rodando em `http://localhost:3000`.

---

## Endpoints da API

### 1. **Usuários**

### Criação de Usuário

- **URL**: `/usuarios`
- **Método**: `POST`
- **Corpo da Requisição**:

  ```json
  {
    "nome": "string",
    "email": "string",
    "senha": "string",
    "nascimento": "YYYY-MM-DD",
    "nick": "string"
  }
  ```

- **Respostas Esperadas**:

  - **201 Created** (sucesso na criação do usuário):
    ```json
    {
      "id": "string",
      "nome": "string",
      "email": "string",
      "nick": "string",
      "imagem": "string",
      "nascimento": "YYYY-MM-DD"
    }
    ```
  - **400 Bad Request** (caso algum campo obrigatório esteja ausente, ou caso o e-mail/nick já esteja em uso, ou a idade seja menor que 16 anos):

    ```json
    {
      "erro": "Todos os campos são obrigatórios"
    }
    ```

    Ou

    ```json
    {
      "erro": "A idade deve ser maior que 16 anos"
    }
    ```

    Ou

    ```json
    {
      "erro": "Email já está em uso"
    }
    ```

    Ou

    ```json
    {
      "erro": "Nick já está em uso"
    }
    ```

  - **500 Internal Server Error** (caso haja um erro ao criar o usuário):
    ```json
    {
      "erro": "Erro ao criar usuário"
    }
    ```

---

### Listagem de Usuários

- **URL**: `/usuarios`
- **Método**: `GET`
- **Parâmetros de Query** (opcionais):

  - `search`: Filtro de pesquisa por nome ou nick (busca parcial).

- **Exemplo de Requisição**:

  - `GET /usuarios?search=joao`

- **Respostas Esperadas**:
  - **200 OK** (retorna a lista de usuários que atendem ao critério de busca ou todos se nenhum critério for informado):
    ```json
    [
      {
        "id": "string",
        "nome": "string",
        "email": "string",
        "nick": "string",
        "imagem": "string",
        "nascimento": "YYYY-MM-DD"
      }
    ]
    ```
  - **500 Internal Server Error** (caso haja um erro na consulta de usuários):
    ```json
    {
      "erro": "Erro ao buscar usuários"
    }
    ```

---

### Detalhes de um Usuário

- **URL**: `/usuarios/:usuario_id`
- **Método**: `GET`
- **Parâmetros**:

  - `usuario_id`: ID do usuário a ser detalhado.

- **Respostas Esperadas**:
  - **200 OK** (detalhes do usuário encontrado):
    ```json
    {
      "nome": "string",
      "email": "string",
      "nick": "string",
      "imagem": "string",
      "nascimento": "YYYY-MM-DD"
    }
    ```
  - **404 Not Found** (caso o usuário não seja encontrado):
    ```json
    {
      "erro": "Usuário não encontrado"
    }
    ```

---

### Atualização de Usuário

- **URL**: `/usuarios/:usuario_id`
- **Método**: `PATCH`
- **Corpo da Requisição** (campos opcionais para atualizar):

  ```json
  {
    "nome": "string",
    "email": "string",
    "nick": "string"
  }
  ```

- **Respostas Esperadas**:

  - **200 OK** (sucesso na atualização do usuário):

    ```json
    {
      "id": "string",
      "nome": "string",
      "email": "string",
      "nick": "string",
      "imagem": "string",
      "nascimento": "YYYY-MM-DD"
    }
    ```

  - **400 Bad Request** (caso nenhum campo seja fornecido para atualização ou caso o e-mail/nick já esteja em uso):

    ```json
    {
      "erro": "Pelo menos um campo deve ser fornecido para atualização"
    }
    ```

    Ou

    ```json
    {
      "erro": "Email já está em uso"
    }
    ```

    Ou

    ```json
    {
      "erro": "Nick já está em uso"
    }
    ```

  - **404 Not Found** (caso o usuário não seja encontrado):

    ```json
    {
      "erro": "Usuário não encontrado"
    }
    ```

  - **500 Internal Server Error** (caso haja um erro ao atualizar o usuário):
    ```json
    {
      "erro": "Erro ao atualizar usuário"
    }
    ```

---

### 2. **Publicações**

### Criação de uma Nova Publicação

- **URL**: `/publicacoes`
- **Método**: `POST`
- **Corpo da Requisição**:

  ```json
  {
    "publicacao": "string",
    "usuario_id": "string"
  }
  ```

- **Regras de Validação**:

  - O campo `publicacao` (conteúdo da publicação) é obrigatório.
  - O campo `usuario_id` (ID do usuário que está criando a publicação) é obrigatório.
  - A publicação só será criada se o `usuario_id` corresponder a um usuário existente no banco de dados.

- **Respostas Esperadas**:

  - **201 Created** (sucesso na criação da publicação):
    ```json
    {
      "publicacao_id": "string"
    }
    ```
  - **400 Bad Request** (caso algum campo obrigatório esteja ausente ou o usuário não seja encontrado):

    ```json
    {
      "erro": "Todos os campos são obrigatórios"
    }
    ```

    Ou

    ```json
    {
      "erro": "Usuário não encontrado"
    }
    ```

  - **500 Internal Server Error** (caso haja um erro ao criar a publicação):
    ```json
    {
      "erro": "Erro ao criar publicação"
    }
    ```

---

### Listagem de Publicações

- **URL**: `/publicacoes`
- **Método**: `GET`

- **Descrição**:
  Retorna uma lista de todas as publicações, incluindo informações dos usuários que as criaram.

- **Formato de Resposta**:

  - **200 OK** (sucesso na listagem de publicações):

    ```json
    {
      "data": [
        {
          "publicacao_id": "string",
          "publicacao": "string",
          "usuario_id": "string",
          "nick": "string",
          "imagem": "string",
          "qtd_likes": "number",
          "criado_em": "YYYY-MM-DDTHH:MM:SSZ"
        }
      ],
      "total": "number"
    }
    ```

  - **500 Internal Server Error** (caso haja um erro ao buscar publicações):
    ```json
    {
      "erro": "Erro ao buscar publicações"
    }
    ```

- **Campos Retornados na Listagem**:

  - `publicacao_id`: ID da publicação.
  - `publicacao`: Conteúdo da publicação.
  - `usuario_id`: ID do usuário que criou a publicação.
  - `nick`: Apelido do usuário que criou a publicação.
  - `imagem`: URL da imagem do usuário.
  - `qtd_likes`: Quantidade de "curtidas" recebidas pela publicação.
  - `criado_em`: Data de criação da publicação.

- **Ordenação**: As publicações são retornadas em ordem cronológica, da mais recente para a mais antiga.

---

#### Listar Publicações de um Usuário com Comentários e Curtidas

- **URL**: `/publicacoes/de/:usuario_id`
- **Método**: `GET`
- **Parâmetros da URL**:

  - `usuario_id` (obrigatório): ID do usuário cujas publicações serão listadas.

- **Resposta Esperada**:
  - **200 OK**:
    ```json
    {
      "data": [
        {
          "publicacao_id": "string",
          "publicacao": "string",
          "usuario_id": "string",
          "nick": "string",
          "imagem": "string",
          "qtd_likes": "number",
          "qtd_comentarios": "number",
          "criado_em": "date"
        }
      ],
      "total": "number"
    }
    ```
  - **404 Not Found**:
    ```json
    {
      "erro": "Usuário não encontrado"
    }
    ```

---

#### Obter Publicação e Comentários

- **URL**: `/publicacoes/:publicacao_id`
- **Método**: `GET`
- **Parâmetros da URL**:

  - `publicacao_id` (obrigatório): ID da publicação que se deseja obter os detalhes.

- **Resposta Esperada**:
  - **200 OK**:
    ```json
    {
      "publicacao_id": "string",
      "publicacao": "string",
      "usuario_id": "string",
      "nick": "string",
      "imagem": "string",
      "qtd_likes": "number",
      "criado_em": "date",
      "comentarios": [
        {
          "comentario_id": "string",
          "comentario": "string",
          "usuario_id": "string",
          "nick": "string",
          "imagem": "string",
          "qtd_likes": "number",
          "criado_em": "date"
        }
      ]
    }
    ```
  - **404 Not Found**:
    ```json
    {
      "erro": "Publicação não encontrada"
    }
    ```

---

#### Deletar Publicação e Seus Comentários

- **URL**: `/publicacoes/`
- **Método**: `DELETE`
- **Corpo da Requisição**:

  ```json
  {
    "publicacao_id": "string",
    "usuario_id": "string"
  }
  ```

- **Respostas Esperadas**:
  - **200 OK**:
    ```json
    {
      "mensagem": "Publicação deletada com sucesso"
    }
    ```
  - **400 Bad Request** (caso a publicação ou usuário não sejam encontrados):
    ```json
    {
      "erro": "Publicação não encontrada"
    }
    ```
    Ou
    ```json
    {
      "erro": "Usuário não informado"
    }
    ```
  - **403 Forbidden** (caso o usuário não tenha permissão para deletar a publicação):
    ```json
    {
      "erro": "Usuário não autorizado"
    }
    ```

---

### 3. **Comentários**

### Criação de um Novo Comentário em uma Publicação

- **URL**: `/comentarios`
- **Método**: `POST`
- **Corpo da Requisição**:

  ```json
  {
    "publicacao_id": "string",
    "usuario_id": "string",
    "comentario": "string"
  }
  ```

- **Regras de Validação**:

  - O campo `publicacao_id` (ID da publicação) é obrigatório.
  - O campo `usuario_id` (ID do usuário que está comentando) é obrigatório.
  - O campo `comentario` (conteúdo do comentário) é obrigatório.
  - O comentário só será criado se o `usuario_id` corresponder a um usuário existente e o `publicacao_id` corresponder a uma publicação existente no banco de dados.

- **Respostas Esperadas**:

  - **201 Created** (sucesso na criação do comentário):

    ```json
    {
      "comentario_id": "string"
    }
    ```

  - **400 Bad Request** (caso algum campo obrigatório esteja ausente, o usuário ou a publicação não sejam encontrados):

    ```json
    {
      "erro": "Todos os campos são obrigatórios"
    }
    ```

    Ou

    ```json
    {
      "erro": "Usuário não encontrado"
    }
    ```

    Ou

    ```json
    {
      "erro": "Publicação não encontrada"
    }
    ```

  - **500 Internal Server Error** (caso haja um erro ao criar o comentário):

    ```json
    {
      "erro": "Erro ao criar comentário"
    }
    ```

    ***

### Listagem de Comentários de uma Publicação

- **URL**: `/comentarios`
- **Método**: `GET`
- **Parâmetro de Query**:

  - `publicacao_id`: O ID da publicação cujos comentários serão listados.

- **Regras de Validação**:
  - O parâmetro `publicacao_id` é obrigatório.
- **Formato de Resposta**:

  - **200 OK** (sucesso na listagem de comentários):

    ```json
    {
      "data": [
        {
          "comentario_id": "string",
          "comentario": "string",
          "usuario_id": "string",
          "nick": "string",
          "imagem": "string",
          "criado_em": "YYYY-MM-DDTHH:MM:SSZ"
        }
      ],
      "total": "number"
    }
    ```

  - **400 Bad Request** (caso `publicacao_id` não seja informado):

    ```json
    {
      "erro": "Publicação não informada"
    }
    ```

  - **500 Internal Server Error** (caso haja um erro ao buscar os comentários):
    ```json
    {
      "erro": "Erro ao buscar comentários"
    }
    ```

### Detalhes Adicionais:

- **Campos Retornados na Listagem**:

  - `comentario_id`: ID do comentário.
  - `comentario`: Conteúdo do comentário.
  - `usuario_id`: ID do usuário que fez o comentário.
  - `nick`: Apelido do usuário.
  - `imagem`: URL da imagem do usuário.
  - `criado_em`: Data de criação do comentário.

- **Ordenação**: Os comentários são retornados em ordem cronológica, da mais antiga para a mais recente.

---

#### Deletar Comentário

- **URL**: `/comentarios/`
- **Método**: `DELETE`
- **Corpo da Requisição**:

  ```json
  {
    "comentario_id": "string",
    "usuario_id": "string"
  }
  ```

- **Respostas Esperadas**:

  - **204 No Content** (sucesso na exclusão, sem conteúdo no retorno):
    ```http
    (Sem conteúdo)
    ```
  - **400 Bad Request** (caso o usuário ou o comentário não sejam encontrados):
    ```json
    {
      "erro": "Usuário não encontrado"
    }
    ```
    Ou
    ```json
    {
      "erro": "Comentário não encontrado"
    }
    ```
  - **403 Forbidden** (caso o usuário não tenha permissão para deletar o comentário):

    ```json
    {
      "erro": "Usuário não autorizado"
    }
    ```

    ***

### 4. **Curtidas**

#### Adicionar Curtida a uma Publicação

- **URL**: `/curtidas/publicacao`
- **Método**: `POST`
- **Corpo da Requisição**:

  ```json
  {
    "publicacao_id": "string"
  }
  ```

- **Respostas Esperadas**:
  - **200 OK** (sucesso ao adicionar a curtida):
    ```json
    {
      "qtd_likes": "number"
    }
    ```
  - **400 Bad Request** (caso o `publicacao_id` não seja informado ou a publicação não seja encontrada):
    ```json
    {
      "erro": "Todos os campos são obrigatórios"
    }
    ```
    Ou
    ```json
    {
      "erro": "Publicação não encontrada"
    }
    ```

---

#### Remover Curtida de uma Publicação

- **URL**: `/curtidas/publicacao`
- **Método**: `DELETE`
- **Corpo da Requisição**:

  ```json
  {
    "publicacao_id": "string"
  }
  ```

- **Respostas Esperadas**:

  - **200 OK** (sucesso ao remover a curtida):
    ```json
    {
      "qtd_likes": "number"
    }
    ```
  - **400 Bad Request** (caso o `publicacao_id` não seja informado ou a publicação não seja encontrada):

    ```json
    {
      "erro": "Todos os campos são obrigatórios"
    }
    ```

    Ou

    ```json
    {
      "erro": "Publicação não encontrada"
    }
    ```

    ***

#### Adicionar Curtida a um Comentário

- **URL**: `/curtidas/comentario`
- **Método**: `POST`
- **Corpo da Requisição**:

  ```json
  {
    "comentario_id": "string"
  }
  ```

- **Respostas Esperadas**:
  - **200 OK** (sucesso ao adicionar a curtida):
    ```json
    {
      "qtd_likes": "number"
    }
    ```
  - **400 Bad Request** (caso o `comentario_id` não seja informado ou o comentário não seja encontrado):
    ```json
    {
      "erro": "Todos os campos são obrigatórios"
    }
    ```
    Ou
    ```json
    {
      "erro": "Comentário não encontrado"
    }
    ```

---

#### Remover Curtida de um Comentário

- **URL**: `/curtidas/comentario`
- **Método**: `DELETE`
- **Corpo da Requisição**:

  ```json
  {
    "comentario_id": "string"
  }
  ```

- **Respostas Esperadas**:
  - **200 OK** (sucesso ao remover a curtida):
    ```json
    {
      "qtd_likes": "number"
    }
    ```
  - **400 Bad Request** (caso o `comentario_id` não seja informado ou o comentário não seja encontrado):
    ```json
    {
      "erro": "Todos os campos são obrigatórios"
    }
    ```
    Ou
    ```json
    {
      "erro": "Comentário não encontrado"
    }
    ```

---

### 5. **Seguidores**

#### Seguir um Usuário

- **URL**: `/seguidores`
- **Método**: `POST`
- **Corpo da Requisição**:

  ```json
  {
    "usuario_id": "string",
    "usuario_a_seguir_id": "string"
  }
  ```

- **Respostas Esperadas**:
  - **201 Created** (sucesso ao seguir o usuário):
    ```json
    {
      "seguidor_id": "string"
    }
    ```
  - **400 Bad Request** (caso algum campo obrigatório esteja ausente, o usuário a ser seguido não seja encontrado ou já esteja sendo seguido):
    ```json
    {
      "erro": "Todos os campos são obrigatórios"
    }
    ```
    Ou
    ```json
    {
      "erro": "Você já segue este usuário"
    }
    ```
    Ou
    ```json
    {
      "erro": "Você não pode seguir a si mesmo"
    }
    ```
    Ou
    ```json
    {
      "erro": "Usuário a ser seguido não encontrado"
    }
    ```

---

#### Deixar de Seguir um Usuário

- **URL**: `/seguidores`
- **Método**: `DELETE`
- **Corpo da Requisição**:

  ```json
  {
    "usuario_id": "string",
    "usuario_a_seguir_id": "string"
  }
  ```

- **Respostas Esperadas**:
  - **200 OK** (sucesso ao deixar de seguir o usuário):
    ```json
    {
      "seguidor_id": "string"
    }
    ```
  - **400 Bad Request** (caso algum campo obrigatório esteja ausente, o usuário não esteja sendo seguido ou não exista):
    ```json
    {
      "erro": "Todos os campos são obrigatórios"
    }
    ```
    Ou
    ```json
    {
      "erro": "Você não segue este usuário"
    }
    ```

---

#### Listagem de Seguidores de um Usuário

- **URL**: `/seguidores/:usuario_id`
- **Método**: `GET`
- **Parâmetros**:

  - `usuario_id`: ID do usuário para o qual deseja-se listar os seguidores.
  - **Query Params** (opcionais):
    - `page`: Número da página (padrão: 1).
    - `limit`: Número de registros por página (padrão: 10).

- **Respostas Esperadas**:
  - **200 OK** (retorna uma lista paginada dos seguidores):
    ```json
    {
      "data": [
        {
          "seguidor_id": "string",
          "nome": "string",
          "nick": "string",
          "imagem": "string"
        }
      ],
      "total": "number",
      "currentPage": "number",
      "totalPages": "number"
    }
    ```
  - **500 Internal Server Error** (erro na consulta):
    ```json
    {
      "erro": "Erro ao buscar seguidores"
    }
    ```

---

#### Listagem de Usuários que um Usuário Segue

- **URL**: `/seguidores/seguindo/:usuario_id`
- **Método**: `GET`
- **Parâmetros**:

  - `usuario_id`: ID do usuário para o qual deseja-se listar os usuários seguidos.

- **Respostas Esperadas**:
  - **200 OK** (retorna uma lista dos usuários que o usuário segue):
    ```json
    {
      "data": [
        {
          "usuario_id": "string",
          "nome": "string",
          "nick": "string",
          "imagem": "string"
        }
      ],
      "total": "number"
    }
    ```
  - **500 Internal Server Error** (erro na consulta):
    ```json
    {
      "erro": "Erro ao buscar usuários seguidos"
    }
    ```

---
