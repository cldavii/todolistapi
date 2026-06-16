const express = require("express");
const Task = require("../models/task");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar tarefa", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefas", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true },
    );
    if (!updatedTask)
      return res.status(404).json({ message: "Tarefa não encontrada" });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar tarefa", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Tarefa não encontrada" });
    res.json({ message: "Tarefa deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar tarefa", error });
  }
});

module.exports = router;
