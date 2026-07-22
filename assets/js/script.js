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
const exportarTudo = document.getElementById("exportar-tudo");
const importarTudo = document.getElementById("importar-tudo");

if (excluirTudo && exportarTudo) {
  excluirTudo.addEventListener("click", (e) => {
    mostrarConfirmacao();
  
  })
  exportarTudo.addEventListener("click", (e) =>{
    exportarJson()
  });

}

function mostrarConfirmacao() {
  let resposta = confirm(
    "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
  );

  if (resposta) {
    limparLeads();
    alert("Conteudo excluído com sucesso!");
  } else {
    alert("Ação cancelada pelo usuário.");
  }
}

function exportarJson() {
  const leads = lerDados();

  if (leads.length === 0) {
    alert("Não a dados para exportar");
  }
    const blob = new Blob([JSON.stringify(leads, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `leads-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();

  URL.revokeObjectURL(url);
}
