import { test, expect } from '../../fixtures/paginas';
import { usuarios } from '../../data/usuarios';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.acessar();
  });

  test('deve fazer login com usuário válido', async ({ page, loginPage, produtosPage }) => {
    await loginPage.login(usuarios.padrao.usuario, usuarios.padrao.senha);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(produtosPage.titulo).toHaveText('Products');
  });

  test('deve bloquear login de usuário bloqueado', async ({ loginPage }) => {
    await loginPage.login(usuarios.bloqueado.usuario, usuarios.bloqueado.senha);

    await expect(loginPage.mensagemErro).toContainText('this user has been locked out');
  });

  test('deve exibir erro com credenciais inválidas', async ({ loginPage }) => {
    await loginPage.login(usuarios.inexistente.usuario, usuarios.inexistente.senha);

    await expect(loginPage.mensagemErro).toContainText(
      'Username and password do not match any user in this service',
    );
  });

  test('deve exigir o preenchimento do usuário', async ({ loginPage }) => {
    await loginPage.login('', usuarios.padrao.senha);

    await expect(loginPage.mensagemErro).toContainText('Username is required');
  });
});
