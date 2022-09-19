import mapMethods from "api/utils/mapMethods";
import test from "api/routes/test/test";

const routeHandler = mapMethods({
  GET: test,
});

export default routeHandler;
