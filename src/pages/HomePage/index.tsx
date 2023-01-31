import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericButton from "../../components/buttons/GenericButton";
import CourseCard from "../../components/cards/CourseCard";
import { ICourse } from "../../interfaces";
import { RootState } from "../../store";
import Lottie from "lottie-react";
import champion from "../../assets/131015-champion.json";
import onlineLearning from "../../assets/90714-online-learning.json";
import {
  fetchTrendingCourses,
  TrendingCourseDispatch,
} from "../../store/slices/course/trendingCourseSlice";
import CoursePage from "../User/CoursePage";
import "./style.scss";

type Props = {};

export default function HomePage({}: Props) {
  const { courses: trendingCourses } = useSelector(
    (state: RootState) => state.trendingCourse
  );

  const trendingCourseDispatch: TrendingCourseDispatch = useDispatch();

  useEffect(() => {
    trendingCourseDispatch(fetchTrendingCourses());
  }, [trendingCourseDispatch]);

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
            <h3 className="greeting-heading">
              Welcome to <p className="primary">DigiEdu!</p>
            </h3>
            <h4 className="greeting-subheading">
              There are many variations of passages of lorem ipsum available but
              the majority have suffered alteration in some form by injected
              humour or randomised words which don't look.
            </h4>
            <div className="row">
              <div className="col">
                <Lottie animationData={onlineLearning} loop={true} />
                Learn from the best teachers from around the world.
              </div>
            </div>
            <GenericButton label="Check out Our Courses" />
          </div>
          <div className="col-xl-6">Image</div>
        </div>
      </section>
      {/* Trending Secton */}
      {trendingCourses !== undefined && trendingCourses.length !== 0 ? (
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
            {trendingCourses.map((course: ICourse) => {
              return <CourseCard course={course} />;
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
