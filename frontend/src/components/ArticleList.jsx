import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Center,
  useColorModeValue,
  Link,
  Divider,
} from '@chakra-ui/react'

function ArticleList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      const data = await response.json()
      setArticles(data.articles)
      setLoading(false)
    } catch (err) {
      setError('Failed to load articles')
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500" fontSize="xl">{error}</Text>
      </Center>
    )
  }

  return (
    <Box bg="gray.50" minH="100vh" py={12}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={4}>
            <Heading 
              as="h1" 
              size="2xl" 
              mb={3}
              color="gray.800"
              fontWeight="700"
              letterSpacing="tight"
            >
              Articles
            </Heading>
            <Text 
              fontSize="lg" 
              color="gray.600"
              maxW="2xl"
              mx="auto"
            >
              Explore our collection of articles on web development, design, and technology
            </Text>
          </Box>

          <Divider borderColor={borderColor} />

          {articles.map((article) => (
            <Link
              key={article.id}
              as={RouterLink}
              to={`/article/${article.id}`}
              _hover={{ textDecoration: 'none' }}
            >
              <Card
                bg={bgColor}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                transition="all 0.2s"
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                  borderColor: 'blue.400',
                  bg: hoverBg,
                }}
                cursor="pointer"
              >
                <CardHeader pb={2}>
                  <HStack justify="space-between" align="start" flexWrap="wrap">
                    <Heading 
                      size="md" 
                      color="gray.800"
                      fontWeight="600"
                      flex="1"
                    >
                      {article.title}
                    </Heading>
                    <Text 
                      fontSize="sm" 
                      color="gray.500"
                      fontWeight="500"
                      minW="fit-content"
                    >
                      {formatDate(article.date)}
                    </Text>
                  </HStack>
                </CardHeader>
                <CardBody pt={0}>
                  <Text 
                    color="gray.600" 
                    fontSize="md"
                    lineHeight="1.6"
                  >
                    {article.description}
                  </Text>
                  <HStack mt={3} spacing={4}>
                    <Text fontSize="sm" color="gray.500">
                      By {article.author}
                    </Text>
                  </HStack>
                </CardBody>
              </Card>
            </Link>
          ))}
        </VStack>
      </Container>
    </Box>
  )
}

export default ArticleList
