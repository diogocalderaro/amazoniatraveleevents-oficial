import express from 'express';
import axios from 'axios';

const router = express.Router();

const ASAAS_API_KEY = process.env.ASAAS_API_KEY || '$aae.U2FsdGVkX19PPrEay6f9aUq8pZ6I8pZ6I8pZ6I8pZ6I=';
const ASAAS_API_URL = 'https://www.asaas.com/api/v3';

// Create PIX Payment
router.post('/create-pix', async (req, res) => {
  try {
    const { customer, total, description } = req.body;

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
      description: description
    }, {
      headers: { 'access_token': ASAAS_API_KEY }
    });

    const paymentId = paymentRes.data.id;

    // 3. Get QR Code
    const qrCodeRes = await axios.get(`${ASAAS_API_URL}/payments/${paymentId}/pixQrCode`, {
      headers: { 'access_token': ASAAS_API_KEY }
    });

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

// Check Payment Status
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

export default router;
