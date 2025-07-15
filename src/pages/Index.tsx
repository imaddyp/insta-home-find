import { useState, useMemo } from "react";
import { Home, MapPin, Search } from "lucide-react";
import { SearchBar, SearchFilters } from "@/components/SearchBar";
import { PropertyCard, Property } from "@/components/PropertyCard";
import { PropertyDetail } from "@/components/PropertyDetail";
import { sampleProperties } from "@/data/sampleProperties";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    propertyType: "All",
    location: "All",
    minPrice: "",
    maxPrice: "",
  });

  // Filter properties based on search criteria
  const filteredProperties = useMemo(() => {
    return sampleProperties.filter((property) => {
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
        {filteredProperties.length > 0 ? (
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
