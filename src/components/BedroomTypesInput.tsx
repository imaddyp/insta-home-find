import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface BedroomType {
  type: string;
  sqft: string;
}

interface BedroomTypesInputProps {
  bedroomTypes: BedroomType[];
  onChange: (bedroomTypes: BedroomType[]) => void;
}

export const BedroomTypesInput = ({ bedroomTypes, onChange }: BedroomTypesInputProps) => {
  const addBedroomType = () => {
    onChange([...bedroomTypes, { type: '', sqft: '' }]);
  };

  const removeBedroomType = (index: number) => {
    const newTypes = bedroomTypes.filter((_, i) => i !== index);
    onChange(newTypes);
  };

  const updateBedroomType = (index: number, field: 'type' | 'sqft', value: string) => {
    const newTypes = [...bedroomTypes];
    newTypes[index] = { ...newTypes[index], [field]: value };
    onChange(newTypes);
  };

  return (
    <div className="space-y-2">
      <Label>Bedroom Types & Sq Ft</Label>
      {bedroomTypes.map((bedroomType, index) => (
        <div key={index} className="flex gap-2 items-end">
          <div className="flex-1">
            <Input
              placeholder="e.g., 1 Bed"
              value={bedroomType.type}
              onChange={(e) => updateBedroomType(index, 'type', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Square feet"
              type="number"
              value={bedroomType.sqft}
              onChange={(e) => updateBedroomType(index, 'sqft', e.target.value)}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeBedroomType(index)}
            disabled={bedroomTypes.length === 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addBedroomType}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Bedroom Type
      </Button>
    </div>
  );
};