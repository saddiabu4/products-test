import Login from "@/auth/Login"
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
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default Router
