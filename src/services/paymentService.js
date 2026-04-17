import { api } from "./http";

/**
 * Get payment history for the current student
 * Mengambil riwayat pembayaran lengkap dengan info package, subject, dan tutor
 */
export async function getPaymentHistory() {
  try {
    const response = await api("/api/payment/history");
    return response;
  } catch (error) {
    console.error("Error fetching payment history:", error);
    throw error;
  }
}

/**
 * Get payment detail by ID
 * @param {number} paymentId - ID of the payment
 */
export async function getPaymentDetail(paymentId) {
  try {
    const response = await api(`/api/payment/history/detail?payment_id=${paymentId}`);
    return response;
  } catch (error) {
    console.error("Error fetching payment detail:", error);
    throw error;
  }
}

/**
 * Create order for package
 * @param {Object} orderData - Order data
 * @param {number} orderData.package_id - Package ID
 * @param {number} orderData.total_amount - Total amount after discount
 * @param {string} orderData.payment_method - Payment method (transfer, e-wallet, cash)
 */
export async function createOrder(orderData) {
  try {
    const response = await api("/api/package/order", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
    return response;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

/**
 * Upload payment proof
 * @param {FormData} formData - Form data containing order_id and file_upload
 */
export async function uploadPaymentProof(formData) {
  try {
    const response = await api("/api/package/payment", {
      method: "POST",
      body: formData,
    });
    return response;
  } catch (error) {
    console.error("Error uploading payment proof:", error);
    throw error;
  }
}
