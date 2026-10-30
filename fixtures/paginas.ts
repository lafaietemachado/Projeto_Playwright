import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProdutosPage } from '../pages/ProdutosPage';
import { CarrinhoPage } from '../pages/CarrinhoPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { usuarios } from '../data/usuarios';

type Paginas = {
  loginPage: LoginPage;
  produtosPage: ProdutosPage;
  carrinhoPage: CarrinhoPage;
  checkoutPage: CheckoutPage;
  /** Já entra logado com o usuário padrão e cai na tela de produtos. */
  logado: ProdutosPage;
};

/**
 * Fixtures customizadas: cada teste recebe os Page Objects prontos,
 * sem precisar instanciar nada manualmente.
 */
export const test = base.extend<Paginas>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  produtosPage: async ({ page }, use) => {
    await use(new ProdutosPage(page));
  },
  carrinhoPage: async ({ page }, use) => {
    await use(new CarrinhoPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  logado: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.acessar();
    await login.login(usuarios.padrao.usuario, usuarios.padrao.senha);
    await use(new ProdutosPage(page));
  },
});

export { expect } from '@playwright/test';
