import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import ArticleList from './components/ArticleList'
import ArticleReader from './components/ArticleReader'

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:id" element={<ArticleReader />} />
      </Routes>
    </Box>
  )
}

export default App
