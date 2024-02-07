import React from "react";
import * as Mui from "@mui/material";

// components
import NoWrap from "src/components/NoWrap";
import Space from "src/components/Space";

export default React.memo(() => {
  return (
    <Mui.AppBar
      component="header"
      position="static"
      sx={{ userSelect: "none" }}
    >
      <Mui.Toolbar sx={{ p: 2, textAlign: "center", mx: "auto" }}>
        <Mui.Typography component="h1">
          <NoWrap>日野・南大沢</NoWrap>
          <Space />
          <NoWrap>キャンパス間連絡バス</NoWrap>
          <Space />
          <NoWrap>リアルタイム時刻表</NoWrap>
        </Mui.Typography>
      </Mui.Toolbar>
    </Mui.AppBar>
  );
});
