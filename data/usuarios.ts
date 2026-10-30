/**
 * Massa de dados dos testes Web.
 * As credenciais abaixo são públicas e exibidas na própria tela do SauceDemo
 * (site de demonstração criado para treino de automação).
 */
export const SENHA_PADRAO = 'secret_sauce';

export const usuarios = {
  padrao: { usuario: 'standard_user', senha: SENHA_PADRAO },
  bloqueado: { usuario: 'locked_out_user', senha: SENHA_PADRAO },
  inexistente: { usuario: 'usuario_inexistente', senha: 'senha_errada' },
};

export const cliente = {
  nome: 'Lafaiete',
  sobrenome: 'QA',
  cep: '01001-000',
};
