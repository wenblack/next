import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from "next";
import login from '@/lib/login';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
 login(req, res)

  const { user } = req.query;
    const result = await prisma.order.findMany({
        where:{
             user: String(user)
        }
    })
    if(result === null)
    res.status(HttpStatusCode.NotFound).json({error : "Orders not Found for this user"})
    else
    res.json(result);
  }