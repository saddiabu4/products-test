import axios from "axios"

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL, // ✅ Vite style
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
})

// Optional: token qo‘shish
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("access_token")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export default api
