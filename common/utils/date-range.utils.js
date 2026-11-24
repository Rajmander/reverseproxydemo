// common/utils/date-range.utils.js

import { DateTime } from "luxon";

// Get beginning of a calendar day in a timezone
export const getStartOfDay = (date, timezone = "Asia/Kolkata") => {
  const dt = DateTime.fromISO(date, { zone: timezone }).startOf("day");

  if (!dt.isValid) {
    throw new Error("Invalid date or timezone");
  }

  return dt.toUTC().toJSDate();
};

// Get beginning of the next calendar day
export const getNextDayStart = (date, timezone = "Asia/Kolkata") => {
  const dt = DateTime.fromISO(date, { zone: timezone })
    .plus({ days: 1 })
    .startOf("day");

  if (!dt.isValid) {
    throw new Error("Invalid date or timezone");
  }

  return dt.toUTC().toJSDate();
};

// IST ahead of 5 hours and 30 mins
// Build MongoDB date filter
export const getDateRangeFilter = (
  fromDate,
  toDate = "",
  timezone = "Asia/Kolkata",
) => {
  const start = getStartOfDay(fromDate, timezone);
  console.log("Start Date******************", start);
  const end = getNextDayStart(toDate, timezone);
  console.log(`end ++++++++++++++++++ ${end}`);

  // if (start >= end) {
  //   throw new Error("fromDate must be before or equal to toDate");
  // }

  return {
    $gte: start,
    $lt: end,
  };
};

// {
//   $gte: new Date("2026-11-17T18:30:00.000Z"),
//   $lt: new Date("2026-11-19T18:30:00.000Z")
// }

// DATE without time and timezone 2026-11-19
//

//  2026-11-18T18:30:00.000Z
