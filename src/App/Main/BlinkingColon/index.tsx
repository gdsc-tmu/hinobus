import React from "react";
import * as Mui from "@mui/material";

export default React.memo(() => {
  const [tick, setTick] = React.useState(false);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((e) => !e);
    }, 500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <Mui.Box component="span" sx={{ visibility: tick ? "visible" : "hidden" }}>
      :
    </Mui.Box>
  );
});
