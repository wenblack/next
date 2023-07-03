import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import login from '@/lib/login';


// GET /api/post
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    login(req, res)

    const result = await prisma.product.findMany({
    });
    let total = result.length
    if (total === 0)
    res.status(HttpStatusCode.NoContent).json({error : 'There is no registered product'});
    else  
    res.json({total ,products: result});
  }

