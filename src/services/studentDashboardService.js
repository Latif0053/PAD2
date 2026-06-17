import { api } from "./http";

const isDummyStudent = () => localStorage.getItem("auth_token") === "dummy-token-2";

const dummyStudentDashboard = {
  packages: [
    {
      id: 1,
      package_name: "Paket Intensif Matematika SMA",
      subject_name: "Matematika",
      tutor_name: "Bu Nadia Putri",
      package_session: 16,
      remaining_session: 6,
      status: "active",
    },
  ],
  upcoming_schedules: [
    {
      id: 101,
      subject_name: "Matematika",
      tutor_name: "Bu Nadia Putri",
      date: "2026-06-18",
      schedule_time: "16:00:00",
      status: "active",
    },
    {
      id: 102,
      subject_name: "Fisika",
      tutor_name: "Pak Raka Pratama",
      date: "2026-06-20",
      schedule_time: "19:00:00",
      status: "active",
    },
    {
      id: 103,
      subject_name: "Bahasa Inggris",
      tutor_name: "Ms. Citra",
      date: "2026-06-22",
      schedule_time: "17:30:00",
      status: "active",
    },
  ],
};

const dummyRecommendedTutors = [
  {
    id: 11,
    tutor_id: 11,
    tutor_name: "Nadia Putri",
    name: "Nadia Putri",
    subject_name: "Matematika",
    keahlian: "Matematika SMA",
    rating: 4.9,
    total_reviews: 42,
    total_students: 18,
    total_sessions: 124,
    photo: "https://ui-avatars.com/api/?name=Nadia+Putri&background=1D9E75&color=fff&size=128&bold=true",
  },
  {
    id: 12,
    tutor_id: 12,
    tutor_name: "Raka Pratama",
    name: "Raka Pratama",
    subject_name: "Fisika",
    keahlian: "Fisika dan Olimpiade",
    rating: 4.8,
    total_reviews: 31,
    total_students: 15,
    total_sessions: 98,
    photo: "https://ui-avatars.com/api/?name=Raka+Pratama&background=0C447C&color=fff&size=128&bold=true",
  },
  {
    id: 13,
    tutor_id: 13,
    tutor_name: "Citra Anindya",
    name: "Citra Anindya",
    subject_name: "Bahasa Inggris",
    keahlian: "Conversation dan Grammar",
    rating: 4.7,
    total_reviews: 26,
    total_students: 12,
    total_sessions: 76,
    photo: "https://ui-avatars.com/api/?name=Citra+Anindya&background=EF9F27&color=fff&size=128&bold=true",
  },
];

// Summary dashboard student
export async function getStudentSummary() {
  if (isDummyStudent()) {
    return {
      status: "success",
      data: {
        active_packages: 1,
        upcoming_schedules: dummyStudentDashboard.upcoming_schedules.length,
        completed_sessions: 10,
      },
    };
  }

  // backend: GET /api/dashboard/student/summary
  const res = await api("/api/dashboard/student/summary");
  return res; // biasanya { status, data: {...} }
}

export async function getStudentDashboard() {
  if (isDummyStudent()) {
    return {
      status: "success",
      data: dummyStudentDashboard,
    };
  }

  return api("/api/dashboard/student");
}

// Tutor rekomendasi
export async function getRecommendedTutors(page = 1) {
  if (isDummyStudent()) {
    return {
      status: "success",
      data: dummyRecommendedTutors,
      pagination: {
        current_page: page,
        total: dummyRecommendedTutors.length,
      },
    };
  }

  const res = await api(
    `/api/dashboard/student/recommended-tutors?page=${page}`
  );
  return res; // biasanya { status, data: [...], pagination: {...} }
}
