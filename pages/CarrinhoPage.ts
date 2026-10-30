import { type Locator, type Page } from '@playwright/test';

export class CarrinhoPage {
  readonly page: Page;
  readonly itens: Locator;
  readonly nomesItens: Locator;
  readonly botaoCheckout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itens = page.getByTestId('inventory-item');
    this.nomesItens = page.getByTestId('inventory-item-name');
    this.botaoCheckout = page.getByTestId('checkout');
  }

  async irParaCheckout() {
    await this.botaoCheckout.click();
  }
}
