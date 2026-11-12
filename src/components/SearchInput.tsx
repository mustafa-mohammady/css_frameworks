import Form from "react-bootstrap/Form";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <Form.Group controlId="search">
      <Form.Label visuallyHidden>Search by title</Form.Label>
      <Form.Control
        type="search"
        placeholder="Search by title..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Form.Group>
  );
}
