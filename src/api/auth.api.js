import api from "@/api/api"

const login = (credentials) => {
	return api.post("/auth/login", credentials)
}

export default login
