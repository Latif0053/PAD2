import { api } from "./http";

function getDummyAuthUser() {
  const token = localStorage.getItem("auth_token") || "";
  if (token === "dummy-token-1") {
    return {
      id: 1,
      name: "Admin Lazuardy",
      email: "admin@lazuardy.test",
      role: "admin",
    };
  }
  if (token === "dummy-token-2") {
    return {
      id: 2,
      name: "Siswa Dummy",
      email: "siswa@lazuardy.test",
      role: "student",
    };
  }
  if (token === "dummy-token-3") {
    return {
      id: 3,
      name: "Guru Dummy",
      email: "guru@lazuardy.test",
      role: "tutor",
      status: "active",
    };
  }
  return null;
}

// Ambil user yang sedang login
export async function getMe() {
  const dummyUser = getDummyAuthUser();
  if (dummyUser) {
    return { user: dummyUser };
  }

  try {
    // backend: GET /api/me
    const response = await api("/api/me");
    return response;
  } catch (error) {
    console.error("getMe error:", error);
    // Jangan throw error, return data default
    return {
      user: {
        name: "User",
        email: "",
      },
    };
  }
}

// Login (dipakai di LoginPage.vue)
export async function login(payload) {
  const res = await api("/api/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // Sesuaikan dengan response backend-mu
  // misal: { token, user }
  if (res.token) {
    localStorage.setItem("auth_token", res.token);
  }

  return res;
}

// Logout
export async function logout() {
  await api("/api/logout", { method: "POST" });
  localStorage.removeItem("auth_token");
}

// Update profile
export async function updateProfile(payload) {
  // backend: PUT /api/profile atau POST /api/profile/update
  return api("/api/profile", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
