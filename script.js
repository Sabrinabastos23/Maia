var maias = ["cultura", "religiao", "economia"]
var cultura = ['cultura','hierarquia', 'camponeses', 'arquitetura', 'matemática','códices','hieróglifos','dresden','madrid','paris','nobreza', 'astronimia', 'ajaw', 'cíclica', 'calendário solar', 'calendário duplo', 'calendário sagrado', 'haab', 'tzolkin']
var religiao = ['religião','politeísmo', 'tamoanchan','locais sagrados', 'sacrificios', 'deuses satisfeitos', 'universo funcionando', 'prisioneiros', 'violência', 'decapitação', 'coração', 'cultos', 'narcóticos', 'alucinógenas', 'itzamná', 'chac', 'bolon', 'ahPuch', 'ix chel']
var economia = ['economia','purificação de água ', 'zeólitas','agrícola', 'milho', 'cultivo','caça', 'pesca', 'artesanato', 'estado proprietário','irrigação', 'rudimentares', 'itinerantes', 'ornamentais', 'ferramentas metálicas', 'filtragem ','terraços', 'queimadas', 'importação agrícola', 'domesticação', 'desmatamento' ]

var word = ""
var game = ""
var opc = ""
var typed = []
var pontos = 0
var rodadas = 10
var gameName = ""
var historico = ""
var listaRegra = []
var tentativasTotal = 0
var pts = document.getElementById("pts")
var jogo = document.getElementById("jogo")
var bot = document.getElementById("bot")
var last = document.getElementById("last")
var tipWords = document.getElementById("tipWords")
var tipWrong = document.getElementById("tipWrong")
var tentativas = document.getElementById("tentativas")
var palavraTentativa = document.getElementById("word")

addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("send").click();
    }
})

      
// Enviar
function Send() {
    var wordTyped = document.getElementById("word").value
    var word = wordTyped.toLowerCase()
    tentativasTotal += 1
    document.getElementById("word").value = ""

    if (word == "zerar") {
        zerar()
        last.innerHTML = ""
        typed = []
    }
    else if (word.length <= 2) {
        last.innerHTML = "<p class='small'>Digite uma palavra válida</p>"
        tentativasTotal = tentativasTotal - 1
    }
    else if (/\d+/.test(word) == true) {
        last.innerHTML = "<p class='small'>Digite uma palavra</p>"
        tentativasTotal = tentativasTotal - 1
    }
    else if (typed.includes(word)) {
        last.innerHTML = "<p class='small'>Você não pode repetir</p>"
        tentativasTotal = tentativasTotal - 1
    }
    else if (word == "")
        { 
            tentativasTotal = tentativasTotal - 1 
        }
    else if (tentativasTotal == 1) {
      
        opc = maias[Math.floor(Math.random()*maias.length)]
        
        if (opc == "cultura"){
          //  dicaPalavra = cultura[Math.floor(Math.random()*cultura.length)]
            dicaPalavra = cultura
        }
        else if (opc == "religiao"){
            //dicaPalavra = religiao[Math.floor(Math.random()*religiao.length)]
            dicaPalavra = religiao
        }
        else {
           // dicaPalavra = "economia"[Math.floor(Math.random()*economia.length)]
           dicaPalavra = economia
        }

        tentativas.innerHTML = tentativasTotal 
        bot.innerHTML = 'digite "zerar" para resetar'
        last.innerHTML = ""
        ifGame(word, dicaPalavra)
    }
    else if (tentativasTotal == rodadas-1) {
        last.innerHTML = "<p class='small'>Última tentativa</p>"
        tentativas.innerHTML = tentativasTotal
        lastTry = pontos
        ifGame(word,dicaPalavra)
    }
    else {
        last.innerHTML = ""
        ifGame(word, dicaPalavra)
    }
    typed.push(word)
    tentativas.innerHTML = tentativasTotal 
}

function zerar() {
    typed = []
    pontos = 0
    historico = ""
    dicaContem = ""
    listaRegra = []
    tentativasTotal = 0
    jogo.innerHTML = "-"
    pts.innerHTML = pontos
    tipWords.innerHTML = historico
    tentativas.innerHTML = tentativasTotal
}

function novo() {
    typed = []
    historico = ""
    dicaContem = ""
    listaRegra = []
    tentativasTotal = 0
    jogo.innerHTML = "-"
    pts.innerHTML = pontos
    tipWords.innerHTML = historico
    tentativas.innerHTML = tentativasTotal
}

function ifGame(word, dicaPalavra) 
{
    if (opc == "cultura") {
        gameCultura(word, dicaPalavra)
    }
    else if (opc == "religiao") {
        gameReligiao(word, dicaPalavra)
    }
    else if (opc == "economia") {
        gameEconomia(word, dicaPalavra)
    }
    
}


function rightWord(word, newTip) {  
    historico = '<div class="tip dica"><p>' + newTip + '</p><p class="checkTip">dica</p></div>' + '<div class="tip right"><p>' + word + '</p><p class="checkCorrect">+4pts</p></div>' + historico
    tipWords.innerHTML = historico
    pontos += 4
    pts.innerHTML = pontos
    if (tentativasTotal == rodadas) {
        last.innerHTML = "<p class='big grn'>Você adivinhou! +20pts</p><p class='medium'> Palavras relaciondas a " + opc + "maia">"</p>"
        pontos += 16 
        novo()
        bot.innerHTML = 'digite qualquer palavra iniciar o próximo jogo'  
    }
}


function wrongWord(word, newTip) {
    historico = '<div class="tip dica"><p>' + newTip + '</p><p class="checkTip">dica</p></div>' + '<div class="tip wrong"><p>' + word + '</p><p class="checkWrong">-1pt</p></div>' + historico
    tipWords.innerHTML = historico
    
        pontos += -1
        pts.innerHTML = pontos
      
    if (tentativasTotal == rodadas) {
        last.innerHTML = "<p class='big red'>Você não adivinhou! -5pts</p><p class='medium'>Palavras relaciondas a " + opc + "maia">"</p>"
        if (pontos <= 10 && pontos >=0) {
            pontos += -1
            pts.innerHTML = pontos
        }
        novo()
        bot.innerHTML = 'digite qualquer palavra iniciar o próximo jogo'  
    }
}

function gameCultura(word,dicaPalavra) {   
    jogo.innerHTML = "Fácil"
    if ( dicaPalavra.includes(word)) {
       rightWord(word,"Boa, acertou!" );
    }else{
        wrongWord(word, "Errou")
    }
    
}


function gameReligiao(word, dicaPalavra) {
    jogo.innerHTML = "Difícil"
    if ( dicaPalavra.includes(word)) {
        rightWord(word,"Boa, acertou!" );
     }else{
         wrongWord(word, "Errou")
     }
}

function gameEconomia(word, dicaPalavra) {
    jogo.innerHTML = "Médio"
    if ( dicaPalavra.includes(word)) {
        rightWord(word,"Boa, acertou!" );
     }else{
         wrongWord(word, "Errou")
     }
}


