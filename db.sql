CREATE DATABASE IF NOT EXISTS taskmanager;
 
USE taskmanager;
 
CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    status ENUM('Pendente', 'Em andamento', 'Concluída') DEFAULT 'Pendente',
    prioridade ENUM('Baixa', 'Média', 'Alta'),
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_entrega DATE
);