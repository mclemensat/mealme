import React from "react";
import Shimmer from "./Shimmer";

function SkeletonProfile({ theme }) {
  const themeClass = theme || "light";

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-profile">
        <div />
      </div>
      <Shimmer />
    </div>
  );
}

export default SkeletonProfile;
