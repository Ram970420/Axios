import {Box , CssBaseline, ThemeProvider} from '@mui/material'
import './App.css'
import { Provider } from 'react-redux'
import Home from './pages/Home'
import MovieList from './pages/Home'
import  { store } from './redux/Store'

function App() {
  return (
    
    <Provider store={store}>
    <div>
      <Home />
    </div>
    <Box>
      <MovieList/>
    </Box>
  
    </Provider>
  )
}

export default App
