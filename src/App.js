import React from 'react';
import Header from './components/Header';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Routes
import Home from './routes/Home'
import About from './routes/About'
import Launches from './routes/Launches'
import Rockets from './routes/Rockets'
import Ships from './routes/Ships'

// Styles
import './App.sass'

function App() {
  return (
      <Router>
        <Header />
        <main className='content-container'>
            <Route path='/' exact component={Home} />
            <Route path='/launches' exact component={Launches} />
            <Route path='/rockets' exact component={Rockets} />
            <Route path='/ships' exact component={Ships} />
            <Route path='/about' exact component={About} />
        </main>
      </Router>
  );
}

export default App;
