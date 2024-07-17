import clientPromise from "../../../../lib/mongoose";
import Product from "../../../../model/products";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    await clientPromise;
    res.json(await Product.find().exec())
}