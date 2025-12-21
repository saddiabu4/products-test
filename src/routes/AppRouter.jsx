import Login from "@/auth/Login"
import Dashboard from "@/pages/Dashboard"
import NotFound from "@/pages/NotFound"
import Test from "@/pages/Test"
import { Route, Routes } from "react-router-dom"

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Dashboard />} />
			<Route path='/login' element={<Login />} />
			<Route path='/test' element={<Test />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default AppRouter
