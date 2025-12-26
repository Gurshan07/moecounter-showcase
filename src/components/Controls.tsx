import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ControlsProps {
  number: string;
  setNumber: (value: string) => void;
  length: number;
  setLength: (value: number) => void;
}

const Controls = ({ number, setNumber, length, setLength }: ControlsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="number" className="text-base font-medium">Number Value</Label>
        <Input
          id="number"
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter number"
          className="font-mono text-base py-6"
        />
        <p className="text-sm text-muted-foreground">The number to display on the counter</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="length" className="text-base font-medium">Display Length</Label>
        <Input
          id="length"
          type="number"
          min="1"
          max="20"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value) || 1)}
          className="font-mono text-base py-6"
        />
        <p className="text-sm text-muted-foreground">Number of digits to display (1-20)</p>
      </div>
    </div>
  );
};

export default Controls;