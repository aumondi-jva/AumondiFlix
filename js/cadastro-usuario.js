const db = new PouchDB('users');

document.getElementById('user-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('userEmail').value;
  const password = document.getElementById('userPassword').value;
  const role = document.getElementById('userRole').value;

  try {
    await db.put({ _id: email, password, role });
    alert('Usuário cadastrado com sucesso!');
    window.location.href = "login.html"; // redireciona após o cadastro
  } catch (err) {
    alert('Erro ao cadastrar o usuário. Verifique se o email já está cadastrado.');
  }
});
