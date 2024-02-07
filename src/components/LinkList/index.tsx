import React from "react";
import * as Mui from "@mui/material";

export interface LinkListProps {
  contents: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }[];
}

export default React.memo((props: LinkListProps) => {
  return (
    <Mui.List disablePadding>
      {props.contents.map(({ href, label, icon }, i) => (
        <Mui.ListItem key={i} disablePadding>
          <Mui.ListItemButton component={Mui.Link} href={href} target="_blank">
            <Mui.ListItemIcon>{icon}</Mui.ListItemIcon>
            <Mui.ListItemText>{label}</Mui.ListItemText>
          </Mui.ListItemButton>
        </Mui.ListItem>
      ))}
    </Mui.List>
  );
});
