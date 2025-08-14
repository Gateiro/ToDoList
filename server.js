// Importa o framework Express
const express = require('express');
// Importa o módulo cors para permitir requisições de diferentes origens
const cors = require('cors');
// Importa o driver do MySQL
const mysql = require('mysql2');

// Cria uma instância da aplicação Express
const app = express();
// Define a porta em que o servidor irá escutar
const PORT = 3000;

// Aplica middlewares
app.use(cors());
app.use(express.json());

// --- LIGAÇÃO COM O BANCO DE DADOS MYSQL ---
// Gerir as ligações de forma eficiente
const connection = mysql.createPool({
    host: 'localhost',      //
    user: 'root',           // 
    password: '!Semgas@123',  // 
    database: 'taskmanager' // 
}).promise(); // 


/*------------------- ROTAS DA API COM SQL --------------------- */

// Rota GET - Retorna a lista com todas as tarefas
app.get('/tarefas', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM tarefas');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota POST - Adiciona uma nova tarefa completa
app.post('/tarefas', async (req, res) => {
    const { titulo, descricao, status, prioridade, data_entrega } = req.body;

    if (!titulo || !status || !prioridade) {
        return res.status(400).json({ error: 'Os campos titulo, status e prioridade são obrigatórios.' });
    }

    try {
        const query = `
            INSERT INTO tarefas (titulo, descricao, status, prioridade, data_entrega) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await connection.query(query, [titulo, descricao, status, prioridade, data_entrega || null]);
        
        // Devolve o objeto completo que foi inserido
        const novaTarefa = {
            id: result.insertId, // Pega o ID que o banco de dados gerou
            titulo,
            descricao,
            status,
            prioridade,
            data_entrega
        };
        res.status(201).json(novaTarefa);

    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota PUT - Atualiza uma tarefa existente
app.put('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status, prioridade, data_entrega } = req.body;

    try {
        const query = `
            UPDATE tarefas 
            SET titulo = ?, descricao = ?, status = ?, prioridade = ?, data_entrega = ?
            WHERE id = ?
        `;
        const [result] = await connection.query(query, [titulo, descricao, status, prioridade, data_entrega || null, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }
        res.json({ message: 'Tarefa atualizada com sucesso.' });

    } catch (error) {
        console.error('Erro ao editar tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota DELETE - Remove uma tarefa existente
app.delete('/tarefas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await connection.query('DELETE FROM tarefas WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }
        res.sendStatus(204); // Sucesso, sem conteúdo para devolver

    } catch (error) {
        console.error('Erro ao remover tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor CONECTADO AO BANCO DE DADOS rodando na porta ${PORT}`);
});