import { test, expect } from '../../fixtures/paginas';
import { cliente } from '../../data/usuarios';

test.describe('Checkout', () => {
  test.beforeEach(async ({ logado, carrinhoPage }) => {
    await logado.adicionarAoCarrinho('Sauce Labs Backpack');
    await logado.abrirCarrinho();
    await carrinhoPage.irParaCheckout();
  });

  test('deve concluir uma compra com sucesso (fluxo E2E)', async ({ page, checkoutPage }) => {
    await checkoutPage.preencherDados(cliente.nome, cliente.sobrenome, cliente.cep);

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkoutPage.subtotal).toContainText('29.99');

    await checkoutPage.finalizar();

    await expect(checkoutPage.mensagemConclusao).toHaveText('Thank you for your order!');
  });

  test('deve exigir o nome no formulário de checkout', async ({ checkoutPage }) => {
    await checkoutPage.preencherDados('', cliente.sobrenome, cliente.cep);

    await expect(checkoutPage.mensagemErro).toContainText('First Name is required');
  });
});
