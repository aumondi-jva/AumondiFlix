const db = new PouchDB('filmes');

// Limite máximo de caracteres
const MAX_CHAR = 400;

const synopsisInput = document.getElementById('synopsis');
const charCount = document.getElementById('char-count');

synopsisInput.addEventListener('input', () => {
  const length = synopsisInput.value.length;
  charCount.textContent = length > MAX_CHAR ? MAX_CHAR : length;
  if (length > MAX_CHAR) {
    synopsisInput.value = synopsisInput.value.substring(0, MAX_CHAR);
  }
});

function transformarLinkYouTube(url) {
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  } else if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}

document.getElementById('movie-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const movie = {
    _id: Date.now().toString(),
    titulo: document.getElementById('title').value,
    sinopse: synopsisInput.value.substring(0, MAX_CHAR),
    categoria: document.getElementById('categoriaFilme').value,
    imagem: document.getElementById('image').value,
    trailer: transformarLinkYouTube(document.getElementById('trailer').value)
  };

  try {
    await db.put(movie);
    alert('Filme cadastrado com sucesso!');
    this.reset();
    charCount.textContent = '0';
  } catch (err) {
    alert('Erro ao cadastrar o filme.');
    console.error(err);
  }
});
