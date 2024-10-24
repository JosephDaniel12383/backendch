const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// Middleware para verificar e autenticar o token JWT
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extrai o token do cabeçalho de autorização
  if (!token) return res.sendStatus(401); // Se não houver token, retorna 'não autorizado'

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Usa a variável de ambiente para verificar o token
    if (err) return res.sendStatus(403); // Se o token for inválido, retorna 'proibido'
    req.user = user; // Salva os dados do usuário no request
    next(); // Passa para o próximo middleware ou rota
  });
}

module.exports = { authenticateToken };
