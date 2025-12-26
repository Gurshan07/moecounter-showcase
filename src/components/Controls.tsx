import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ControlsProps {
  number: string;
  setNumber: (value: string) => void;
  length: number;
  setLength: (value: number) => void;
}

const Controls = ({ number, setNumber, length, setLength }: ControlsProps) => {
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (Number.isNaN(value)) {
      setLength(1);
      return;
    }

    // Clamp value between 1 and 20
    const clampedValue = Math.min(20, Math.max(1, value));
    setLength(clampedValue);
  };

  return (
    <div className="space-y-6">
      {/* Number Input */}
      <div className="space-y-2">
        <Label htmlFor="number" className="text-base font-medium">
          Number Value
        </Label>
        <Input
          id="number"
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter number"
          className="font-mono text-base py-6"
        />
        <p className="text-sm text-muted-foreground">
          The number to display on the counter
        </p>
      </div>

      {/* Length Input */}
      <div className="space-y-2">
        <Label htmlFor="length" className="text-base font-medium">
          Display Length
        </Label>
        <Input
          id="length"
          type="number"
          min={1}
          max={20}
          value={length}
          onChange={handleLengthChange}
          className="font-mono text-base py-6"
        />
        <p className="text-sm text-muted-foreground">
          Number of digits to display (1–20)
        </p>
      </div>
    </div>
  );
};

export default Controls;
