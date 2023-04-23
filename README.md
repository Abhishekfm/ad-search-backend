# Search Page Backend
This is a Node.js project that provides the backend functionality for a search page. The search page allows users to input a keyword and retrieve relevant ads from a database. The search is conducted across the company name, primary text, headline, and description fields in a single query using the aggregate and unwind functions.

## Installation
- Clone the repository to your local machine using git clone https://github.com/Abhishekfm/ad-search-backend
- Navigate to the project directory using cd ad-search-backend
- Install the dependencies using npm install

## Usage
- Start the server using node index.js
- Send a POST request to the /api/search endpoint with the keyword as a body json searchTern Key with Value, e.g. http://localhost:4000/api/search
- The server will conduct the search and return the retrieved ads in a JSON format.