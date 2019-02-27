const {get} = require('axios')

const URL = `https://swapi.co/api/people`

let getPessoas = async (nome) => {
  const url = `${URL}/?search=${nome}&format=json`
  const response = await get(url)
  return response.data.results.map(mapPessoas)
}

let mapPessoas = (item) => {
  return {
    nome: item.name,
    peso: item.height
  }
}

module.exports = {
  getPessoas
}