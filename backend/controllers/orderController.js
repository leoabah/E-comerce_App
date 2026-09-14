
import { MercadoPagoConfig, Preference } from "mercadopago";
import Order from "../models/Order.js";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN ||
    "APP_USR-4628819761549408-090913-df222a78b1952bc595ab32d71a60c599-1608625904"
});

export const createOrder = async (
  req,
  res
) => {
  console.log("BODY", req.body);
  try {
    const order = await Order.create({
      user: req.user.id,
      products: req.body.products,
      total: req.body.total,
      paymentMethod: req.body.paymentMethod || "mercadopago"
    });

    console.log("ORDER CREADA:", order);

    res.status(201).json({
      message: "orden creada correctamente",
      order
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getMyOrders = async (
  req,
  res
) => {
  try {
    const order = await Order.find({
      user: req.user.id
    }).populate("products.productId");

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getAllOrders = async (
  req,
  res
) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.productId");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createMercadoPagoPreference = async (req, res) => {
  try {
    const { products, total } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    const preference = new Preference(client);

    const data = await preference.create({
      body: {
        items: products.map((product) => ({
          title: product.title || product.name || "Producto",
          quantity: Number(product.quantity || 1),
          unit_price: Number(product.price || product.unit_price || 0)
        })),
        metadata: {
          total
        },
        back_urls: {
          success: "http://localhost:5173/perfil",
          failure: "http://localhost:5173/checkout",
          pending: "http://localhost:5173/checkout"
        },
        auto_return: "approved"
      }
    });

    return res.status(200).json({
      preferenceId: data.id
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Error al crear la preferencia"
    });
  }
};