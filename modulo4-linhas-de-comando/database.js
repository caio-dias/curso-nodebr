//file system
const { readFile, writeFile } = require('fs')

//modulo para utilizar async e await
const { promisify } = require('util')

//transformando em promises
const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database{

  constructor() {
    this.NOME_ARQUIVO = 'herois.json'
  }

  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
    return JSON.parse(arquivo.toString())
  }

  async escreverArquivo(dados) {
    //escrevendo dentro do arquivo
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
    return true
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivo()
    
    //criando um id
    const id = heroi.id <= 2 ? heroi.id : Date.now()

    //concatenando o id com o heroi recebido
    const heroiComId = {
      id,
      ...heroi
    }

    //concatenando o heroi criado
    const dadosFInal = [
      ...dados,
      heroiComId
    ]

    const resultado = await this.escreverArquivo(dadosFInal)
    
    return resultado
  }

  async listar(id) {
    const dados = await this.obterDadosArquivo()
    const dadosFiltrados = dados.filter(item => (id ? (item.id === id ) : true))
    return dadosFiltrados
  }

  async remover(id) {
    if(!id) {
      await this.escreverArquivo([])
    }
    
    const dados = await this.obterDadosArquivo()
    const indice = dados.findIndex(item => item.id === parseInt(id))

    if(indice === -1) {
      throw Error('O Heroi informado não existe!')
    }

    dados.splice(indice, 1)
    return await this.escreverArquivo(dados)
  }

  async atualizar(id, modificacoes) {
    const dados = await this.obterDadosArquivo()
    const indice = dados.findIndex(item => item.id === parseInt(id))

    if(indice === -1) {
      throw Error('O Heroi informado nao existe...')
    }

    const atual = dados[indice]
    
    const objAtualizar = {
      ...atual,
      ...modificacoes
    }

    dados.splice(indice, 1)

    return await this.escreverArquivo([
      ...dados,
      objAtualizar
    ])
  }
}

//exportando a instancia
module.exports = new Database()