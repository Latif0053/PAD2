import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: localStorage.getItem('auth_token') || null,
		user: (() => {
			try {
				const raw = localStorage.getItem('auth_user');
				if (raw && raw !== 'undefined') return JSON.parse(raw);
			} catch (e) {}
			return null;
		})(),
		initialized: false,
	}),
	getters: {
		isAuthenticated: (state) => !!state.token && !!state.user,
		roleNormalized: (state) => {
			const user = state.user;
			if (!user) return '';
			let role = null;
			if (typeof user.role === 'string') role = user.role;
			else if (user.role?.name) role = user.role.name;
			else if (Array.isArray(user.roles) && user.roles.length > 0) {
				role = typeof user.roles[0] === 'string' ? user.roles[0] : user.roles[0].name;
			} else if (user.role_id) {
				const map = { 1: 'admin', 2: 'tutor', 3: 'student' };
				role = map[user.role_id] || null;
			}
			return String(role || '').toLowerCase().trim();
		},
		isAdmin: (state) => {
			const r = (state.user && (typeof state.user.role === 'string' ? state.user.role : state.user.role?.name)) || '';
			const normalized = String(r || '').toLowerCase().trim();
			return normalized === 'admin' || normalized === 'administrator';
		},
		isTutor: (state) => {
			const r = state.user?.role || state.user?.role?.name || '';
			return String(r).toLowerCase().trim() === 'tutor';
		},
		isStudent: (state) => {
			const r = state.user?.role || state.user?.role?.name || '';
			const norm = String(r).toLowerCase().trim();
			return norm === 'student' || norm === 'siswa';
		},
	},
	actions: {
		loadFromStorage() {
			try {
				const t = localStorage.getItem('auth_token');
				const u = localStorage.getItem('auth_user');
				this.token = t || null;
				this.user = u && u !== 'undefined' ? JSON.parse(u) : null;
			} catch (e) {
				this.token = null;
				this.user = null;
			} finally {
				this.initialized = true;
			}
		},
		saveToStorage() {
			if (this.token) localStorage.setItem('auth_token', this.token);
			else localStorage.removeItem('auth_token');

			if (this.user) localStorage.setItem('auth_user', JSON.stringify(this.user));
			else localStorage.removeItem('auth_user');
		},
		setToken(t) {
			this.token = t;
			this.saveToStorage();
		},
		setUser(u) {
			this.user = u;
			this.saveToStorage();
		},
		logout() {
			this.token = null;
			this.user = null;
			localStorage.removeItem('auth_token');
			localStorage.removeItem('auth_user');
			sessionStorage.clear();
		},
	},
});
