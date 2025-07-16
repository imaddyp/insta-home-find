import { useState } from "react";
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  price_text?: string;
  propertyType: string;
  bedroom_types: Array<{type: string; sqft: number}>;
  images: string[];
  description: string;
  amenities: string[];
  whatsappNumber: string;
}

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Card 
      className="group cursor-pointer bg-card border border-border hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
      onClick={() => onClick(property)}
    >
      <div className="relative">
        {/* Image Carousel */}
        <div className="relative h-64 bg-muted overflow-hidden">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Image Navigation */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                →
              </button>
            </>
          )}

          {/* Image Indicators */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={toggleLike}
            className="absolute top-3 right-3 bg-black/50 rounded-full p-2 transition-colors hover:bg-black/70"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>

          {/* Property Type Badge */}
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-black/70 text-white border-none"
          >
            {property.propertyType}
          </Badge>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Title and Location */}
            <div>
              <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                {property.title}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {property.location}
              </div>
            </div>

            {/* Price */}
            {property.price_text && (
              <div className="text-2xl font-bold text-primary">
                {property.price_text}
              </div>
            )}

            {/* Bedroom Configurations */}
            {property.bedroom_types && property.bedroom_types.length > 0 && (
              <div className="space-y-1">
                {property.bedroom_types.map((config, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {config.type} - {config.sqft} sq ft
                  </div>
                ))}
              </div>
            )}

            {/* Amenities */}
            <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  {amenity}
                </Badge>
              ))}
              {property.amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  +{property.amenities.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};