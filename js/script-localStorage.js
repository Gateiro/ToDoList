/*Verifica se existe tarefas no localstorage, se não existir, cria um array vazio*/
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []; //pega o array de tarefas do localStorage ou cria um novo array vazio

//Seleciona o elemento input
const inputTarefa = document.querySelector(".campo-tarefa"); //pega o elemento input
//Seleciona o elemento botão adicionar
const botaoAdicionar = document.querySelector(".botao-adicionar"); //pega o elemento botão adicionar
//Seleciona o elemento lista de tarefas
const listaTarefas = document.querySelector(".lista-tarefas"); //pega o elemento lista de tarefas

//Salva as tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas)); //salva o array de tarefas no localStorage
}
//Edita uma tarefa
function editarTarefa(index) {
    const tarefaAtualizada = prompt("Editar tarefa: ", tarefas[index]); //pede para o usuário editar a tarefa
    if (tarefaAtualizada !== null && tarefaAtualizada.trim() !== "") { //verifica se o campo não está vazio
        tarefas[index] = tarefaAtualizada; //atualiza a tarefa no array
        salvarTarefas(); //salva as tarefas no localStorage
        renderizarTarefas(); //atualiza a lista de tarefas
    }
}
//Remover uma tarefa
function removerTarefa(index) {
    tarefas.splice(index, 1); //remove a tarefa do array
    salvarTarefas(); //salva as tarefas no localStorage
    renderizarTarefas(); //atualiza a lista de tarefas
}
//Renderiza as tarefas na tela
function renderizarTarefas() {
    listaTarefas.innerHTML = ""; //limpa a lista de tarefas

    //para percorrer o array com as tarefas alocadas e posicionadas na tela (i)
    for (let i = 0; i < tarefas.length; i++) {
        const tarefaTexto = tarefas[i]; //texto da tarefa é o valor do array

        //cria um elemento li para cada tarefa
        const itemLista = document.createElement("li");
        itemLista.className = "item-tarefa";
        itemLista.textContent = tarefaTexto;

        //Cria o elemento botão remover para cada tarefa
        const botaoRemover = document.createElement("button");
        botaoRemover.className = "botao-remover";
        botaoRemover.textContent = "Remover";

        botaoRemover.addEventListener("click", () => {
            removerTarefa(i);
        });

        //Cria o elemento botão editar para cada tarefa
        const botaoEditar = document.createElement("button");
        botaoEditar.className = "botao-editar";
        botaoEditar.textContent = "Editar";

        //Adicionar o botão (clique) para editar a tarefa (uso de arrow function)
        botaoEditar.addEventListener("click", () => {
            editarTarefa(i); //chama a função para editar a tarefa
        });

        itemLista.appendChild(botaoRemover); //adiciona o botão de remover a tarefa
        itemLista.appendChild(botaoEditar); //adiciona o botão de editar a tarefa
        listaTarefas.appendChild(itemLista); //adiciona a tarefa (li) na lista de tarefas (ul)

    }

}

//Evento para adicionar a tarefa
botaoAdicionar.addEventListener("click",
    function (evento) {
        evento.preventDefault(); //previne o comportamento padrão do botão

        const novaTarefa = inputTarefa.value.trim(); //pega o valor do input

        if (novaTarefa !== "") { //verifica se o campo não está vazio
            tarefas.push(novaTarefa); //adiciona a nova tarefa no array
            inputTarefa.value = ""; //limpa o campo de input
            salvarTarefas(); //salva as tarefas no localStorage
            renderizarTarefas(); //atualiza a lista de tarefas
        }
    });
