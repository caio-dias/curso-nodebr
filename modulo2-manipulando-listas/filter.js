//extraindo somente obterPessoas de service
const {obterPessoas} = require('./service')

async function main() {
  try {
    //extraindo indice results do retorno da api
    const {results} = await obterPessoas('a')

    const familiaLars = results.filter(function (item) {
      /**
       * filtrar um array e adicionar a outro somente os valores que satisfazerem a condiçao
       * por padrao precisa retornar um booleano, para informar se deve manter ou remover da lista
       * false = remove da lista, true = mantem
       * se não encontrou nada = -1, se encontrou = posicaoNoArray
       */
      
      const result = item.name.toLowerCase().indexOf('lars') !== -1
      return result
    })

    const names = familiaLars.map(pessoa => pessoa.name)

    console.log(names)
  } catch (error) {
    console.log('erro', error)
  }
}

main()