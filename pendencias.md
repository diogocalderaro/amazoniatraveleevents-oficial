# Pendências do Projeto - Amazonia Travel e Events

Lista de tarefas e configurações pendentes para a finalização do projeto.

## Configurações Externas
- [x] **Verificar domínio no Resend:** Registros DNS adicionados na Hostgator. Domínio `amazoniatraveleevents.com` em processo de verificação final.
- [x] **Configurar Secrets no Supabase:** `RESEND_API_KEY` ativa.
- [x] **Edge Functions atualizadas:** Remetente "Amazônia Travel e Events" configurado.

## Funcionalidades
- [x] **Validação de Token:** Interface no painel de Reservas funcional e estilizada.
- [x] **Relatórios de Vendas:** Gráficos de receita e status operacionais.

## Melhorias de UI/UX
- [x] **Otimização de Imagens:** Imagens do Hero e Galeria revisadas. Adicionado suporte a SEO dinâmico com `react-helmet-async`.
- [x] **SEO:** Implementado meta tags dinâmicas para Home e detalhes de pacotes.

## Pagamentos
- [ ] **Integração com PayPal:** Implementar checkout (Cartões de Crédito/Débito) usando a biblioteca `@paypal/react-paypal-js`. Requer criação de Conta Empresa no PayPal e configuração de Webhooks através de Supabase Edge Functions para atualizar o status das reservas.

---

## Instruções: Verificar Domínio no Resend (Hostgator)

### Passo 1 — Acessar o Resend
1. Acesse [resend.com/domains](https://resend.com/domains)
2. Clique em **"Add Domain"**
3. Digite: `amazoniatraveleevents.com`
4. O Resend vai gerar registros DNS (geralmente 3 registros)

### Passo 2 — Configurar DNS na Hostgator
1. Acesse o **Portal do Cliente da Hostgator** e vá para o **cPanel**.
2. Na seção **Domínios**, clique em **Zone Editor** (Editor de Zonas DNS).
3. Encontre o domínio `amazoniatraveleevents.com` e clique em **Gerenciar**.
4. Clique em **Adicionar Registro** e insira as informações fornecidas pelo Resend:
   - **Tipo**: TXT ou CNAME (conforme indicado no Resend)
   - **Nome**: O valor que o Resend indicar (ex: `resend._domainkey`)
   - **Registro/Valor**: O código longo gerado pelo Resend
   - **TTL**: Deixe o padrão (ex: 14400)
5. Salve cada registro.

### Passo 3 — Verificar
1. Volte ao Resend e clique em **"Verify"**
2. A propagação pode levar de 5 minutos a 24 horas
3. Quando o status mudar para **"Verified"** ✅, os e-mails passarão a ser enviados como `@amazoniatraveleevents.com`

### Limites do Resend (Plano Free)
| Recurso | Limite |
|---|---|
| E-mails por dia | **100/dia** |
| E-mails por mês | **3.000/mês** |
| Domínios verificados | **1** |
| Plano Pro | $20/mês → 50.000 e-mails/mês |
