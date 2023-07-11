import prisma from "@/lib/prisma"
import DiskStorage from "@/providers/DiskStorage"

import { HttpStatusCode } from "axios"
import { NextApiRequest, NextApiResponse } from "next"


export default async function AvatarPage  (req: NextApiRequest, res: NextApiResponse) {
    const avatarFilename = __filename
    const id = String(req.query)   
    console.log(avatarFilename)
    const diskStorage =  DiskStorage

    const product = await prisma.product.findUnique({
      where: { id: id}
    })

    if (!product) {
      return (
        res.status(HttpStatusCode.BadRequest).json("Product not found")
      )
    }
    if (product.imgUrl) {
      await diskStorage.deletFile(String(avatarFilename))
    }
    const filename = await diskStorage.saveFile(String(avatarFilename))
    product.imgUrl = filename

    await prisma.product.update({
     where: { id: id},
      data: {
        imgUrl: product.imgUrl
      }
    })

    res.status(HttpStatusCode.Accepted).json({ newImage: product.imgUrl })
  }
