import type { StatusFilter as StatusFilterValue } from "../types";
import SearchInput from "./SearchInput";
import StatusFilter from "./StatusFilter";

type ToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  status: StatusFilterValue;
  onStatusChange: (status: StatusFilterValue) => void;
};

export default function Toolbar({ query, onQueryChange, status, onStatusChange }: ToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <SearchInput value={query} onChange={onQueryChange} />
      <StatusFilter value={status} onChange={onStatusChange} />
    </div>
  );
}
