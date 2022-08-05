import db from 'api/services/datastore/db';
import { NextApiRequest, NextApiResponse } from 'next';
import createResponse from 'api/core/createResponse';
import { EstimatesMessages } from 'types/api/estimates/estimates.types';

const getEstimatesRoute = async (_req: NextApiRequest, res: NextApiResponse) => {
  return db.getData('/estimates')
    .then(
      data => res.send(
        createResponse(
          EstimatesMessages.MESSAGES,
          { data },
        ),
      ),
    )
    .catch(
      e => res.send(createResponse(
        EstimatesMessages.DATABASE_ERROR,
        { errors: [e.message || 'Unknown'] },
      )),
    );
}

export default getEstimatesRoute;
