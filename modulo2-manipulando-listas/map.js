const service = require('./service')

async function main () {
  try {
    const result = await service.obterPessoas('a')
    
    //o map retorna um novo array com os dados retornados pela funcao
    const names = result.results.map(function (pessoa) {
      return pessoa.name
    })

    //com arrow function
    const names = result.results.map(pessoa => pessoa.name)
    
    console.log(names)
  } catch (error) {
    console.log('erro:', error)
  }
}

main()