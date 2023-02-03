import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GenericButton from "../../../components/buttons/GenericButton";
import CourseCategory from "../../../components/course/Category";
import TopBanner from "../../../components/heroes/TopBanner";
import ToastComponent from "../../../components/toast";
import { RootState } from "../../../store";
import { CartDispatch, fetchCart } from "../../../store/slices/cart/cartSlice";
import {
  CourseDetailDispatch,
  fetchCourse,
} from "../../../store/slices/course/courseDetailSlice";
import {
  fetchUserBookmarkDetail,
  UserBookmarkDetailDispatch,
} from "../../../store/slices/user/bookmark/userBookmarkDetailSlice";
import {
  fetchUserCourseDetail,
  UserCourseDetailDispatch,
} from "../../../store/slices/user/course/userCourseDetailSlice";
import { isCourseInCart, toastFailed, toastSuccess } from "../../../utils/util";
import "./styles.scss";

export default function CourseDetailPage() {
  const API_URL = process.env.REACT_APP_API_URL_AUTH_USER;

  const shareMessage = "Check out this new course!" + window.location.href;

  const { slug } = useParams();
  const { course, courseLoading } = useSelector(
    (state: RootState) => state.courseDetail
  );
  const { course: userCourse } = useSelector(
    (state: RootState) => state.userCourseDetail
  );
  const { course: userBookmark } = useSelector(
    (state: RootState) => state.userBookmarkDetail
  );
  const { cart } = useSelector((state: RootState) => state.cart);
  const [cookies] = useCookies(["access_token"]);
  const [isInCart, setIsInCart] = React.useState(false);
  const [isOwned, setIsOwned] = React.useState(false);
  const [bookmarkState, setBookmarkState] = React.useState("active");
  const [courseStatus, setCourseStatus] = React.useState("unbegun");

  const courseDetailDispatch: CourseDetailDispatch = useDispatch();
  const cartDispatch: CartDispatch = useDispatch();
  const userCourseDetailDispatch: UserCourseDetailDispatch = useDispatch();
  const userBookmarkDetailDispatch: UserBookmarkDetailDispatch = useDispatch();

  useEffect(() => {
    courseDetailDispatch(
      fetchCourse({
        slug: slug,
        access_token: cookies.access_token,
      })
    );
  }, [courseDetailDispatch, slug, cookies.access_token]);

  useEffect(() => {
    cartDispatch(fetchCart(cookies.access_token));
  }, [cartDispatch, cookies.access_token]);

  useEffect(() => {
    userCourseDetailDispatch(
      fetchUserCourseDetail({
        access_token: cookies.access_token,
        id: course?.id,
      })
    );
  }, [userCourseDetailDispatch, cookies.access_token, course?.id]);

  useEffect(() => {
    userBookmarkDetailDispatch(
      fetchUserBookmarkDetail({
        access_token: cookies.access_token,
        id: course?.id,
      })
    );
  }, [userBookmarkDetailDispatch, cookies.access_token, course?.id]);

  useEffect(() => {
    if (cart !== undefined && course !== undefined) {
      const id = course?.id.toString();
      if (isCourseInCart(id, cart)) {
        setIsInCart(true);
      }

      if (userCourse !== undefined) {
        setIsOwned(true);
        setCourseStatus(userCourse.status);
      }

      if (userBookmark !== undefined) {
        setBookmarkState("inactive");
      }
    }
  }, [course, cart, userCourse, userBookmark]);

  const handleBookmark = () => {
    const courseId = course?.id.toString();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.access_token,
      },
      body: JSON.stringify({ state: bookmarkState }),
    };

    fetch(API_URL + "/bookmark/" + courseId, requestOptions)
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
        if (bookmarkState === "inactive") {
          setBookmarkState("active");
          toastSuccess("Course unbookmarked");
          return;
        }
        setBookmarkState("inactive");
        toastSuccess("Course bookmarked");

        return;
      })
      .catch((error) => {
        toastFailed("Failed to bookmark course");
      });
  };

  const handleAddToCart = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.access_token,
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
        toastSuccess("Course added to cart");
        setIsInCart(true);
      })
      .catch((error) => {
        toastFailed("Failed to add course to cart");
      });
  };

  const handleCourseAction = () => {
    let courseAction: string;

    switch (courseStatus) {
      case "unbegun":
        courseAction = "enroll";
        break;
      case "enrolled":
        courseAction = "finish";
        break;
      default:
        courseAction = "";
    }

    const courseId = course?.id.toString();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.access_token,
      },
      body: JSON.stringify({ action: courseAction }),
    };

    fetch(API_URL + "/course/" + courseId, requestOptions)
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
        userCourseDetailDispatch(
          fetchUserCourseDetail({
            access_token: cookies.access_token,
            id: course?.id,
          })
        );
        toastSuccess("Course " + courseAction + "ed");
        return;
      })
      .catch((error) => {
        toastFailed("Failed to " + courseAction + " course");
      });
  };

  if (courseLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div>
      <TopBanner title={"COURSE DETAILS"} />
      <ToastComponent />

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
                  {course?.content}
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 course-right">
            {!isOwned ? (
              <div className="course-price">
                <div className="course-price-text">Course Price</div>
                <div className="course-price-value">Rp. {course?.price}</div>
                <div className="course-price-btn">
                  {isInCart ? (
                    <GenericButton label="Already in Cart" disabled={true} />
                  ) : isOwned ? (
                    <GenericButton label="Already Owned" disabled={true} />
                  ) : (
                    <GenericButton
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          fill="currentColor"
                          className="bi bi-cart"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
                        </svg>
                      }
                      label="Add to Cart"
                      onClick={handleAddToCart}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="course-enroll">
                <div className="course-enroll-btn">
                  {courseStatus === "unbegun" ? (
                    <GenericButton
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          fill="currentColor"
                          className="bi bi-play-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 0v16l16-8-16-8z" />
                        </svg>
                      }
                      label="Start Course"
                      onClick={handleCourseAction}
                    />
                  ) : courseStatus === "enrolled" ? (
                    <GenericButton
                      icon={
                        // complete svg
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          fill="currentColor"
                          className="bi bi-check-circle"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.97-11.03a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.72-3.72a.75.75 0 0 1 1.06 0z"
                          />
                        </svg>
                      }
                      label="Finish Course"
                      onClick={handleCourseAction}
                    />
                  ) : (
                    <GenericButton
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          fill="green"
                          className="bi bi-check-circle"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.97-11.03a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.72-3.72a.75.75 0 0 1 1.06 0z"
                          />
                        </svg>
                      }
                      label="Course Finished"
                      disabled={true}
                    />
                  )}
                </div>
              </div>
            )}
            <div className="course-bookmark-btn">
              {bookmarkState === "active" ? (
                <GenericButton
                  icon={
                    <svg
                      width="50px"
                      height="50px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="pink"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.6901C2 5.6001 4.49 3.1001 7.56 3.1001C9.38 3.1001 10.99 3.9801 12 5.3401C13.01 3.9801 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.6001 22 8.6901C22 15.6901 15.52 19.8201 12.62 20.8101Z"
                        strokeWidth="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  }
                  label="Bookmark"
                  onClick={handleBookmark}
                />
              ) : (
                <GenericButton
                  icon={
                    <svg
                      width="50px"
                      height="50px"
                      viewBox="0 0 24 24"
                      fill="pink"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.6901C2 5.6001 4.49 3.1001 7.56 3.1001C9.38 3.1001 10.99 3.9801 12 5.3401C13.01 3.9801 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.6001 22 8.6901C22 15.6901 15.52 19.8201 12.62 20.8101Z"
                        strokeWidth="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  }
                  label="Unbookmark"
                  onClick={handleBookmark}
                />
              )}
            </div>
            <div className="course-share">
              <GenericButton
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="#1DA1F2"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />{" "}
                  </svg>
                }
                label="Share now"
                onClick={() => {
                  window.open(
                    "https://twitter.com/intent/tweet?text=" +
                      encodeURI(shareMessage),
                    "_blank"
                  );
                }}
              />
            </div>
            {/* Course Stats */}
            <div className="course-stats">
              <div className="course-stats-container">
                <div className="course-stats-text">Total Bookmarked</div>
                <div className="course-stats-value">
                  {course?.stats.total_bookmarked
                    ? course?.stats.total_bookmarked
                    : 0}
                </div>
              </div>
              <div className="course-stats-container">
                <div className="course-stats-text">Total Finished</div>
                <div className="course-stats-value">
                  {course?.stats.total_finished
                    ? course?.stats.total_finished
                    : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
