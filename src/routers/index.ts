import Authorization from "../Modules/Auth/index";

export const routes = (app: any) => {
  app.use("/api/auth", Authorization);
};
