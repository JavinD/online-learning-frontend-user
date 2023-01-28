import React from "react";
import { ICourse } from "../../../interfaces";
import CourseCard from "../../cards/CourseCard";

type Props = {
  courses: ICourse[] | undefined;
};

export default function CourseGrids({ courses }: Props) {
  if (courses === undefined) {
    return <div></div>;
  }

  return (
    <div className="container">
      <div className="container row trending-card-container d-flex justify-content-center">
        {courses.map((course: ICourse) => {
          return <CourseCard key={course.slug} course={course} />;
        })}
      </div>
    </div>
  );
}
