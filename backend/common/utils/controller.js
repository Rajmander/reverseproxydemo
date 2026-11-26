//GET /api/orders?fromDate=2026-11-01&toDate=2026-11-18&timeZone=Asia/Kolkata

import { getDateRangeFilter } from "../../common/utils/date-range.utils.js";

export const getOrders = async (req, res, next) => {
  try {
    const { fromDate, toDate, timeZone = "Asia/Kolkata" } = req.query;

    const createdAt = getDateRangeFilter(fromDate, toDate, timeZone);

    const orders = await Order.find({
      createdAt,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
