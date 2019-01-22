/*
  OBJETIVO
  0 obter um usuario
  1 obter o num de tel de um usuario a partir de seu id
  2 obter o endereco do usuario pelo id
*/

//importando modulo interno do node.js
const util = require('util')

//transformando obterEndereco em promise
const obterEnderecoAsync = util.promisify(obterEndereco)

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

const usuarioPromise = obterUsuario()
//para manipular o sucesso, usamos a funcao .then
//para manipular erros, usamos a funcao .catch

usuarioPromise
.then(function (usuario) {
  return obterTelefone(usuario.id)
  .then(function resolverTelefone(result) {
    //modificando os dados para retornar os dados certos
    //quando o proximo then vier, ele vai ter o resultado do ultimo executado
    return {
      usuario: {
        nome: usuario.nome,
        id: usuario.id
      },
      telefone: result
    }
  })
})
.then(function (resultado) {
  const endereco = obterEnderecoAsync(resultado.usuario.id)
  return endereco.then(function resolverEndereco(result) {
    return {
      usuario: resultado.usuario,
      telefone: resultado.telefone,
      endereco: result
    }
  })
})
.then(function (resultado) {
  console.log(`
    Nome: ${resultado.usuario.nome}
    Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
    Telefone: ${resultado.telefone.ddd} - ${resultado.telefone.telefone}
  `)
})
.catch(function (error) {
  console.error('deu ruim', error)
})