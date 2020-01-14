const { Router} = require("express");
const axios = require("axios")
const Dev = require("./models/Dev")

const routes = Router();

routes.post("/devs", async (request, response) => { // O "async", diz para a função que pode demorar a responder
    // Destruturação
    const { github_username, techs } = request.body; // Pegar só o nome de usuario da request.body ()
    console.log(request.body)
    // "await" - aguarda o comando abaixo finalizar para devolver uma resposta, para depois continuar com o restante do codigo
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    // Destruturação do que eu quero das informações do GitHub

    // "name = login" é o mesmo que -> if(!name) { name = apiResponse.data.login; }
    const { name = login, avatar_url, bio } =  apiResponse.data;

    const techsArray = techs.split(",").map(tech => tech.trim()); // O .map percorre o array de techs; O .trim()
    // remove espaçamento antes e depois de uma string

    const dev = await Dev.create({ // utiliza "await", porque pode demorar para responder a requisição
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
    });

    return response.json(dev);
});

module.exports = routes;