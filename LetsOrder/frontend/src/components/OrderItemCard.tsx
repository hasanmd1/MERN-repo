import {Order, OrderStatus} from "@/types.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ORDER_STATUS} from "@/config/order-status-config.ts";
import {useUpdateOrderStatus} from "@/api/MyRestaurantApi.tsx";
import {useEffect, useState} from "react";


type Props = {
    order: Order
}

const OrderItemCard = ({order}: Props) => {
    const {
        updateRestaurantStatus,
        isLoading
    } = useUpdateOrderStatus();

    const [
        status,
        setStatus
    ] = useState<OrderStatus>(order.orderStatus);

    useEffect(() => {
        setStatus(order.orderStatus);
    }, [order.orderStatus]);

    const handleStatusChange = async (newStatus: OrderStatus) => {
        try {
            await updateRestaurantStatus({
                orderId: order._id as string,
                status: newStatus,
            });
            setStatus(newStatus);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getTime = () => {
        const date = new Date(order.createdAt);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${paddedMinutes}`
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle
                    className={
                        `grid md:grid-cols-4
                        gap-4 justify-between
                        mb-3`
                    }
                >
                    <div>
                        Customer Name:
                        <span className={`ml-2 font-normal`}>
                            {order.user.name}
                        </span>
                    </div>
                    <div>
                        Delivery Address:
                        <span className={`ml-2 font-normal`}>
                            {order.deliveryDetails.addressLine1},
                            {order.deliveryDetails.city},
                            {order.deliveryDetails.country}
                        </span>
                    </div>
                    <div>
                        Time:
                        <span className={`ml-2 font-normal`}>
                            {getTime()}
                        </span>
                    </div>
                    <div>
                        Total Cost:
                        <span className={`ml-2 font-normal`}>
                            ${(order.total / 100).toFixed(2)}
                        </span>
                    </div>
                </CardTitle>
                <Separator/>
            </CardHeader>
            <CardContent
                className={`flex flex-col gap-5`}
            >
                <div className="flex flex-col gap-2">
                    {order.cartItems.map((item) => (
                        <span>
                            <Badge
                                variant="outline"
                                className="mr-2"
                            >
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-col space-y-1 5">
                    <Label htmlFor={`status`}>
                        Current Status:

                    </Label>
                    <Select
                        value={status}
                        disabled={isLoading}
                        onValueChange={(value) => handleStatusChange(value as OrderStatus)}
                    >
                        <SelectTrigger id={`status`}>
                            <SelectValue
                                placeholder={"Select Status"}
                            />
                        </SelectTrigger>
                        <SelectContent position={`popper`}>
                            {ORDER_STATUS.map((status) => (
                                <SelectItem value={status.value}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderItemCard;