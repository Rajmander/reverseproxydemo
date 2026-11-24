// common/utils/date.utils.js

import { DateTime } from "luxon";

const DEFAULT_TIMEZONE = "Asia/Kolkata";

// ----------------------------------
// 1. Get current date/time
// ----------------------------------

export const now = () => new Date();

export const nowISO = () => new Date().toISOString();

// ----------------------------------
// 2. Format date only
// Output: 2026-11-18
// ----------------------------------

export const formatDateOnly = (
  date = new Date(),
  timezone = DEFAULT_TIMEZONE,
) => {
  const dt = DateTime.fromJSDate(date, { zone: "utc" }).setZone(timezone);

  if (!dt.isValid) {
    throw new Error("Invalid date or timezone");
  }

  return dt.toISODate();
};

// ----------------------------------
// 3. Format timestamp
// Output: 2026-11-18T09:26:00.000Z
// ----------------------------------

export const formatISO = (date) => {
  const dt = DateTime.fromJSDate(date, { zone: "utc" });

  if (!dt.isValid) {
    throw new Error("Invalid date");
  }

  return dt.toUTC().toISO({
    suppressMilliseconds: false,
  });
};

// ----------------------------------
// 4. Display date and time
// Output: 18 Nov, 2026 2:56 PM
// ----------------------------------

export const formatDateTime = (date, timezone = DEFAULT_TIMEZONE) => {
  const dt = DateTime.fromJSDate(date, { zone: "utc" }).setZone(timezone);

  if (!dt.isValid) {
    throw new Error("Invalid date or timezone");
  }

  return dt.toFormat("dd LLL, yyyy h:mm a", {
    locale: "en",
  });
};

// ----------------------------------
// 5. Display date only
// Output: 18 Nov, 2026
// ----------------------------------

export const formatDisplayDate = (date, timezone = DEFAULT_TIMEZONE) => {
  const dt = DateTime.fromJSDate(date, { zone: "utc" }).setZone(timezone);

  if (!dt.isValid) {
    throw new Error("Invalid date or timezone");
  }

  return dt.toFormat("dd LLL, yyyy", {
    locale: "en",
  });
};

// ----------------------------------
// 6. Display time only
// Output: 2:56 PM
// ----------------------------------

export const formatTime = (date, timezone = DEFAULT_TIMEZONE) => {
  const dt = DateTime.fromJSDate(date, { zone: "utc" }).setZone(timezone);

  if (!dt.isValid) {
    throw new Error("Invalid date or timezone");
  }

  return dt.toFormat("h:mm a", {
    locale: "en",
  });
};

// ----------------------------------
// 7. Parse date-only input
// Input: 2026-11-18
// ----------------------------------

export const parseDateOnly = (value) => {
  const dt = DateTime.fromISO(value, {
    zone: "utc",
  });

  if (!dt.isValid || dt.toISODate() !== value) {
    throw new Error("Invalid date. Expected YYYY-MM-DD");
  }

  return dt.toISODate();
};

// ----------------------------------
// 8. Add days
// ----------------------------------

export const addDays = (date, days, timezone = DEFAULT_TIMEZONE) => {
  const dt = DateTime.fromJSDate(date, { zone: "utc" })
    .setZone(timezone)
    .plus({ days });

  if (!dt.isValid) {
    throw new Error("Invalid date");
  }

  return dt.toUTC().toJSDate();
};

// ----------------------------------
// 9. Compare dates
// ----------------------------------

export const isBefore = (date1, date2) =>
  new Date(date1).getTime() < new Date(date2).getTime();

export const isAfter = (date1, date2) =>
  new Date(date1).getTime() > new Date(date2).getTime();
