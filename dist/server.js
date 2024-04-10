"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 8000;
// import { swaggerDocs } from "@utils/swagger";
app_1.default.listen(port, () => {
    console.log(`
 --------------------------------
| Server listening on Port: ${port} |
 --------------------------------
`);
});
//# sourceMappingURL=server.js.map