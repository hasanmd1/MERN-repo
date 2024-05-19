import {useGetOrders} from "@/api/OrderApi.tsx";
import OrderStatusHeader from "@/components/OrderStatusHeader.tsx";
import OrderStatusDetails from "@/components/OrderStatusDetails.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";


const OrderStatusPage = () => {

    const {orders, isLoading} = useGetOrders();

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (!orders || orders.length === 0) {
        return (
            <div>
                <h1>No orders found</h1>
            </div>
        )
    }


    return (
        <div className={`space-y-10`}>
            {orders.map((order) => (
                <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
                    <OrderStatusHeader order={order}/>
                    <div
                        className={
                            `grid gap-10
                            md:grid-cols-2`
                        }
                    >
                        <OrderStatusDetails order={order}/>
                        <AspectRatio ratio={16/9}>
                            <img
                                className={
                                    `rounded-md object-cover
                                    w-full h-full`
                                }
                                src={order.restaurant.imageUrl}
                                alt={`Image of ${order.restaurant.restaurantName}`}
                            />
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderStatusPage;