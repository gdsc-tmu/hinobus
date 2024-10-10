/**
 * 2024 second half
 * Timetable data of the bus service
 * between Hino and Minami-Osawa campuses
 */

import Service, { type Pattern } from "./Service";

/**
 * @description
 * The service pattern for 2024 second half.
 */
const pattern: Pattern = {
  // regular days
  ...Object.fromEntries(
    (function* () {
      const dayWisePatterns = [0, 2, 2, 4, 3, 2, 0];
      const outOfService = new Date("2025-02-11"); // end of normal pattern

      // yield pattern ids
      for (
        const date = new Date("2024-10-01");
        date.getMonth() !== 2;
        date.setDate(date.getDate() + 1)
      ) {
        const day = date.getDay();
        const key = date.toISOString().replace(/T.+/, "");

        yield [key, date >= outOfService ? 0 : dayWisePatterns[day]];
      }
    })()
  ),

  // irregular days
  "2024-10-31": 0,

  "2024-11-01": 0,
  "2024-11-04": 0,

  "2024-12-24": 1,
  "2024-12-25": 1,
  "2024-12-26": 1,
  "2024-12-30": 0,
  "2024-12-31": 0,

  "2025-01-01": 0,
  "2025-01-02": 0,
  "2025-01-03": 0,
  "2025-01-13": 0,
  "2025-01-17": 0,

  "2025-02-05": 2,
  "2025-02-11": 0,
  "2025-02-12": 1,
  "2025-02-13": 1,
  "2025-02-14": 1,
};

console.log(pattern);
/**
 * @description
 * Bus timetables from Hino to Minami-Osawa using pattern ids as key.
 */
const hino = Service.createTimetable({
  0: {},
  1: {
    8: [[35, []]],
    9: [[50, [2]]],
    12: [[20, [3]]],
    13: [[50, [4]]],
    15: [[20, [5]]],
    16: [[30, [6]]],
    18: [[30, [7]]],
  },
  2: {
    7: [[50, [1]]],
    8: [[35, []]],
    9: [
      [10, []],
      [50, [2]],
    ],
    10: [[30, []]],
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
      [0, []],
      [30, [7]],
    ],
  },
  3: {
    7: [[50, [1]]],
    8: [
      [35, []],
    ],
    9: [
      [10, []],
      [50, [2]],
    ],
    10: [[30, []]],
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
      [0, []],
      [30, [7]],
    ],
  },
  4: {
    7: [[50, [1]]],
    8: [
      [35, []],
      [40, []],
    ],
    9: [
      [10, []],
      [45, []],
      [50, [2]],
    ],
    10: [[30, []]],
    11: [[0, []]],
    12: [
      [20, [3]],
      [50, []],
    ],
    13: [
      [0, []],
      [50, [4]],
    ],
    14: [
      [40, []],
      [45, []],
    ],
    15: [[20, [5]]],
    16: [
      [20, [10]],
      [30, [6]],
    ],
    18: [
      [0, []],
      [5, []],
      [30, [7]],
    ],
  },
});

/**
 * @description
 * Bus timetables from Minami-Osawa to Hino using pattern ids as key.
 */
const minao = Service.createTimetable({
  0: {},
  1: {
    7: [[45, [1]]],
    9: [[10, [2]]],
    10: [[35, [3]]],
    13: [[0, [4]]],
    14: [[40, [5]]],
    15: [[55, [6]]],
    17: [[30, [7]]],
  },
  2: {
    7: [[45, [1]]],
    8: [[40, []]],
    9: [
      [10, []],
      [50, [2]],
    ],
    10: [[35, []]],
    12: [[10, [3]]],
    13: [
      [0, []],
      [50, [4]],
    ],
    14: [[40, []]],
    15: [
      [25, [5]],
      [55, []],
    ],
    17: [
      [10, [6]],
      [30, []],
    ],
    18: [[45, [7]]],
  },
  3: {
    7: [
      [45, [1]],
    ],
    8: [[40, []]],
    9: [
      [10, []],
      [50, [2]],
    ],
    10: [
      [35, []],
    ],
    12: [[10, [3]]],
    13: [
      [0, []],
      [50, [4]],
    ],
    14: [[40, []]],
    15: [
      [25, [5]],
      [55, []],
    ],
    17: [
      [10, [6]],
      [30, []],
    ],
    18: [[45, [7]]],
  },
  4: {
    7: [
      [40, []],
      [45, [1]],
    ],
    8: [[40, []]],
    9: [
      [10, []],
      [15, []],
      [50, [2]],
    ],
    10: [
      [30, []],
      [35, []],
    ],
    12: [
      [10, []],
      [20, [3]],
    ],
    13: [
      [0, []],
      [45, []],
      [50, [4]],
    ],
    14: [[40, []]],
    15: [
      [25, []],
      [30, [5]],
      [55, []],
    ],
    17: [
      [0, []],
      [10, [6]],
      [30, []],
    ],
    18: [[45, [7]]],
  },
});

const service = new Service(pattern, { hino, minao });

export default service;
