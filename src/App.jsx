import React from "react"
import { Button } from "@/components/ui/button"

const App = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<h1 className='text-3xl font-bold underline text-center'>Hello world!</h1>
			<Button variant='outline' type='button'>
				Click me
			</Button>
		</div>
	)
}

export default App
