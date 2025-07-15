-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  location TEXT NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  area INTEGER NOT NULL,
  description TEXT,
  whatsapp_number TEXT NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Properties are viewable by everyone" 
ON public.properties 
FOR SELECT 
USING (true);

-- Create policy to allow authenticated users to insert properties
CREATE POLICY "Authenticated users can insert properties" 
ON public.properties 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create policy to allow authenticated users to update properties
CREATE POLICY "Authenticated users can update properties" 
ON public.properties 
FOR UPDATE 
TO authenticated
USING (true);

-- Create policy to allow authenticated users to delete properties
CREATE POLICY "Authenticated users can delete properties" 
ON public.properties 
FOR DELETE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();