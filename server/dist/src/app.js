"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = require("../routes");
// import xss from "xss-clean";
// import compression from 'compression'
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("../middleware/error.middleware");
const helpers_1 = require("../helpers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: helpers_1.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.json({ limit: "16kb" }));
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, cookie_parser_1.default)());
// app.use(xss())
// app.use(compression())
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 3000,
    message: "Too many requests from this IP , Please Try again after one hour",
});
app.use(limiter);
app.use(routes_1.router);
app.use(error_middleware_1.errorHandler);
exports.default = app;
