import { api } from "./http.js";

const DUMMY_USERS = [
  {
    email: "admin@lazuardy.test",
    password: "admin12345",
    user: {
      id: 1,
      name: "Admin Lazuardy",
      email: "admin@lazuardy.test",
      role: "admin",
    },
    redirectLabel: "admin",
  },
  {
    email: "siswa@lazuardy.test",
    password: "siswa12345",
    user: {
      id: 2,
      name: "Siswa Dummy",
      email: "siswa@lazuardy.test",
      role: "student",
      role_id: 3,
      phone: "081234567890",
      address: "Jakarta",
    },
    redirectLabel: "siswa",
  },
  {
    email: "guru@lazuardy.test",
    password: "guru12345",
    user: {
      id: 3,
      name: "Guru Dummy",
      email: "guru@lazuardy.test",
      role: "tutor",
      role_id: 2,
      status: "active",
      tutor_status: "approved",
      verification_status: "approved",
      keahlian: "Matematika",
      marketSiswa: "SMP dan SMA",
      phone: "081298765432",
    },
    redirectLabel: "guru",
  },
];

function findDummyUser(credentials) {
  return DUMMY_USERS.find(
    (account) =>
      account.email === credentials.email?.toLowerCase().trim() &&
      account.password === credentials.password
  );
}

function getDummyUserFromToken() {
  const token = localStorage.getItem("auth_token") || "";
  if (!token.startsWith("dummy-token-")) return null;

  const dummyId = Number(token.replace("dummy-token-", ""));
  return DUMMY_USERS.find((account) => account.user.id === dummyId)?.user || null;
}

export async function loginRequest(credentials) {
  const dummyAccount = findDummyUser(credentials);

  if (dummyAccount) {
    return {
      token: `dummy-token-${dummyAccount.user.id}`,
      user: dummyAccount.user,
      message: `Login dummy ${dummyAccount.redirectLabel} berhasil`,
    };
  }

  return api("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
}

export async function fetchMe() {
  const dummyUser = getDummyUserFromToken();
  if (dummyUser) {
    return { user: dummyUser };
  }

  return api("/api/me", {
    method: "GET",
  });
}
