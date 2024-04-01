import React from "react";
import * as Mui from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { type Dayjs } from "dayjs";

import type {
  DateString,
  YearString,
  MonthString,
  DayString,
} from "src/data/DateString";
import { type Hours, type Minutes, pad } from "src/data/Time";
import service from "src/data/2024f";

// components
import Space from "src/components/Space";
import BlinkingColon from "./BlinkingColon";
import DepartureSign from "./DepartureSign";
import Notes from "./Notes";
import TodayTimetable from "./TodayTimetable";
import Links from "./Links";
import News from "./News";
import ShareThis from "./ShareThis";

const hinoColor = Mui.colors.teal[800];
const minaoColor = Mui.colors.pink[800];

export default React.memo(() => {
  const [isToday, setIsToday] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(
    dayjs(Date.now())
  );

  const today = new Date(
    selectedDate.unix() * 1000 +
      (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
  );

  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][today.getDay()];

  const [year, month, day] = [
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  ];

  const [yearString, monthString, dayString] = [
    ("" + year) as YearString,
    pad(month) as MonthString,
    pad(day) as DayString,
  ];

  const dateString = `${yearString}-${monthString}-${dayString}` as DateString;

  const [currentHours, currentMinutes] = [
    today.getHours() as Hours,
    today.getMinutes() as Minutes,
  ];

  const [hoursString, minutesString] = [pad(currentHours), pad(currentMinutes)];

  const pattern = service.pattern[dateString];

  const hinoNextDeparture = React.useMemo(
    () =>
      service.searchNextDepartures(
        "hino",
        pattern ?? 0,
        currentHours,
        currentMinutes
      ),
    [pattern, currentHours, currentMinutes]
  );

  const minaoNextDeparture = React.useMemo(
    () =>
      service.searchNextDepartures(
        "minao",
        pattern ?? 0,
        currentHours,
        currentMinutes
      ),
    [pattern, currentHours, currentMinutes]
  );

  React.useEffect(() => {
    if (isToday) {
      const interval = window.setInterval(
        () => setSelectedDate(dayjs(Date.now())),
        1000
      );
      return () => window.clearInterval(interval);
    }
  }, [isToday]);

  return (
    <Mui.Box component="main" pb={3}>
      <Mui.Container sx={{ pt: 3, maxWidth: 1080, marginX: "auto" }}>
        <Mui.Box sx={{ textAlign: "center" }}>
          <Mui.Box sx={{ pb: 1 }}>
            {isToday ? (
              <Mui.Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                minHeight={60}
              >
                <Mui.Typography
                  component="time"
                  variant="body1"
                  fontWeight="bold"
                  fontSize="larger"
                  dateTime={
                    dateString + " " + hoursString + ":" + minutesString
                  }
                  pr={3}
                >
                  {yearString}/{monthString}/{dayString} ({dayOfWeek})
                  <Space />
                  {hoursString}
                  <BlinkingColon />
                  {minutesString}
                </Mui.Typography>
                <Mui.Button
                  variant="outlined"
                  onClick={() => setIsToday(false)}
                >
                  別日
                </Mui.Button>
              </Mui.Box>
            ) : (
              <Mui.Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                minHeight={60}
              >
                <Mui.Box pr={3}>
                  <DateTimePicker
                    defaultValue={selectedDate}
                    format="YYYY/MM/DD HH:mm"
                    onChange={(e) => setSelectedDate(e ?? dayjs(Date.now()))}
                  />
                </Mui.Box>
                <Mui.Button
                  variant="outlined"
                  onClick={() => {
                    setIsToday(true);
                    setSelectedDate(dayjs(Date.now()));
                  }}
                >
                  本日
                </Mui.Button>
              </Mui.Box>
            )}
          </Mui.Box>

          {pattern === void 0 ? (
            <></>
          ) : (
            <Mui.Box sx={{ pb: 2 }}>
              <Mui.Typography component="span" variant="body1">
                {isToday ? "本日は " : "この日は "}
                <Mui.Typography
                  component="span"
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color:
                      pattern === 0
                        ? Mui.colors.red.A700
                        : Mui.colors.blue.A700,
                  }}
                >
                  {
                    [
                      "運休日",
                      "1 台運行日",
                      "2 台運行日",
                      "3 台運行日",
                      "4 台運行日",
                    ][pattern]
                  }
                  <Space />
                </Mui.Typography>
                です
              </Mui.Typography>
            </Mui.Box>
          )}
        </Mui.Box>
      </Mui.Container>

      {pattern === void 0 ? (
        <Mui.Container sx={{ py: 3, maxWidth: 1080, marginX: "auto" }}>
          <Mui.Typography component="p">
            指定された日時の時刻表データは存在しません
          </Mui.Typography>
        </Mui.Container>
      ) : (
        <>
          <Mui.Container sx={{ pt: 3 }}>
            <Mui.Grid container spacing={3}>
              <Mui.Grid item md xs={12}>
                <DepartureSign
                  from="日野"
                  to="南大沢"
                  color={hinoColor}
                  departure={hinoNextDeparture}
                  hours={currentHours}
                  minutes={currentMinutes}
                />
              </Mui.Grid>

              <Mui.Grid item md xs={12}>
                <DepartureSign
                  from="南大沢"
                  to="日野"
                  color={minaoColor}
                  departure={minaoNextDeparture}
                  hours={currentHours}
                  minutes={currentMinutes}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Container>

          <Mui.Container sx={{ pt: 3 }}>
            <Mui.Grid container spacing={3}>
              <Mui.Grid item md xs={12}>
                <Notes
                  timetables={[
                    {
                      label: "日野",
                      timetable: service.timetables.hino[pattern],
                      nextDeparture: hinoNextDeparture,
                    },
                    {
                      label: "南大沢",
                      timetable: service.timetables.minao[pattern],
                      nextDeparture: minaoNextDeparture,
                    },
                  ]}
                />
                <TodayTimetable
                  timetables={[
                    {
                      label: "日野発",
                      timetable: service.timetables.hino[pattern],
                      color: hinoColor,
                    },
                    {
                      label: "南大沢発",
                      timetable: service.timetables.minao[pattern],
                      color: minaoColor,
                    },
                  ]}
                  hours={currentHours}
                />
              </Mui.Grid>
              <Mui.Grid item md xs={12}>
                <News />
                <Links />
                <ShareThis />
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Container>
        </>
      )}

      <Mui.Container sx={{ pt: 3 }}>
        <Mui.Typography variant="body2">
          ※ 本サイトの内容は参考情報であり，正確性を保証するものではありません．
        </Mui.Typography>
      </Mui.Container>
    </Mui.Box>
  );
});
