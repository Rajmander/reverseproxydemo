// common/utils/date-validation.utils.js

import { DateTime } from "luxon";

// Validate YYYY-MM-DD
export const isValidDateOnly = (value) => {
  if (typeof value !== "string") return false;

  const dt = DateTime.fromISO(value, {
    zone: "utc",
    setZone: true,
  });

  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) && dt.isValid && dt.toISODate() === value
  );
};

// Validate ISO timestamp with explicit timezone
export const isValidTimestamp = (value) => {
  if (typeof value !== "string") return false;

  if (!/(Z|[+-]\d{2}:\d{2})$/i.test(value)) {
    return false;
  }

  const dt = DateTime.fromISO(value, {
    setZone: true,
  });

  return dt.isValid;
};

// Validate JavaScript Date
export const isValidDate = (value) => {
  return value instanceof Date && !Number.isNaN(value.getTime());
};
