import React from "react";
import * as Mui from "@mui/material";
import News from "../News";
import Links from "../Links";
import ShareThis from "../ShareThis";

export default React.memo(() => {
  return (
    <Mui.Grid item md xs={12} component="aside">
      <News />
      <Links />
      <ShareThis />
    </Mui.Grid>
  );
});
