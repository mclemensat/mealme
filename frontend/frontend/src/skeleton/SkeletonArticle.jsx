import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

function SkeletonArticle({ theme }) {
  const themeClass = theme || "light";

  return (
    <div className="titleArticle min-h-screen mt-48">
      <div className="articleMaster">
        <div className={`skeleton-wrapper-title ${themeClass}`}>
          <SkeletonElement type="title" />
          <Shimmer />
        </div>
      </div>
      <div className="textArticle">
        <SkeletonElement type="avatar" />
        <div className={`skeleton-wrapper-text ${themeClass}`}>
          <div className="skeleton-article">
            <SkeletonElement type="text" />
            <Shimmer />
          </div>
        </div>
        <SkeletonElement type="avatar" />
      </div>

      <div className={`skeleton-wrapper-title ${themeClass}`}>
        <SkeletonElement type="title" />
        <Shimmer />
      </div>
      <div className={`skeleton-wrapper-title ${themeClass}`}>
        <SkeletonElement type="title" />
        <Shimmer />
      </div>
    </div>
  );
}

export default SkeletonArticle;
