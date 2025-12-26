import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Label htmlFor="number" className="text-sm font-medium text-foreground">
          Number Value
        </Label>
        <Input
          id="number"
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter a number"
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary"
        />
        <p className="text-xs text-muted-foreground">The number to display on the counter</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="length" className="text-sm font-medium text-foreground">
          Display Length
        </Label>
        <Input
          id="length"
          type="number"
          min={1}
          max={20}
          value={length}
          onChange={(e) => setLength(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
          className="bg-secondary border-border text-foreground focus:ring-primary focus:border-primary"
        />
        <p className="text-xs text-muted-foreground">Number of digits to display (1-20)</p>
      </div>
    </div>
  );
};

export default Controls;
