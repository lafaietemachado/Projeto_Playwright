import { type Locator, type Page } from '@playwright/test';

export type Ordenacao = 'az' | 'za' | 'lohi' | 'hilo';

export class ProdutosPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly nomesProdutos: Locator;
  readonly precosProdutos: Locator;
  readonly seletorOrdenacao: Locator;
  readonly iconeCarrinho: Locator;
  readonly contadorCarrinho: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titulo = page.getByTestId('title');
    this.nomesProdutos = page.getByTestId('inventory-item-name');
    this.precosProdutos = page.getByTestId('inventory-item-price');
    this.seletorOrdenacao = page.getByTestId('product-sort-container');
    this.iconeCarrinho = page.getByTestId('shopping-cart-link');
    this.contadorCarrinho = page.getByTestId('shopping-cart-badge');
  }

  /** Converte "Sauce Labs Backpack" em "sauce-labs-backpack" (padrão dos data-test do site). */
  private slug(nomeProduto: string) {
    return nomeProduto.toLowerCase().replace(/\s+/g, '-');
  }

  async adicionarAoCarrinho(nomeProduto: string) {
    await this.page.getByTestId(`add-to-cart-${this.slug(nomeProduto)}`).click();
  }

  async removerDoCarrinho(nomeProduto: string) {
    await this.page.getByTestId(`remove-${this.slug(nomeProduto)}`).click();
  }

  async ordenarPor(opcao: Ordenacao) {
    await this.seletorOrdenacao.selectOption(opcao);
  }

  async obterPrecos(): Promise<number[]> {
    const textos = await this.precosProdutos.allTextContents();
    return textos.map((t) => Number(t.replace('$', '')));
  }

  async abrirCarrinho() {
    await this.iconeCarrinho.click();
  }
}
