"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const index_1 = require("@routers/index");
exports.default = ({ app }) => {
    app.get("/health", (req, res) => {
        res.status(200).send({ status: true, message: "Server is running" });
    });
    app.head("/health", (req, res) => {
        res.status(200).end();
    });
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use(express_1.default.json());
    (0, index_1.routes)(app);
    app.use((req, res, next) => {
        const err = new Error("THE METHOD OR END POINT NOT PRESENT RE-CHECK ONCE");
        err["status"] = 404;
        next(err);
    });
    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === "UnauthorizedError") {
            return res.status(err.status).send({ status: false, message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.json({
            status: false,
            message: err.message,
        });
    });
};
//# sourceMappingURL=express.js.map