import {
	CreditCard,
	Inbox,
	LayoutDashboard,
	LogOut,
	ShoppingBag,
	Users as UsersIcon,
} from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useCart } from "@/context/CartContext"
import { ChevronUp } from "lucide-react"

export function AppSidebar() {
	const location = useLocation()
	const navigate = useNavigate()
	const { cartTotalItems } = useCart()

	const token = localStorage.getItem("token")

	// Dynamic sidebar items based on token
	const mainItems = token
		? [
				{ title: "Dashboard", url: "/", icon: LayoutDashboard },
				{ title: "Products", url: "/admin/products", icon: ShoppingBag },
				{ title: "Inbox", url: "/inbox", icon: Inbox },
				{ title: "Users", url: "/admin/users", icon: UsersIcon },
				{ title: "Carts", url: "/admin/carts", icon: CreditCard },
		  ]
		: [
				{ title: "Dashboard", url: "/", icon: LayoutDashboard },
				{ title: "Products", url: "/products", icon: ShoppingBag },
				{ title: "Inbox", url: "/inbox", icon: Inbox },
		  ]

	const isActive = (url) => {
		if (url === "/") return location.pathname === "/"
		return location.pathname.startsWith(url)
	}

	return (
		<Sidebar className='border-r border-slate-700/50'>
			{/* Header */}
			<SidebarHeader className='bg-slate-900 border-b border-slate-700/50 p-4'>
				<div className='flex items-center gap-3'>
					<div className='h-9 w-9 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20'>
						<ShoppingBag className='h-5 w-5 text-white' />
					</div>
					<div className='flex flex-col'>
						<span className='font-bold text-white text-lg'>Store</span>
						<span className='text-xs text-slate-400'>Dashboard</span>
					</div>
				</div>
			</SidebarHeader>

			{/* Sidebar Content */}
			<SidebarContent className='bg-slate-900 px-2 py-4'>
				<SidebarGroup>
					<SidebarGroupLabel className='text-slate-500 text-xs font-semibold uppercase tracking-wider px-3 mb-2'>
						Main Menu
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className='space-y-1'>
							{mainItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={isActive(item.url)}
										className={`
                      group relative rounded-lg px-3 py-2.5 transition-all duration-200
                      ${
												isActive(item.url)
													? "bg-linear-to-r from-blue-600/20 to-cyan-600/20 text-white border border-blue-500/30"
													: "text-slate-400 hover:text-white hover:bg-slate-800/50"
											}
                    `}
									>
										<Link to={item.url} className='flex items-center gap-3'>
											<item.icon
												className={`h-5 w-5 transition-colors ${
													isActive(item.url)
														? "text-blue-400"
														: "text-slate-500 group-hover:text-blue-400"
												}`}
											/>
											<span className='font-medium'>{item.title}</span>
											{item.title === "Inbox" && cartTotalItems > 0 && (
												<span className='ml-auto bg-linear-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center'>
													{cartTotalItems}
												</span>
											)}
											{isActive(item.url) && (
												<span className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-linear-to-b from-blue-400 to-cyan-400 rounded-r-full' />
											)}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Footer / User Profile */}
			<SidebarFooter className='bg-slate-900 border-t border-slate-700/50 p-3'>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className='w-full rounded-lg px-2 py-2 hover:bg-slate-800/50 transition-all duration-200 group'>
									<div className='flex items-center gap-3 w-full'>
										<Avatar className='h-9 w-9 border-2 border-slate-700 group-hover:border-blue-500/50 transition-colors'>
											<AvatarImage src='https://github.com/shadcn.png' />
											<AvatarFallback className='bg-linear-to-br from-blue-500 to-cyan-500 text-white text-sm font-semibold'>
												{token ? "AD" : "G"}
											</AvatarFallback>
										</Avatar>
										<div className='flex-1 text-left'>
											{token ? (
												<>
													<p className='text-sm font-semibold text-white'>
														Admin
													</p>
													<p className='text-xs text-slate-500'>
														admin@example.com
													</p>
												</>
											) : (
												<p className='text-sm font-semibold text-white'>
													Guest
												</p>
											)}
										</div>
										<ChevronUp className='h-4 w-4 text-slate-500 group-hover:text-slate-300 transition-colors' />
									</div>
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side='top'
								align='start'
								className='w-56 bg-slate-800 border border-slate-700 shadow-xl shadow-black/20'
							>
								{token ? (
									<>
										<DropdownMenuLabel className='text-slate-400 font-normal'>
											<div className='flex flex-col space-y-1'>
												<p className='text-sm font-medium text-white'>Admin</p>
												<p className='text-xs text-slate-500'>
													admin@example.com
												</p>
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator className='bg-slate-700' />
										<DropdownMenuItem
											className='text-slate-300 hover:text-white hover:bg-slate-700/50 cursor-pointer transition-colors focus:bg-slate-700/50 focus:text-white'
											onClick={() => navigate("/users")}
										>
											<UsersIcon className='h-4 w-4 mr-2 text-slate-400' />{" "}
											Users
										</DropdownMenuItem>
										<DropdownMenuItem
											className='text-slate-300 hover:text-white hover:bg-slate-700/50 cursor-pointer transition-colors focus:bg-slate-700/50 focus:text-white'
											onClick={() => navigate("/products")}
										>
											<ShoppingBag className='h-4 w-4 mr-2 text-slate-400' />{" "}
											Products
										</DropdownMenuItem>
										<DropdownMenuItem
											className='text-slate-300 hover:text-white hover:bg-slate-700/50 cursor-pointer transition-colors focus:bg-slate-700/50 focus:text-white'
											onClick={() => navigate("/carts")}
										>
											<CreditCard className='h-4 w-4 mr-2 text-slate-400' />{" "}
											Carts
										</DropdownMenuItem>
										<DropdownMenuSeparator className='bg-slate-700' />
									</>
								) : (
									<DropdownMenuLabel className='text-slate-400 font-normal'>
										Guest user
									</DropdownMenuLabel>
								)}
								<DropdownMenuItem
									className='text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer transition-colors focus:bg-red-500/10 focus:text-red-300'
									onClick={() => {
										localStorage.removeItem("token")
										navigate("/")
									}}
								>
									<LogOut className='h-4 w-4 mr-2' /> Sign out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
