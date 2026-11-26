// common/utils/timezone.utils.js

import { DateTime } from "luxon";

// Validate IANA timezone
export const isValidTimezone = (timezone) => {
  return DateTime.now().setZone(timezone).isValid;
};

// Convert UTC timestamp to timezone
export const convertToTimezone = (date, timezone) => {
  const dt = DateTime.fromJSDate(date, { zone: "utc" }).setZone(timezone);

  if (!dt.isValid) {
    throw new Error("Invalid date or timezone");
  }

  return dt.toISO();
};

// Get timezone offset
export const getTimezoneOffset = (date, timezone) => {
  const dt = DateTime.fromJSDate(date, { zone: "utc" }).setZone(timezone);

  if (!dt.isValid) {
    throw new Error("Invalid date or timezone");
  }

  return dt.toFormat("ZZ");
};
