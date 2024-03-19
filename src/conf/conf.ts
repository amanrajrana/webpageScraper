function validate(variable: unknown) {
  if (!variable) {
    console.error(
      `Error: Required Environment variable is not set. please check .env & ./conf/CONF.ts file`
    );
    process.exit(1);
  }

  return String(variable);
}

const CONF = {
  openai: {
    ApiKey: validate(process.env.NEXT_PUBLIC_OPENAI_API_KEY),
    ApiUrl: validate(process.env.NEXT_PUBLIC_OPENAI_API_URL),
  },
  supabase: {
    url: validate(process.env.NEXT_PUBLIC_SUPABASE_URL),
    anonKey: validate(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  },
  webScraperAPI: validate(process.env.NEXT_PUBLIC_WEB_SCRAPER_API),
};

export default CONF;
