import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Share2, Phone, Download, Play, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  price_text?: string;
  images: string[];
  description: string;
  amenities: string[];
  whatsappNumber: string;
  googleMapsLink?: string;
  youtubeVideoUrl?: string;
  brochure_urls?: string[];
  bedroom_types: Array<{type: string; sqft: number}>;
}

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
}

export const PropertyDetail = ({ property, onBack }: PropertyDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Crore`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in this property: ${property.title} located in ${property.location}. Could you please provide more details?`;
    window.open(`https://wa.me/${property.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title} in ${property.location}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const totalItems = property.images.length + (property.youtubeVideoUrl ? 1 : 0);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === totalItems - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? totalItems - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
          <Button variant="ghost" onClick={onBack} size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Image Gallery */}
        <div className="lg:col-span-2 space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            {(currentImageIndex < property.images.length) ? (
              <img
                src={property.images[currentImageIndex]}
                alt={`Property image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              // YouTube Video
              <div className="w-full h-full flex items-center justify-center bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${property.youtubeVideoUrl?.includes('v=') 
                    ? property.youtubeVideoUrl.split('v=')[1].split('&')[0]
                    : property.youtubeVideoUrl?.split('/').pop()}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Property Video"
                />
              </div>
            )}
            {(property.images.length > 1 || property.youtubeVideoUrl) && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Image Thumbnails and Video */}
          {(property.images.length > 1 || property.youtubeVideoUrl) && (
            <div className="flex gap-2 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
              {property.youtubeVideoUrl && (
                <button
                  onClick={() => setCurrentImageIndex(property.images.length)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 bg-black flex items-center justify-center ${
                    currentImageIndex === property.images.length ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Play className="h-6 w-6 text-white" />
                </button>
              )}
            </div>
          )}

          {/* Property Details */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
                {property.price_text && (
                  <div className="text-2xl font-bold text-primary mt-4">
                    {property.price_text}
                  </div>
                )}
              </div>

              {property.bedroom_types && property.bedroom_types.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Configurations Available</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.bedroom_types.map((config, index) => (
                      <div key={index} className="bg-muted/50 rounded-lg p-4 border">
                        <div className="text-lg font-semibold text-primary">
                          {config.type}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {config.sqft} sq.ft
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {property.description && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">About this property</h2>
                  <p className="text-muted-foreground">{property.description}</p>
                </div>
              )}

              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="mt-6 lg:mt-0">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Interested in this property?</h3>
                <div className="space-y-3">
                  <Button
                    onClick={handleWhatsAppClick}
                    className="w-full"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact on WhatsApp
                  </Button>
                  
                  {property.googleMapsLink && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(property.googleMapsLink, '_blank')}
                      className="w-full"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      View on Google Maps
                    </Button>
                  )}

                  {property.brochure_urls && property.brochure_urls.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(property.brochure_urls![0], '_blank')}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Brochure
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};