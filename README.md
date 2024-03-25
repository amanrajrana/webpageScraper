# OpenAI Files Information Project

This project is designed to interact with OpenAI's API and store file information in a Supabase database.

## Installing Packages

This project uses npm for package management. To install the necessary packages, you need to run the following command in your terminal:

```bash
npm install
```

## Database Setup

We use Supabase as our database. To set it up, you need to create a table named `openaifilesInfo`. Here's the SQL command to create the table:

**Table `openai_datavault`**

```sql
CREATE TABLE
  public.openai_datavault (
    id SERIAL PRIMARY KEY,
    object TEXT,
    openai_id TEXT UNIQUE NOT NULL,
    purpose TEXT NOT NULL,
    filename TEXT NOT NULL,
    fileType TEXT NOT NULL,
    size INT NOT NULL,
    editable boolean NOT NULL,
    source TEXT NOT NULL,
    status TEXT,
    status_details TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id uuid NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) on delete RESTRICT
  );

```

**Table `text_files`**

```sql
create table
  public.text_files (
    id SERIAL primary key,
    content TEXT not null,
    user_id uuid NOT NULL,
    file_id int NULL NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at timestamp default now(),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) on delete CASCADE,
    CONSTRAINT fk_file FOREIGN KEY (file_id) REFERENCES public.openai_datavault (id) on delete RESTRICT
  )

```

This table will store information about the files you interact with using the OpenAI API.

## Environment Variables

To run this project, you need to set up the following environment variables in your .env file:

```js
NEXT_PUBLIC_OPENAI_API_KEY="YOUR_API_KEY_HERE"
NEXT_PUBLIC_API_URL="Your API URL here"
NEXT_PUBLIC_SUPABASE_URL="Your Supabase Project URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="Your Supabase Anon Key"
NEXT_PUBLIC_WEB_SCRAPER_API="http://localhost:4002" # URL of the API
NEXT_PUBLIC_OPENAI_API_URL="https://api.openai.com/v1" # URL of the OpenAI API
```

Replace the placeholders with your actual keys and URLs.
