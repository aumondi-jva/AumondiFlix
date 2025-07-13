const db = new PouchDB('filmes');

// Onde cadastra filmes
document.getElementById('movie-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const movie = {
        _id: Date.now().toString(),
        title: document.getElementById('title').value,
        synopsis: document.getElementById('synopsis').value,
        category: document.getElementById('category').value,
        image: document.getElementById('image').value,
        trailer: document.getElementById('trailer').value
    };

    try {
        await db.put(movie);
        alert('Filme cadastrado com sucesso');
    } catch (err) {
        alert('Erro ao cadastrar o filme');
    }
});
