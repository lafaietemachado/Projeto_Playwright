import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly campoUsuario: Locator;
  readonly campoSenha: Locator;
  readonly botaoLogin: Locator;
  readonly mensagemErro: Locator;

  constructor(page: Page) {
    this.page = page;
    this.campoUsuario = page.getByTestId('username');
    this.campoSenha = page.getByTestId('password');
    this.botaoLogin = page.getByTestId('login-button');
    this.mensagemErro = page.getByTestId('error');
  }

  async acessar() {
    await this.page.goto('/');
  }

  async login(usuario: string, senha: string) {
    await this.campoUsuario.fill(usuario);
    await this.campoSenha.fill(senha);
    await this.botaoLogin.click();
  }
}
