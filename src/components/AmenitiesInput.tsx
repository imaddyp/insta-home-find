import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface AmenitiesInputProps {
  amenities: string[];
  onChange: (amenities: string[]) => void;
}

export const AmenitiesInput = ({ amenities, onChange }: AmenitiesInputProps) => {
  const addAmenity = () => {
    onChange([...amenities, '']);
  };

  const removeAmenity = (index: number) => {
    const newAmenities = amenities.filter((_, i) => i !== index);
    onChange(newAmenities);
  };

  const updateAmenity = (index: number, value: string) => {
    const newAmenities = [...amenities];
    newAmenities[index] = value;
    onChange(newAmenities);
  };

  return (
    <div className="space-y-2">
      <Label>Amenities</Label>
      {amenities.map((amenity, index) => (
        <div key={index} className="flex gap-2 items-end">
          <div className="flex-1">
            <Input
              placeholder="e.g., Swimming Pool, Gym, Parking"
              value={amenity}
              onChange={(e) => updateAmenity(index, e.target.value)}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeAmenity(index)}
            disabled={amenities.length === 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addAmenity}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Amenity
      </Button>
    </div>
  );
};