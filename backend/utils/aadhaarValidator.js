// LEGAL MOCK: This function only validates Aadhaar format and simulates KYC.
// Replace with official UIDAI/KYC API integration for production.

// Aadhaar format validation (UIDAI standard)
function isValidAadhaar(aadhaarNumber) {
  // UIDAI: 12 digits, not all digits same, not in blacklist
  const regex = /^(?!0{12}|1{12}|2{12}|3{12}|4{12}|5{12}|6{12}|7{12}|8{12}|9{12})\d{12}$/;
  return regex.test(aadhaarNumber);
}

module.exports = { isValidAadhaar };
