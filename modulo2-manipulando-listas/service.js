//axios para verbos de api
const axios = require('axios')

//url de uma api com massa de dados
const URL = `https://swapi.co/api/people`

//retorna dados da api
async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&format=json`
  const response = await axios.get(url)
  return response.data
}

//exporta modulo para ser utilizado em outros arquivos
module.exports = {
  obterPessoas
}