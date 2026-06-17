import api from "./api";

/**
 * Get all notifications (paginated)
 * @param {number} page - Page number
 * @returns {Promise}
 */
export const getNotifications = async (page = 1) => {
  try {
    const response = await api.get(`/notifications`, { params: { page } });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

/**
 * Get unread notifications count
 * @returns {Promise}
 */
export const getUnreadCount = async () => {
  try {
    const response = await api.get(`/notifications/unread-count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    throw error;
  }
};

/**
 * Mark specific notification as read
 * @param {number} id - Notification ID
 * @returns {Promise}
 */
export const markAsRead = async (id) => {
  try {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

/**
 * Mark all notifications as read
 * @returns {Promise}
 */
export const markAllAsRead = async () => {
  try {
    const response = await api.patch(`/notifications/read-all`);
    return response.data;
  } catch (error) {
    console.error("Error marking all as read:", error);
    throw error;
  }
};

/**
 * Delete specific notification
 * @param {number} id - Notification ID
 * @returns {Promise}
 */
export const deleteNotification = async (id) => {
  try {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

/**
 * Delete all read notifications
 * @returns {Promise}
 */
export const deleteAllRead = async () => {
  try {
    const response = await api.delete(`/notifications/read-all`);
    return response.data;
  } catch (error) {
    console.error("Error deleting all read notifications:", error);
    throw error;
  }
};
