import React from "react";

type Props = {
  label: string | undefined;
};

export default function CourseCategory({ label }: Props) {
  return (
    <div>
      <div className="course-category">
        <p className="course-category-text">{label}</p>
      </div>
    </div>
  );
}
