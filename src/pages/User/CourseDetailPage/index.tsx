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
import { toast, ToastContainer } from "react-toastify";
import { CartDispatch, fetchCart } from "../../../store/slices/cart/cartSlice";
import { isCourseInCart } from "../../../utils/util";
import {
  fetchUserCourse,
  UserCourseDispatch,
} from "../../../store/slices/user/course/userCourseSlice";

type Props = {};

export default function CourseDetailPage({}: Props) {
  const API_URL = process.env.REACT_APP_API_URL_AUTH_USER;

  const { slug } = useParams();
  const { course, courseLoading } = useSelector(
    (state: RootState) => state.courseDetail
  );
  const { course: userCourse } = useSelector(
    (state: RootState) => state.userCourse
  );
  const { cart } = useSelector((state: RootState) => state.cart);
  const [cookies] = useCookies(["token"]);
  const [isInCart, setIsInCart] = React.useState(false);
  const [isOwned, setIsOwned] = React.useState(false);

  const courseDetailDispatch: CourseDetailDispatch = useDispatch();
  const cartDispatch: CartDispatch = useDispatch();
  const userCourseDispatch: UserCourseDispatch = useDispatch();

  useEffect(() => {
    courseDetailDispatch(
      fetchCourse({
        slug: slug,
        token: cookies.token,
      })
    );
  }, [courseDetailDispatch, slug, cookies.token]);

  useEffect(() => {
    cartDispatch(fetchCart(cookies.token));
  }, [cartDispatch, cookies.token]);

  useEffect(() => {
    userCourseDispatch(
      fetchUserCourse({
        token: cookies.token,
        id: course?.id,
      })
    );
  }, [userCourseDispatch, cookies.token, course?.id]);

  useEffect(() => {
    if (cart !== undefined && course !== undefined) {
      const id = course?.id.toLocaleString();
      if (isCourseInCart(id, cart)) {
        setIsInCart(true);
      }

      if (userCourse !== undefined) {
        setIsOwned(true);
      }
    }
  }, [course, cart, userCourse]);

  const handleClick = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const id = course?.id.toLocaleString();

    fetch(API_URL + "/cart/" + id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Error 404: Not Found");
          }
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((res) => {
        setIsInCart(true);
      })
      .catch((error) => {
        toast.error("Failed to process your request", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  if (courseLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div>
      <TopBanner title={"COURSE DETAILS"} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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
                {isInCart ? (
                  <GenericButton label="Already in Cart" disabled={true} />
                ) : isOwned ? (
                  <GenericButton label="Already Owned" disabled={true} />
                ) : (
                  <GenericButton label="Add to Cart" onClick={handleClick} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
