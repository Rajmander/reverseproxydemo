import {
  formatDateTime,
  formatDisplayDate,
} from "../../common/utils/date.utils.js";

const response = {
  id: order._id,

  createdAt: order.createdAt,

  createdAtFormatted: formatDateTime(order.createdAt),

  deliveryDate: order.deliveredAt ? formatDisplayDate(order.deliveredAt) : null,
};
