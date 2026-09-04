/**
 * Ambiente dos testes e2e.
 *
 * O `AppModule` valida as variáveis de banco no import, então elas precisam
 * existir antes da suíte subir. Os valores são propositalmente falsos e fixos:
 * os testes e2e não devem tocar em nenhum banco real, e o pool do `pg` só abre
 * conexão quando uma query é executada.
 */
process.env.PORT = '3000';
process.env.DB_HOST = '127.0.0.1';
process.env.DB_PORT = '5432';
process.env.DB_USER = 'test';
process.env.DB_PASSWORD = 'test';
process.env.DB_NAME = 'test';
process.env.DB_SSL = 'false';
