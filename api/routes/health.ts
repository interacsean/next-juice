import { NextApiRequest, NextApiResponse } from 'next';
import { GetHealthResponseData } from 'types/api/health/health.types';

export default function health(_req: NextApiRequest, res: NextApiResponse) {
  const response: GetHealthResponseData = {
    data: true,
    message: 'HEALTH_OK',
  }
  res.send(response);
}
