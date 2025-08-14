// URL base da sua API
const urlAPI = "http://localhost:3000/tarefas";

// --- Seleção dos Elementos do DOM (Interface) ---
// Formulário e seus campos
const form = document.querySelector('.form-container'); // O container do formulário
const inputTitulo = document.getElementById('campo-titulo');
const inputDescricao = document.getElementById('campo-descricao');
const selectStatus = document.getElementById('campo-status');
const selectPrioridade = document.getElementById('campo-prioridade');
const inputDataEntrega = document.getElementById('campo-data-entrega');

// Botão de adicionar
const botaoAdicionar = document.getElementById('botao-adicionar');

// A lista <ul> onde as tarefas serão exibidas
const listaTarefas = document.getElementById('lista-tarefas');


// --- Funções de Interação com a API e Renderização ---

/**
 * PARTE 2: GET - Busca todas as tarefas na API e manda renderizar na tela.
 */
async function carregarTarefas() {
    listaTarefas.innerHTML = ''; // Limpa a lista antes de carregar novos itens para evitar duplicatas

    try {
        const response = await fetch(urlAPI);
        if (!response.ok) {
            throw new Error('Não foi possível buscar as tarefas da API.');
        }
        const tarefas = await response.json();

        // Para cada tarefa retornada pela API, chama a função para criar o HTML dela
        tarefas.forEach(tarefa => {
            const elementoTarefa = renderizarTarefa(tarefa);
            listaTarefas.appendChild(elementoTarefa);
        });
    } catch (error) {
        console.error("Falha ao carregar tarefas:", error);
    }
}

/**
 * Função auxiliar que cria o HTML de UM item da lista.
 * Ela é chamada pela função carregarTarefas().
 */
function renderizarTarefa(tarefa) {
    const itemLista = document.createElement('li');
    itemLista.classList.add('tarefa-item');
    itemLista.dataset.id = tarefa.id;

    // Formata as datas para o padrão brasileiro (DD/MM/AAAA)
    const dataCriacaoFormatada = new Date(tarefa.data_criacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const dataEntregaFormatada = tarefa.data_entrega
        ? new Date(tarefa.data_entrega).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        : 'Não definida';

    itemLista.innerHTML = `
        <div class="tarefa-info">
            <h3 class="tarefa-titulo">${tarefa.titulo}</h3>
            <p class="tarefa-descricao">${tarefa.descricao || 'Sem descrição'}</p>
            <div class="tarefa-meta">
                <span class="meta-item status-${tarefa.status.toLowerCase().replace(' ', '')}"><strong>Status:</strong> ${tarefa.status}</span>
                <span class="meta-item prioridade-${tarefa.prioridade.toLowerCase()}"><strong>Prioridade:</strong> ${tarefa.prioridade}</span>
            </div>
            <div class="tarefa-datas">
                <span class="data-item"><strong>Criada em:</strong> ${dataCriacaoFormatada}</span>
                <span class="data-item"><strong>Entregar até:</strong> ${dataEntregaFormatada}</span>
            </div>
        </div>
        <div class="tarefa-botoes">
            <button class="botao-editar">Editar</button>
            <button class="botao-remover">Remover</button>
        </div>
    `;

    // Adiciona os eventos aos botões de cada tarefa
    itemLista.querySelector('.botao-editar').addEventListener('click', () => editarTarefa(tarefa));
    itemLista.querySelector('.botao-remover').addEventListener('click', () => removerTarefa(tarefa.id));

    return itemLista;
}

/**
 * PARTE 3: POST - Adiciona uma nova tarefa.
 * Chamada quando o usuário clica no botão "Adicionar Tarefa".
 */
async function adicionarTarefa(event) {
    event.preventDefault(); // Impede o formulário de recarregar a página

    // Coleta os valores dos campos
    const titulo = inputTitulo.value.trim();
    const descricao = inputDescricao.value.trim();
    const status = selectStatus.value;
    const prioridade = selectPrioridade.value;
    const data_entrega = inputDataEntrega.value;

    if (!titulo) {
        alert('O campo "Título" é obrigatório.');
        return;
    }
    // Monta o objeto (payload) base
    const tarefaPayload = {
        titulo: titulo,
        descricao: descricao,
        status: status,
        prioridade: prioridade
    };

    // Adiciona a data de entrega ao payload APENAS se ela foi preenchida
    if (data_entrega) {
        tarefaPayload.data_entrega = data_entrega;
    }

    try {
        const response = await fetch(urlAPI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tarefaPayload)
        });

        if (!response.ok) {
            // Para nos dar mais detalhes sobre o erro do servidor
            const errorData = await response.text();
            console.error('Erro retornado pelo servidor:', errorData);
            throw new Error('Erro ao tentar adicionar a tarefa. Verifique o console para mais detalhes.');
        }

        form.reset();
        carregarTarefas();

    } catch (error) {
        console.error('Falha ao adicionar a tarefa:', error);
        alert(error.message);
    }
}


 /* PARTE 4: PUT - Edita uma tarefa existente.
 É chamada quando o usuário clica no botão "Editar" de um item da lista. */

async function editarTarefa(tarefa) {
    // 1. Usa prompt() para obter os novos valores, preenchendo com os dados atuais da tarefa.
    const novoTitulo = prompt("Editar título:", tarefa.titulo);
    const novaDescricao = prompt("Editar descrição:", tarefa.descricao);
    const novoStatus = prompt(`Editar status (Pendente, Em andamento, Concluída):`, tarefa.status);
    const novaPrioridade = prompt(`Editar prioridade (Baixa, Média, Alta):`, tarefa.prioridade);
    
    // Para a data, removemos a parte do horário para o prompt funcionar corretamente.
    const dataAtual = tarefa.data_entrega ? tarefa.data_entrega.split('T')[0] : '';
    const novaDataEntrega = prompt("Editar data de entrega (formato AAAA-MM-DD):", dataAtual);

    // 2. Validação: Verifica se o usuário não cancelou o primeiro prompt.
    // Se o novo título for null, significa que o usuário clicou em "Cancelar".
    if (novoTitulo === null) {
        return; // Interrompe a edição se o usuário cancelar.
    }

    // 3. Validação dos campos de Status e Prioridade. 
    const statusValidos = ["Pendente", "Em andamento", "Concluída"];
    const prioridadesValidas = ["Baixa", "Média", "Alta"];

    if (!statusValidos.includes(novoStatus)) {
        alert(`Status inválido! Por favor, use um dos seguintes valores: ${statusValidos.join(', ')}.`);
        return;
    }

    if (!prioridadesValidas.includes(novaPrioridade)) {
        alert(`Prioridade inválida! Por favor, use um dos seguintes valores: ${prioridadesValidas.join(', ')}.`);
        return;
    }

    // 4. Monta o objeto (payload) com os novos dados para enviar à API. 
    const payload = {
        titulo: novoTitulo.trim(),
        descricao: novaDescricao.trim(),
        status: novoStatus,
        prioridade: novaPrioridade,
        data_entrega: novaDataEntrega || null // Envia null se a data for deixada em branco.
    };
    
    // 5. Envia a requisição PUT para a API.
    try {
        const response = await fetch(`${urlAPI}/${tarefa.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Falha ao atualizar a tarefa.');
        }

        // 6. Atualiza a lista de tarefas na tela para refletir a mudança. 
        carregarTarefas();

    } catch (error) {
        console.error("Erro ao editar tarefa:", error);
        alert('Ocorreu um erro ao tentar editar a tarefa.');
    }
}

/**
 * Função para remover uma tarefa.
 */
async function removerTarefa(id) {
    if (!confirm('Tem certeza de que deseja remover esta tarefa?')) {
        return;
    }

    try {
        const response = await fetch(`${urlAPI}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Falha ao remover a tarefa.');
        }

        carregarTarefas(); // Atualiza a lista na tela
    } catch (error) {
        console.error("Erro ao remover tarefa: ", error);
        alert('Ocorreu um erro ao remover a tarefa.');
    }
}


// --- Event Listeners (Ouvintes de Eventos) ---

// Quando o botão de adicionar é clicado, chama a função adicionarTarefa
botaoAdicionar.addEventListener('click', adicionarTarefa);

// Quando a página termina de carregar, busca e exibe as tarefas iniciais
document.addEventListener('DOMContentLoaded', carregarTarefas);