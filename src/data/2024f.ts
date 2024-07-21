/**
 * 2024 first half
 * Timetable data of the bus service
 * between Hino and Minami-Osawa campuses
 */

import Service, { type Pattern } from "./Service";

/**
 * @description
 * The service pattern for 2024 first half.
 */
const pattern: Pattern = {
  // regular days
  ...Object.fromEntries(
    (function* () {
      const dayWisePatterns = [0, 2, 2, 2, 2, 2, 0];
      const outOfService = new Date("2024-08-06"); // end of normal pattern

      // yield pattern ids
      for (
        const date = new Date("2024-03-31");
        date.getMonth() !== 10;
        date.setDate(date.getDate() + 1)
      ) {
        const day = date.getDay();
        const key = date.toISOString().replace(/T.+/, "");

        yield [key, date >= outOfService ? 0 : dayWisePatterns[day]];
      }
    })()
  ),

  // irregular days
  "2024-04-01": 0,
  "2024-04-02": 0,

  "2024-04-29": 0,
  "2024-05-03": 0,
  "2024-05-06": 0,

  "2024-08-06": 1,
  "2024-08-07": 1,
  "2024-08-08": 1,
  "2024-08-09": 1,
  "2024-09-02": 1,
  "2024-09-03": 1,
  "2024-09-04": 1,
  "2024-09-05": 1,
  "2024-09-06": 1,
  "2024-09-09": 1,
  "2024-09-10": 1,
  "2024-09-11": 1,
  "2024-09-12": 1,
  "2024-09-13": 1,

};

/**
 * @description
 * Bus timetables from Hino to Minami-Osawa using pattern ids as key.
 */
const hino = Service.createTimetable({
  0: {},
  1: {
    8: [[40, []]],
    9: [[50, [2]]],
    12: [[20, [3]]],
    13: [[50, [4]]],
    15: [[20, [5]]],
    16: [[30, [6]]],
    18: [[30, [7]]],
  },
  2: {
    7: [[50, [1]]],
    8: [[40, []]],
    9: [
      [10, []],
      [50, [2]],
    ],
    10: [[40, []]],
    12: [[20, [3]]],
    13: [
      [0, []],
      [50, [4]],
    ],
    14: [[40, []]],
    15: [[20, [5]]],
    16: [
      [20, []],
      [30, [6]],
    ],
    18: [
      [5, []],
      [30, [7]],
    ],
  },
  3: {},
  4: {},
});

/**
 * @description
 * Bus timetables from Minami-Osawa to Hino using pattern ids as key.
 */
const minao = Service.createTimetable({
    0: {},
    1: {
        7: [[45, [1]]],
        9: [[20, [2]]],
        10: [[40, [3]]],
        13: [[0, [4]]],
        14: [[40, [5]]],
        15: [[55, [6]]],
        17: [[30, [7]]],
    },
    2: {
        7: [[45, [1]]],
        8: [[40, []]],
        9: [
            [20, []],
            [50, [2]],
        ],
        10: [[40, []]],
        12: [[20, [3]]],
        13: [
            [0, []],
            [50, [4]],
        ],
        14: [[40, []]],
        15: [
            [30, [5]],
            [55, []],
        ],
        17: [
            [0, [6]],
            [30, []],
        ],
        18: [[45, [7]]],
    },
    3: {},
    4: {},
});

const service = new Service(pattern, { hino, minao });

export default service;
