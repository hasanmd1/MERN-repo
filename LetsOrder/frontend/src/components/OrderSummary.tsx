import {CartItem} from "@/pages/DetailPage.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Restaurant} from "@/types.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {MinusCircle, PlusCircle, Trash} from "lucide-react";
import CheckoutButton from "@/components/CheckoutButton.tsx";
import {UserFormData} from "@/forms/user-profile-form/UserProfileForm.tsx";


type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart: (item: CartItem) => void;
    increaseQuantity: (item: CartItem) => void;
    decreaseQuantity: (item: CartItem) => void;
    onCheckout: (userFormData: UserFormData) => void;
    isLoading: boolean;
}

const OrderSummary = (
    {
        onCheckout,
        isLoading: isCheckoutLoading,
        cartItems,
        restaurant,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    }: Props) => {


    const getTotalCost = (cartItems: CartItem[]) => {
        const totalInPenny =  cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const totalCost = totalInPenny + restaurant.deliveryFee;

        return (totalCost / 100).toFixed(2);
    };


    return (

        <>
            <Card>
                <CardHeader>
                    <CardTitle className={`text-2xl font-bold tracking-tight flex justify-between`}>
                        <span>Your Cart</span>
                        <span>${getTotalCost(cartItems)}</span>
                    </CardTitle>
                    <CardDescription>
                        Current selected items: {cartItems.length}
                    </CardDescription>
                </CardHeader>
                <CardContent className={`flex flex-col gap-5`}>
                    {cartItems.map((item) => (
                        <div className={`flex justify-between`}>
                            <span>
                                <Badge
                                    variant={`outline`}
                                    className={`mr-2 font-semibold flex items-center gap-2`}
                                >
                                    {item.quantity}
                                    <PlusCircle onClick={() => increaseQuantity(item)}/>
                                    {item.quantity > 1 && <MinusCircle onClick={() => decreaseQuantity(item)}/>}
                                </Badge>
                                {item.name}
                            </span>
                            <span
                                className={`flex items-center gap-1`}
                            >
                                ${((item.price * item.quantity) / 100).toFixed(2)}
                                <Trash
                                    className={`cursor-pointer`}
                                    color={`red`}
                                    size={20}
                                    onClick={() => removeFromCart(item)}
                                />
                            </span>

                        </div>
                    ))}
                    <Separator/>
                    <div className="flex justify-between">
                        <span>
                            Delivery Fee:
                        </span>
                        <span>
                            ${(restaurant.deliveryFee / 100).toFixed(2)}
                        </span>
                    </div>
                    <Separator/>

                </CardContent>
                <CardFooter>
                    <CheckoutButton
                        onCheckout={onCheckout}
                        isLoading={isCheckoutLoading}
                        disabled={cartItems.length === 0}
                    />
                </CardFooter>
            </Card>
        </>
    )
}

export default OrderSummary;