import React from "react";
import { Input } from "@/components/ui/input";

type SearchProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput = ({ searchQuery, setSearchQuery }: SearchProps) => {
  return (
    <div className="py-4">
      <Input
        id="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className=""
        placeholder="Search your playlist..."
      />
    </div>
  );
};

export default SearchInput;
