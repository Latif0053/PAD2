import { api } from "./http";

const isDummyTutor = () => localStorage.getItem("auth_token") === "dummy-token-3";

const dummyTutorSummary = {
  total_students: 5,
  completed_sessions_this_month: 18,
  active_schedules: 7,
  submitted_reports: 14,
};

const dummyTutorDashboard = {
  taken_schedules: [
    {
      id: 201,
      student_user_id: 21,
      student_name: "Alya Ramadhani",
      subject_name: "Matematika",
      date: "2026-06-18",
      schedule_time: "16:00:00",
      status: "active",
      is_accepted: false,
    },
    {
      id: 202,
      student_user_id: 22,
      student_name: "Bima Santoso",
      subject_name: "Matematika",
      date: "2026-06-19",
      schedule_time: "19:00:00",
      status: "active",
      is_accepted: false,
    },
    {
      id: 203,
      student_user_id: 23,
      student_name: "Nara Wijaya",
      subject_name: "Matematika",
      date: "2026-06-17",
      schedule_time: "10:00:00",
      status: "active",
      is_accepted: true,
    },
    {
      id: 204,
      student_user_id: 24,
      student_name: "Dimas Arkan",
      subject_name: "Fisika",
      date: "2026-06-17",
      schedule_time: "14:00:00",
      status: "active",
      is_accepted: true,
    },
  ],
  students: [
    {
      student_user_id: 21,
      student_name: "Alya Ramadhani",
      subject_name: "Matematika",
      remaining_session: 6,
      total_session: 16,
      status: "Aktif",
    },
    {
      student_user_id: 22,
      student_name: "Bima Santoso",
      subject_name: "Matematika",
      remaining_session: 5,
      total_session: 12,
      status: "Aktif",
    },
    {
      student_user_id: 23,
      student_name: "Nara Wijaya",
      subject_name: "Matematika",
      remaining_session: 4,
      total_session: 8,
      status: "Aktif",
    },
  ],
};

/**
 * Get tutor dashboard summary (untuk statistik widget)
 */
export const getTutorSummary = async () => {
  if (isDummyTutor()) return dummyTutorSummary;

  try {
    const response = await api("/api/dashboard/tutor/summary");
    console.log("API Response for tutor summary:", response);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching tutor summary:", error);
    throw error;
  }
};

/**
 * Get full tutor dashboard data
 */
export const getTutorDashboard = async () => {
  if (isDummyTutor()) return dummyTutorDashboard;

  try {
    const response = await api("/api/dashboard/tutor");
    console.log("🔍 API Response for tutor dashboard:", response);
    console.log("🔍 Response data:", response.data);
    console.log("🔍 Taken schedules:", response.data?.taken_schedules);
    console.log(
      "🔍 Taken schedules count:",
      response.data?.taken_schedules?.length
    );

    // Log each schedule in detail
    if (response.data?.taken_schedules) {
      response.data.taken_schedules.forEach((schedule, index) => {
        console.log(`🔍 Schedule ${index + 1}:`, {
          id: schedule.id,
          student_name: schedule.student_name,
          subject_name: schedule.subject_name,
          date: schedule.date,
          schedule_time: schedule.schedule_time,
          status: schedule.status,
          is_accepted: schedule.is_accepted,
        });
      });
    }

    return response.data || {};
  } catch (error) {
    console.error("Error fetching tutor dashboard:", error);
    throw error;
  }
};

/**
 * Accept learning request
 */
export const acceptLearningRequest = async (requestId) => {
  if (isDummyTutor()) {
    return {
      status: "success",
      message: `Ajuan belajar dummy ${requestId} diterima`,
    };
  }

  try {
    const response = await api(`/api/tutor/requests/${requestId}/accept`, {
      method: "POST",
    });
    console.log("Accept request response:", response);
    return response;
  } catch (error) {
    console.error("Error accepting request:", error);
    throw error;
  }
};

/**
 * Reject learning request
 */
export const rejectLearningRequest = async (requestId) => {
  if (isDummyTutor()) {
    return {
      status: "success",
      message: `Ajuan belajar dummy ${requestId} ditolak`,
    };
  }

  try {
    const response = await api(`/api/tutor/requests/${requestId}/reject`, {
      method: "POST",
    });
    console.log("Reject request response:", response);
    return response;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};

/**
 * Get student detail by taken_schedule ID
 */
export const getStudentDetail = async (takenScheduleId) => {
  if (isDummyTutor()) {
    return (
      dummyTutorDashboard.students.find(
        (student) => Number(student.student_user_id) === Number(takenScheduleId)
      ) || {}
    );
  }

  try {
    const response = await api(`/api/tutor/students/${takenScheduleId}`);
    console.log("Student detail response:", response);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching student detail:", error);
    throw error;
  }
};

/**
 * Get student attendance data
 */
export const getStudentAttendance = async (studentUserId) => {
  if (isDummyTutor()) {
    return {
      student_user_id: studentUserId,
      present: 8,
      absent: 1,
      total_sessions: 9,
      history: [
        { date: "2026-06-03", status: "Hadir" },
        { date: "2026-06-10", status: "Hadir" },
        { date: "2026-06-15", status: "Tidak Hadir" },
      ],
    };
  }

  try {
    const response = await api(`/api/tutor/attendance/${studentUserId}`);
    console.log("Student attendance response:", response);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching student attendance:", error);
    throw error;
  }
};

/**
 * Save session report
 */
export const saveSessionReport = async (formData) => {
  if (isDummyTutor()) {
    return {
      status: "success",
      message: "Laporan sesi dummy tersimpan",
    };
  }

  try {
    const response = await api("/api/tutor/session-report", {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - browser will set it with boundary for FormData
    });
    console.log("Save session report response:", response);
    return response;
  } catch (error) {
    console.error("Error saving session report:", error);
    throw error;
  }
};

/**
 * Send meeting link to student
 */
export const sendMeetingLink = async (
  studentUserId,
  scheduleId,
  meetingLink
) => {
  if (isDummyTutor()) {
    return {
      status: "success",
      message: "Link meeting dummy terkirim",
      data: { studentUserId, scheduleId, meetingLink },
    };
  }

  try {
    const response = await api(`/api/tutor/meeting-link/${studentUserId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schedule_id: scheduleId,
        meeting_link: meetingLink,
      }),
    });
    console.log("Send meeting link response:", response);
    return response;
  } catch (error) {
    console.error("Error sending meeting link:", error);
    throw error;
  }
};
