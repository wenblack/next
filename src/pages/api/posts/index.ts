import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma';


// GET /api/post
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const result = await prisma.post.findMany({
    });
    let total = result.length
    if (total === 0)
    res.json({message : 'Nenhum post foi criado'});
    else  
    res.json({total ,posts: result});
  }

