import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly campoNome: Locator;
  readonly campoSobrenome: Locator;
  readonly campoCep: Locator;
  readonly botaoContinuar: Locator;
  readonly botaoFinalizar: Locator;
  readonly mensagemErro: Locator;
  readonly subtotal: Locator;
  readonly mensagemConclusao: Locator;

  constructor(page: Page) {
    this.page = page;
    this.campoNome = page.getByTestId('firstName');
    this.campoSobrenome = page.getByTestId('lastName');
    this.campoCep = page.getByTestId('postalCode');
    this.botaoContinuar = page.getByTestId('continue');
    this.botaoFinalizar = page.getByTestId('finish');
    this.mensagemErro = page.getByTestId('error');
    this.subtotal = page.getByTestId('subtotal-label');
    this.mensagemConclusao = page.getByTestId('complete-header');
  }

  async preencherDados(nome: string, sobrenome: string, cep: string) {
    await this.campoNome.fill(nome);
    await this.campoSobrenome.fill(sobrenome);
    await this.campoCep.fill(cep);
    await this.botaoContinuar.click();
  }

  async finalizar() {
    await this.botaoFinalizar.click();
  }
}
