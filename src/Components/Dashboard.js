import React from "react";

export default function Dashboard(props) {
  return <b>{JSON.stringify(props.user)}</b>;
}
