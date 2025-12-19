import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const AdminCarts = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className='flex-1 w-full'>
				<div className='sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 p-3 flex items-center justify-between'>
					<SidebarTrigger className='text-slate-300 hover:text-white hover:bg-slate-700/50' />
					<h2 className='text-white font-semibold'>Carts</h2>
					<div></div>
				</div>
				<div className='min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6'>
					<h1 className='text-2xl font-bold text-white'>Admin Carts</h1>
				</div>
			</main>
		</SidebarProvider>
	)
}

export default AdminCarts
