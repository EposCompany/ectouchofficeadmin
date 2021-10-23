import React from "react";
import { Typography } from "@material-ui/core";

export default function ResultPage(props) {
  return (
    <>
      <Typography>
        {" "}
        "Followings you will find the result of you actions"{" "}
      </Typography>

      <Typography> {props.message} </Typography>
    </>
  );
}
