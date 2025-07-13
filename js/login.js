const db = new PouchDB('users');

// Adiciona usuários de teste (apenas se não existirem)
async function addTestUsers() {
  const users = [
    { _id: 'admin@admin.com', password: 'admin123', role: 'admin' },
    { _id: 'usuario@usuario.com', password: 'usuario123', role: 'user' }
  ];

  for (const user of users) {
    try {
      await db.put(user);
    } catch (err) {
      // Usuário já existe
    }
  }
}
addTestUsers();

// Função de login
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const user = await db.get(email);
    if (user.password === password) {
      localStorage.setItem("logado", "true"); // SALVA SESSÃO
      window.location.href = user.role === 'admin' ? 'admin.html' : 'index.html';
    } else {
      alert('Senha incorreta');
    }
  } catch (err) {
    alert('Email não encontrado');
  }
});