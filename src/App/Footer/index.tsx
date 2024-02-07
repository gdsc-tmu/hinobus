import React from "react";
import * as Mui from "@mui/material";

// components
import Space from "src/components/Space";

export default React.memo(() => {
  return (
    <Mui.Box component="footer">
      <Mui.Divider />
      <Mui.Box
        p={3}
        textAlign="center"
        sx={{ background: Mui.colors.grey[100] }}
      >
        <small>
          by
          <Space />
          <Mui.Link
            href="https://twitter.com/natsumeberry"
            color="inherit"
            underline="hover"
            target="_blank"
          >
            @natsumeberry
          </Mui.Link>
        </small>
      </Mui.Box>
    </Mui.Box>
  );
});
