import { Route, Routes as Switch } from "react-router-dom";
import Home from "./home";

const PageRouter = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
    </Switch>
  );
};

export default PageRouter;
