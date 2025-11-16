import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  Center,
  IconButton,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import ReactMarkdown from 'react-markdown'

function ArticleReader() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const bgColor = useColorModeValue('white', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')

  useEffect(() => {
    fetchArticle()
  }, [id])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${id}`)
      const data = await response.json()
      setArticle(data.article)
      setLoading(false)
    } catch (err) {
      setError('Failed to load article')
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  if (loading) {
    return (
      <Center h="100vh" bg={bgColor}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Center>
    )
  }

  if (error || !article) {
    return (
      <Center h="100vh" bg={bgColor}>
        <VStack spacing={4}>
          <Text color="red.500" fontSize="xl">{error || 'Article not found'}</Text>
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            aria-label="Go back"
            variant="outline"
          />
        </VStack>
      </Center>
    )
  }

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Minimal header with back button */}
      <Box 
        position="sticky" 
        top={0} 
        bg={bgColor}
        borderBottom="1px"
        borderColor="gray.200"
        zIndex={10}
        py={3}
      >
        <Container maxW="container.md">
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            aria-label="Back to articles"
            variant="ghost"
            size="lg"
            _hover={{ bg: 'gray.100' }}
          />
        </Container>
      </Box>

      {/* Reading mode content */}
      <Container maxW="container.md" py={12}>
        <VStack spacing={6} align="stretch">
          {/* Article header */}
          <Box textAlign="center" mb={6}>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="700"
              lineHeight="1.2"
              color={textColor}
              mb={4}
              letterSpacing="tight"
            >
              {article.title}
            </Heading>
            
            <HStack 
              justify="center" 
              spacing={4} 
              fontSize="sm" 
              color={mutedColor}
              fontWeight="500"
            >
              <Text>{formatDate(article.date)}</Text>
              <Text>•</Text>
              <Text>{article.author}</Text>
            </HStack>
          </Box>

          <Divider borderColor="gray.300" />

          {/* Article content with reading-optimized styling */}
          <Box
            className="article-content"
            fontSize={{ base: 'lg', md: 'xl' }}
            lineHeight="1.8"
            color={textColor}
            sx={{
              '& h1': {
                fontSize: { base: '2xl', md: '3xl' },
                fontWeight: '700',
                mt: 8,
                mb: 4,
                lineHeight: '1.3',
                color: textColor,
              },
              '& h2': {
                fontSize: { base: 'xl', md: '2xl' },
                fontWeight: '600',
                mt: 6,
                mb: 3,
                lineHeight: '1.4',
                color: textColor,
              },
              '& h3': {
                fontSize: { base: 'lg', md: 'xl' },
                fontWeight: '600',
                mt: 5,
                mb: 2,
                lineHeight: '1.4',
                color: textColor,
              },
              '& p': {
                mb: 4,
                lineHeight: '1.8',
                color: textColor,
              },
              '& ul, & ol': {
                mb: 4,
                pl: 6,
                lineHeight: '1.8',
              },
              '& li': {
                mb: 2,
              },
              '& code': {
                bg: 'gray.100',
                px: 2,
                py: 1,
                borderRadius: 'md',
                fontSize: '0.9em',
                fontFamily: 'monospace',
              },
              '& pre': {
                bg: 'gray.100',
                p: 4,
                borderRadius: 'md',
                overflow: 'auto',
                mb: 4,
                fontSize: '0.9em',
              },
              '& pre code': {
                bg: 'transparent',
                p: 0,
              },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: 'blue.400',
                pl: 4,
                py: 2,
                my: 4,
                fontStyle: 'italic',
                color: mutedColor,
              },
              '& strong': {
                fontWeight: '600',
                color: textColor,
              },
              '& a': {
                color: 'blue.500',
                textDecoration: 'underline',
              },
            }}
          >
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default ArticleReader
