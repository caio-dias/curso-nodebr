//EventEmitter, usado para acoes continuas
const EventEmitter = require('events')

//instancia uma classe vinda de eventemitter
class MeuEmissor extends EventEmitter {}

//evento personalizado
const nomeEvento = 'usuario:click'

const meuEmissor = new MeuEmissor()

meuEmissor.on(nomeEvento, function (click) {
  console.log('um usuario clicou', click)
})

//emitindo eventos
meuEmissor.emit(nomeEvento, 'na barra de rolagem')
meuEmissor.emit(nomeEvento, 'no ok')

let count = 1
setInterval(function() {
  meuEmissor.emit(nomeEvento, 'no ok ' + (count++) + ' vezes')
}, 1000)

//exemplo de pegar o que foi digitado no terminal e mostrar no console
const stdin = process.openStdin()
stdin.addListener('data', function(value) {
  console.log(`Voce digitou: ${value.toString().trim()}`)
})