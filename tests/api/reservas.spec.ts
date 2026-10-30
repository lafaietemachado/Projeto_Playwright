import { test, expect, type APIRequestContext } from '@playwright/test';

/**
 * Testes de API REST no Restful-Booker (API pública de treino).
 * Cobre o CRUD completo de uma reserva, incluindo autenticação por token.
 * As credenciais admin/password123 são públicas e documentadas pela própria API.
 */

const novaReserva = {
  firstname: 'Lafaiete',
  lastname: 'QA',
  totalprice: 350,
  depositpaid: true,
  bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
  additionalneeds: 'Café da manhã',
};

async function gerarToken(request: APIRequestContext): Promise<string> {
  const resposta = await request.post('/auth', {
    data: { username: 'admin', password: 'password123' },
  });
  expect(resposta.ok()).toBeTruthy();
  const { token } = await resposta.json();
  expect(token).toBeTruthy();
  return token;
}

test.describe('API de reservas (Restful-Booker)', () => {
  test('health check: a API deve estar no ar', async ({ request }) => {
    const resposta = await request.get('/ping');
    expect(resposta.status()).toBe(201);
  });

  test('deve gerar token de autenticação', async ({ request }) => {
    const token = await gerarToken(request);
    expect(typeof token).toBe('string');
  });

  test('deve recusar autenticação com credenciais inválidas', async ({ request }) => {
    const resposta = await request.post('/auth', {
      data: { username: 'admin', password: 'senha_errada' },
    });
    const corpo = await resposta.json();
    expect(corpo.reason).toBe('Bad credentials');
  });

  test('deve executar o CRUD completo de uma reserva', async ({ request }) => {
    // CREATE
    const criacao = await request.post('/booking', { data: novaReserva });
    expect(criacao.ok()).toBeTruthy();
    const { bookingid, booking } = await criacao.json();
    expect(bookingid).toBeGreaterThan(0);
    expect(booking).toMatchObject(novaReserva);

    // READ
    const consulta = await request.get(`/booking/${bookingid}`);
    expect(consulta.ok()).toBeTruthy();
    expect(await consulta.json()).toMatchObject(novaReserva);

    // UPDATE (PATCH parcial, exige token)
    const token = await gerarToken(request);
    const atualizacao = await request.patch(`/booking/${bookingid}`, {
      headers: { Cookie: `token=${token}` },
      data: { totalprice: 500, additionalneeds: 'Jantar' },
    });
    expect(atualizacao.ok()).toBeTruthy();
    const atualizada = await atualizacao.json();
    expect(atualizada.totalprice).toBe(500);
    expect(atualizada.additionalneeds).toBe('Jantar');
    expect(atualizada.firstname).toBe(novaReserva.firstname);

    // DELETE
    const exclusao = await request.delete(`/booking/${bookingid}`, {
      headers: { Cookie: `token=${token}` },
    });
    expect(exclusao.status()).toBe(201);

    // Confirma que a reserva não existe mais
    const consultaFinal = await request.get(`/booking/${bookingid}`);
    expect(consultaFinal.status()).toBe(404);
  });

  test('não deve permitir excluir reserva sem token', async ({ request }) => {
    const criacao = await request.post('/booking', { data: novaReserva });
    const { bookingid } = await criacao.json();

    const exclusao = await request.delete(`/booking/${bookingid}`);
    expect(exclusao.status()).toBe(403);
  });
});
