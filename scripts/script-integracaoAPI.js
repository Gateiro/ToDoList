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