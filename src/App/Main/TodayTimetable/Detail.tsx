import React from "react";
import * as Mui from "@mui/material";

import { type Hours, type Minutes, pad } from "src/data/Time";

// components
import Space from "src/components/Space";

const marks = [
  {
    value: 7 * 60,
    label: "07:00",
  },
  {
    value: 8 * 60 + 50,
    label: "1 限",
  },
  {
    value: 10 * 60 + 30,
    label: "2 限",
  },
  {
    value: 13 * 60,
    label: "3 限",
  },
  {
    value: 14 * 60 + 40,
    label: "4 限",
  },
  {
    value: 16 * 60 + 20,
    label: "5 限",
  },
  {
    value: 18 * 60,
    label: "6 限",
  },
  {
    value: 20 * 60,
    label: "20:00",
  },
];

export interface DetailProps {
  selectedTime?: [Hours, Minutes];
  states: [boolean, (state: boolean) => void];
  from: string;
}

export default React.memo((props: DetailProps) => {
  const [open, setOpen] = props.states;
  const [hours, minutes] = props.selectedTime ?? [0, 0];
  const time = hours * 60 + minutes;
  const timeString = pad(hours) + ":" + pad(minutes);

  return (
    <Mui.Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
      disableScrollLock
    >
      <Mui.DialogTitle>
        {props.from}
        <Space />
        <time dateTime={timeString}>{timeString}</time>
      </Mui.DialogTitle>
      <Mui.DialogContent>
        <Mui.Box sx={{ py: 3 }}>
          <Mui.Slider
            size="small"
            value={[time, time + 35]}
            step={null}
            marks={marks}
            min={7 * 60}
            max={20 * 60}
          />
        </Mui.Box>
      </Mui.DialogContent>
    </Mui.Dialog>
  );
});
