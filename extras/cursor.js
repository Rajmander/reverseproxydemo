app.get("/users", async (req, res, next) => {
  try {
    const limit = 10;
    const { cursor } = req.query;

    const filter = cursor ? { _id: { $gt: cursor } } : {};

    const data = await user
      .find(filter)
      .sort({ _id: 1 })
      .limit(limit + 1);

    const hasMore = data.length > limit;

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
