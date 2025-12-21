import React from "react"

const Test = () => {
	const test = true
	const buttonLabels = test ? ["salom", "hello"] : ["default1", "default2"]

	return (
		<div>
			<h1>Test Page</h1>
			{buttonLabels.map((label, index) => (
				<button key={index}>{label}</button>
			))}
		</div>
	)
}

export default Test
