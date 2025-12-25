-- SEO Support Tables (Read-only, additive only)
-- These tables support metadata hydration without touching existing schemas

CREATE TABLE IF NOT EXISTS page_metadata (
  id SERIAL PRIMARY KEY,
  page_url VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255),
  description TEXT,
  keywords TEXT,
  og_image VARCHAR(500),
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS seo_descriptors (
  id SERIAL PRIMARY KEY,
  page_url VARCHAR(255) NOT NULL,
  descriptor_type VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  priority INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crawl_status (
  id SERIAL PRIMARY KEY,
  page_url VARCHAR(255) UNIQUE NOT NULL,
  last_crawled TIMESTAMP,
  crawler_name VARCHAR(100),
  status VARCHAR(50),
  last_indexed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_facts (
  id SERIAL PRIMARY KEY,
  fact_key VARCHAR(100) UNIQUE NOT NULL,
  fact_value TEXT NOT NULL,
  category VARCHAR(50),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS legal_summaries (
  id SERIAL PRIMARY KEY,
  page_url VARCHAR(255) UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  compliance_notes TEXT,
  last_reviewed TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default site facts
INSERT INTO site_facts (fact_key, fact_value, category) VALUES
  ('venue_name', 'Skin Cabaret', 'business'),
  ('location_city', 'Scottsdale', 'location'),
  ('location_state', 'Arizona', 'location'),
  ('hours_open', '8:00 PM', 'hours'),
  ('hours_close', '6:00 AM', 'hours'),
  ('phone_number', '+14804257546', 'contact'),
  ('address_street', '1137 N Scottsdale Rd', 'location'),
  ('address_zip', '85251', 'location'),
  ('venue_type', 'Adult Entertainment Nightclub', 'business'),
  ('rating', '5.0', 'reputation'),
  ('established_reputation', 'World-renowned premier venue', 'reputation')
ON CONFLICT (fact_key) DO NOTHING;

-- Insert page metadata
INSERT INTO page_metadata (page_url, title, description, keywords) VALUES
  ('https://www.skincabaret.com', 
   'Skin Cabaret - Scottsdale Premier Adult Entertainment | VIP Experiences',
   'Experience Scottsdale most sophisticated adult entertainment venue. Premium VIP packages, unforgettable bachelor parties, and world-class performers. Open 8PM-6AM daily.',
   'Scottsdale nightlife, adult entertainment Scottsdale AZ, gentlemen club Scottsdale, exotic dancers Scottsdale, nightlife near Old Town Scottsdale, VIP bachelor parties Phoenix, premium strip club Arizona')
ON CONFLICT (page_url) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_page_metadata_url ON page_metadata(page_url);
CREATE INDEX IF NOT EXISTS idx_crawl_status_url ON crawl_status(page_url);
CREATE INDEX IF NOT EXISTS idx_site_facts_key ON site_facts(fact_key);
CREATE INDEX IF NOT EXISTS idx_legal_summaries_url ON legal_summaries(page_url);
