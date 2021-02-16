import React from 'react'
import Header from './components/Header'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Routes
import Home from './routes/Home'
import About from './routes/About'
import Launches from './routes/Launches'
import Rockets from './routes/Rockets'
import Ships from './routes/Ships'

// Styles
import './App.sass'

library.add(fas)
library.add(fab)

function App() {

	console.log(`Single Page Application built from the ground-up with create-react-app by SyedMH, https://syedmh.com.`);
	console.log(`Data sourced from the official Space-x API (V4): https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4.`);
	console.log(`More details on ${window.location.origin}/about/.`);
	console.log(`Enjoy your stay here!`);

	return (
		<Router>
			<Header />
			<main className='content-container'>
					<Route path='/' exact component={Home} />
					<Route path='/history' exact />
					<Route path='/launches' exact component={Launches} />
					<Route path='/rockets' exact component={Rockets} />
					<Route path='/ships' exact component={Ships} />
					<Route path='/launchpads' exact />
					<Route path='/about' exact component={About} />
			</main>
		</Router>
	);
}

export default App;
