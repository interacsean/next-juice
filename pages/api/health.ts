import mapMethods from 'api/utils/mapMethods';
import health from 'api/routes/health';

const routeHandler = mapMethods({
  GET: health,
});

export default routeHandler;