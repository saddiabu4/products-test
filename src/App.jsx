import AppRouter from "@/routes/AppRouter"
import { Toaster } from "sonner"
import { CartProvider } from "@/context/CartContext"

const App = () => {
	return (
		<>
			<CartProvider>
				<Toaster position='top-right' richColors />
				<AppRouter />
			</CartProvider>
		</>
	)
}

export default App
