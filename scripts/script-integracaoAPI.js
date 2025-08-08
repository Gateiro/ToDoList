const urlAPI = "http://localhost:3000";
/*Seleciona cada elemento do DOM (Document Object Model) presente
na página HTML para manipulá-la
Aloca o valor que o usuário digitar no input da variável chamada
inputTarefa*/
const inputTarefa = document.querySelector(".campo-tarefa");

/*Seleciona o botão de adicionar tarefa e aloca na variável
botaoAdicionar, que será utilizado para adicionar uma nova tarefa*/
const botaoAdicionar = document.querySelector(".botao-adicionar");

/*Seleciona a lista de tarefas e aloca na variável listaTarefas
que será utilizada para exibir as tarefas na tela*/
const listaTarefas = document.querySelector(".lista-tarefas");

/*Função para carregar as tarefas adicionadas na tela*/
async function renderizarTarefas() {
    try {
        const resposta = await fetch(urlAPI);
        const tarefas = await resposta.json();

        tarefas.forEach(tarefa => {
            const itemLista = document.createElement('li');
            itemLista.className = 'item-tarefa';
            itemLista.textContent = tarefa.titulo;

            /*Botão remover criado para cada item da lista, isto é, para cada tarefa da lista
            OBSERVAÇÃO: AINDA NÃO ESTÁ FUNCIONAL*/
            const botaoRemover = document.createElement('button');
            botaoRemover.className = 'botao-remover';
            botaoRemover.textContent = 'Excluir';

            botaoRemover.addEventListener("click", () =>
                removerTarefa(tarefa.id)
            );

            /*Botão editar criado para editar cada item da lista -> AINDA NÃO FUNCIONAL*/
            const botaoEditar = document.createElement('button');
            botaoEditar.className = 'botao-editar';
            botaoEditar.textContent = 'Editar';

            botaoEditar.addEventListener("click", () => {
                editarTarefa(tarefa.id, tarefa.titulo);
            })

            itemLista.appendChild(botaoRemover);
            itemLista.appendChild(botaoEditar);
            listaTarefas.appendChild(itemLista);
        });
    }

    catch (erro) {
        console.error("Erro ao renderizar tarefas: " + erro);
    }
}

/*Função para adicionar uma nova tarefa à lista de tarefas*/
async function adicionarTarefa(titulo) {
    try{
        await fetch(urlAPI,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                /*Por enquanto, adicionaremos somente o título*/
                titulo: titulo,
            })
        })
    }
    catch (erro){
        console.erro("Erro ao adicionar tarefa:", erro);
    }
    
}

/*Função para editar tarefa*/
async function editarTarefa(id, tituloAtual) {
    const novoTitulo = prompt('Editar tarefa', tituloAtual)

    //SE UM NOVO TITULO FOR DIGITADO E ELE FOR DIFERENTE DE VAZIO
    if (novoTitulo && novoTitulo.trim() !==""){
        try{
            await fetch(`${urlAPI}/${id}`, {
                method: "PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    titulo: novoTitulo
                })
            });
            renderizarTarefas();
        } catch (erro){
            console.error("Erro ao editar tarefa", erro);
        }
    }
}

//FALTA FUNÇÃO REMOVER, CRIAR

botaoAdicionar.addEventListener("click", function (evento){
    /*Evita o comportamento padrão do botão, que é enviar um formulário*/
    evento.preventDefault();
    const novaTarefa = inputTarefa.value.trim();

    /*Verifica se o campo de input não está vazio, caso esteja,
    não adiciona a tarefa*/
    if(novaTarefa !== ""){
        adicionarTarefa(novaTarefa);
        //Limpa o campo input após adicionar a tarefa
        inputTarefa.value = "";
    }
});

//Iniciar a aplicação com as tarefas já renderizadas
renderizarTarefas();