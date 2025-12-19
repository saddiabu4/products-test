import { AppSidebar } from "@/components/AppSidebar"
import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useCart } from "@/context/CartContext"
import { motion } from "framer-motion"
import { LayoutDashboard, ShoppingBag, TrendingUp, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
	const { cartTotalItems, cartTotalPrice } = useCart()
	const navigate = useNavigate()

	const stats = [
		{
			title: "Total Products",
			value: "156",
			icon: ShoppingBag,
			color: "from-blue-500 to-cyan-500",
		},
		{
			title: "Cart Items",
			value: cartTotalItems.toString(),
			icon: TrendingUp,
			color: "from-purple-500 to-pink-500",
		},
		{
			title: "Cart Total",
			value: `$${cartTotalPrice.toFixed(2)}`,
			icon: Users,
			color: "from-orange-500 to-red-500",
		},
		{
			title: "Categories",
			value: "12",
			icon: LayoutDashboard,
			color: "from-green-500 to-emerald-500",
		},
	]

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className='flex-1 w-full'>
				<div className='sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 p-3 flex items-center justify-between'>
					<SidebarTrigger className='text-slate-300 hover:text-white hover:bg-slate-700/50' />
					<h2 className='text-white font-semibold'>Dashboard</h2>
					<div>
						<Button type='button' onClick={() => navigate("/login")}>
							admin panel
						</Button>
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
							Welcome back, John! 👋
						</h1>
						<p className='text-slate-400'>
							Here's what's happening with your store today.
						</p>
					</motion.div>

					{/* Stats Grid */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
						{stats.map((stat, index) => (
							<motion.div
								key={stat.title}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className='bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-colors'
							>
								<div className='flex items-center justify-between mb-4'>
									<div
										className={`h-12 w-12 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center`}
									>
										<stat.icon className='h-6 w-6 text-white' />
									</div>
								</div>
								<p className='text-slate-400 text-sm mb-1'>{stat.title}</p>
								<p className='text-2xl font-bold text-white'>{stat.value}</p>
							</motion.div>
						))}
					</div>
				</div>
			</main>
		</SidebarProvider>
	)
}

export default Dashboard
