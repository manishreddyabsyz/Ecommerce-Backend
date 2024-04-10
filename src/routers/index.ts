import Authorization from "../Modules/Auth/index";
import Products from "../Modules/Products/index";
import Cart from "../Modules/UserCartDetails/index";
export const routes = (app: any) => {
  app.use("/api/auth", Authorization);
  app.use("/api", Products);
  app.use("/api", Cart);
};
