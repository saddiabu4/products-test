import Login from "@/auth/Login"
import AdminCarts from "@/pages/admin/AdminCarts"
import AdminProducts from "@/pages/admin/AdminProducts"
import AdminUsers from "@/pages/admin/AdminUsers"
import Dashboard from "@/pages/Dashboard"
import Inbox from "@/pages/Inbox"
import NotFound from "@/pages/NotFound"
import Products from "@/pages/Products"
import { Route, Routes } from "react-router-dom"

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Dashboard />} />
			<Route path='/login' element={<Login />} />
			<Route path='/products' element={<Products />} />
			<Route path='/inbox' element={<Inbox />} />
			<Route path='/admin/carts' element={<AdminCarts />} />
			<Route path='/admin/products' element={<AdminProducts />} />
			<Route path='/admin/users' element={<AdminUsers />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default Router
