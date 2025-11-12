import app from './app';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor HTTP rodando na porta ${PORT}`);
});

// Tratamento para desligamento gracioso
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Servidor encerrado.');
    process.exit(0);
  });
});
