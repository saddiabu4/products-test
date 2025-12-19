import { AppSidebar } from "@/components/AppSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useCart } from "@/context/CartContext"
import { AnimatePresence, motion } from "framer-motion"
import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

const Inbox = () => {
	const {
		cart,
		removeFromCart,
		updateQuantity,
		clearCart,
		cartTotalItems,
		cartTotalPrice,
	} = useCart()

	const handleRemove = (item) => {
		removeFromCart(item.id)
		toast.success(`${item.title} removed from cart`)
	}

	const handleClearCart = () => {
		clearCart()
		toast.success("Cart cleared!")
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className='flex-1 w-full'>
				<div className='sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 p-3 flex items-center justify-between'>
					<SidebarTrigger className='text-slate-300 hover:text-white hover:bg-slate-700/50' />
					<h2 className='text-white font-semibold'>Shopping Cart</h2>
					<div className='flex items-center gap-2'>
						<ShoppingCart className='h-5 w-5 text-slate-300' />
						<span className='text-white font-semibold'>{cartTotalItems}</span>
					</div>
				</div>

				<div className='min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6'>
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className='mb-8'
					>
						<h1 className='text-3xl font-bold text-white mb-2'>
							Your Shopping Cart
						</h1>
						<p className='text-slate-400'>
							{cartTotalItems > 0
								? `You have ${cartTotalItems} item${
										cartTotalItems > 1 ? "s" : ""
								  } in your cart`
								: "Your cart is empty"}
						</p>
					</motion.div>

					{cart.length === 0 ? (
						// Empty cart
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className='text-center py-16'
						>
							<div className='h-24 w-24 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center'>
								<ShoppingBag className='h-12 w-12 text-slate-600' />
							</div>
							<h2 className='text-xl font-semibold text-white mb-2'>
								Your cart is empty
							</h2>
							<p className='text-slate-400 mb-6'>
								Looks like you haven't added any products yet.
							</p>
							<Link to='/products'>
								<Button className='bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white'>
									<ShoppingBag className='h-4 w-4 mr-2' />
									Browse Products
								</Button>
							</Link>
						</motion.div>
					) : (
						<div className='grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
							{/* Cart Items */}
							<div className='lg:col-span-2 space-y-4'>
								<AnimatePresence>
									{cart.map((item, index) => (
										<motion.div
											key={item.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 20 }}
											transition={{ delay: index * 0.05 }}
										>
											<Card className='bg-slate-800/50 border-slate-700/50 overflow-hidden'>
												<CardContent className='p-4'>
													<div className='flex gap-4'>
														{/* Product Image */}
														<div className='w-24 h-24 bg-white/5 rounded-lg p-2 shrink-0'>
															<img
																src={item.image}
																alt={item.title}
																className='w-full h-full object-contain'
															/>
														</div>

														{/* Product Details */}
														<div className='flex-1 min-w-0'>
															<h3 className='text-white font-semibold line-clamp-1 mb-1'>
																{item.title}
															</h3>
															<p className='text-slate-400 text-sm mb-2'>
																${item.price.toFixed(2)} each
															</p>

															{/* Quantity Controls */}
															<div className='flex items-center gap-2'>
																<Button
																	variant='ghost'
																	size='icon'
																	onClick={() =>
																		updateQuantity(item.id, item.quantity - 1)
																	}
																	className='h-8 w-8 rounded-lg bg-slate-700/50 hover:bg-slate-600 text-slate-300'
																>
																	<Minus className='w-4 h-4' />
																</Button>
																<span className='text-white font-semibold w-8 text-center'>
																	{item.quantity}
																</span>
																<Button
																	variant='ghost'
																	size='icon'
																	onClick={() =>
																		updateQuantity(item.id, item.quantity + 1)
																	}
																	className='h-8 w-8 rounded-lg bg-slate-700/50 hover:bg-slate-600 text-slate-300'
																>
																	<Plus className='w-4 h-4' />
																</Button>
															</div>
														</div>

														{/* Price & Remove */}
														<div className='flex flex-col items-end justify-between'>
															<p className='text-lg font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
																${(item.price * item.quantity).toFixed(2)}
															</p>
															<Button
																variant='ghost'
																size='icon'
																onClick={() => handleRemove(item)}
																className='h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10'
															>
																<Trash2 className='w-4 h-4' />
															</Button>
														</div>
													</div>
												</CardContent>
											</Card>
										</motion.div>
									))}
								</AnimatePresence>

								{/* Clear Cart Button */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3 }}
								>
									<Button
										variant='ghost'
										onClick={handleClearCart}
										className='text-red-400 hover:text-red-300 hover:bg-red-500/10'
									>
										<Trash2 className='w-4 h-4 mr-2' />
										Clear Cart
									</Button>
								</motion.div>
							</div>

							{/* Order Summary */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
							>
								<Card className='bg-slate-800/50 border-slate-700/50 sticky top-20'>
									<CardContent className='p-6'>
										<h2 className='text-xl font-semibold text-white mb-4'>
											Order Summary
										</h2>

										<div className='space-y-3 mb-4'>
											<div className='flex justify-between text-slate-400'>
												<span>Subtotal ({cartTotalItems} items)</span>
												<span>${cartTotalPrice.toFixed(2)}</span>
											</div>
											<div className='flex justify-between text-slate-400'>
												<span>Shipping</span>
												<span className='text-green-400'>Free</span>
											</div>
											<div className='flex justify-between text-slate-400'>
												<span>Tax</span>
												<span>${(cartTotalPrice * 0.1).toFixed(2)}</span>
											</div>
										</div>

										<Separator className='my-4 bg-slate-700/50' />

										<div className='flex justify-between text-white font-semibold text-lg mb-6'>
											<span>Total</span>
											<span className='bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
												${(cartTotalPrice * 1.1).toFixed(2)}
											</span>
										</div>

										<motion.div
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<Button
												onClick={() => toast.success("Checkout coming soon!")}
												className='w-full py-6 rounded-lg bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/30'
											>
												<ShoppingCart className='w-5 h-5 mr-2' />
												Proceed to Checkout
											</Button>
										</motion.div>

										<p className='text-slate-500 text-xs text-center mt-4'>
											Secure checkout powered by Stripe
										</p>
									</CardContent>
								</Card>
							</motion.div>
						</div>
					)}
				</div>
			</main>
		</SidebarProvider>
	)
}

export default Inbox
