const db = new PouchDB('filmes');
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');
const container = document.getElementById('movie-details');

function embedYouTube(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

async function carregarDetalhes() {
  try {
    const movie = await db.get(movieId);

    container.innerHTML = `
      <div class="row g-4">
        <div class="col-md-5">
          <img src="${movie.imagem}" alt="${movie.titulo}" class="movie-image">
        </div>
        <div class="col-md-7 d-flex flex-column">
          <h2 class="text-white">${movie.titulo}</h2>
          <p><strong>Categoria:</strong> ${movie.categoria}</p>
          <p><strong>Sinopse:</strong> ${movie.sinopse}</p>
          <iframe src="${embedYouTube(movie.trailer)}" allowfullscreen></iframe>
          <div class="mt-4">
            <a href="index.html" class="btn btn-voltar">← Voltar</a>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p class="text-danger">Filme não encontrado.</p>`;
  }
}

carregarDetalhes();
