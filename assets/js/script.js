const formulario = document.getElementById("formulario");
const visualizarLead = document.getElementById("inicio-lead");

// Molde Lead

class Lead {
  constructor(nome, cargo, empresa) {
    this.name = nome;
    this.cargo = cargo;
    this.empresa = empresa;
  }
}

function lerDados() {
  const dados = localStorage.getItem("dados_leads_json");
  return dados ? JSON.parse(dados) : [];
}

function salvarDados(lista) {
  const jsonString = JSON.stringify(lista);
  localStorage.setItem("dados_leads_json", jsonString);
}

function atualizarTela() {
  const leads = lerDados();
  visualizarLead.innerHTML = leads
    .map(
      (p) =>
        `<div class="caixa-lead" id="inicio-lead">
      <p class="nome-lead" id="nome-lead">
      Nome:${p.name}
      </p>
      <p class="cargo-lead" id="cargo-lead">
      Cargo:${p.cargo}
      </p>
      <p class="empresa-lead" id="empresa-lead">
      Empresa:${p.empresa}
      </p>
      </div>`,
    )
    .join("");
}

if (formulario && visualizarLead) {
  formulario.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const novoLead = new Lead(
      document.getElementById("nome").value,
      document.getElementById("cargo").value,
      document.getElementById("empresa").value,
    );

    const lista = lerDados();
    lista.push(novoLead);

    salvarDados(lista);
    atualizarTela();
    formulario.reset();
  });
  atualizarTela();
}

// Contador de Leads
// console.log(lerDados().length)

function limparLeads() {
  localStorage.clear();
}

// Configurações
const excluirTudo = document.getElementById("excluir-tudo");

if (excluirTudo) {
  excluirTudo.addEventListener("click", (e) => {
    mostrarConfirmacao();
  });
}

function mostrarConfirmacao() {
  let resposta = confirm(
    "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
  );

  if (resposta) {
    // Código que roda se o usuário clicar em "OK"
    limparLeads();
    alert("Conteudo excluído com sucesso!");
  } else {
    // Código que roda se o usuário clicar em "Cancelar"
    alert("Ação cancelada pelo usuário.");
  }
}
