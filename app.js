document.getElementById("createTaskBtn").addEventListener("click", createTask);

const apiUrl = "http://localhost:3000/api/tasks";  // Verifique se o servidor está rodando aqui ou se é necessário alterar

// Função para exibir as tarefas
function loadTasks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = ""; // Limpa a lista antes de exibir novamente
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.innerHTML = 
                    `<span>${task.title}</span>
                    <button onclick="deleteTask('${task._id}')">Deletar</button>`;
                taskList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar as tarefas:', error));
}

// Função para criar tarefa
function createTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    if (title.trim() === "") {
        alert("O título é obrigatório");
        return;
    }

    const task = { title, description };

    // Verificando a requisição e o que está sendo enviado
    console.log("Enviando tarefa:", task);

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Tarefa criada:', data);
            loadTasks(); // Recarrega as tarefas
            document.getElementById("taskTitle").value = "";
            document.getElementById("taskDescription").value = "";
        })
        .catch(error => {
            console.error('Erro ao criar tarefa:', error);
        });
}

// Função para deletar tarefa
function deleteTask(id) {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
        .then(() => loadTasks()) // Recarrega as tarefas após excluir
        .catch(error => console.error('Erro ao deletar tarefa:', error));
}

// Carregar as tarefas ao inicializar
loadTasks();


