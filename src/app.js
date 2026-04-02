const express = require("express");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const errorHandler = require("./middlewares/errorHandler");
const swaggerDocument = require("./config/swagger");
const authRouter = require("./routes/auth.routes");
const usersRouter = require("./routes/user.routes");
const clientsRouter = require("./routes/client.routes");
const invoicesRouter = require("./routes/invoice.routes");
const paymentsRouter = require("./routes/payment.routes");
const actionsRouter = require("./routes/action.routes");
const statsRouter = require("./routes/stats.routes");

const app = express();

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" },
);

// Setup the logger
app.use(
  morgan("combined", {
    stream: accessLogStream,
  }),
);

// Set HTTP headers appropriately for security
app.use(helmet());

// Parse incoming HTTP requests with JSON
app.use(express.json());

// Handle routers
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/clients", clientsRouter);
app.use("/invoices", invoicesRouter);
app.use("/payments", paymentsRouter);
app.use("/actions", actionsRouter);
app.use("/stats", statsRouter);

// Handle errors
app.use(errorHandler);

module.exports = app;
