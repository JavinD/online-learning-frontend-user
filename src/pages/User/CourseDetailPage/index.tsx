import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import GenericButton from "../../../components/buttons/GenericButton";
import CourseCategory from "../../../components/course/Category";
import TopBanner from "../../../components/heroes/TopBanner";
import { RootState } from "../../../store";
import "./styles.scss";
import {
  CourseDetailDispatch,
  fetchCourse,
} from "../../../store/slices/course/courseDetailSlice";
import NotFoundPage from "../../NotFoundPage";
import { useCookies } from "react-cookie";

type Props = {};

export default function CourseDetailPage({}: Props) {
  const { slug } = useParams();
  const { course, courseLoading } = useSelector(
    (state: RootState) => state.courseDetail
  );
  const [cookies] = useCookies(["token"]);

  const courseDetailDispatch: CourseDetailDispatch = useDispatch();

  useEffect(() => {
    courseDetailDispatch(
      fetchCourse({
        slug: slug,
        token: cookies.token,
      })
    );
  }, [courseDetailDispatch, slug, cookies.token]);

  const handleClick = () => {
    console.log("click");
  };

  if (courseLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div>
      <TopBanner title={"COURSE DETAILS"} />

      <section className="container">
        <div className="row course-container ">
          <div className="col-xl-8 course-left">
            <div className="course-preview">
              <div className="course-author">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
                  alt="author"
                  width={60}
                  height={60}
                  className="course-author-img"
                />
                <span>
                  <span className="course-author-by">by</span>
                  <span className="course-author-name">
                    {" "}
                    {course?.author_name}
                  </span>
                </span>
              </div>
              <div className="row">
                <div className="course-title col-md-6">
                  <h1>{course?.title}</h1>
                </div>
                <CourseCategory label={course?.category.name} />
              </div>

              <div className="course-img">
                <img src={course?.img_url} alt="" />
              </div>
            </div>
            <div className="course-content">
              <div className="row course-content-tab">
                <p className="course-content-tab-title">Overview</p>
              </div>
              <div className="course-content-description">
                <p className="course-content-description-text">
                  {course?.summary_desc}
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 course-right">
            <div className="course-price">
              <div className="course-price-text">Course Price</div>
              <div className="course-price-value">Rp. {course?.price}</div>
              <div className="course-price-btn">
                <GenericButton label="Add This Course to Cart" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
