// Impede acessar a listagem de filmes
if (!localStorage.getItem("logado")) {
  window.location.href = "login.html";
}

const db = new PouchDB("filmes");

function exibirFilmes(categoriaFiltro = "") {
  db.allDocs({ include_docs: true }).then(result => {
    const filmes = result.rows.map(row => row.doc);
    const container = document.getElementById("listaFilmes");
    const mensagem = document.getElementById("mensagem");

    container.innerHTML = "";
    mensagem.innerHTML = "";

    const filtrados = categoriaFiltro
      ? filmes.filter(filme => filme.categoria === categoriaFiltro)
      : filmes;

    if (filtrados.length === 0) {
      mensagem.innerHTML = `<div class="text-white text-center bg-dark p-3 rounded">Não existem filmes na categoria: <strong>${categoriaFiltro}</strong></div>`;
      return;
    }

    filtrados.forEach(filme => {
      const card = document.createElement("div");
      card.className = "card movie-card m-3 text-white";
      card.style.width = "18rem";

      const img = document.createElement("img");
      img.src = filme.imagem;
      img.className = "card-img-top";
      img.alt = filme.titulo;

      const body = document.createElement("div");
      body.className = "card-body";

      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = filme.titulo;

      const categoria = document.createElement("p");
      categoria.className = "card-text";
      categoria.textContent = "Categoria: " + filme.categoria;

      const link = document.createElement("a");
      link.href = "detalhes-filmes.html?id=" + filme._id;
      link.className = "btn btn-danger";
      link.textContent = "Ver detalhes";

      body.appendChild(title);
      body.appendChild(categoria);
      body.appendChild(link);
      card.appendChild(img);
      card.appendChild(body);
      container.appendChild(card);
    });
  });
}

function atualizarBotaoAtivo(botaoAtivo) {
  const botoes = document.querySelectorAll('#filtrosCategorias button');
  botoes.forEach(btn => {
    btn.classList.remove('btn-danger');
    btn.classList.add('btn-outline-danger');
  });
  botaoAtivo.classList.remove('btn-outline-danger');
  botaoAtivo.classList.add('btn-danger');
}

function criarBotoesCategorias() {
  const categorias = [
    "Ação", "Aventura", "Comédia", "Drama",
    "Ficção Científica", "Terror", "Romance", "Animação"
  ];
  const container = document.getElementById("filtrosCategorias");

  categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-danger m-1";
    btn.textContent = cat;
    btn.onclick = () => {
      exibirFilmes(cat);
      atualizarBotaoAtivo(btn);
    };
    container.appendChild(btn);
  });

  const btnTodos = document.createElement("button");
  btnTodos.className = "btn btn-danger m-1";
  btnTodos.textContent = "Todos";
  btnTodos.onclick = () => {
    exibirFilmes();
    atualizarBotaoAtivo(btnTodos);
  };
  container.appendChild(btnTodos);
}

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "login.html";
}

window.onload = () => {
  criarBotoesCategorias();
  exibirFilmes();

  document.getElementById("logoutBtn").addEventListener("click", logout);
};
