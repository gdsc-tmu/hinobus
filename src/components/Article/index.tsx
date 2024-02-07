import React from "react";
import * as Mui from "@mui/material";

export interface ArticleProps {
  title: string;
  side?: React.ReactNode | React.ReactNode[];
  children: React.ReactNode | React.ReactNode[];
}

export default React.memo((props: ArticleProps) => {
  return (
    <Mui.Box pb={5}>
      <Mui.Divider />
      <Mui.Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Mui.Typography
          variant="h5"
          component="h5"
          textAlign="center"
          fontWeight="bold"
          py={2}
        >
          {props.title}
        </Mui.Typography>
        {props.side}
      </Mui.Box>
      {props.children}
    </Mui.Box>
  );
});
