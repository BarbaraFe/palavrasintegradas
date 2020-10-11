/* interação com as disciplinas*/
let disciplinas = [];

onload = () => {
  const t = JSON.parse(localStorage.getItem('disciplinas'));
  if (t) disciplinas = t;
  mostradisciplinas();
  document.querySelector('#inputNovaDisciplina').oninput = monitoraCampoAdic;
  document.querySelector('#inputAlteraDisciplina').oninput = monitoraCampoAlt;

  document.querySelector('#btnAdic').onclick = () => {
    document.querySelector('#btnInc').disabled = true;
    ativa('tela2');
    document.querySelector('#inputNovaDisciplina').focus();
  };

  document.querySelector('#btnCanc1').onclick = () => {
    document.querySelector('#inputNovaDisciplina').value = '';
    ativa('tela1');
  };

  document.querySelector('#btnCanc2').onclick = () => {
    let campo = document.querySelector('#inputAlteraDisciplina');
    campo.value = '';
    campo.removeAttribute('data-id');
    ativa('tela1');
  };

  document.querySelector('#btnInc').onclick = () => {
    adicionaDisciplina();
  };

  document.querySelector('#btnAlt').onclick = () => {
    alteraDisciplina();
  };

  document.querySelector('#btnDel').onclick = () => {
    apagaDisciplina();
  };
};

const mostradisciplinas = () => {
  const listaDedisciplinas = document.querySelector('#listaDedisciplinas');
  listaDedisciplinas.innerHTML = '';
  disciplinas.forEach((t) => {
    let elemDisciplina = document.createElement('li');
    elemDisciplina.innerHTML = t.descricao;
    elemDisciplina.setAttribute('data-id', t.id);
    elemDisciplina.onclick = () => {
      let campo = document.querySelector('#inputAlteraDisciplina');
      ativa('tela3');
      campo.value = t.descricao;
      campo.setAttribute('data-id', t.id);
      campo.focus();

    };
    listaDedisciplinas.appendChild(elemDisciplina);
  });
  document.querySelector('#estado').innerText = disciplinas.length;
  if (disciplinas.length > 0) {
    listaDedisciplinas.classList.remove('hidden');
    document.querySelector('#blank').classList.add('hidden');
  } else {
    listaDedisciplinas.classList.add('hidden');
    document.querySelector('#blank').classList.remove('hidden');
  }
};

const ativa = (comp) => {
  let listaDeTelas = document.querySelectorAll('body > .component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
};

const adicionaDisciplina = () => {
  let campo = document.querySelector('#inputNovaDisciplina');
  let descricao = campo.value;
  if (descricao != '') {
    disciplinas.push({
      id: Math.random().toString().replace('0.', ''),
      descricao: descricao,
    });
    campo.value = '';
    ativa('tela1');
    salvadisciplinas();
    mostradisciplinas();
  }
};

const monitoraCampoAdic = (e) => {
  let botao = document.querySelector('#btnInc');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const alteraDisciplina = () => {
  let campo = document.querySelector('#inputAlteraDisciplina');
  let idDisciplina = campo.getAttribute('data-id');
  let i = disciplinas.findIndex((t) => t.id == idDisciplina);
  disciplinas[i].descricao = campo.value;
  campo.value = '';
  campo.removeAttribute('data-id');
  ativa('tela1');
  salvadisciplinas();
  mostradisciplinas();
};

const apagaDisciplina = () => {
  let campo = document.querySelector('#inputAlteraDisciplina');
  let idDisciplina = campo.getAttribute('data-id');
  disciplinas = disciplinas.filter((t) => t.id != idDisciplina);
  campo.value = '';
  campo.removeAttribute('data-id');
  ativa('tela1');
  salvadisciplinas();
  mostradisciplinas();
};

const monitoraCampoAlt = (e) => {
  let botao = document.querySelector('#btnAlt');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const salvadisciplinas = () => {
  localStorage.setItem('disciplinas', JSON.stringify(disciplinas));
};
/* Interação com as palavras */
var palavra = new Array();
var i = 0;
function AdicionarPalavra() {
  let j = disciplinas.findIndex((t) => t.descricao == document.getElementById('inputAlteraDisciplina').value);
  palavra[j, i] = (document.getElementById('inputNovaPalavra').value + " - " + document.getElementById('inputAlteraDisciplina').value);
  alert("Palavra salva com sucesso!");
  i++;
  salvapalavras();
  palavra.forEach(MostrarPalavras());
}
function MostrarPalavras() {
  document.getElementById('mostrarpalavras').innerHTML = palavra + "<br>";
}
function DeletaPalavra() {
  palavra.length = 0;
  MostrarPalavras();
  alert("Palavras Deletadas");
  salvapalavras();
}
const salvapalavras = () => {
  localStorage.setItem('palavaras', JSON.stringify(palavra));
};