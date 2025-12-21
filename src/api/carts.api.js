import api from "@/api/api"

const carts = {
	getAll: () => {
		return api.get("/carts")
	},
	getById: (id) => {
		return api.get(`/carts/${id}`)
	},
	create: (cartData) => {
		return api.post("/carts", cartData)
	},
	update: (id, cartData) => {
		return api.put(`/carts/${id}`, cartData)
	},
	delete: (id) => {
		return api.delete(`/carts/${id}`)
	},
}

export default carts
