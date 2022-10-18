import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Route path="/" exact component={Register} />
				<Route path="/login" exact component={Login} />
			</BrowserRouter>
		</div>
	)
}

export default App
