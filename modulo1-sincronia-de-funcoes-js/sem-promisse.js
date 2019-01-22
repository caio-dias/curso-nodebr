/*
  OBJETIVO
  0 obter um usuario
  1 obter o num de tel de um usuario a partir de seu id
  2 obter o endereco do usuario pelo id
*/

function obterUsuario(callback) {
  setTimeout(function() {
    return callback(null, {
      id: 1,
      nome: 'Romarinho',
      dataNascimento: '04/07/2012'
    })
  }, 1000)
}

function obterTelefone(callback) {
  setTimeout(function() {
    return callback(null, {
      telefone: '5555-3333',
      ddd: '11'
    })
  , 2000})
}

function obterEndereco(callback) {
  setTimeout(function() {
    return callback(null, {
      rua: 'Rua Sao Jorge',
      numero: 777
    })
  , 2000})
}

obterUsuario(function (error, usuario) {
  if(error) {
    console.error('Deu ruim em usuario', error)
    return;
  }

  obterTelefone(function resolverTelefone(error1, telefone) {
    if(error1) {
      console.error('Deu ruim em telefone', error)
      return;
    }

    obterEndereco(function resolverEndereco (error2, endereco) {
      if(error2) {
        console.error('Deu ruim em endereco', error)
        return;
      }

      console.log(`
        Nome: ${usuario.nome},
        Endereco : ${endereco.rua}, ${endereco.numero}
        Telefone: (${telefone.ddd})-${telefone.telefone}
        Data de nascimento: ${usuario.dataNascimento}
      `)
    })
  })
})