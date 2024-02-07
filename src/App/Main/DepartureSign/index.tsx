import React from "react";
import * as Mui from "@mui/material";

import { Hours, Minutes, pad } from "src/data/Time";

// components
import DestinationSign, { type DestinationSignProps } from "./DestinationSign";

const remaining = (time: number[], hours: number, minutes: number) => {
  const rest = time[0] * 60 + time[1] - hours * 60 - minutes;

  return rest === 0
    ? `(発車時刻)`
    : rest < 60
    ? `(${rest} 分後)`
    : rest % 60 === 0
    ? `(${(rest / 60) | 0} 時間後)`
    : `(${(rest / 60) | 0} 時間 ${rest % 60} 分後)`;
};

export interface DepartureSignProps extends DestinationSignProps {
  departure: [Hours, Minutes][];
  hours: number;
  minutes: number;
}

export default React.memo((props: DepartureSignProps) => {
  return (
    <>
      <DestinationSign from={props.from} to={props.to} color={props.color} />
      <Mui.Box pb={2} minHeight={90}>
        {props.departure.length ? (
          <>
            <Mui.Grid container alignItems="center" pb={1}>
              <Mui.Grid item xs={4}>
                <Mui.Typography component="div" textAlign="end">
                  次の便は
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={4} textAlign="center">
                <Mui.Typography component="span" variant="h5" fontWeight="bold">
                  {((time) => (
                    <time dateTime={time}>{time}</time>
                  ))(props.departure[0].map((e) => pad(e)).join(":"))}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={4}>
                <Mui.Typography component="span" fontSize="smaller">
                  {remaining(props.departure[0], props.hours, props.minutes)}
                </Mui.Typography>
              </Mui.Grid>
            </Mui.Grid>
            {props.departure.length === 1 ? (
              <Mui.Box textAlign="center">
                <Mui.Typography
                  component="span"
                  color={Mui.colors.red.A700}
                  fontWeight="bold"
                >
                  最終便です
                </Mui.Typography>
              </Mui.Box>
            ) : (
              <Mui.Grid container alignItems="center">
                <Mui.Grid item xs={4}>
                  <Mui.Typography component="div" textAlign="end">
                    その次の便は
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item xs={4} textAlign="center">
                  <Mui.Typography
                    component="span"
                    variant="h5"
                    fontWeight="bold"
                  >
                    {((time) => (
                      <time dateTime={time}>{time}</time>
                    ))(props.departure[1].map((e) => pad(e)).join(":"))}
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item xs={4}>
                  <Mui.Typography component="span" fontSize="smaller">
                    {remaining(props.departure[1], props.hours, props.minutes)}
                  </Mui.Typography>
                </Mui.Grid>
              </Mui.Grid>
            )}
          </>
        ) : (
          <Mui.Box textAlign="center">
            <Mui.Typography
              component="span"
              color={Mui.colors.red.A700}
              fontWeight="bold"
            >
              運行はありません
            </Mui.Typography>
          </Mui.Box>
        )}
      </Mui.Box>
    </>
  );
});
