const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Criar uma nova tarefa (POST)
router.post('/', async (req, res) => {
  try {
    // Verificação se os campos obrigatórios foram preenchidos
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Título e descrição são obrigatórios!' });
    }

    // Criando a nova tarefa com os dados recebidos
    const newTask = new Task({
      title,
      description,
    });

    // Salvando a tarefa no banco de dados
    await newTask.save();

    // Respondendo com a tarefa criada
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Erro ao criar a tarefa:', error.message);
    res.status(500).json({ message: 'Erro ao criar tarefa.', error: error.message });
  }
});

// Obter todas as tarefas (GET)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erro ao listar as tarefas:', error.message);
    res.status(500).json({ message: 'Erro ao listar as tarefas.' });
  }
});

// Obter uma tarefa específica (GET)
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Erro ao buscar a tarefa:', error.message);
    res.status(500).json({ message: 'Erro ao buscar a tarefa.' });
  }
});

// Atualizar uma tarefa (PUT)
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Erro ao atualizar a tarefa:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar a tarefa.' });
  }
});

// Excluir uma tarefa (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir a tarefa:', error.message);
    res.status(500).json({ message: 'Erro ao excluir a tarefa.' });
  }
});

module.exports = router;

