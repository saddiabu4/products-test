import api from "@/api/api"
import { AppSidebar } from "@/components/AppSidebar"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Edit, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const AdminProducts = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [newProduct, setNewProduct] = useState({
		title: "",
		price: "",
		description: "",
		category: "",
		image: "",
	})

	const [addOpen, setAddOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)

	// Fetch Products
	const fetchProducts = async () => {
		setLoading(true)
		try {
			const response = await api.get("/products")
			setProducts(response.data)
		} catch (error) {
			console.error(error)
			toast.error("Error fetching products")
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	// Add Product
	const handleAddProduct = async () => {
		try {
			await api.post("/products", newProduct)
			setNewProduct({
				title: "",
				price: "",
				description: "",
				category: "",
				image: "",
			})
			setAddOpen(false) // Dialogni yopish
			fetchProducts() // Table yangilash
			toast.success("Product added successfully")
		} catch (error) {
			console.error(error)
			toast.error("Failed to add product")
		}
	}

	// Edit Product
	const handleEditProduct = async () => {
		try {
			await api.put(`/products/${selectedProduct.id}`, selectedProduct)
			setEditOpen(false) // Dialogni yopish
			fetchProducts() // Table yangilash
			toast.success("Product updated successfully")
		} catch (error) {
			console.error(error)
			toast.error("Failed to edit product")
		}
	}

	// Delete Product
	const handleDeleteProduct = async (id) => {
		try {
			await api.delete(`/products/${id}`)
			setProducts(products.filter((p) => p.id !== id))
			toast.success("Product deleted successfully")
		} catch (error) {
			console.error(error)
			toast.error("Failed to delete product")
		}
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className='flex-1 w-full'>
				{/* Header */}
				<div className='sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 p-3 flex items-center justify-between'>
					<SidebarTrigger className='text-slate-300 hover:text-white hover:bg-slate-700/50' />
					<h2 className='text-white font-semibold text-xl'>Products</h2>

					{/* Add Product Dialog */}
					<Dialog open={addOpen} onOpenChange={setAddOpen}>
						<DialogTrigger asChild>
							<Button className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-[1.02] transition-transform'>
								<Plus className='w-4 h-4' /> Add Product
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-lg'>
							<DialogHeader>
								<DialogTitle>Add New Product</DialogTitle>
							</DialogHeader>
							<div className='space-y-2'>
								<Input
									placeholder='Title'
									value={newProduct.title}
									onChange={(e) =>
										setNewProduct({ ...newProduct, title: e.target.value })
									}
								/>
								<Input
									type='number'
									placeholder='Price'
									value={newProduct.price}
									onChange={(e) =>
										setNewProduct({ ...newProduct, price: e.target.value })
									}
								/>
								<Input
									placeholder='Description'
									value={newProduct.description}
									onChange={(e) =>
										setNewProduct({
											...newProduct,
											description: e.target.value,
										})
									}
								/>
								<Input
									placeholder='Category'
									value={newProduct.category}
									onChange={(e) =>
										setNewProduct({ ...newProduct, category: e.target.value })
									}
								/>
								<Input
									placeholder='Image URL'
									value={newProduct.image}
									onChange={(e) =>
										setNewProduct({ ...newProduct, image: e.target.value })
									}
								/>
							</div>
							<DialogFooter>
								<Button
									onClick={handleAddProduct}
									className='bg-gradient-to-r from-green-500 to-green-600 hover:scale-[1.02] transition-transform'
								>
									Add
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				{/* Products Table */}
				<div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-lg shadow-lg'>
					<h1 className='text-2xl font-bold text-white mb-4'>Admin Products</h1>

					{loading ? (
						<p className='text-white'>Loading products...</p>
					) : (
						<Table className='bg-slate-800 border border-slate-700 rounded-lg overflow-hidden'>
							<TableHeader className='bg-slate-900'>
								<TableRow>
									<TableHead className='text-white'>Title</TableHead>
									<TableHead className='text-white'>Price</TableHead>
									<TableHead className='text-white'>Category</TableHead>
									<TableHead className='text-white'>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((product) => (
									<TableRow
										key={product.id}
										className='hover:bg-slate-700 transition-colors'
									>
										<TableCell className='text-white'>
											{product.title}
										</TableCell>
										<TableCell className='text-blue-300'>
											${product.price}
										</TableCell>
										<TableCell className='text-purple-300'>
											{product.category}
										</TableCell>
										<TableCell className='flex gap-2'>
											{/* Edit */}
											<Dialog open={editOpen} onOpenChange={setEditOpen}>
												<DialogTrigger asChild>
													<Button
														variant='outline'
														className='flex items-center gap-1'
														onClick={() => {
															setSelectedProduct(product)
															setEditOpen(true)
														}}
													>
														<Edit className='w-4 h-4' /> Edit
													</Button>
												</DialogTrigger>
												<DialogContent className='sm:max-w-lg'>
													<DialogHeader>
														<DialogTitle>Edit Product</DialogTitle>
													</DialogHeader>
													<div className='space-y-2'>
														<Input
															placeholder='Title'
															value={selectedProduct?.title || ""}
															onChange={(e) =>
																setSelectedProduct({
																	...selectedProduct,
																	title: e.target.value,
																})
															}
														/>
														<Input
															type='number'
															placeholder='Price'
															value={selectedProduct?.price || ""}
															onChange={(e) =>
																setSelectedProduct({
																	...selectedProduct,
																	price: e.target.value,
																})
															}
														/>
														<Input
															placeholder='Description'
															value={selectedProduct?.description || ""}
															onChange={(e) =>
																setSelectedProduct({
																	...selectedProduct,
																	description: e.target.value,
																})
															}
														/>
														<Input
															placeholder='Category'
															value={selectedProduct?.category || ""}
															onChange={(e) =>
																setSelectedProduct({
																	...selectedProduct,
																	category: e.target.value,
																})
															}
														/>
														<Input
															placeholder='Image URL'
															value={selectedProduct?.image || ""}
															onChange={(e) =>
																setSelectedProduct({
																	...selectedProduct,
																	image: e.target.value,
																})
															}
														/>
													</div>
													<DialogFooter>
														<Button
															onClick={handleEditProduct}
															className='bg-gradient-to-r from-yellow-500 to-yellow-600 hover:scale-[1.02] transition-transform'
														>
															Save
														</Button>
													</DialogFooter>
												</DialogContent>
											</Dialog>

											{/* Delete */}
											<Button
												variant='destructive'
												className='flex items-center gap-1'
												onClick={() => handleDeleteProduct(product.id)}
											>
												<Trash2 className='w-4 h-4' /> Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</div>
			</main>
		</SidebarProvider>
	)
}

export default AdminProducts
