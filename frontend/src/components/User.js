import React from "react";
import Card from "./Card";
import UserImage from "../images/user.png";
const User = () => {
    const data = {
        name:"User",
        image:{UserImage}
    }
    return(
        <Card props={data} />
    )
};

export default User;