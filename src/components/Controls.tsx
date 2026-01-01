import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CounterMode = "static" | "increment" | "custom";
export type CounterTheme = "default" | "gelbooru" | "asoul" | "booru-jaypee" | "booru-lisu" | "booru-lewd" | "booru-qualityhentais" | "booru-smtg";

interface ControlsProps {
  mode: CounterMode;
  setMode: (value: CounterMode) => void;
  theme: CounterTheme;
  setTheme: (value: CounterTheme) => void;
  number: string;
  setNumber: (value: string) => void;
  length: number;
  setLength: (value: number) => void;
}

const Controls = ({
  mode,
  setMode,
  theme,
  setTheme,
  number,
  setNumber,
  length,
  setLength,
}: ControlsProps) => {
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
    <div className="space-y-5">
      {/* Mode Selection */}
      <div className="space-y-2">
        <Label htmlFor="mode" className="text-base font-medium">
          Mode
        </Label>
        <Select value={mode} onValueChange={(val) => setMode(val as CounterMode)}>
          <SelectTrigger className="font-mono text-base py-6">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="static">Static (Read-Only)</SelectItem>
            <SelectItem value="increment">Increment (+1)</SelectItem>
            <SelectItem value="custom">Custom Number</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          {mode === "static" && "Reads counter without changing the value"}
          {mode === "increment" && "Increments counter by 1 each request"}
          {mode === "custom" && "Display a custom number"}
        </p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-2">
        <Label htmlFor="theme" className="text-base font-medium">
          Theme
        </Label>
        <Select value={theme} onValueChange={(val) => setTheme(val as CounterTheme)}>
          <SelectTrigger className="font-mono text-base py-6">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="gelbooru">Gelbooru</SelectItem>
            <SelectItem value="asoul">Asoul</SelectItem>
            <SelectItem value="booru-jaypee">Booru Jaypee</SelectItem>
            <SelectItem value="booru-lisu">Booru Lisu</SelectItem>
            <SelectItem value="booru-lewd">Booru Lewd</SelectItem>
            <SelectItem value="booru-qualityhentais">Booru Quality Hentais</SelectItem>
            <SelectItem value="booru-smtg">Booru SMTG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Number Input - Only for custom mode */}
      {mode === "custom" && (
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
      )}

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
