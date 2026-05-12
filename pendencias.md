# Pendências PIX Asaas (Para a próxima sessão)

Este documento guarda as próximas etapas do desenvolvimento da integração com o Asaas, continuando do ponto em que o QR Code e o fluxo de criação da cobrança via Sandbox foram finalizados e isolados no componente `AsaasPayment`.

### 1. Migrar para Produção e Testar PIX Real
- [ ] Criar conta oficial no Asaas (produção, se ainda não houver).
- [ ] Gerar uma **Chave de API Oficial** (Painel de Configurações do Asaas).
- [ ] Atualizar o painel de variáveis da Vercel (`Settings > Environment Variables`):
  - `ASAAS_API_KEY`: colocar a chave de Produção Oficial.
  - `ASAAS_API_URL`: mudar de `https://sandbox.asaas.com/api/v3` para `https://www.asaas.com/api/v3`.
- [ ] Realizar um pedido de teste de baixo valor (R$ 1,00) pagando com o aplicativo do banco para verificar a comunicação com o Banco Central real.

### 2. Implementar e Configurar Webhook
- [ ] Configurar a rota do Webhook (`/api/asaas/webhook`) no código (`server/routes/asaas.js`). Esta rota será encarregada de receber a confirmação de que o dinheiro caiu na conta.
- [ ] Processar no Webhook a atualização no banco de dados (Supabase), mudando o `status` da reserva de *'Aguardando Pagamento'* para *'Confirmada'*.
- [ ] Cadastrar a URL desse Webhook no painel do Asaas (`https://amazoniatraveleevents-oficial.vercel.app/api/asaas/webhook`) para receber os eventos.

### 3. Ajustes de UI e Limpeza Final
- [ ] Validar a leitura e transição da tela do checkout ("Escaneie o QR Code" → "Pagamento Confirmado") após a mudança para Produção.
- [ ] Remover logs do console ou código de depuração deixado durante os testes no Sandbox.
- [ ] Testar cenários de expiração (quando o cliente não paga a tempo).


