import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseGrids from "../../../components/course/CourseGrids";
import FilterForm from "../../../components/forms/CourseFilterForm";
import TopBanner from "../../../components/heroes/TopBanner";
import GenericPagination from "../../../components/navigations/GenericPagination";
import useDebounce from "../../../hooks/useDebounce";
import { IFilterRequest } from "../../../interfaces";
import { RootState } from "../../../store";
import {
  CategoryDispatch,
  fetchCategories,
} from "../../../store/slices/course/category/categorySlice";
import {
  UserBookmarkDispatch,
  fetchUserBookmark,
} from "../../../store/slices/user/bookmark/userBookmarkSlice";
import {
  fetchTags,
  TagDispatch,
} from "../../../store/slices/course/tag/tagSlice";
import { useCookies } from "react-cookie";

export default function MyFavoritePage() {
  const [cookies] = useCookies(["access_token"]);
  const { course: userBookmark } = useSelector(
    (state: RootState) => state.userBookmark
  );
  const { tags } = useSelector((state: RootState) => state.tag);
  const { categories } = useSelector((state: RootState) => state.category);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageTotal, setPageTotal] = useState<number>(1);
  const [currentTags, setCurrentTags] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [currentSortDir, setCurrentSortDir] = useState<string>("desc");

  const userBookmarkDispatch: UserBookmarkDispatch = useDispatch();
  const tagDispatch: TagDispatch = useDispatch();
  const categoryDispatch: CategoryDispatch = useDispatch();
  const debouncedSearch = useDebounce(currentSearch, 1000);

  useEffect(() => {
    tagDispatch(fetchTags());
  }, [tagDispatch]);

  useEffect(() => {
    categoryDispatch(fetchCategories());
  }, [categoryDispatch]);

  useEffect(() => {
    const request: IFilterRequest = {
      page: pageNumber,
      search: debouncedSearch,
      size: 6,
      sortBy: "",
      sortDir: currentSortDir,
      last: "",
      tags: currentTags,
      category: currentCategory,
      status: "",
      access_token: cookies.access_token,
    };
    userBookmarkDispatch(fetchUserBookmark(request));
  }, [
    userBookmarkDispatch,
    pageNumber,
    currentTags,
    currentCategory,
    debouncedSearch,
    currentSortDir,
    cookies,
  ]);

  useEffect(() => {
    if (userBookmark !== undefined) {
      setPageTotal(
        Math.ceil(
          userBookmark?.pagination_response.total_item /
            userBookmark?.pagination_response.limit
        )
      );
    }
  }, [userBookmark]);

  const handleTagChange = (newValue: any, actionMeta: any) => {
    let tags: string;
    tags = "";
    for (let i = 0; i < newValue.length; i++) {
      if (newValue.length >= 2 && i === 1) {
        tags = tags + ",";
      }

      tags = tags + newValue[i].value;

      if (i > 0 && i !== newValue.length - 1) {
        tags = tags + ",";
      }
    }

    setCurrentTags(tags);
    setPageNumber(1);
  };

  const handleCategoryChange = (newValue: any, actionMeta: any) => {
    setCurrentCategory(newValue.value);
    setPageNumber(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(e.target.value);
    setPageNumber(1);
  };

  const handleSortDirChange = (newValue: any, actionMeta: any) => {
    if (newValue.value === "1") {
      setCurrentSortDir("asc");
    } else {
      setCurrentSortDir("desc");
    }
    setPageNumber(1);
  };

  return (
    <div>
      <TopBanner title="MY FAVORITES" />

      <FilterForm
        tags={tags}
        categories={categories}
        handleTagChange={handleTagChange}
        handleCategoryChange={handleCategoryChange}
        handleSearchChange={handleSearchChange}
        handleSortDirChange={handleSortDirChange}
      />
      <CourseGrids
        courses={
          userBookmark?.data
            ? userBookmark.data.map((item) => {
                return item.course;
              })
            : []
        }
      />
      <GenericPagination
        pageNumber={pageNumber}
        pageTotal={pageTotal}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
