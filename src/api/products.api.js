import api from "@/api/api"

const products = {
	getAll: () => {
		return api.get("/products")
	},
	getById: (id) => {
		return api.get(`/products/${id}`)
	},
	create: (productData) => {
		return api.post("/products", productData)
	},
	update: (id, productData) => {
		return api.put(`/products/${id}`, productData)
	},
	delete: (id) => {
		return api.delete(`/products/${id}`)
	},
}

export default products
