ALTER TABLE users
ADD COLUMN provider_id UUID REFERENCES providers(id);
