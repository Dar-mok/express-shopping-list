/** Simple demo Express app. */

const express = require("express");
const app = express();

app.use(express.json());
// app.use(express.urlencoded());

// const { items } = require("./fakeDb");
const itemRoutes = require("./itemRoutes")

// useful error class to throw
const { ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError, } = require("./expressError");

/**return list of shopping items */
app.use("/items", itemRoutes);


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;
