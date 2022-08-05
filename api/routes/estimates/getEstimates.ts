import { NextApiRequest, NextApiResponse } from 'next';

const getEstimatesRoute = (_req: NextApiRequest, res: NextApiResponse) => {
  res.send({
    estimates: [],
  });
}

export default getEstimatesRoute;
