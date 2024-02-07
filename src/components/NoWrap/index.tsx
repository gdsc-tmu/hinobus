import React from "react";
import * as Mui from "@mui/material";

export interface NoWrapProps {
  children?: React.ReactNode | React.ReactNode[];
}

export default React.memo((props: NoWrapProps) => {
  return (
    <Mui.Typography component="span" display="inline-block">
      {props.children}
    </Mui.Typography>
  );
});
