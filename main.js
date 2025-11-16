const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./articles.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Create articles table and populate with sample data
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      author TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      // Check if we need to add sample data
      db.get('SELECT COUNT(*) as count FROM articles', (err, row) => {
        if (err) {
          console.error('Error checking articles:', err.message);
        } else if (row.count === 0) {
          insertSampleData();
        }
      });
    }
  });
}

// Insert sample articles
function insertSampleData() {
  const sampleArticles = [
    {
      title: 'Getting Started with React and Node.js',
      description: 'Learn how to build full-stack applications using React for the frontend and Node.js for the backend.',
      content: `# Getting Started with React and Node.js

Building modern web applications requires a robust frontend and a powerful backend. React and Node.js make an excellent combination for full-stack development.

## Why React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components."

### Key Benefits:
- Component-based architecture
- Virtual DOM for better performance
- Rich ecosystem and community support
- Excellent developer tools

## Why Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server side, enabling full-stack JavaScript development.

### Advantages:
- Non-blocking I/O model
- npm - the largest ecosystem of open source libraries
- Great for building scalable network applications
- JavaScript everywhere

## Building Your First App

Start by setting up your development environment. You'll need Node.js installed on your machine, then you can use tools like Create React App or Vite to scaffold your React application.

For the backend, initialize a new Node.js project and install Express to handle routing and middleware. Add a database like SQLite or MongoDB to persist your data.

## Conclusion

With React and Node.js, you have everything you need to build modern, scalable web applications. The combination allows you to use JavaScript throughout your stack, making development more efficient and enjoyable.`,
      date: '2024-01-15',
      author: 'Technical Team'
    },
    {
      title: 'Understanding Modern UI Libraries',
      description: 'Explore the best UI libraries for React applications and how they can accelerate your development process.',
      content: `# Understanding Modern UI Libraries

Modern UI libraries have revolutionized how we build web applications. They provide pre-built components that are accessible, responsive, and beautiful out of the box.

## What Makes a Great UI Library?

A great UI library should offer more than just pretty components. It should focus on:

### Accessibility
Every component should be accessible by default, following WAI-ARIA guidelines. Users of all abilities should be able to interact with your application.

### Developer Experience
The API should be intuitive and well-documented. Components should be easy to customize and compose together.

### Performance
Components should be lightweight and optimized for performance. Bundle size matters.

### Theming
You should be able to customize the look and feel to match your brand without fighting the framework.

## Popular Choices

There are several excellent UI libraries available:

**Chakra UI** - Focuses on simplicity and developer experience. It provides simple, modular components that are accessible and composable.

**Material-UI** - Implements Google's Material Design. It's feature-rich and highly customizable.

**Ant Design** - A comprehensive design system with enterprise-grade components.

## Making Your Choice

Consider your project's needs:
- Do you need a specific design language?
- How important is bundle size?
- What's your team's experience level?
- Do you need extensive customization?

## Conclusion

The right UI library can significantly speed up your development process while ensuring a consistent, professional look across your application. Take time to evaluate options and choose one that aligns with your project goals.`,
      date: '2024-02-10',
      author: 'Design Team'
    },
    {
      title: 'SQLite for Web Applications',
      description: 'Discover why SQLite is an excellent choice for small to medium-sized web applications.',
      content: `# SQLite for Web Applications

SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured SQL database engine. It's the most used database engine in the world.

## What is SQLite?

Unlike most other SQL databases, SQLite does not have a separate server process. It reads and writes directly to ordinary disk files. A complete SQL database with multiple tables, indices, triggers, and views, is contained in a single disk file.

## Why Choose SQLite?

### Simplicity
Zero configuration needed. No server to set up, no complex installation process. Just create a database file and start using it.

### Reliability
SQLite is extremely reliable. It's used in millions of applications and has an extensive test suite that achieves 100% branch test coverage.

### Portability
The entire database is stored in a single cross-platform file. You can copy the database file to any other machine and it just works.

### Performance
For many applications, SQLite is faster than client/server databases because there's no network latency and no inter-process communication overhead.

## Best Use Cases

SQLite works great for:
- Development and testing
- Small to medium-sized websites
- Mobile applications
- Desktop applications
- IoT devices and embedded systems

## When to Use Something Else

Consider a client/server database when:
- You need high write concurrency
- You need network access from multiple machines
- You're building a high-traffic website

## Working with SQLite in Node.js

The sqlite3 npm package provides an easy-to-use interface for working with SQLite databases in Node.js applications. It supports both callback-based and promise-based APIs.

## Conclusion

For many web applications, SQLite offers the perfect balance of simplicity, reliability, and performance. It's an excellent choice for getting started and can scale to handle surprisingly large workloads.`,
      date: '2024-03-05',
      author: 'Backend Team'
    },
    {
      title: 'Creating Distraction-Free Reading Experiences',
      description: 'Learn the principles of designing reading modes that maximize focus and comprehension.',
      content: `# Creating Distraction-Free Reading Experiences

In an age of constant notifications and information overload, creating a focused reading experience is more important than ever. A well-designed reading mode can significantly improve comprehension and user satisfaction.

## The Principles of Reading Mode

### Typography Matters
Choose readable fonts and appropriate line heights. Serif fonts like Georgia or system fonts work well for body text. Line height should be around 1.5-1.6 for optimal readability.

### Optimal Line Length
Lines that are too long or too short reduce reading speed. Aim for 50-75 characters per line, including spaces.

### Adequate Contrast
Ensure sufficient contrast between text and background. Pure black on pure white can be harsh; consider slightly softer combinations.

### Minimize Distractions
Remove navigation, sidebars, ads, and other non-essential elements. Let the content breathe with generous whitespace.

## Color and Background

A clean, neutral background works best. Consider offering both light and dark modes to accommodate different preferences and lighting conditions.

### Light Mode
Light backgrounds with dark text are traditional and work well in bright environments.

### Dark Mode
Dark backgrounds with light text reduce eye strain in low-light conditions and can save battery on OLED screens.

## Layout and Spacing

Use generous margins and padding. Content should be centered on the page with plenty of whitespace around it. This creates a calm, focused environment.

### Mobile Considerations
On mobile devices, maximize content width while maintaining comfortable reading. Reduce margins but never eliminate them entirely.

## Interactive Elements

Keep interactive elements minimal in reading mode:
- Simple progress indicator
- Easy exit/close option
- Optional font size controls
- Bookmark/save functionality

## Smooth Transitions

When entering reading mode, use smooth transitions. This helps users mentally shift from browsing to reading mode.

## Performance

Reading mode should load instantly. Optimize images and avoid heavy JavaScript. The experience should feel lightweight and responsive.

## Conclusion

A thoughtfully designed reading mode shows respect for your readers' time and attention. By following these principles, you can create an experience that encourages engagement and comprehension.`,
      date: '2024-03-20',
      author: 'UX Team'
    },
    {
      title: 'Building RESTful APIs with Express',
      description: 'A comprehensive guide to creating robust and scalable REST APIs using Express.js.',
      content: `# Building RESTful APIs with Express

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It's the de facto standard for Node.js web servers.

## What is a RESTful API?

REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP methods explicitly and in a way that's consistent with the protocol definition.

## Core HTTP Methods

### GET
Retrieve data from the server. GET requests should be idempotent (repeating the request doesn't change the result).

### POST
Create new resources. POST requests typically include a request body with data for the new resource.

### PUT
Update existing resources. PUT requests should replace the entire resource.

### PATCH
Partially update resources. PATCH modifies only the specified fields.

### DELETE
Remove resources from the server.

## Express Basics

Setting up a basic Express server is straightforward:

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/items', (req, res) => {
  res.json({ items: [] });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

## Middleware

Middleware functions have access to the request and response objects. They can execute code, modify these objects, end the request-response cycle, or call the next middleware.

Common middleware includes:
- Body parsers (express.json())
- CORS handlers
- Authentication
- Logging
- Error handling

## Best Practices

### Use Proper Status Codes
- 200 OK - Success
- 201 Created - Resource created
- 400 Bad Request - Invalid input
- 404 Not Found - Resource doesn't exist
- 500 Internal Server Error - Server error

### Version Your API
Include version numbers in your URLs: /api/v1/users

### Handle Errors Consistently
Create a standard error response format and use it throughout your API.

### Validate Input
Always validate and sanitize user input to prevent security vulnerabilities.

### Use Environment Variables
Store configuration in environment variables, never hardcode sensitive information.

## Security Considerations

- Use HTTPS in production
- Implement rate limiting
- Sanitize user input
- Use authentication and authorization
- Keep dependencies updated

## Documentation

Good API documentation is essential. Consider using tools like Swagger/OpenAPI to document your endpoints, request/response formats, and authentication requirements.

## Conclusion

Express makes it easy to build robust RESTful APIs. Follow REST principles, implement proper error handling, and always think about security. With these foundations, you can create APIs that are both powerful and maintainable.`,
      date: '2024-04-01',
      author: 'API Team'
    }
  ];

  const stmt = db.prepare('INSERT INTO articles (title, description, content, date, author) VALUES (?, ?, ?, ?, ?)');
  
  sampleArticles.forEach(article => {
    stmt.run(article.title, article.description, article.content, article.date, article.author);
  });
  
  stmt.finalize();
  console.log('Sample articles inserted successfully.');
}

// API Routes

// Get all articles (list view)
app.get('/api/articles', (req, res) => {
  db.all('SELECT id, title, description, date, author FROM articles ORDER BY date DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ articles: rows });
    }
  });
});

// Get single article by ID (full content)
app.get('/api/articles/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM articles WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Article not found' });
    } else {
      res.json({ article: row });
    }
  });
});

// Create new article
app.post('/api/articles', (req, res) => {
  const { title, description, content, date, author } = req.body;
  
  if (!title || !description || !content || !date || !author) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  db.run(
    'INSERT INTO articles (title, description, content, date, author) VALUES (?, ?, ?, ?, ?)',
    [title, description, content, date, author],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ 
          message: 'Article created successfully',
          id: this.lastID 
        });
      }
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});
