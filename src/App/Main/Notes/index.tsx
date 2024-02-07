import React from "react";
import * as Mui from "@mui/material";
import * as Icon from "@mui/icons-material";

import { type Hours, type Minutes, pad } from "src/data/Time";
import type { TimetableOfDay } from "src/data/Service";

// components
import Article from "src/components/Article";
import Space from "src/components/Space";

export interface NotesProps {
  timetables: {
    label: string;
    timetable: TimetableOfDay;
    nextDeparture: [Hours, Minutes][];
  }[];
}

export default React.memo((props: NotesProps) => {
  const messages = props.timetables
    .map((timetable) =>
      timetable.nextDeparture
        .map(([h, m]) => {
          const note = timetable.timetable[h]
            .filter((col) => col[0] === m)
            .map((col) => col[1])
            .flat(2);

          const isLast = note.includes(7);
          const periods = note.filter((e) => e !== 7);

          return note.length ? (
            <>
              {timetable.label}
              発
              <Space />
              {((time) => (
                <time dateTime={time}>{time}</time>
              ))([h, m].map((e) => pad(e)).join(":"))}
              <Space />は
              {isLast && "本日の最終便で" + (periods.length ? "あり，" : "す")}
              {periods.length > 0 && (
                <>
                  <Space />
                  {periods.map((e) => e + " 限").join("および") +
                    "に間に合う最後の便です"}
                </>
              )}
            </>
          ) : (
            void 0
          );
        })
        .filter((e) => e)
    )
    .filter((e) => e.length);

  return messages.length ? (
    <Article title="備考">
      <Mui.List disablePadding>
        {messages.map((message, i) => (
          <Mui.ListItem key={i} disablePadding>
            <Mui.ListItemIcon>
              <Icon.Info />
            </Mui.ListItemIcon>
            <Mui.ListItemText>{message}</Mui.ListItemText>
          </Mui.ListItem>
        ))}
      </Mui.List>
    </Article>
  ) : (
    <></>
  );
});
