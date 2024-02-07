import React from "react";
import * as Mui from "@mui/material";

// components
import Space from "src/components/Space";

export interface DestinationSignProps {
  from: string;
  to: string;
  color: string;
}

export default React.memo((props: DestinationSignProps) => {
  return (
    <Mui.Box sx={{ pb: 3 }}>
      <Mui.Paper
        sx={{
          p: 2,
          color: "white",
          background: props.color,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Mui.Grid container maxWidth={300} marginX="auto">
          <Mui.Grid item xs={4} sx={{ textAlign: "start" }}>
            {props.from} <small>発</small>
          </Mui.Grid>
          <Mui.Grid item xs={4} sx={{ textAlign: "center" }}>
            ⇒
          </Mui.Grid>
          <Mui.Grid item xs={4} sx={{ textAlign: "end" }}>
            <Mui.Typography component="span" fontWeight="bold" borderBottom={1}>
              {props.to}
            </Mui.Typography>
            <Space />
            <small>行き</small>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Paper>
    </Mui.Box>
  );
});
