import { useState, useMemo, useEffect } from "react";
import { Home, MapPin, Search, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchBar, SearchFilters } from "@/components/SearchBar";
import { PropertyCard, Property } from "@/components/PropertyCard";
import { PropertyDetail } from "@/components/PropertyDetail";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-image.jpg";

interface DatabaseProperty {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  whatsapp_number: string;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

const Index = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    propertyType: "All",
    location: "All",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Convert database properties to frontend format
      const convertedProperties: Property[] = (data || []).map((prop: DatabaseProperty) => ({
        id: prop.id,
        title: prop.title,
        price: prop.price,
        location: prop.location,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        area: prop.area,
        description: prop.description || '',
        images: prop.image_urls.length > 0 ? prop.image_urls : ['/placeholder.svg'],
        whatsappNumber: prop.whatsapp_number,
        propertyType: 'House', // Default since we don't have this in DB yet
        features: [] // Default empty features array
      }));
      
      setProperties(convertedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter properties based on search criteria
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Query filter (title, location, description)
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const searchText = `${property.title} ${property.location} ${property.description}`.toLowerCase();
        if (!searchText.includes(query)) return false;
      }

      // Property type filter
      if (filters.propertyType && filters.propertyType !== "All") {
        if (property.propertyType !== filters.propertyType) return false;
      }

      // Location filter
      if (filters.location && filters.location !== "All") {
        if (!property.location.includes(filters.location)) return false;
      }

      // Price range filter
      if (filters.minPrice && property.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) return false;

      return true;
    });
  }, [filters]);

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleBack = () => {
    setSelectedProperty(null);
  };

  if (selectedProperty) {
    return <PropertyDetail property={selectedProperty} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] bg-gradient-to-r from-primary/10 to-accent/10 overflow-hidden">
        <img
          src={heroImage}
          alt="Real Estate Hero"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 right-4">
          <Button 
            onClick={() => navigate('/auth')} 
            variant="secondary"
            size="sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            Admin
          </Button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 px-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Find Your Dream Home
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Discover properties without the hassle
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <Search className="h-5 w-5" />
              <span>No registration required • Direct WhatsApp contact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">
              {filteredProperties.length} Properties Found
            </h2>
          </div>
          {filters.query && (
            <div className="text-muted-foreground">
              Showing results for "{filters.query}"
            </div>
          )}
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="text-center py-16">Loading properties...</div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={handlePropertyClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">No properties found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your search filters or browse all available properties
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 py-8 border-t border-border text-center">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Real Estate Discovery</h3>
            <p className="text-muted-foreground">
              Browse properties freely • No spam calls • Direct communication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
