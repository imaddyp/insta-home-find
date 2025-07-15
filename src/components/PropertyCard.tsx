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
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  description: string;
  features: string[];
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
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
            <div className="text-2xl font-bold text-primary">
              {formatPrice(property.price)}
            </div>

            {/* Property Details */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                {property.bedrooms}
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                {property.bathrooms}
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                {property.area} sq ft
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {property.features.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{property.features.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};