import React, { useEffect, useState } from "react";
import SkeletonProfile from "./SkeletonProfile";

function User() {
  const [profile, setProfile] = useState(null);

  // runs automatically after initial render
  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();
      setProfile(data);
    }, 5000);
  }, []);

  return (
    <div className="user">
      {profile && <div className="profile" />}

      {!profile && <SkeletonProfile />}
    </div>
  );
}

export default User;
