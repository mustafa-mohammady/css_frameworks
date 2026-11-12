import { fieldClass } from "./styles";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="w-full md:max-w-md">
      <label htmlFor="search" className="sr-only">
        Search by title
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search by title..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass()}
      />
    </div>
  );
}
