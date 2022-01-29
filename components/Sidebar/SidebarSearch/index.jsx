import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
const SidebarSearch = ({ setSearch}) => {
  return (
    <Search>
      <SearchIcon />
      <SearchInput
        placeholder="Search in chats"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </Search>
  );
};

export default SidebarSearch;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  border: none;
  outline-width: 0;
  flex: 1;
`;
