import express from 'express';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3';

// Create PIX Payment
router.post('/create-pix', async (req, res) => {
  try {
    const { customer, total, description, reservationToken } = req.body;

    // 1. Create or Find Customer in Asaas
    const customerRes = await axios.post(`${ASAAS_API_URL}/customers`, {
      name: customer.name,
      cpfCnpj: customer.cpfCnpj,
      email: customer.email,
      mobilePhone: customer.phone
    }, {
      headers: { 'access_token': ASAAS_API_KEY }
    });

    const asaasCustomerId = customerRes.data.id;

    // 2. Create Payment (Billing)
    const paymentRes = await axios.post(`${ASAAS_API_URL}/payments`, {
      customer: asaasCustomerId,
      billingType: 'PIX',
      value: total,
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      description: description,
      externalReference: reservationToken // Link Asaas payment to our reservation token
    }, {
      headers: { 'access_token': ASAAS_API_KEY }
    });

    const paymentId = paymentRes.data.id;

    // 3. Get QR Code
    const qrCodeRes = await axios.get(`${ASAAS_API_URL}/payments/${paymentId}/pixQrCode`, {
      headers: { 'access_token': ASAAS_API_KEY }
    });

    // 4. Save Payment Relation to Supabase
    const { error: dbError } = await supabase.from('payments').insert({
      reservation_token: reservationToken,
      asaas_payment_id: paymentId,
      asaas_customer_id: asaasCustomerId,
      status: 'PENDING',
      amount: total,
      pix_payload: qrCodeRes.data.payload
    });

    if (dbError) console.error('Error saving payment to DB:', dbError);

    res.json({
      success: true,
      paymentId: paymentId,
      payload: qrCodeRes.data.payload,
      qrCodeImage: qrCodeRes.data.encodedImage
    });

  } catch (error) {
    console.error('Asaas Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: error.response?.data?.errors?.[0]?.description || 'Erro ao processar pagamento' 
    });
  }
});

// Check Payment Status (Manual Polling)
router.get('/payment-status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${ASAAS_API_URL}/payments/${id}`, {
      headers: { 'access_token': ASAAS_API_KEY }
    });
    res.json({ status: response.data.status });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar status' });
  }
});

// WEBHOOK - Automatic payment confirmation from Asaas
router.post('/webhook', async (req, res) => {
  try {
    const event = req.body;
    console.log('Asaas Webhook Event:', event.event);

    // Verify webhook token for security (if configured)
    const webhookToken = process.env.ASAAS_WEBHOOK_TOKEN;
    if (webhookToken && req.headers['asaas-access-token'] !== webhookToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const paymentId = event.payment.id;
    const externalReference = event.payment.externalReference; // This is our reservationToken

    if (event.event === 'PAYMENT_RECEIVED' || event.event === 'PAYMENT_CONFIRMED') {
      // 1. Update Payments Table
      await supabase
        .from('payments')
        .update({ status: 'CONFIRMED' })
        .eq('asaas_payment_id', paymentId);

      // 2. Update Reservations Table using the Token (externalReference)
      if (externalReference) {
        const { error: resError } = await supabase
          .from('reservations')
          .update({ status: 'confirmada' })
          .eq('token', externalReference);
        
        if (resError) console.error('Error updating reservation via webhook:', resError);
      }
    }

    if (event.event === 'PAYMENT_OVERDUE' || event.event === 'PAYMENT_DELETED') {
        await supabase
        .from('payments')
        .update({ status: 'FAILED' })
        .eq('asaas_payment_id', paymentId);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
