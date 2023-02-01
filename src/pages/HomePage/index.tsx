import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericButton from "../../components/buttons/GenericButton";
import CourseCard from "../../components/cards/CourseCard";
import { ICourse } from "../../interfaces";
import { RootState } from "../../store";
import onlineLearning from "../../assets/90714-online-learning.json";
import {
  fetchTrendingCourses,
  TrendingCourseDispatch,
} from "../../store/slices/course/trendingCourseSlice";
import CoursePage from "../User/CoursePage";
import "./style.scss";
import LottieComponent from "../../components/animations/Lottie";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/navigations/Footer";

export default function HomePage() {
  const navigate = useNavigate();
  const { courses: trendingCourses } = useSelector(
    (state: RootState) => state.trendingCourse
  );

  const trendingCourseDispatch: TrendingCourseDispatch = useDispatch();

  useEffect(() => {
    trendingCourseDispatch(fetchTrendingCourses());
  }, [trendingCourseDispatch]);

  return (
    <div>
      {/* Greeting Section */}
      <section className="container">
        <div className="row greeting-container d-flex justify-content-center">
          <div className="col-xl-6 greeting-text">
            <h3 className="greeting-heading">
              Welcome to <p className="primary">DigiEdu!</p>
            </h3>
            <h4 className="greeting-subheading">
              Welcome to DigiEdu, your ultimate destination for digital
              education. Our platform is designed to offer you the most
              comprehensive, engaging, and convenient learning experience
              possible.
            </h4>
            <div className="row d-flex justify-content-evenlly">
              <div className="col-md-6">
                <div className="row d-flex justify-content-between align-items-center">
                  <div className="col-md-4">
                    <svg
                      fill="#2ca396"
                      width="80px"
                      height="80px"
                      viewBox="0 0 32 32"
                      version="1.1"
                      stroke="#2ca396"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>book</title>
                      <path d="M30.728 18.612l-2.112-0.697 0.050 0.052-11.683 4.24-11.184-11.823-2.745-0.906c-1.386 0.981-1.541 3.774-0.61 4.746l13.805 14.19 14.602-5.228c-1.33-0.727-2.409-2.796-0.123-4.573zM15.474 22.441l-11.504-11.928h0.344l11.453 11.693-0.294 0.235zM16.353 27.987c0 0-1.592-1.86 0.471-4.334l12.501-4.527c0 0-1.438 2.469 0.245 3.927l-13.217 4.935zM5.799 10.384l-0.382-0.404 11.654-4.138 11.544 12.073 2.112 0.697c-0.010 0.008-0.020 0.016-0.030 0.024l0.246-0.088-13.623-14.125-14.212 5.072 2.69 0.888z"></path>
                    </svg>
                  </div>
                  <div className="col-md-8 subtext">
                    Enhance your knowledge with us
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row d-flex justify-content-between align-items-center">
                  <div className="col-md-4">
                    <svg
                      fill="#2ca396"
                      width="80px"
                      height="80px"
                      viewBox="-32 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M319.4 320.6L224 416l-95.4-95.4C57.1 323.7 0 382.2 0 454.4v9.6c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-9.6c0-72.2-57.1-130.7-128.6-133.8zM13.6 79.8l6.4 1.5v58.4c-7 4.2-12 11.5-12 20.3 0 8.4 4.6 15.4 11.1 19.7L3.5 242c-1.7 6.9 2.1 14 7.6 14h41.8c5.5 0 9.3-7.1 7.6-14l-15.6-62.3C51.4 175.4 56 168.4 56 160c0-8.8-5-16.1-12-20.3V87.1l66 15.9c-8.6 17.2-14 36.4-14 57 0 70.7 57.3 128 128 128s128-57.3 128-128c0-20.6-5.3-39.8-14-57l96.3-23.2c18.2-4.4 18.2-27.1 0-31.5l-190.4-46c-13-3.1-26.7-3.1-39.7 0L13.6 48.2c-18.1 4.4-18.1 27.2 0 31.6z" />
                    </svg>
                  </div>
                  <div className="col-md-8 subtext">
                    Graduate with the highest grades
                  </div>
                </div>
              </div>
            </div>
            <GenericButton
              onClick={() => {
                navigate("/course");
              }}
              label="Check out Our Courses"
            />
          </div>
          <div className="col-xl-6 d-flex">
            <LottieComponent animationData={onlineLearning} />
          </div>
        </div>
      </section>
      {/* Trending Secton */}
      {trendingCourses !== undefined && trendingCourses.length !== 0 ? (
        <section className="d-flex flex-column justify-content-center align-items-center">
          <div className="trending-title row d-flex w-100">
            <div className="trending-title-one">
              <h2 className="trending-title-heading">
                Our trending courses this week
              </h2>
            </div>
          </div>

          <div className="container row trending-card-container d-flex justify-content-center ">
            {trendingCourses.map((course: ICourse) => {
              return <CourseCard key={course.slug} course={course} />;
            })}
          </div>
        </section>
      ) : (
        <div className="container"></div>
      )}

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
