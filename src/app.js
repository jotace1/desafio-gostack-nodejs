const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  

   const project = {
    id : uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0,
  }

  repositories.push(project);

  return response.json(project);


});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;


  const projectIndex = repositories.findIndex(project => project.id === id);

  

    if (projectIndex < 0){
        return response.status(400).json ({ error: "Project not found" })
    }

    const likes = repositories[projectIndex].likes;
    const project = {
      id,
      title,
      url,
      techs,
      likes,
  };

  repositories[projectIndex] = project;

  return response.json(project);

});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;

    const projectIndex = repositories.findIndex(project => project.id === id);

    if (projectIndex < 0){
        return response.status(400).json ({ error: "Project not found" })
    }

    repositories.splice(projectIndex, 1);

    return response.status(204).send();
});


app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository=> repository.id === id)

  if (!repository) return response.status(400).json({ message: "No repository found with this id!" })

  repository.likes += 1

  return response.json(repository);
});

module.exports = app;
