import bcrypt from 'bcryptjs';
import jwt from '@/utils/jwt';
import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const id  = req.query.id;


    
    res.json({user: id });
  }