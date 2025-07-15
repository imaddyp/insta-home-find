import { useState } from "react";
import { ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "./PropertyCard";

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
    const message = `Hi! I'm interested in this property: ${property.title} located in ${property.location}. Price: ${formatPrice(property.price)}. Could you please provide more details?`;
    const whatsappURL = `https://wa.me/${property.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title} in ${property.location}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="p-2"
            >
              <Heart
                className={`h-5 w-5 ${
                  isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                }`}
              />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare} className="p-2">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Image Carousel */}
        <Card className="overflow-hidden">
          <div className="relative">
            <div className="h-96 md:h-[500px] bg-muted overflow-hidden">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    →
                  </button>
                </>
              )}

              {/* Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="p-4 border-t border-border">
                <div className="flex gap-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Info */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">{property.title}</h1>
                      <div className="flex items-center text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {property.propertyType}
                    </Badge>
                  </div>

                  <div className="text-4xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </div>

                  <div className="flex items-center gap-6 text-muted-foreground">
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 mr-2" />
                      <span className="font-medium">{property.bedrooms}</span>
                      <span className="ml-1">Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2" />
                      <span className="font-medium">{property.bathrooms}</span>
                      <span className="ml-1">Bathrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-5 w-5 mr-2" />
                      <span className="font-medium">{property.area}</span>
                      <span className="ml-1">sq ft</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="justify-start p-2">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Interested in this property?</h3>
                <Button
                  variant="whatsapp"
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="w-full"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat on WhatsApp
                </Button>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Get instant response from the property owner
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};