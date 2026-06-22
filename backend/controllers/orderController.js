import { Error } from "mongoose";
import Order from "../models/Order.js"

export const createOrder = async (
    req,
    res
) => {
    try{

        const order =
        await Order.create({
            user:req.user.id,
            products:req.body.prducts,
            total: req.body.total
        });

        res.status(201).json({
            message:
            "orden creada",
            order
        });
    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

export const getMyOrders = async (
    req,
    res
) => {
    try {
        const ordres = await Order.find({
            user:req.user.id
        })
        .populate(
           "products.product"
        );
        res.json(orders);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};