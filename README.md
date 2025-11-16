# api-demo

A full-stack blog application with a React frontend and Node.js API backend. The application features a clean blog listing page and a distraction-free reading mode for articles.

## Features

- **React Frontend**: Built with Vite and Chakra UI for a modern, responsive user interface
- **Node.js API**: Express-based REST API with SQLite database
- **Blog Listing**: Clean article list showing titles, dates, descriptions, and authors
- **Reading Mode**: Distraction-free article reader with optimized typography and layout
- **Modern UI Library**: Uses Chakra UI, a modern component library focused on user input and accessibility

## Project Structure

```
api-demo/
├── main.js              # API server entry point
├── package.json         # API dependencies
├── articles.db          # SQLite database (auto-created)
└── frontend/            # React application
    ├── src/
    │   ├── components/
    │   │   ├── ArticleList.jsx    # Blog listing page
    │   │   └── ArticleReader.jsx  # Article reading mode
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mhowey/api-demo.git
cd api-demo
```

2. Install API dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

## Running the Application

### Start the API Server

From the root directory:

```bash
node main.js
```

The API will start on `http://localhost:3001` and automatically:
- Create the SQLite database if it doesn't exist
- Create the articles table
- Populate with sample articles

### Start the Frontend

In a separate terminal, from the root directory:

```bash
cd frontend
npm run dev
```

The React app will start on `http://localhost:3000`

### Access the Application

Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### GET /api/articles
Returns a list of all articles with basic information (id, title, description, date, author)

**Response:**
```json
{
  "articles": [
    {
      "id": 1,
      "title": "Article Title",
      "description": "Article description",
      "date": "2024-01-15",
      "author": "Author Name"
    }
  ]
}
```

### GET /api/articles/:id
Returns a single article with full content

**Response:**
```json
{
  "article": {
    "id": 1,
    "title": "Article Title",
    "description": "Article description",
    "content": "Full article content in markdown",
    "date": "2024-01-15",
    "author": "Author Name"
  }
}
```

### POST /api/articles
Creates a new article

**Request Body:**
```json
{
  "title": "New Article",
  "description": "Article description",
  "content": "Article content in markdown",
  "date": "2024-01-15",
  "author": "Author Name"
}
```

**Response:**
```json
{
  "message": "Article created successfully",
  "id": 6
}
```

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **SQLite3**: Embedded database
- **CORS**: Cross-origin resource sharing middleware

### Frontend
- **React**: UI library
- **Vite**: Build tool and dev server
- **Chakra UI**: Component library focused on accessibility and user input
- **React Router**: Client-side routing
- **React Markdown**: Markdown rendering

## Design Features

### Blog Listing Page
- Clean, card-based layout
- Displays article title, date, description, and author
- Hover effects for better interactivity
- Responsive design for all screen sizes

### Reading Mode
- Distraction-free interface with minimal UI
- Optimized typography for reading comfort
- Proper line length and spacing
- Sticky back button for easy navigation
- Markdown support for rich content formatting

### UI Library (Chakra UI)
- Accessible components out of the box
- Consistent design system
- Easy theming and customization
- Form components optimized for user input
- Built-in responsive utilities

## License

ISC

