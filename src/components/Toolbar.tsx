import type { StatusFilter as StatusFilterValue } from "../types";
import SearchInput from "./SearchInput";
import StatusFilter from "./StatusFilter";

type ToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  status: StatusFilterValue;
  onStatusChange: (status: StatusFilterValue) => void;
};

export default function Toolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
}: ToolbarProps) {
  return (
    <div className="row g-3 align-items-center mb-4">
      <div className="col-12 col-md-6">
        <SearchInput value={query} onChange={onQueryChange} />
      </div>
      <div className="col-12 col-md-6 d-flex justify-content-md-end">
        <StatusFilter value={status} onChange={onStatusChange} />
      </div>
    </div>
  );
}
