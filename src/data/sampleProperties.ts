import { Property } from "@/components/PropertyCard";
import property1_1 from "@/assets/property1-1.jpg";
import property1_2 from "@/assets/property1-2.jpg";
import property1_3 from "@/assets/property1-3.jpg";
import property2_1 from "@/assets/property2-1.jpg";
import property3_1 from "@/assets/property3-1.jpg";

export const sampleProperties: Property[] = [
  {
    id: "1",
    title: "Luxury 2BHK Apartment in Bandra West",
    location: "Bandra West, Mumbai",
    price: 4500000,
    propertyType: "2BHK",
    bedrooms: 2,
    bathrooms: 2,
    area: 1250,
    images: [property1_1, property1_2, property1_3],
    description: "Experience luxury living in this beautifully designed 2BHK apartment located in the heart of Bandra West. This spacious home features modern amenities, premium finishes, and stunning city views. The apartment boasts an open-plan living and dining area, a contemporary kitchen with high-end appliances, and two well-appointed bedrooms with en-suite bathrooms. Located in a prime area with excellent connectivity to major business districts and entertainment hubs.",
    features: [
      "Premium Modular Kitchen",
      "Marble Flooring",
      "City View",
      "24/7 Security",
      "Swimming Pool",
      "Gym",
      "Parking Space",
      "Power Backup",
      "Elevator",
      "Balcony",
      "Air Conditioning",
      "Internet Ready"
    ],
    whatsappNumber: "919876543210"
  },
  {
    id: "2",
    title: "Stunning 4BHK Villa with Pool",
    location: "Gurgaon, Delhi NCR",
    price: 15000000,
    propertyType: "4BHK",
    bedrooms: 4,
    bathrooms: 4,
    area: 3500,
    images: [property2_1, property1_1, property1_2],
    description: "Magnificent 4BHK independent villa set in a serene location with beautiful landscaping and a private swimming pool. This luxury home offers spacious rooms, premium fixtures, and modern amenities for a comfortable lifestyle. The villa features a grand entrance, spacious living areas, a modern kitchen, four master bedrooms, and beautifully manicured gardens. Perfect for families looking for privacy and luxury in a peaceful environment.",
    features: [
      "Private Swimming Pool",
      "Landscaped Garden",
      "Servant Quarter",
      "Covered Parking",
      "Modern Kitchen",
      "Master Bedrooms",
      "Security System",
      "Power Backup",
      "Terrace Garden",
      "Club House Access",
      "Children's Play Area",
      "24x7 Water Supply"
    ],
    whatsappNumber: "919876543210"
  },
  {
    id: "3",
    title: "Cozy 1BHK Apartment Near IT Hub",
    location: "Whitefield, Bangalore",
    price: 1800000,
    propertyType: "1BHK",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    images: [property3_1, property1_2, property1_3],
    description: "Perfect starter home for young professionals! This well-designed 1BHK apartment is located in Whitefield, close to major IT companies and shopping centers. The apartment features a comfortable bedroom, modern bathroom, compact kitchen, and a cozy living area. Ideal for working professionals who want to be close to the IT corridor while enjoying modern amenities and good connectivity.",
    features: [
      "Ready to Move",
      "Modular Kitchen",
      "Wooden Flooring",
      "Balcony",
      "Elevator",
      "Security",
      "Parking",
      "Internet Ready",
      "Near Metro",
      "Power Backup",
      "Water Supply",
      "Maintenance Staff"
    ],
    whatsappNumber: "919876543210"
  },
  {
    id: "4",
    title: "Spacious 3BHK Family Home",
    location: "Koregaon Park, Pune",
    price: 8500000,
    propertyType: "3BHK",
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    images: [property1_1, property2_1, property3_1],
    description: "Beautiful 3BHK apartment perfect for growing families. Located in the prestigious Koregaon Park area, this home offers excellent connectivity, nearby schools, and a family-friendly environment. The apartment features spacious rooms, modern amenities, and is part of a well-maintained residential complex with recreational facilities.",
    features: [
      "Family-Friendly Complex",
      "Near Schools",
      "Children's Play Area",
      "Spacious Rooms",
      "Modern Amenities",
      "Covered Parking",
      "24/7 Security",
      "Maintenance Service",
      "Garden Area",
      "Community Hall",
      "Power Backup",
      "Water Harvesting"
    ],
    whatsappNumber: "919876543210"
  },
  {
    id: "5",
    title: "Premium 2BHK with Sea View",
    location: "Marine Drive, Mumbai",
    price: 12000000,
    propertyType: "2BHK",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    images: [property1_2, property1_1, property2_1],
    description: "Exclusive 2BHK apartment with breathtaking sea views from Marine Drive. This premium property offers luxury living with panoramic views of the Arabian Sea. Features include high-end finishes, spacious interiors, and access to premium amenities. Perfect for those who want to experience the best of Mumbai's coastal lifestyle.",
    features: [
      "Sea View",
      "Premium Location",
      "High-End Finishes",
      "Concierge Service",
      "Valet Parking",
      "Swimming Pool",
      "Gym & Spa",
      "24/7 Security",
      "Panoramic Views",
      "Luxury Interiors",
      "Central AC",
      "Smart Home Features"
    ],
    whatsappNumber: "919876543210"
  },
  {
    id: "6",
    title: "Modern 1BHK Studio Apartment",
    location: "Indiranagar, Bangalore",
    price: 2200000,
    propertyType: "1BHK",
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    images: [property3_1, property1_3, property1_1],
    description: "Stylish studio apartment in the vibrant Indiranagar locality. Perfect for young professionals and students, this compact home maximizes space with smart design. Located in the heart of Bangalore's most happening neighborhood with excellent restaurants, cafes, and nightlife within walking distance.",
    features: [
      "Central Location",
      "Compact Design",
      "Modern Fixtures",
      "Near Restaurants",
      "Metro Connectivity",
      "Furnished Option",
      "High-Speed Internet",
      "Security",
      "Elevator",
      "Parking",
      "Power Backup",
      "Laundry Service"
    ],
    whatsappNumber: "919876543210"
  }
];