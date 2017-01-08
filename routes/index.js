var express = require('express');
var router = express.Router();

var palavra = "";
var erro = 0;
var vetorPalavras = ["Campeonato", "Anapólis", "Framboesa", "Calçado", "Estante"];
var listaLetras = [];
var img = "../images/jogoForca.png";

var listaPalavras = [
    {
        palavra : "Campeonato",
        dica1 : "Dica 1: Possui regras",
        dica2 : "Dica 2: Possui periodos determinados",
        dica3 : "Dica 3: é disputado entre equipes"
    },
    {
        palavra : "Anapólis",
        dica1 : "Dica 1: Localização",
        dica2 : "Dica 2: Substantivo próprio",
        dica3 : "Dica 3: Fica no centro-oeste do Brasil"
    },
    {
        palavra : "Framboesa",
        dica1 : "Dica 1: Sabor adocicado",
        dica2 : "Dica 2: Fruto",
        dica3 : "Dica 3: Fruto da framboeseira"
    },
    {
        palavra : "Calçado",
        dica1 : "Dica 1: Usado para proteção",
        dica2 : "Dica 2: Faz parte do vestuário",
        dica3 : "Dica 3: Sapatos faz parte dessa categoria"
    },
    {
        palavra : "Estante",
        dica1 : "Dica 1: Objeto",
        dica2 : "Dica 2: Muito usado para decorar salas",
        dica3 : "Dica 3: Organizador de outros objetos"
    }
]


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/jogo/iniciar', function(req, res, next) {
    var indice = Math.floor(Math.random() * (5 + 1));
    var letra = "";
    var i = 0;
    erro = 0;
    var dica = "";
    listaLetras = [];
    img = "../images/jogoForca.png";

    vetorPalavras.forEach(function(value, index){
        if (index === indice) {
            palavra = value.toLowerCase();
        }
    });


    for(i = 0; i < palavra.length; i++){
        letraIndice = palavra[i];
        listaLetras.push({letra: letraIndice, valida: false});
    }


    objPalavra = filterObj(palavra);
    if (typeof objPalavra !== "") {

    }

    dica = objPalavra.dica1;

    res.render('index', { palavra: palavra, letra: "", listaLetras: listaLetras, dica: dica, imagem: img});
});

router.post('/jogo/validaLetra', function(req, res, next){
    var json = req.body;
    var letra = json.letra.toLowerCase();
    var str = palavra.toLowerCase();
    var letraValida = false;
    var objPalavra = {};
    var dica = "";


    console.log("letra", letra);
    console.log("palavra", palavra);

    var listaLetras = vetorLetras(palavra, letra);
    console.log("listaLetras", listaLetras);

    objPalavra = filterObj(palavra);
    console.log("objPalavra", objPalavra);


    if (str.indexOf(letra) === -1) {
        erro++;
        if(erro === 1){
            dica = objPalavra.dica2;
            img = "../images/jogoForca_cabeca.png";
        }
        else if(erro === 2){
            dica = objPalavra.dica3;
            img = "../images/jogoForca_tronco.png";

        }
        else if(erro === 3){
            img = "../images/jogoForca_bracos.png";
        }
        else if (erro === 4) {
            img = "../images/jogoForca_pernas.png";
        }
        console.log("dica", dica);
    }else{
        letraValida = true;
    }
    var resultadoJogo = verificaResultado(erro);
    console.log("resultadoJogo", resultadoJogo);

    res.render('index', {palavra: palavra, dica: dica, letraValida: letraValida, listaLetras: listaLetras, mensagem: resultadoJogo, imagem: img });
});

vetorLetras = function(palavra, letraSelecionada){
    console.log("palavra", palavra);
    console.log("letraSelect", letraSelecionada);

    var letra = "";
    for(i = 0; i < listaLetras.length; i++){
        letra = palavra[i];
        if (listaLetras[i].letra === letraSelecionada) {
            listaLetras[i].valida = true;
        }
    }

    console.log("listaLetras", listaLetras);
    return listaLetras;
}

verificaResultado = function(erro){
    var tamPalavra = listaLetras.length;
    var cont = 0;
    var msg = 0;
    if (erro === 4) {
        msg = 1;
    }
    else{
        for(i = 0; i < listaLetras.length; i++){

            if (listaLetras[i].valida === true) {
                cont++;
            }
        }
        if (cont === tamPalavra) {
            msg = 2;
        }

    }
    return msg;
}

filterObj = function(palavra){
    var palavraFilter;
    listaPalavras.forEach(function(obj){
        if (obj.palavra.toLowerCase() === palavra){
            console.log("obj", obj);
            palavraFilter = obj;
        }
    });
    return palavraFilter;
}

module.exports = router;
