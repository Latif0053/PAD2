import { api } from "./http";

const isDummyAdmin = () => localStorage.getItem("auth_token") === "dummy-token-1";

const unwrapData = (response, fallback = null) => response?.data ?? response ?? fallback;

const dummyAdmin = {
  analytics: {
    totalStudents: 128,
    totalTutors: 36,
    monthlyTransactions: 42500000,
    averageRating: 4.8,
    pendingStudents: 7,
    pendingTutors: 4,
    pendingSalaries: 5,
  },
  tutors: [
    {
      id: 11,
      user_id: 11,
      name: "Nadia Putri",
      subject: "Matematika",
      status: "Menunggu",
      email: "nadia.tutor@example.com",
      created_at: "2026-06-14",
    },
    {
      id: 12,
      user_id: 12,
      name: "Raka Pratama",
      subject: "Fisika",
      status: "Menunggu",
      email: "raka.tutor@example.com",
      created_at: "2026-06-15",
    },
  ],
  students: [
    {
      id: 21,
      name: "Alya Ramadhani",
      studentName: "Alya Ramadhani",
      package: "Paket Intensif SMA",
      status: "Menunggu",
      amount: 1500000,
      created_at: "2026-06-12",
    },
    {
      id: 22,
      name: "Bima Santoso",
      studentName: "Bima Santoso",
      package: "Paket Reguler SMP",
      status: "Terverifikasi",
      amount: 950000,
      created_at: "2026-06-10",
    },
  ],
  salaries: [
    {
      id: 31,
      user_id: 31,
      name: "Dewi Anggraeni",
      meetings: 18,
      earnings: 3600000,
      status: "pending",
    },
    {
      id: 32,
      user_id: 32,
      name: "Yoga Saputra",
      meetings: 14,
      earnings: 2800000,
      status: "paid",
    },
  ],
};

/**
 * Get admin dashboard statistics
 */
export const getAdminStatistics = async () => {
  if (isDummyAdmin()) return dummyAdmin.analytics;

  try {
    const response = await api("/admin/statistics");
    return unwrapData(response, {});
  } catch (error) {
    console.error("Error fetching admin statistics:", error);
    throw error;
  }
};

/**
 * Get pending tutor verifications
 */
export const getPendingTutors = async () => {
  if (isDummyAdmin()) return dummyAdmin.tutors;

  try {
    const response = await api("/api/verify/tutor");
    return unwrapData(response, []);
  } catch (error) {
    console.error("Error fetching pending tutors:", error);
    return [];
  }
};

/**
 * Get pending payment verifications
 */
export const getPendingPayments = async () => {
  if (isDummyAdmin()) return dummyAdmin.students;

  try {
    const response = await api("/admin/dashboard/pending-payments");
    return unwrapData(response, []);
  } catch (error) {
    console.error("Error fetching pending payments:", error);
    return [];
  }
};

/**
 * Get transactions for admin (with optional filters)
 * @param {Object} params - Query parameters (status, search, page, per_page)
 */
export const getTransactions = async (params = {}) => {
  if (isDummyAdmin()) return dummyAdmin.students;

  try {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', params.page);
    if (params.per_page) query.append('per_page', params.per_page);

    // Backend provides pending payments list under /admin/dashboard/pending-payments
    const url = `/admin/dashboard/pending-payments${query.toString() ? `?${query.toString()}` : ''}`;
    const response = await api(url);
    return unwrapData(response, []);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

/**
 * Approve tutor
 * @param {number} userId - User ID of the tutor
 */
export const approveTutor = async (userId) => {
  if (isDummyAdmin()) return { status: "success", message: "Tutor dummy disetujui" };

  try {
    const response = await api("/api/verify/tutor/approve", {
      method: "PATCH",
      body: JSON.stringify({ user_id: userId }),
    });
    return response;
  } catch (error) {
    console.error("Error approving tutor:", error);
    throw error;
  }
};

/**
 * Reject tutor
 * @param {number} userId - User ID of the tutor
 */
export const rejectTutor = async (userId, reason = "") => {
  if (isDummyAdmin()) return { status: "success", message: "Tutor dummy ditolak" };

  try {
    const response = await api("/api/verify/tutor/reject", {
      method: "PATCH",
      body: JSON.stringify({ user_id: userId, reason }),
    });
    return response;
  } catch (error) {
    console.error("Error rejecting tutor:", error);
    throw error;
  }
};

/**
 * Verify payment
 * @param {number} paymentId - Payment ID
 */
export const verifyPayment = async (paymentId, payload = {}) => {
  if (isDummyAdmin()) return { status: "success", message: "Pembayaran dummy diverifikasi" };

  try {
    const body = { payment_id: paymentId, ...(payload || {}) };
    const response = await api(`/admin/payment/verify`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return unwrapData(response, {});
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

/**
 * Reject payment (Delete payment data)
 * @param {number} paymentId - Payment ID
 */
export const rejectPayment = async (paymentId, reason = '') => {
  if (isDummyAdmin()) return { status: "success", message: "Pembayaran dummy ditolak" };

  try {
    const response = await api(`/admin/payment/reject`, {
      method: "PATCH",
      body: JSON.stringify({ payment_id: paymentId, reason }),
    });
    return unwrapData(response, {});
  } catch (error) {
    console.error("Error rejecting payment:", error);
    throw error;
  }
};

/**
 * Get tutor detail
 * @param {number} userId - User ID of the tutor
 */
export const getTutorDetail = async (userId) => {
  if (isDummyAdmin()) {
    return dummyAdmin.tutors.find((tutor) => Number(tutor.id || tutor.user_id) === Number(userId)) || {};
  }

  try {
    const response = await api(`/api/verify/tutor`);
    const tutors = unwrapData(response, []);
    return tutors.find((tutor) => Number(tutor.id || tutor.user_id) === Number(userId)) || {};
  } catch (error) {
    console.error("Error fetching tutor detail:", error);
    throw error;
  }
};

/**
 * Get payment detail by ID
 * @param {number} paymentId - Payment ID
 */
export const getPaymentDetail = async (paymentId) => {
  if (isDummyAdmin()) {
    const payment = dummyAdmin.students.find((item) => Number(item.id) === Number(paymentId)) || dummyAdmin.students[0];
    return {
      payment: {
        id: payment.id,
        package_name: payment.package,
        status: payment.status,
        proof_url: payment.proofUrl || "",
        amount: payment.amount,
      },
      student: {
        nama_lengkap: payment.name,
        email: payment.email || "siswa@example.com",
        jenis_kelamin: "Perempuan",
        tanggal_lahir: "2010-05-12",
        no_telepon: "081234567890",
        agama: "Islam",
        provinsi: "DKI Jakarta",
        kota: "Jakarta Selatan",
        kecamatan: "Kebayoran Baru",
        desa: "Gandaria",
        alamat_lengkap: "Jl. Dummy Lazuardy No. 1",
        jenjang: "SMA",
        kelas: "XI",
        nama_orang_tua: "Orang Tua Dummy",
        nomor_orang_tua: "081299990000",
      },
    };
  }

  try {
    const response = await api(`/admin/payment/${paymentId}`);
    return unwrapData(response, {});
  } catch (error) {
    console.error("Error fetching payment detail:", error);
    throw error;
  }
};

/**
 * Get admin note for a payment
 * @param {number|string} paymentId
 */
export const getAdminNote = async (paymentId) => {
  if (isDummyAdmin()) {
    // keep same sessionStorage key used in UI for dev convenience
    return sessionStorage.getItem(`admin_tx_note_${paymentId}`) || '';
  }

  try {
    // Try to get admin note from payment detail response
    const response = await api(`/admin/payment/${paymentId}`);
    const data = unwrapData(response, {});
    const payment = data.payment || data;
    return payment?.admin_note || payment?.note || data.note || '';
  } catch (error) {
    console.error('Error fetching admin note:', error);
    return '';
  }
};

/**
 * Save admin note for a payment
 * @param {number|string} paymentId
 * @param {string} note
 */
export const saveAdminNote = async (paymentId, note = '') => {
  if (isDummyAdmin()) {
    sessionStorage.setItem(`admin_tx_note_${paymentId}`, note || '');
    return { status: 'success' };
  }

  try {
    // Update payment record with admin_note via PATCH
    const response = await api(`/admin/payment/${paymentId}`, {
      method: 'PATCH',
      body: JSON.stringify({ admin_note: note }),
    });
    return unwrapData(response, {});
  } catch (error) {
    console.error('Error saving admin note:', error);
    throw error;
  }
};

/**
 * Get all tutors for management (Kelola Tutor)
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search by name
 * @param {string} params.subject - Filter by subject ID
 */
export const getAllTutors = async (params = {}) => {
  if (isDummyAdmin()) return dummyAdmin.salaries;

  try {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append("search", params.search);
    if (params.subject) queryParams.append("subject", params.subject);

    const url = `/api/admin/tutor-salary${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await api(url);
    return unwrapData(response, []);
  } catch (error) {
    console.error("Error fetching all tutors:", error);
    return [];
  }
};

/**
 * Get tutor detail for admin
 * @param {number} tutorId - Tutor ID
 */
export const getAdminTutorDetail = async (tutorId) => {
  if (isDummyAdmin()) {
    return dummyAdmin.salaries.find((tutor) => Number(tutor.id || tutor.user_id) === Number(tutorId)) || {};
  }

  try {
    const response = await api(`/api/admin/tutor-salary/${tutorId}`);
    return unwrapData(response, {});
  } catch (error) {
    console.error("Error fetching tutor detail:", error);
    throw error;
  }
};

/**
 * Get subjects list
 */
export const getSubjects = async () => {
  try {
    const response = await api("/api/subjects");
    console.log("API Response for subjects:", response);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return [];
  }
};

/**
 * Get tutor management summary for dashboard
 * Note: This endpoint may not exist yet in backend
 * Returns empty array if endpoint is not available
 */
export const getTutorManagementSummary = async () => {
  if (isDummyAdmin()) return dummyAdmin.salaries;

  try {
    const response = await api("/api/admin/tutor-salary");
    return unwrapData(response, []);
  } catch (error) {
    console.error("Error fetching tutor management summary:", error);
    return [];
  }
};

export const getPendingSalaryPayments = async () => {
  if (isDummyAdmin()) {
    return dummyAdmin.salaries.filter((salary) => salary.status === "pending");
  }

  try {
    const response = await api("/api/admin/tutor-salary/pending-payment");
    return unwrapData(response, []);
  } catch (error) {
    console.error("Error fetching pending salary payments:", error);
    return [];
  }
};

export const confirmTutorSalary = async (userId, payload = {}) => {
  if (isDummyAdmin()) return { status: "success", message: "Gaji tutor dummy dikonfirmasi" };

  try {
    return await api(`/api/admin/tutor-salary/${userId}/confirm`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Error confirming tutor salary:", error);
    throw error;
  }
};

/**
 * Get tutor salary history
 * @param {number} tutorId - Tutor user ID
 */
export const getTutorSalaryHistory = async (tutorId) => {
  try {
    const response = await api(`/api/admin/tutor-salary/${tutorId}/history`);
    return unwrapData(response, []);
  } catch (error) {
    console.error("Error fetching salary history:", error);
    return [];
  }
};

/**
 * Submit salary invoice
 * @param {Object} data - Invoice data
 * @param {number} data.tutor_id - Tutor user ID
 * @param {number} data.amount - Salary amount
 * @param {string} data.paid_at - Payment date (YYYY-MM-DD)
 * @param {File} data.file - Invoice file (PDF/image)
 * @param {string} data.notes - Optional notes
 */
export const submitSalaryInvoice = async (data) => {
  try {
    const formData = new FormData();
    formData.append("amount", data.amount);
    formData.append("paid_at", data.paid_at);
    formData.append("file", data.file);
    if (data.notes) {
      formData.append("notes", data.notes);
    }

    const response = await api(
      `/api/admin/tutor-salary/${data.tutor_id}/confirm-with-invoice`,
      {
      method: "POST",
      body: formData,
      }
    );
    return response;
  } catch (error) {
    console.error("Error submitting salary invoice:", error);
    throw error;
  }
};
