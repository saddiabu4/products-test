import api from "@/api/api"
import { AppSidebar } from "@/components/AppSidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useCart } from "@/context/CartContext"
import { AnimatePresence, motion } from "framer-motion"
import { Minus, Plus, Search, ShoppingCart, Star } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
const Products = () => {
	const [products, setProducts] = useState([])
	const [search, setSearch] = useState("")
	const [debouncedSearch, setDebouncedSearch] = useState(search)
	const [loading, setLoading] = useState(true)
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [quantity, setQuantity] = useState(1)
	const navigate = useNavigate()

	const { addToCart, cartTotalItems } = useCart()

	// Fetch products
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await api.get("/products")
				setProducts(response.data)
			} catch (error) {
				console.error("Error fetching products:", error)
			} finally {
				setLoading(false)
			}
		}
		fetchProducts()
	}, [])

	// Debounce search input
	useEffect(() => {
		const handler = setTimeout(() => setDebouncedSearch(search), 300)
		return () => clearTimeout(handler)
	}, [search])

	// Filtered products (useMemo for performance)
	const filteredProducts = useMemo(
		() =>
			products.filter((product) =>
				product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
			),
		[products, debouncedSearch]
	)

	// Reset quantity when modal opens
	useEffect(() => {
		if (selectedProduct) {
			setQuantity(1)
		}
	}, [selectedProduct])

	// Handle add to cart
	const handleAddToCart = (product) => {
		addToCart(product, quantity)
		toast.success(`${product.title} added to cart!`, {
			description: `Quantity: ${quantity}`,
		})
		setSelectedProduct(null)
	}

	// Quick add to cart (from card)
	const quickAddToCart = (product, e) => {
		e.stopPropagation()
		addToCart(product, 1)
		toast.success(`${product.title} added to cart!`)
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className='flex-1 w-full'>
				<div className='sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 p-3 flex items-center justify-between'>
					<SidebarTrigger className='text-slate-300 hover:text-white hover:bg-slate-700/50' />
					<h2 className='text-white font-semibold'>Products</h2>
					<Button
						variant='ghost'
						size='icon'
						className='relative text-slate-300 hover:text-white hover:bg-slate-700/50'
						onClick={() => navigate("/inbox")}
					>
						<ShoppingCart className='h-5 w-5' />
						{cartTotalItems > 0 && (
							<span className='absolute -top-1 -right-1 bg-linear-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
								{cartTotalItems}
							</span>
						)}
					</Button>
				</div>

				<div className='min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6'>
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className='text-center mb-8'
					>
						<h1 className='text-4xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2'>
							Product Store
						</h1>
						<p className='text-slate-400'>Discover amazing products</p>
					</motion.div>

					{/* Search bar */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className='max-w-md mx-auto mb-8 relative'
					>
						<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5' />
						<Input
							type='text'
							placeholder='Search products...'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className='pl-12 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl h-12'
						/>
					</motion.div>

					{/* Products grid */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto'>
						{loading ? (
							// Skeleton loading
							Array.from({ length: 8 }).map((_, idx) => (
								<Card
									key={idx}
									className='bg-slate-800/50 border-slate-700/50 overflow-hidden'
								>
									<CardHeader className='pb-2'>
										<div className='flex justify-between items-center'>
											<Skeleton className='h-5 w-2/3 bg-slate-700' />
											<Skeleton className='h-5 w-16 bg-slate-700 rounded-full' />
										</div>
									</CardHeader>
									<CardContent>
										<Skeleton className='w-full h-48 bg-slate-700 rounded-lg mb-4' />
										<div className='space-y-2 mb-4'>
											<Skeleton className='h-4 bg-slate-700 rounded w-full' />
											<Skeleton className='h-4 bg-slate-700 rounded w-5/6' />
										</div>
										<div className='flex justify-between items-center'>
											<Skeleton className='h-6 w-16 bg-slate-700 rounded' />
											<Skeleton className='h-10 w-28 bg-slate-700 rounded-lg' />
										</div>
									</CardContent>
								</Card>
							))
						) : filteredProducts.length === 0 ? (
							// No results
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className='col-span-full text-center py-12'
							>
								<Search className='h-16 w-16 mx-auto text-slate-600 mb-4' />
								<p className='text-slate-400 text-lg'>No products found.</p>
								<p className='text-slate-500 text-sm'>
									Try searching with different keywords
								</p>
							</motion.div>
						) : (
							<AnimatePresence>
								{filteredProducts.map((product, index) => (
									<motion.div
										key={product.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{
											duration: 0.3,
											delay: search ? 0 : index * 0.05,
										}}
										whileHover={{ y: -5 }}
										onClick={() => setSelectedProduct(product)}
										className='cursor-pointer'
									>
										<Card className='bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col overflow-hidden group hover:shadow-xl hover:shadow-blue-500/10'>
											<CardHeader className='pb-2'>
												<div className='flex justify-between items-start gap-2'>
													<CardTitle className='text-base font-semibold text-white line-clamp-1'>
														{product.title}
													</CardTitle>
													<Badge className='bg-linear-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30 shrink-0'>
														{product.category}
													</Badge>
												</div>
											</CardHeader>

											<CardContent className='flex-1 flex flex-col'>
												<div className='relative mb-4 bg-white/5 rounded-lg p-4 overflow-hidden'>
													<img
														src={product.image}
														alt={product.title}
														loading='lazy'
														className='w-full h-40 object-contain transition-transform duration-300 group-hover:scale-110'
													/>
												</div>
												<p className='text-slate-400 text-sm mb-4 line-clamp-2 flex-1'>
													{product.description}
												</p>
												<div className='flex items-center gap-1 mb-3'>
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`h-4 w-4 ${
																i < Math.round(product.rating?.rate || 4)
																	? "text-yellow-400 fill-yellow-400"
																	: "text-slate-600"
															}`}
														/>
													))}
													<span className='text-slate-500 text-sm ml-1'>
														({product.rating?.count || 0})
													</span>
												</div>
												<div className='flex justify-between items-center mt-auto'>
													<p className='text-xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
														${product.price}
													</p>
													<Button
														onClick={(e) => quickAddToCart(product, e)}
														size='sm'
														className='bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300'
													>
														<ShoppingCart className='h-4 w-4 mr-1' /> Add
													</Button>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</AnimatePresence>
						)}
					</div>
				</div>

				{/* Product Detail Modal */}
				<Dialog
					open={!!selectedProduct}
					onOpenChange={() => setSelectedProduct(null)}
				>
					<DialogContent className='bg-slate-800 border-slate-700 text-white max-w-2xl p-0 overflow-hidden'>
						<AnimatePresence>
							{selectedProduct && (
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.2 }}
								>
									<div className='grid md:grid-cols-2 gap-0'>
										{/* Product Image */}
										<div className='bg-white/5 p-8 flex items-center justify-center'>
											<motion.img
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ delay: 0.1 }}
												src={selectedProduct.image}
												alt={selectedProduct.title}
												className='max-h-64 object-contain'
											/>
										</div>

										{/* Product Details */}
										<div className='p-6'>
											<DialogHeader>
												<Badge className='w-fit bg-linear-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-2'>
													{selectedProduct.category}
												</Badge>
												<DialogTitle className='text-xl font-bold text-white leading-tight'>
													{selectedProduct.title}
												</DialogTitle>
											</DialogHeader>

											{/* Rating */}
											<div className='flex items-center gap-2 mt-3'>
												<div className='flex items-center gap-1'>
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`h-4 w-4 ${
																i <
																Math.round(selectedProduct.rating?.rate || 4)
																	? "text-yellow-400 fill-yellow-400"
																	: "text-slate-600"
															}`}
														/>
													))}
												</div>
												<span className='text-slate-400 text-sm'>
													({selectedProduct.rating?.count || 0} reviews)
												</span>
											</div>

											{/* Price */}
											<div className='mt-4'>
												<span className='text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
													${selectedProduct.price}
												</span>
											</div>

											<Separator className='my-4 bg-slate-700/50' />

											{/* Description */}
											<DialogDescription className='text-slate-300 text-sm leading-relaxed'>
												{selectedProduct.description}
											</DialogDescription>

											<Separator className='my-4 bg-slate-700/50' />

											{/* Quantity Selector */}
											<div className='mb-6 flex items-center gap-4'>
												<span className='text-slate-300'>Quantity:</span>
												<div className='flex items-center gap-2'>
													<Button
														variant='ghost'
														size='icon'
														onClick={() =>
															setQuantity(Math.max(1, quantity - 1))
														}
														className='h-9 w-9 rounded-lg bg-slate-700/50 hover:bg-slate-600 text-slate-300'
													>
														<Minus className='w-4 h-4' />
													</Button>
													<span className='text-white font-semibold w-8 text-center'>
														{quantity}
													</span>
													<Button
														variant='ghost'
														size='icon'
														onClick={() => setQuantity(quantity + 1)}
														className='h-9 w-9 rounded-lg bg-slate-700/50 hover:bg-slate-600 text-slate-300'
													>
														<Plus className='w-4 h-4' />
													</Button>
												</div>
											</div>

											{/* Total */}
											<div className='mb-4 flex items-center justify-between'>
												<span className='text-slate-400'>Total:</span>
												<span className='text-xl font-bold text-white'>
													${(selectedProduct.price * quantity).toFixed(2)}
												</span>
											</div>

											{/* Add to Cart Button */}
											<motion.div
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
											>
												<Button
													onClick={() => handleAddToCart(selectedProduct)}
													className='w-full py-6 rounded-lg bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/30'
												>
													<ShoppingCart className='w-5 h-5 mr-2' />
													Add to Cart
												</Button>
											</motion.div>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</DialogContent>
				</Dialog>
			</main>
		</SidebarProvider>
	)
}

export default Products
