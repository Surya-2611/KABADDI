const express = require('express');
const router = express.Router();
const { isValidAadhaar } = require('../utils/aadhaarValidator');

// MOCK Aadhaar KYC Verification Endpoint
// This simulates UIDAI verification. Replace with official KYC API for production.
router.post('/verify', async (req, res, next) => {
  try {
    const { aadhaarNumber } = req.body;
    if (!aadhaarNumber || typeof aadhaarNumber !== 'string') {
      return res.status(400).json({ error: 'Aadhaar number is required.' });
    }
    if (!isValidAadhaar(aadhaarNumber)) {
      return res.status(400).json({ error: 'Invalid Aadhaar number format.' });
    }
    // Simulate KYC success
    const last4 = aadhaarNumber.slice(-4);
    return res.status(200).json({ success: true, aadhaarLast4: last4 });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
