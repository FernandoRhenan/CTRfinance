// TODAS AS VARIÁVEIS DOCUMENT
let seta = document.getElementById("seta");
let slider = document.getElementById("slider");
let data = document.getElementById("data");

let listaDeMeses = document.getElementById("listaDeMeses");
let mesSelecionado = document.getElementById("mesSelecionado");

let valorPositivos = document.getElementById("valorPositivos");
let valorNegativos = document.getElementById("valorNegativos");

let descricaoPositivos = document.getElementById("descricaoPositivos");
let descricaoNegativos = document.getElementById("descricaoNegativos");

let diaPositivos = document.getElementById("diaPositivos");
let diaNegativos = document.getElementById("diaNegativos");

let positivosBTN = document.getElementById("positivosBTN");
let negativosBTN = document.getElementById("negativosBTN");

let totalPositivo = document.getElementById("totalPositivo")
let totalNegativo = document.getElementById("totalNegativo")

let saldo = document.getElementById("saldo");

let ulPai = document.getElementById("ulPai");
// ===========================

// TODAS AS VARIÁVEIS GLOBAIS
let valorTotalPositivos = 0;
let valorTotalNegativos = 0;
let DIA = new Date().getDate();
let MES = new Date().getMonth();
let ANO = new Date().getFullYear();

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

// ==========================

// TODAS OS EVENTOS 

seta.addEventListener("click", () => {
    seta.classList.toggle("rotate");
    seta
    $(slider).slideToggle(500);
}) //Ativa/desativa o slider
listaDeMeses.addEventListener("click", selecionarMes);
positivosBTN.addEventListener("click", criarListaPositivos);
negativosBTN.addEventListener("click", criarListaNegativos);
ulPai.addEventListener("click", excluirLi);

// ================

data.innerHTML = "Dia " + DIA + " de " + meses[MES] + " de " + ANO;

mesSelecionado.innerText = meses[MES];
// mesSelecionado.innerText = localStorage.getItem("mesSelecionadoLS");

ulPai.innerHTML = localStorage.getItem(`criarListaLS${mesSelecionado.innerText}`);

totalPositivo.innerText = localStorage.getItem(`totalPositivoLS${mesSelecionado.innerText}`);
totalNegativo.innerText = localStorage.getItem(`totalNegativoLS${mesSelecionado.innerText}`);
saldoTotal();

function selecionarMes(mes) {
    localStorage.setItem("mesSelecionadoLS", mes.target.innerText);

    mesSelecionado.innerText = localStorage.getItem("mesSelecionadoLS");

    ulPai.innerHTML = localStorage.getItem(`criarListaLS${mesSelecionado.innerText}`);

    totalPositivo.innerText = localStorage.getItem(`totalPositivoLS${mesSelecionado.innerText}`);
    totalNegativo.innerText = localStorage.getItem(`totalNegativoLS${mesSelecionado.innerText}`);

    saldoTotal();
}

function criarListaPositivos() {
    if(valorPositivos.value != "" && diaPositivos.value != "" && descricaoPositivos.value != ""){
    let novoLi = document.createElement("li");
    novoLi.dataset.pos_neg = "positivo";
    novoLi.classList.add("novoLi");
    novoLi.dataset.valor = valorPositivos.value;
    novoLi.style.borderLeft = "7px solid #0AD100";
    ulPai.appendChild(novoLi);

    novoLi.innerText = `Dia ${diaPositivos.value} - R$ ${valorPositivos.value} - ${descricaoPositivos.value}`;

    if (totalPositivo.innerText == "NaN" || totalPositivo.innerText == "") {
        totalPositivo.innerText = 0;
    }

    valorTotalPositivos = parseFloat(totalPositivo.innerText) + parseFloat(valorPositivos.value);

    localStorage.setItem(`totalPositivoLS${mesSelecionado.innerText}`, valorTotalPositivos);

    localStorage.setItem(`criarListaLS${mesSelecionado.innerHTML}`, ulPai.innerHTML);

    ulPai.innerHTML = localStorage.getItem(`criarListaLS${mesSelecionado.innerText}`);
    totalPositivo.innerText = localStorage.getItem(`totalPositivoLS${mesSelecionado.innerText}`);

    saldoTotal()

    diaPositivos.value = "";
    valorPositivos.value = "";
    descricaoPositivos.value = "";
}
}

function criarListaNegativos() {
    if(valorNegativos.value != "" && diaNegativos.value != "" && descricaoNegativos.value != ""){
    let novoLi = document.createElement("li");
    novoLi.dataset.pos_neg = "negativo";
    novoLi.classList.add("novoLi");
    novoLi.dataset.valor = valorNegativos.value;
    novoLi.style.borderLeft = "7px solid #FF0505";
    ulPai.appendChild(novoLi);

    novoLi.innerText = `Dia ${diaNegativos.value} - R$ ${valorNegativos.value} - ${descricaoNegativos.value}`;

    if (totalNegativo.innerText == "NaN" || totalNegativo.innerText == "") {
        totalNegativo.innerText = 0;
    }

    valorTotalNegativos = parseFloat(totalNegativo.innerText) + parseFloat(valorNegativos.value);

    localStorage.setItem(`totalNegativoLS${mesSelecionado.innerText}`, valorTotalNegativos);

    localStorage.setItem(`criarListaLS${mesSelecionado.innerHTML}`, ulPai.innerHTML);

    ulPai.innerHTML = localStorage.getItem(`criarListaLS${mesSelecionado.innerText}`);
    totalNegativo.innerText = localStorage.getItem(`totalNegativoLS${mesSelecionado.innerText}`);

    saldoTotal()

    diaNegativos.value = "";
    valorNegativos.value = "";
    descricaoNegativos.value = "";
}
}

function excluirLi(li) {
    if (li.target.dataset.pos_neg == "positivo") {
        valorTotalPositivos = parseFloat(totalPositivo.innerText) - parseFloat(li.target.dataset.valor);
        localStorage.setItem(`totalPositivoLS${mesSelecionado.innerText}`, valorTotalPositivos);
        totalPositivo.innerText = localStorage.getItem(`totalPositivoLS${mesSelecionado.innerText}`);
    }
    if (li.target.dataset.pos_neg == "negativo") {
        valorTotalNegativos = parseFloat(totalNegativo.innerText) - parseFloat(li.target.dataset.valor);
        localStorage.setItem(`totalNegativoLS${mesSelecionado.innerText}`, valorTotalNegativos);
        totalNegativo.innerText = localStorage.getItem(`totalNegativoLS${mesSelecionado.innerText}`);
    }

    ulPai.removeChild(li.target)
    localStorage.setItem(`criarListaLS${mesSelecionado.innerHTML}`, ulPai.innerHTML);

    saldoTotal()
}

function saldoTotal(){
   saldo.innerText = `R$ ${totalPositivo.innerText - totalNegativo.innerText}`;

   if(saldo.innerText > `R$ ${0}`){
    saldo.style.backgroundColor = "#A3FEA5"
   saldo.style.color = "#0F9E00";
   }

   if(saldo.innerText < `R$ ${0}`){
    saldo.style.backgroundColor = "#FFFD9E"
   saldo.style.color = "red";
   }

   if(saldo.innerText == `R$ ${0}`){
    saldo.style.backgroundColor = "white"
   saldo.style.color = "black";
   }
}
