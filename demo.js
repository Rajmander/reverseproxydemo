import express from "express";
const app = express();

import db from "./db.js";
db();

import user from "./user.model.js";

import { getDateRangeFilter } from "./common/utils/date-range.utils.js";
import { formatDateTime } from "./common/utils/date.utils.js";

// Demo Api
app.get("/me", async (req, res, next) => {
  const skip = req.query.page ? (req.query.page - 1) * 3 : 0;
  // when page 1
  //0+3<10

  // when page 2
  //3+3<10
  // when page 3
  //6+3<10

  // when page 4
  //9+1<10

  const totalUsers = await user.countDocuments();

  const userData = await user.aggregate([
    {
      $skip: skip,
    },
    {
      $limit: 3,
    },

    // { $match: { status: false } },
    // {
    //   $group: {
    //     _id: "$city",
    //     totalSalary: { $sum: "$salary" },
    //     totalUsers: { $sum: 1 },
    //   },
    // },
  ]);

  //has more logic
  const hasMore = skip + userData.length < totalUsers;

  //totalUsers
  res.json({ message: "Worked", data: userData, totalUsers, hasMore });
});

app.get("/", async (req, res, next) => {
  const data = await user.aggregate([{ $count: "totalUsers" }]);
  res.json({ data: data });
  return;
  res.json({ msg: "Testing api" });
  console.log("Test");
});

// update the status field
app.patch("/patch", async (req, res, next) => {
  const data = await user.updateMany(
    { city: { $regex: "indore", $options: "i" } },
    { $set: { status: true, updatedDate: new Date() } },
    { new: true },
  );

  const users = await user.find({ city: "Indore" });

  const formattedUsers = users.map((item) => ({
    ...item.toObject(),
    formattedDate: formatDateTime(item.updatedDate, "Asia/Kolkata"),
  }));

  res.json({ msg: "Record updated", data: formattedUsers });
});

// Create new user
app.post("/users", async (req, res, next) => {
  try {
    const userData = await user.create({
      name: "Raj Singh",
      age: 11,
      city: "Delhi",
      salary: 60000,
    });
    return res.json({ msg: "user created", data: userData });
  } catch (error) {
    console.log("Error while user creation", error);
  }
});

// delete

app.delete("/users", async (req, res, next) => {
  try {
    const deletedUser = await user.findByIdAndDelete(
      "6afd3f6c9afd976474dbb84a",
    );
    res.json({ msg: "Deleted" });
  } catch (error) {
    console.log("User deleted");
  }
});

// update data
app.patch("/update-user", async (req, res, next) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      "6afe7f776eaae4f9ce60c4fd",
      { $set: { updatedDate: new Date(), add_date: new Date() } },
      { new: true },
    );
    res.json({ msg: "User updated", data: updatedUser });
  } catch (error) {
    res.json({ msg: "User updation failed", data: {} });
  }
});

// max, min, sum, avg
app.get("/users-demo", async (req, res, next) => {
  const city = req.query.city;
  const age = req.query.age;

  console.log("age", typeof age);
  console.log("city", city);

  const userData = await user.aggregate([
    {
      //$match: { city: { $in: ["Indore", "Dewas"] } },
      //$match: { age: { $gte: 25, $lte: 30 } },
      //$match: { city: { $nin: ["Dewas"] } },
      $match: {
        city: {
          $regex: city,
          $options: "i",
        },
      },
    },
    // {
    //   $facet: {
    //     users: [],
    //     totalCount: [{ $count: "count" }],
    //   },
    // },
    // {
    //   //$match: { city: city, age: { $eq: Number(age) } },
    //   $match: { city: { $in: ["Indore", "Dewas"] } },
    // },
    // // {
    // //     $group: {_id: null, maxsal: {$sum: "$salary"}}
    // // },
    // { $count: "totalRecords" },
  ]);

  res.json({ msg: "new data", data: userData });
});

app.get("/get-orders", async (req, res, next) => {
  try {
    const { fromDate, toDate, timeZone = "Asia/Kolkata" } = req.query;

    const createdAt = getDateRangeFilter(fromDate, toDate, timeZone);

    // const orders = await user
    //   .find({
    //     add_date: createdAt,
    //   })
    //   .sort({
    //     add_date: -1,
    //   });

    const orders = await user.aggregate([
      {
        $match: {
          add_date: createdAt,
          //city: { $regex: "usa", $options: "i" },
        },
      },
      {
        $sort: {
          add_date: -1,
        },
      },
    ]);

    const formattedOrders = orders.map((order) => ({
      ...order,
      format_add_date: formatDateTime(order.add_date, "Asia/Kolkata"),
      updated_date: order.updatedDate
        ? formatDateTime(order.updatedDate, "Asia/Kolkata")
        : "-",
    }));

    console.log(formattedOrders);

    res.json({
      success: true,
      data: formattedOrders,
    });
  } catch (error) {
    next(error);
  }
});

// Cursor based pagination
app.get("/users", async (req, res, next) => {
  try {
    const limit = 5;
    const { cursor } = req.query;

    const filter = cursor ? { _id: { $gt: cursor } } : {};

    const data = await user
      .find(filter)
      .sort({ _id: 1 })
      .limit(limit + 1);

    const hasMore = data.length > limit;

    // If extra record then delete the last one
    if (hasMore) {
      data.pop();
    }

    const nextCursor = hasMore ? data[data.length - 1]._id : null;

    res.json({
      data,
      hasMore,
      nextCursor,
    });
  } catch (error) {
    next(error);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");

  const date = new Date("2026-11-18T00:00:00.000Z");

  console.log(date.toISOString());
  console.log(date.toString());

  // const date = new Date("2026-11-18T00:00:00.000Z");

  // console.log(date);
});

// Use case 7: Find users who are not older than 25
