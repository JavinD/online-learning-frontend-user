import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  CourseDispatch,
  fetchCourses,
} from "../../store/slices/course/courseSlice";
import { ICourse, IFilterRequest } from "../../interfaces";
import index from "../../components/inputs/GenericInput";
import CourseCard from "../../components/cards/CourseCard";
import {
  fetchTrendingCourses,
  TrendingCourseDispatch,
} from "../../store/slices/course/trendingCourseSlice";
import GenericMultiSelect from "../../components/inputs/GenericSelect";
import CourseGrids from "../../components/course/CourseGrids";
import CoursePage from "../User/CoursePage";

type Props = {};

export default function HomePage({}: Props) {
  const { courses: trendingCourses } = useSelector(
    (state: RootState) => state.trendingCourse
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const trendingCourseDispatch: TrendingCourseDispatch = useDispatch();

  useEffect(() => {
    const request: IFilterRequest = {
      page: 0,
      search: "",
      size: 10,
      sortBy: "",
      sortDir: "",
      last: "",
      tags: "",
      category: "",
      status: "",
      token: "",
    };
    trendingCourseDispatch(fetchTrendingCourses());
  }, [trendingCourseDispatch]);

  const carouselInfiniteScroll = () => {
    if (trendingCourses !== undefined) {
      if (currentIndex === trendingCourses?.length - 1) {
        setCurrentIndex(0);
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="vh-100">
      <br />
      <br />
      <br />
      <br />
      {/* Greeting Section */}
      <section className="container">
        <div className="row greeting-container d-flex justify-content-center">
          <div className="col-xl-6 greeting-text">
            <h3 className="greeting-heading">Welcome to DigiEdu!</h3>
            <h4 className="greeting-subheading">
              There are many variations of passages of lorem ipsum available but
              the majority have suffered alteration in some form by injected
              humour or randomised words which don't look.
            </h4>
            <div className="row">
              <div className="col-xl-6">Image - text</div>
              <div className="col-xl-6">Image - text</div>
            </div>
            <button className="btn btn-primary">Learn More</button>
          </div>
          <div className="col-xl-6">Image</div>
        </div>
      </section>
      {/* Trending Secton */}
      <section className="d-flex flex-column justify-content-center align-items-center">
        <div className="trending-title row d-flex w-100">
          <div className="trending-title-one">
            <div>
              <h2 className="trending-title-heading">
                Our trending courses this week
              </h2>
            </div>
          </div>
        </div>

        <div className="container row trending-card-container d-flex justify-content-center ">
          {trendingCourses !== undefined
            ? trendingCourses.map((course: ICourse) => {
                return <CourseCard course={course} />;
              })
            : []}
        </div>
      </section>

      {/* Courses Filter Section */}

      <section className="d-flex flex-column justify-content-center align-items-center">
        <div className="trending-title row d-flex w-100">
          <div className="trending-title-one">
            <div>
              <h2 className="trending-title-heading">
                Explore our available courses
              </h2>
            </div>
          </div>
        </div>

        <CoursePage Banner="none" />
      </section>
    </div>
  );
}
