import { createContext, useContext, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
	const [cart, setCart] = useState([])

	// Add to cart function
	const addToCart = (product, quantity = 1) => {
		const existingItem = cart.find((item) => item.id === product.id)
		if (existingItem) {
			setCart(
				cart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + quantity }
						: item
				)
			)
		} else {
			setCart([...cart, { ...product, quantity }])
		}
	}

	// Remove from cart
	const removeFromCart = (productId) => {
		setCart(cart.filter((item) => item.id !== productId))
	}

	// Update quantity
	const updateQuantity = (productId, quantity) => {
		if (quantity <= 0) {
			removeFromCart(productId)
			return
		}
		setCart(
			cart.map((item) => (item.id === productId ? { ...item, quantity } : item))
		)
	}

	// Clear cart
	const clearCart = () => {
		setCart([])
	}

	// Cart total items
	const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

	// Cart total price
	const cartTotalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				cartTotalItems,
				cartTotalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error("useCart must be used within a CartProvider")
	}
	return context
}
