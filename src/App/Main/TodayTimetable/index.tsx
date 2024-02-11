import React from "react";
import * as Mui from "@mui/material";

import { type TimetableOfDay } from "src/data/Service";
import { type Hours, type Minutes, hours, pad } from "src/data/Time";

// components
import Article from "src/components/Article";
import Detail from "./Detail";

export interface TodayTimetableProps {
  timetables: {
    label: string;
    timetable: TimetableOfDay;
    color: string;
  }[];
  hours: number;
}

export default React.memo((props: TodayTimetableProps) => {
  const [mode, setmode] = React.useState(0);
  const timetable = props.timetables[mode];
  const [selectedTime, setSelectedTime] = React.useState<
    [Hours, Minutes] | undefined
  >(void 0);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Article
        title="時刻表"
        side={
          <Mui.Box>
            <Mui.Select
              size="small"
              value={mode}
              onChange={(e) => setmode(e.target.value as number)}
            >
              {props.timetables.map(({ label }, i) => (
                <Mui.MenuItem key={i} value={i}>
                  {label}
                </Mui.MenuItem>
              ))}
            </Mui.Select>
          </Mui.Box>
        }
      >
        <Mui.Divider />
        <Mui.Table>
          <Mui.TableBody>
            {hours.slice(6, 21).map((h) => (
              <Mui.TableRow
                key={h}
                sx={{
                  background:
                    props.hours === h ? Mui.colors.grey.A100 : "unset",
                }}
              >
                <Mui.TableCell variant="head">
                  <Mui.Chip
                    label={
                      <Mui.Typography
                        variant="body1"
                        fontWeight="bold"
                        color={timetable.color}
                      >
                        {pad(h)}
                      </Mui.Typography>
                    }
                  />
                </Mui.TableCell>
                {[0, 1, 2, 3, 4, 5].map((col) => (
                  <Mui.TableCell key={col}>
                    {((m) => (
                      <Mui.Typography
                        variant="body1"
                        fontWeight="bold"
                        component={Mui.Link}
                        color="inherit"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setSelectedTime(m ? [h, m] : void 0);
                          setOpen(m ? true : false);
                        }}
                      >
                        {pad(m)}
                      </Mui.Typography>
                    ))(timetable.timetable[h]?.[col]?.[0])}
                  </Mui.TableCell>
                ))}
              </Mui.TableRow>
            ))}
          </Mui.TableBody>
        </Mui.Table>
      </Article>
      <Detail
        selectedTime={selectedTime}
        states={[open, setOpen]}
        from={timetable.label}
      />
    </>
  );
});
