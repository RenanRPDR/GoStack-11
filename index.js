// PAAAAAAAAREI EM 10:37

// biblioteca importadas
const express = require('express');
const { uuid } = require('uuidv4')

// Aplicação instanciada
const app = express();

app.use(express.json());

// Por nao ter banco de dados ele criou um array para o exercicio
const projects = [];

// Rotas da aplicação

// LISTAR
app.get('/projects', (request, response) => {
  const { title, owner } = request.query;

  console.log(title);
  console.log(owner);

  return response.json(projects);
});

// INSERIR
app.post('/projects', (request, response) => {
  const { title, owner } = request.body

  const project = { id: uuid(), title, owner}

  projects.push(project)

  return response.json(project);
});

// ALTERAR
app.put('/projects/:id', (request, response) => {
  const { id } = request.params
  const { title, owner } = request.body

  const projectIndex = projects.findIndex(project => project.id === id )

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found'})
  }

  const project = {
    id,
    title,
    owner,    
  }

  projects[projectIndex] = project

  return response.json(project);
});

// DELETAR
app.delete('/projects/:id', (request, response) => {
  const { id } = request.params

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found'})
  }

  projects.splice(projectIndex, 1)

  return response.status(204).send();
});

// Porta em que a aplicação está respondendo
app.listen(3333, () => {
  console.log('Servidor Online! 😁️👍️')
});