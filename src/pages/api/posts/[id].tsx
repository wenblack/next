import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
    const result = await prisma.post.findUnique({
        where:{
            id: Number(id)
        }
    })
    if(result === null)
    res.json({message : 'Post não foi criado ou foi deletado'})
    else
    res.json(result);
  }