import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseGrids from "../../../components/course/CourseGrids";
import FilterForm from "../../../components/forms/CourseFilterForm";
import TopBanner from "../../../components/heroes/TopBanner";
import GenericPagination from "../../../components/navigations/GenericPagination";
import useDebounce from "../../../hooks/useDebounce";
import { IFilterRequest } from "../../../interfaces";
import { RootState } from "../../../store";
import { fetchCategories } from "../../../store/slices/course/category/categorySlice";
import {
  CourseDispatch,
  fetchCourses,
} from "../../../store/slices/course/courseSlice";
import { fetchTags } from "../../../store/slices/course/tag/tagSlice";

type Props = {
  Banner?: string;
};

export default function CoursePage({ Banner }: Props) {
  const { courses } = useSelector((state: RootState) => state.course);
  const { tags } = useSelector((state: RootState) => state.tag);
  const { categories } = useSelector((state: RootState) => state.category);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageTotal, setPageTotal] = useState<number>(1);
  const [currentTags, setCurrentTags] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [currentSortDir, setCurrentSortDir] = useState<string>("desc");

  const courseDispatch: CourseDispatch = useDispatch();
  const tagDispatch: CourseDispatch = useDispatch();
  const categoryDispatch: CourseDispatch = useDispatch();
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
      access_token: "",
    };
    courseDispatch(fetchCourses(request));
  }, [
    courseDispatch,
    pageNumber,
    currentTags,
    currentCategory,
    debouncedSearch,
    currentSortDir,
  ]);

  useEffect(() => {
    if (courses !== undefined) {
      setPageTotal(
        Math.ceil(
          courses?.pagination_response.total_item /
            courses?.pagination_response.limit
        )
      );
    }
  }, [courses]);

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
      {!Banner ? <TopBanner title="COURSES" /> : null}

      <FilterForm
        tags={tags}
        categories={categories}
        handleTagChange={handleTagChange}
        handleCategoryChange={handleCategoryChange}
        handleSearchChange={handleSearchChange}
        handleSortDirChange={handleSortDirChange}
      />
      <CourseGrids courses={courses?.data} />
      <GenericPagination
        pageNumber={pageNumber}
        pageTotal={pageTotal}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
