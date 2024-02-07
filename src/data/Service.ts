import type DateString from "./DateString";
import { hours, type Hours, type Minutes } from "./Time";

type PatternId = (typeof Service.patternIds)[number];

/**
 * @description
 * The service pattern ids are stored using the date (yyyy-mm-dd) as a key.
 */
type Pattern = {
  [date in DateString]?: PatternId;
};

type Note = (typeof Service.notes)[number];

type TimetableOfDay = {
  [hours in Hours]: [Minutes, Note[]][];
};

type PartialTimetable = {
  [patternId in PatternId]: Partial<TimetableOfDay>;
};

type Timetable = {
  [patternId in PatternId]: TimetableOfDay;
};

type BusStop = (typeof Service.busStops)[number];

type Timetables = { [busStop in BusStop]: Timetable };

class Service {
  public readonly pattern: Pattern;
  public readonly timetables: Timetables;

  /**
   * @description
   * The pattern ids are as follows:
   *   0: no service
   *   1: one car
   *   2: two cars
   *   3: three cars (afternoon only)
   *   4: three cars (all day)
   */
  public static readonly patternIds = [0, 1, 2, 3, 4] as const;

  /**
   * @description
   * 7: the last departure
   */
  public static readonly notes = [1, 2, 3, 4, 5, 6, 7] as const;

  public static readonly busStops = ["hino", "minao"] as const;

  public constructor(pattern: Pattern, timetables: Timetables) {
    this.pattern = pattern;
    this.timetables = timetables;
  }

  public static createTimetable(timetable: PartialTimetable): Timetable {
    const template = this.timetableTemplate();

    this.patternIds.forEach((patternId) => {
      hours.forEach(
        (h) => (template[patternId][h] = timetable[patternId][h] ?? [])
      );
    });

    return template;
  }

  public searchNextDepartures(
    busStop: BusStop,
    patternId: PatternId,
    currentHours: Hours,
    currentMinutes: Minutes
  ): [Hours, Minutes][] {
    return hours
      .slice(hours.indexOf(currentHours))
      .map((h) =>
        this.timetables[busStop][patternId][h]
          .filter(([m]) => h !== currentHours || m >= currentMinutes)
          .map(([m]) => [h, m] as [Hours, Minutes])
      )
      .filter((e) => e.length)
      .flat(1)
      .slice(0, 2);
  }

  private static timetableTemplate(): Timetable {
    const timetableRowTemplate = (): TimetableOfDay => ({
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
      13: [],
      14: [],
      15: [],
      16: [],
      17: [],
      18: [],
      19: [],
      20: [],
      21: [],
      22: [],
      23: [],
    });

    return {
      0: timetableRowTemplate(),
      1: timetableRowTemplate(),
      2: timetableRowTemplate(),
      3: timetableRowTemplate(),
      4: timetableRowTemplate(),
    };
  }
}

export {
  type Pattern,
  type Note,
  type TimetableOfDay,
  type PartialTimetable,
  type Timetable,
  type BusStop,
  type Timetables,
  Service as default,
};
