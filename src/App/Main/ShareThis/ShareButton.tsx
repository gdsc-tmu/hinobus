import React from "react";
import * as Mui from "@mui/material";

export interface ShareButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export default React.memo((props: ShareButtonProps) => {
  return (
    <Mui.Tooltip title="Twitter">
      <Mui.IconButton size="large" onClick={props.onClick}>
        {props.icon}
      </Mui.IconButton>
    </Mui.Tooltip>
  );
});
