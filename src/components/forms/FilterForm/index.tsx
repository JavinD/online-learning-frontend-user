import React from "react";
import { ICategory, ITag } from "../../../interfaces";
import GenericSearch from "../../inputs/GenericSearch";
import GenericSelect from "../../inputs/GenericSelect";

type Props = {
  tags: ITag[] | undefined;
  categories: ICategory[] | undefined;
  handleTagChange: (newValue: any, actionMeta: any) => void;
  handleCategoryChange: (newValue: any, actionMeta: any) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortDirChange: (newValue: any, actionMeta: any) => void;
};

export default function FilterForm({
  tags,
  categories,
  handleTagChange,
  handleCategoryChange,
  handleSearchChange,
  handleSortDirChange,
}: Props) {
  const sortOptions = [
    { id: 2, name: "Latest" },
    { id: 1, name: "Oldest" },
  ];

  return (
    <div>
      <div className="tag-input">
        {tags !== undefined ? (
          <GenericSelect
            options={tags}
            isMulti={true}
            handleChange={handleTagChange}
            placeholder="Select Tags"
          />
        ) : (
          []
        )}
      </div>
      <div className="category-input">
        {categories !== undefined ? (
          <GenericSelect
            options={categories}
            isMulti={false}
            handleChange={handleCategoryChange}
            placeholder="Select Category"
          />
        ) : (
          []
        )}
      </div>
      <div className="search-input">
        <GenericSearch handleSearchChange={handleSearchChange} />
      </div>

      <div className="sort-input">
        <GenericSelect
          options={sortOptions}
          isMulti={false}
          handleChange={handleSortDirChange}
          placeholder="Sort"
        />
      </div>
    </div>
  );
}
