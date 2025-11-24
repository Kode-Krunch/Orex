import { Input } from 'components/ui';
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import QuickFilterTags from './QuickFilterTags';

function Header({
  selectedQuickFilter,
  setSelectedQuickFilter,
  quickFilterOptions,
  searchInputValue,
  setSearchInputValue,
}) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-5 gap-6 items-center">
      <div className="lg:col-span-3 md:col-span-3 sm:col-span-3">
        <QuickFilterTags
          quickFilter={selectedQuickFilter}
          setQuickFilter={setSelectedQuickFilter}
          quickFilterOptions={quickFilterOptions}
        />
      </div>
      <div className="lg:col-span-1 md:col-span-2 sm:col-span-2 h-full">
        <Input
          placeholder="Search"
          prefix={<IoSearch />}
          value={searchInputValue}
          onChange={(event) => setSearchInputValue(event.target.value)}
        ></Input>
      </div>
    </div>
  );
}

export default Header;
