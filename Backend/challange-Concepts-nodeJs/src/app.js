const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid, validate } = require('uuid');

const app = express();

const validateRepositoryId = (request, response, next) => {
  const { id } = request.params;

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid repository ID' });
  }

  return next();
};

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository)
});

app.put("/repositories/:id", validateRepositoryId, (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({message:"repository not found"});
  }

  let likes = repositories[repositoryIndex].likes;

  const repository = {
    id,
    title,
    url,
    techs
  };

  repositories[repositoryIndex] = repository;
  repositories[repositoryIndex].likes = likes;

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex( repository => repository.id === id );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex( repository => repository.id === id );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const repository = repositories[repositoryIndex];

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;