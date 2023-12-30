# OpenAI Files Information Project

This project is designed to interact with OpenAI's API and store file information in a Supabase database.

## Installing Packages

This project uses npm for package management. To install the necessary packages, you need to run the following command in your terminal:

```bash
npm install
```

## Database Setup

We use Supabase as our database. To set it up, you need to create a table named `openaifilesInfo`. Here's the SQL command to create the table:

```sql
CREATE TABLE openaifilesInfo (
  db_id SERIAL PRIMARY KEY,
  object TEXT,
  id TEXT UNIQUE NOT NULL,
  purpose TEXT,
  filename TEXT,
  bytes INT,
  status TEXT,
  status_details TEXT,
  created_at INTEGER
);

````

This table will store information about the files you interact with using the OpenAI API.

## Environment Variables

To run this project, you need to set up the following environment variables in your .env file:

```js
NEXT_PUBLIC_OPENAI_API_KEY = "Your OpenAI API Key";
NEXT_PUBLIC_API_URL = "Your API URL";
NEXT_PUBLIC_SUPABASE_URL = "Your Supabase Project URL";
NEXT_PUBLIC_SUPABASE_ANON_KEY = "Your Supabase Anon Key";
```

Replace the placeholders with your actual keys and URLs.
