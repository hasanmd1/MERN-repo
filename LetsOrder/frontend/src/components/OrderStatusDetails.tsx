import {Order} from "@/types.ts";
import {Separator} from "@/components/ui/separator.tsx";


type Props = {
    order: Order
}


const OrderStatusDetails = ({order}: Props) => {

    return (
        <div className="space-y-5">
            <div className="flex flex-col">
                <span className={`font-bold`}>
                    Delivering To:
                </span>
                <span>
                    {order.deliveryDetails.name}
                </span>
                <span>
                    {order.deliveryDetails.addressLine1},
                    {order.deliveryDetails.city},
                    {order.deliveryDetails.country}
                </span>
            </div>
            <div className="flex flex-col">
                <span className={`font-bold`}>
                    Your Order:
                </span>
                <ul>
                    {order.cartItems.map((item) => (
                        <li
                            className={`flex justify-between`}
                            key={item.menuItemId}
                        >
                            <span>
                                {item.name} x {item.quantity}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <Separator/>
            <div className="flex flex-col">
                <span className={`font-bold`}>
                    Total:
                </span>
                <span>
                    ${(order.total / 100).toFixed(2)}
                </span>
            </div>
        </div>
    )
};


export default OrderStatusDetails;


