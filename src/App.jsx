import { CartProvider } from "@/context/CartContext"
import Router from "@/router/Router"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "sonner"

const App = () => {
	return (
		<BrowserRouter>
			<CartProvider>
				<Router />
				<Toaster richColors position='top-right' />
			</CartProvider>
		</BrowserRouter>
	)
}

export default App
