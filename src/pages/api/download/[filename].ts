/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type NextApiRequest, type NextApiResponse } from 'next';
import { join } from 'path';
import { createReadStream } from 'fs';

export default function download(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;
  const filepath = join(process.cwd(), filename as string);
  const fileStream = createReadStream(filepath);

  res.setHeader('Content-disposition', `attachment; filename=${filename!}`);
  res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  fileStream.pipe(res);
}