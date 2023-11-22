# Sistema de Gerenciamento de Reservas para Faculdade
## Bem-vindo ao Sistema de Gerenciamento de Reservas para Faculdade! Este é um projeto web que oferece funcionalidades para registrar usuários, realizar login, criar reservas, atualizar o status de reservas, obter informações do usuário logado e gerenciar todas as reservas.

# Funcionalidades Principais
## Registro de Usuário (POST /api/user/register)
- Endpoint para registrar um novo usuário.
- Campos necessários: nome de usuário, e-mail, senha e tipo de usuário.
- Verifica se o nome de usuário e o e-mail já existem.
- Realiza validações de dados obrigatórios.
- Gera um hash seguro para a senha antes de armazenar no banco de dados.
- Responde com sucesso após o registro.
## Login de Usuário (POST /api/user/login)
- Endpoint para realizar login.
- Verifica se o usuário existe com base no e-mail.
- Compara a senha fornecida com a senha armazenada no banco de dados.
- Retorna as informações do usuário junto com um token JWT válido.
## Obter Usuário Logado (GET /api/user/current)
- Endpoint para obter as informações do usuário logado atualmente.
- Requer validação do token JWT.
- Obter Todos os Usuários (GET /api/user/all)
- Endpoint para obter informações de todos os usuários.
## Criar Reserva (POST /api/reserve/create)
- Endpoint para criar uma reserva.
- Campos necessários: título, descrição, status e ID do usuário.
- Verifica se o usuário existe antes de criar a reserva.
- Responde com sucesso após a criação da reserva.
## Atualizar Status da Reserva (PUT /api/reserve/update/:reserveId)
- Endpoint para atualizar o status de uma reserva.
- Requer o ID da reserva e o novo status.
- Verifica se a reserva existe antes de realizar a atualização.
- Responde com sucesso após a atualização do status.
## Obter Reservas de um Usuário (GET /api/reserve/user/:userId)
- Endpoint para obter todas as reservas de um usuário específico.
- Requer o ID do usuário na requisição.
- Obter Todas as Reservas (GET /api/reserve/all)
## Endpoint para obter informações de todas as reservas.
- Excluir Reserva (DELETE /api/reserve/delete/:reserveId)
- Endpoint para excluir uma reserva.
- Requer o ID da reserva na requisição.
- Verifica se a reserva existe antes de realizar a exclusão.
- Responde com sucesso após a exclusão.
## Testes de Administração
- Email de Administrador: admin@gmail.com
- Senha de Administrador: Ma1832ma@
## Configuração do Token JWT
- O token JWT é gerado com base no ID do usuário e expira em 7 dias.

## Configuração do Banco de Dados
 - Este sistema utiliza um banco de dados não relacional(MongoDB) para armazenar informações de usuários e reservas.
- Os modelos correspondentes estão localizados em ../Models/userModel e ../Models/reserveModel.
## Executando a Aplicação
Certifique-se de ter as dependências instaladas usando npm install.
Execute a aplicação usando npm run dev.

BackEnd -> https://github.com/Matheus-Loubach/Reservas-Uninter-Back
