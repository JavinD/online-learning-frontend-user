import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ICourse } from "../../../interfaces";
import GenericButton from "../../buttons/GenericButton";
import CourseCategory from "../../course/Category";
import "./style.scss";

type Props = {
  course: ICourse;
};

export default function CourseCard({ course }: Props) {
  let link = `/course/${course.slug}`;
  const location = useLocation();

  if (location.pathname === "my-course") {
    link = `/my-course/${course.slug}`;
  }

  return (
    <div className="col-lg-4">
      <div className="trending-card card">
        <img
          className="card-img-top trending-card-img"
          src={course.img_thumbnail}
          alt={course.title + " thumbnail"}
        />
        <CourseCategory label={course.category.name} />
        <div className="card-body">
          <div className="card-author">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
              alt="author"
              className="card-author-img"
            />
            <span className="card-author-name">by {course.author_name}</span>
          </div>

          <h5 className="card-title">{course.title}</h5>

          <div className="card-description">
            <p className="card-description-text">{course.summary_desc}</p>
          </div>

          <p className="card-price">Rp. {course.price}</p>

          <NavLink to={link}>
            <GenericButton label="See Details" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
