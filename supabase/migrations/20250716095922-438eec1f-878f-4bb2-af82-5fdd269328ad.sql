-- Add new fields to properties table for enhanced listing functionality
ALTER TABLE public.properties 
ADD COLUMN price_text TEXT,
ADD COLUMN bedroom_types JSONB DEFAULT '[]'::jsonb,
ADD COLUMN amenities TEXT[] DEFAULT '{}',
ADD COLUMN brochure_urls TEXT[] DEFAULT '{}';

-- Update existing properties to have default values
UPDATE public.properties 
SET 
  bedroom_types = '[]'::jsonb,
  amenities = '{}',
  brochure_urls = '{}';

-- Remove bathrooms column since it's no longer needed
ALTER TABLE public.properties DROP COLUMN bathrooms;