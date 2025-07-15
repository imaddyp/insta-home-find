import { useState } from "react";
import { Search, Filter, MapPin, Home, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  query: string;
  propertyType: string;
  location: string;
  minPrice: string;
  maxPrice: string;
}

const propertyTypes = ["All", "1BHK", "2BHK", "3BHK", "4BHK+"];
const locations = ["All", "Mumbai", "Delhi", "Bangalore", "Pune", "Chennai"];
const priceRanges = [
  { label: "Any Price", min: "", max: "" },
  { label: "₹10L - ₹25L", min: "1000000", max: "2500000" },
  { label: "₹25L - ₹50L", min: "2500000", max: "5000000" },
  { label: "₹50L - ₹1Cr", min: "5000000", max: "10000000" },
  { label: "₹1Cr+", min: "10000000", max: "" },
];

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    propertyType: "All",
    location: "All",
    minPrice: "",
    maxPrice: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(filters);
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const setPriceRange = (min: string, max: string) => {
    setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  return (
    <div className="w-full bg-card shadow-lg border border-border rounded-xl p-4 mb-6">
      {/* Main search input */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search properties, locations..."
            value={filters.query}
            onChange={(e) => updateFilter("query", e.target.value)}
            className="pl-10 pr-4 h-12 text-base border-border focus:border-primary"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button
          variant="gradient"
          size="lg"
          onClick={handleSearch}
          className="h-12 px-6"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Button
          variant="filter"
          size="lg"
          onClick={() => setShowFilters(!showFilters)}
          className="h-12 px-4"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="border-t border-border pt-4 space-y-4">
          {/* Property Type */}
          <div>
            <label className="flex items-center text-sm font-medium text-foreground mb-2">
              <Home className="h-4 w-4 mr-2" />
              Property Type
            </label>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <Button
                  key={type}
                  variant={filters.propertyType === type ? "default" : "filter"}
                  size="sm"
                  onClick={() => updateFilter("propertyType", type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center text-sm font-medium text-foreground mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              Location
            </label>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <Button
                  key={location}
                  variant={filters.location === location ? "default" : "filter"}
                  size="sm"
                  onClick={() => updateFilter("location", location)}
                >
                  {location}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="flex items-center text-sm font-medium text-foreground mb-2">
              <DollarSign className="h-4 w-4 mr-2" />
              Price Range
            </label>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <Button
                  key={range.label}
                  variant={
                    filters.minPrice === range.min && filters.maxPrice === range.max
                      ? "default"
                      : "filter"
                  }
                  size="sm"
                  onClick={() => setPriceRange(range.min, range.max)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};