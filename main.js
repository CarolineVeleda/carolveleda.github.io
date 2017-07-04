console.log('main');
const divNotas = document.querySelector('div.notas');
const divMedia = document.querySelector('div.media');
const divMenor = document.querySelector('div.menor');
const divMaior = document.querySelector('div.maior');
const divAmplitude = document.querySelector('div.amplitude');
const divMediana = document.querySelector('div.mediana');
const divBarras = document.querySelector('div.barras');
const divDesvio = document.querySelector('div.desvioPadrao');
const divClasses = document.querySelector('div.classe');

const Notas = {

  classes:[],
  notas: [],
  // duas classes de notas

  get aprovados() {

    return this.notas.filter((n) => n >= 7).length;
  },


  get reprovados() {
    return this.notas.length - this.aprovados;
  },
 


  get mediana() {
    return mediana(this.notas);
  },


  get amplitude() {
    return this.maior - this.menor;
  },


  get maior() {
    return this.notas[this.notas.length - 1];
  },


  get menor() {
    return min(this.notas);
  },


  get media() { 
    let soma = 0;
    for (let nota of this.notas) soma += nota;
    return soma / this.notas.length;
  },
  
  
   get desvioPadrao(){
	  
	let x = 0;
	for(var i =0; i<this.notas.length; i++){
		x += Math.pow(this.notas[i] - this.media,2);
	}
	if (this.notas.length===1){
		return 0;
	}
	else{
		return Math.sqrt(x/(this.notas.length-1));
	}
	  
},


  atualizaView: function () {
    let html = "";
    for (let nota of this.notas) { 
        html += `<p>${nota}</p>`;
    }
    divNotas.innerHTML = html;
    divMedia.textContent = this.media;
    divMenor.textContent = this.menor;
    divMaior.textContent = this.maior;
    divAmplitude.textContent = this.amplitude;
    divMediana.textContent = this.mediana;
	divDesvio.textContent = this.desvioPadrao;
	
	
		 

    let escala  = 0;

    for (let c of this.classes) {
      c.zerar();
      for (let n of this.notas) c.conta(n);
      if (c.contagem > escala ) escala = c.contagem;
    }

    for (let c of this.classes) c.desenha(escala);
  },
  adiciona: function (nota) {
    let n = parseFloat(nota);
    if (!isNaN(n) && n >= 0 && n <= 10) {
      this.notas.push(n);
      this.notas.sort(function (a, b) {
        return a - b
      });
      this.atualizaView();
    }
  }
};






const form = document.querySelector('form');
form.addEventListener('submit', function (evento) {
  Notas.adiciona(this.nota.value);
  evento.preventDefault();
});

function min(vetor) {
  var m = vetor[0];
  for (let i = 1; i < vetor.length; i++) {
    if (vetor[i] < m) m = vetor[i];
  }
  return m;
}




function mediana(vetor) {
  if (vetor.length % 2 === 1) { // impar
    return vetor[parseInt(vetor.length / 2)];
  } else { // par
    let a = vetor[parseInt(vetor.length / 2)];
    let b = vetor[parseInt(vetor.length / 2) - 1];
    return (a + b) / 2;
  }
}


function soma(a, b) { return a + b; }

let subtrai = function(a, b) { return a - b; };


let multiplica = (a, b) => a * b;
console.log(multiplica(2, 8));





function Classe(nome, de, ate) {
  this.nome = nome;
  this.de = de;
  this.ate = ate;
  this.contagem = 0;

  var label = document.createElement('label');
  label.textContent = this.nome;
  divBarras.appendChild(label);

  this.div = document.createElement('div');
  this.div.classList.add('barra');
  this.div.textContent = '0';
  divBarras.appendChild(this.div);

  this.desenha = function (escala){
    let tamanho =  this.contagem / escala * 100; //qual foi a maior escala (qual foi a maior contagem)
    this.div.style.width = `${tamanho}%`;
    this.div.textContent = this.contagem;
  }
  this.zerar = function (){
    this.contagem = 0;
  }
  this.conta = function(n){
    if (this.verifica(n)) this.contagem++;
  }
  this.verifica = function(n){ //vai dar true ou false, ve se ele ta no intervalo ou não tá
    //intervalo fechado
    if (this.de instanceof Classe) { //instanceof verifica se é uma classe
      return n > this.de.ate && n <= this.ate;
    }
    return n >= this.de && n <= this.ate;
  }
}






