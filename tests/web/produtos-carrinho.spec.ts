import { test, expect } from '../../fixtures/paginas';

test.describe('Produtos e carrinho', () => {
  test('deve adicionar produtos e atualizar o contador do carrinho', async ({ logado }) => {
    await logado.adicionarAoCarrinho('Sauce Labs Backpack');
    await logado.adicionarAoCarrinho('Sauce Labs Bike Light');

    await expect(logado.contadorCarrinho).toHaveText('2');
  });

  test('deve remover produto do carrinho', async ({ logado }) => {
    await logado.adicionarAoCarrinho('Sauce Labs Backpack');
    await expect(logado.contadorCarrinho).toHaveText('1');

    await logado.removerDoCarrinho('Sauce Labs Backpack');

    await expect(logado.contadorCarrinho).toBeHidden();
  });

  test('deve listar no carrinho os produtos adicionados', async ({ logado, carrinhoPage }) => {
    await logado.adicionarAoCarrinho('Sauce Labs Backpack');
    await logado.adicionarAoCarrinho('Sauce Labs Fleece Jacket');
    await logado.abrirCarrinho();

    await expect(carrinhoPage.itens).toHaveCount(2);
    await expect(carrinhoPage.nomesItens).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Fleece Jacket',
    ]);
  });

  test('deve ordenar produtos por preço do menor para o maior', async ({ logado }) => {
    await logado.ordenarPor('lohi');

    const precos = await logado.obterPrecos();
    const ordenados = [...precos].sort((a, b) => a - b);
    expect(precos).toEqual(ordenados);
  });
});
