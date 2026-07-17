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
  visualizarLead.innerHTML = leads.map(
    (p) =>
      `<div class="caixa-lead" id="inicio-lead">
      <p class="nome-lead" id="nome-lead">
      ${p.name}
      </p>
      <p class="cargo-lead" id="cargo-lead">
      ${p.cargo}
      </p>
      <p class="empresa-lead" id="empresa-lead">
      ${p.empresa}
      </p>
      <a href="#">Perfil Completo</a>
      </div>`,
  ).join("");
}
formulario.addEventListener(`submit`, (e) => {
  e.preventDefault();

  const novoLead = new Lead(
    document.getElementById("nome").value,
    document.getElementById("cargo").value,
    document.getElementById("empresa").value,
  );

  const lista = lerDados();
  lista.push(novoLead);

  salvarDados(lista)
  atualizarTela()
  formulario.reset()
});

atualizarTela();

//  localStorage.clear()