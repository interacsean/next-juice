import getEstimates from '../../../api/routes/estimates/getEstimates';
import mapMethods from 'api/utils/mapMethods';

const routeHandler = mapMethods({
  GET: getEstimates
})

export default routeHandler;
