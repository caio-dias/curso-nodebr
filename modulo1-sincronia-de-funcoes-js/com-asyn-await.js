/*
  OBJETIVO
  0 obter um usuario
  1 obter o num de tel de um usuario a partir de seu id
  2 obter o endereco do usuario pelo id
*/

//importando modulo interno do node.js
const util = require('util')

function obterUsuario() {
  // qdo der problemas -> reject(erro)
  // qdo for sucesso -> resolve
  return new Promise(function resolverPromise(resolve, reject)  {
    setTimeout(function() {
      //exemplo de reject
      //return reject(new Error('DEU RUIM DE VDD!'))
      return resolve({
        id: 1,
        nome: 'Romarinho',
        dataNascimento: '04/07/2012'
      })
    }, 1000)
  })
}

function obterTelefone() {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(function() {
      return resolve({
        telefone: '5555-3333',
        ddd: '11'
      })
    }, 2000)
  })
}

function obterEndereco(id, callback) {
  setTimeout(function() {
    return callback(null, {
      rua: 'Rua Sao Jorge',
      numero: 777
    })
  }, 2000)
}
//transformando obterEndereco em uma promise
const obterEnderecoAsync = util.promisify(obterEndereco)

//usar asyn e await somente quando precisar tratar a resposta da chamada
//primeiro passo, add a palavra async -> automaticamente a funcao retornara uma promise
async function main () {
  try {
    const usuario = await obterUsuario()
    //const telefone = await obterTelefone(usuario.id)
    //const endereco = await obterEnderecoAsync(usuario.id)

    //promise all roda em segundo plano, resultado mais performatico
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])

    const endereco = resultado[1]
    const telefone = resultado[0]

    console.log(`
      Nome: ${usuario.nome}
      Telefone: ${telefone.ddd} - ${telefone.telefone}
      Endereço: ${endereco.rua}, ${endereco.numero}
    `)
  } catch (error) {
    console.log('Deu ruim', error)
  }
}

main()