//modulo de assercoes do node
const assert = require('assert')
const { getPessoas } = require('./service')

describe('Star Wars Tests', () => {

  //descricao do teste
  it('Deve buscar o r2d2 com o formato json', async () => {
    //resultado esperado para o teste dar ok
    const expected = [{
        nome: 'R2-D2', 
        peso: '96'
      }]
    
    //buscando dado do servico
    const result = await getPessoas('r2-d2')
    
    //comparando se os dados sao iguais
    assert.deepEqual(result, expected)
  })
})