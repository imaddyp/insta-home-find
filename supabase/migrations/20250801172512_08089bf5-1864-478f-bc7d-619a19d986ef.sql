-- Add Google Maps link and YouTube video URL fields to properties table
ALTER TABLE public.properties 
ADD COLUMN google_maps_link TEXT,
ADD COLUMN youtube_video_url TEXT;