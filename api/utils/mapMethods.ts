import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { StrRecord } from 'types/util/StrRecord';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

const mapMethods = (methodMap: StrRecord<NextApiHandler>) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    const resolvedHandler = methodMap[req.method];
    if (resolvedHandler) {
      return resolvedHandler(req, res);
    } else {
      res.status(404).send({ error: 'Method not supported' })
    }
  }

export default mapMethods;
