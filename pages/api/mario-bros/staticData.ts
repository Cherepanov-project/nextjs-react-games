import path from 'path';
import { promises as fs } from 'fs';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const searchParams = req.query;
  // Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'pages/api/mario-bros/json');
  // Read the json data file data.json
  const fileContents = await fs.readFile(`${jsonDirectory}/${searchParams.file}`, 'utf8');
  // Return the content of the data file in json format
  res.status(200).json(fileContents);
}
