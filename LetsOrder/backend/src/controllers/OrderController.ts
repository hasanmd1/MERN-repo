import Stripe from "stripe";
import "dotenv/config";
import {Request, Response} from "express";
import Restaurant, {MenuItemType} from "../models/restaurant";
import Order from "../models/order";


const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;
const FRONTEND_URL = process.env.FRONTEND_URL as string;


const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order
            .find({user: req.userId})
            .populate("restaurant")
            .populate("user");

        if (!orders) {
            return res.status(404).json({message: "Orders not found"});
        }

        return res.json(orders)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message: "Encountered error"});
    }
}

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
        price: number;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
        country: string;
    };
    restaurantId: string;
};


const stripeWebhookHandler = async (req: Request, res: Response) => {
    let event;

    try {
        const signature = req
            .headers['stripe-signature'];
        event = STRIPE
            .webhooks
            .constructEvent(
                req.body,
                signature as string,
                STRIPE_ENDPOINT_SECRET
            );
    }
    catch (err: any) {
        console.log(err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (!orderId) {
            return res.status(400).json({ message: "Order ID not found in metadata" });
        }
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({message: "Order not found"});
        }
        order.total = event.data.object.amount_total;
        order.orderStatus = 'paid';

        await order.save();
    }
    return res.status(200).json({message: "Order completed"});
}

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSession: CheckoutSessionRequest = req.body;

        const restaurant = await Restaurant.findById(
            checkoutSession.restaurantId
        );

        if (!restaurant) {
            throw new Error("Restaurant not found");
        }

        const newOrder = new Order({
            restaurant: restaurant._id,
            user: req.userId,
            deliveryDetails: checkoutSession.deliveryDetails,
            cartItems: checkoutSession.cartItems,
            orderStatus: "placed",
            createdAt: new Date(),
        })

        const lineItems = createLineItems(
            checkoutSession,
            restaurant.menuItems
        );

        const session = await createSession(
            lineItems,
            newOrder._id.toString(),
            restaurant.deliveryFee,
            restaurant._id.toString()
        );
        if (!session.url) {
            return res.status(500).json({message: "Failed to create checkout session"});
        }

        await newOrder.save();

        return res.json({url: session.url});
    }
    catch (err: any) {
        console.log(err);
        res.status(500).json({message: err.raw.message});
    }
};

const createLineItems = (
    checkoutSession: CheckoutSessionRequest,
    menuItems: MenuItemType[]
) => {
    const lineItems = checkoutSession
        .cartItems
        .map((item) => {

        const menuItem = menuItems
            .find((
                menuItem
            ) => {
            return menuItem._id.toString() === item.menuItemId;
        });

        if (!menuItem) {
            throw new Error("Menu item not found");
        }

        const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
            price_data: {
                currency: "usd",
                product_data: {
                    name: menuItem.name,
                },
                unit_amount: menuItem.price,
            },
            quantity: parseInt(item.quantity),
        };
        return line_item;
    })

    return lineItems;
};

const createSession = async (
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    orderId: string,
    deliveryFee: number,
    restaurantId: string
) => {
    const session = await STRIPE
        .checkout
        .sessions
        .create({
            line_items: lineItems,
            shipping_options: [
                {
                    shipping_rate_data: {
                        display_name: "Delivery",
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: deliveryFee,
                            currency: "usd",
                        }
                    }
                }
            ],
            mode: "payment",
            success_url: `${FRONTEND_URL}/orders/details/${orderId}?success=true`,
            cancel_url: `${FRONTEND_URL}/orders/details/${orderId}?canceled=true`,
            metadata: {
                orderId,
                restaurantId,
            },
        });
    console.log(session)
    return session;
};

export default {
    getOrders,
    createCheckoutSession,
    stripeWebhookHandler,
}

