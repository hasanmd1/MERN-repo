import {Order} from "@/types.ts";
import {Progress} from "@/components/ui/progress.tsx";
import {ORDER_STATUS} from "@/config/order-status-config.ts";


type Props = {
    order: Order
}

const OrderStatusHeader = ({order}: Props) => {

    const getExpectedDelivery = () => {
        const date = new Date(order.createdAt);

        date.setMinutes(
            date.getMinutes()
            + order.restaurant.estimatedDeliveryTime
        );
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${paddedMinutes}`
    }


    const getOrderStatusInfo = () => {
        return ORDER_STATUS
            .find((
                status
            ) => status.value === order.orderStatus
            && ORDER_STATUS[0])
    }


    return (
        <>
            <h1 className={`text-4xl font-bold
             tracking-tighter flex flex-col
              gap-5 md:flex-row md:justify-between`}
            >
                <span>Order Status: {getOrderStatusInfo()?.label}</span>
                <span>Expected by: {getExpectedDelivery()}</span>
            </h1>
            <Progress
                className={`animate-pulse`}
                value={getOrderStatusInfo()?.progress}

            />
        </>
    )
}

export default OrderStatusHeader;