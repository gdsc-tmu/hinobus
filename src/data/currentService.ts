/**
 * 2025 first half
 * Timetable data of the bus service
 * between Hino and Minami-Osawa campuses
 */

import Service, { type Pattern } from "./Service";

/**
 * @description
 * The service pattern for 2025 first half.
 */
const pattern: Pattern = {
  // normal days
  ...Object.fromEntries(
    (function* () {
      const dayWisePatterns = [0, 2, 2, 2, 2, 2, 0];
      const startDate = new Date("2025-04-03"); // start of normal pattern
      const endDate = new Date("2025-08-05"); // end of normal pattern

      // yield pattern ids
      for (
        const date = startDate;
        date.getMonth() !== 10;
        date.setDate(date.getDate() + 1)
      ) {
        const day = date.getDay();
        const key = date.toISOString().replace(/T.+/, "");

        yield [key, endDate < date ? 0 : dayWisePatterns[day]];
      }
    })()
  ),

  // exam or intensive lecture days
  ...Object.fromEntries(
    (function* () {
      const startDate = new Date("2025-08-06");
      const endDate = new Date("2025-09-12");

      for (
        const date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const key = date.toISOString().replace(/T.+/, "");

        yield [key, 1];
      }
    })()
  ),

  // summer vacation
  ...Object.fromEntries(
    (function* () {
      const startDate = new Date("2025-08-13");
      const endDate = new Date("2025-08-31");

      for (
        const date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const key = date.toISOString().replace(/T.+/, "");

        yield [key, 0];
      }
    })()
  ),

  // irregular days
  "2025-04-29": 0, // Showa Day

  "2025-05-05": 0, // Children's Day
  "2025-05-06": 0, // substitute holiday for Greenery Day

  "2025-08-11": 0, // Mountain Day
};

// debug
console.log(pattern);

/**
 * @description
 * Bus timetables from Hino to Minami-Osawa using pattern ids as key.
 */
const hino = Service.createTimetable({
  0: {},
  1: {
    8: [[35, []]],
    9: [[45, [2]]],
    12: [[20, [3]]],
    13: [[50, [4]]],
    15: [[20, [5]]],
    17: [[0, [6]]],
    18: [[45, [7]]],
  },
  2: {
    7: [[50, [1]]],
    8: [[35, []]],
    9: [
      [10, []],
      [45, [2]],
    ],
    10: [[40, []]],
    12: [[20, [3]]],
    13: [
      [0, []],
      [50, [4]],
    ],
    14: [[40, []]],
    15: [[20, [5]]],
    16: [[20, []]],
    17: [[0, [6]]],
    18: [
      [5, []],
      [45, [7]],
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
    9: [[10, [2]]],
    10: [[40, [3]]],
    13: [[0, [4]]],
    14: [[40, [5]]],
    16: [[25, [6]]],
    18: [[5, [7]]],
  },
  2: {
    7: [[45, [1]]],
    8: [[35, []]],
    9: [
      [10, []],
      [45, [2]],
    ],
    10: [[40, []]],
    12: [[20, [3]]],
    13: [
      [0, []],
      [50, [4]],
    ],
    14: [[40, []]],
    15: [[30, [5]]],
    16: [[25, []]],
    17: [[0, [6]]],
    18: [
      [5, []],
      [45, [7]],
    ],
  },
  3: {},
  4: {},
});

const service = new Service(pattern, { hino, minao });

export default service;
