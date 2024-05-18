import {useParams} from "react-router-dom";
import {useGetRestaurant} from "@/api/RestaurantApi.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import RestaurantInfo from "@/components/RestaurantInfo.tsx";
import MenuItem from "@/components/MenuItems.tsx";
import {useState} from "react";
import OrderSummary from "@/components/OrderSummary.tsx";
import {MenuItem as MenuItems} from "@/types.ts";
import {useCreateCheckoutSession} from "@/api/OrderApi.tsx";
import {UserFormData} from "@/forms/user-profile-form/UserProfileForm.tsx";


export type CartItem = {
    _id: string,
    name: string,
    price: number,
    quantity: number,
}


const DetailPage = () => {
    const {restaurantId} = useParams();
    const {restaurant, isLoading} = useGetRestaurant(restaurantId);
    const {createCheckoutSession, isLoading: isCheckoutLoading} = useCreateCheckoutSession();

    const [
        cartItems,
        setCartItems
    ] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage
            .getItem(`cartItems-${restaurantId}`);

        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });


    const onCheckout = async (userFormData: UserFormData) => {
        if (!restaurant) {
            return;
        }
        const checkoutData = {
            cartItems: cartItems.map((item) => ({
                menuItemId: item._id,
                name: item.name,
                quantity: item.quantity,
                price: 0
            })),
            deliveryDetails: {
                email: userFormData.email as string,
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country
            },
            restaurantId: restaurant?._id,
        };

        const data = await createCheckoutSession(checkoutData);

        console.log(data)
        sessionStorage.setItem('checkoutReturnUrl', `/orders/details/${data.orderId}`);
        sessionStorage.setItem('userAuthenticated', 'true');
        window.location.href = data.url;

    };

    const addToCart = (item: MenuItems) => {

        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find(
                (cartItem) => cartItem._id === item._id
            );

            let updatedCartItems;

            if (existingItem) {
                updatedCartItems = prevCartItems.map(
                    (cartItem) => cartItem._id === item._id
                        ? {...cartItem, quantity: cartItem.quantity + 1}
                        : cartItem
                );
            }
            else {
                updatedCartItems = [
                    ...prevCartItems,
                    {
                        _id: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: 1
                    }];
            }

            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    }

    const removeFromCart = (item: CartItem) => {

        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (cartItem) => cartItem._id !== item._id
            );

            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    }

    const increaseQuantity = (item: CartItem) => {

        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.map(
                (cartItem) => cartItem._id === item._id
                    ? {...cartItem, quantity: cartItem.quantity + 1}
                    : cartItem
            );
            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const decreaseQuantity = (item: CartItem) => {

        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.map(
                (cartItem) => cartItem._id === item._id
                    ? {...cartItem, quantity: cartItem.quantity - 1}
                    : cartItem
            );

            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };


    if (isLoading || !restaurant) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16/5}>
                <img
                    className="rounded-md object-cover h-full w-full"
                    src={restaurant.imageUrl}
                    alt="restaurant Image"/>
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-28">
                <div className={`flex flex-col gap-4`}>
                    <RestaurantInfo restaurant={restaurant}/>
                    <span className={`text-2xl font-bold tracking-tighter`}>
                        Menu
                    </span>
                    {restaurant.menuItems.map((item) => (
                        <MenuItem item={item} addToCart={() => addToCart(item)}/>
                    ))}
                </div>

                <div>
                    <OrderSummary
                        restaurant={restaurant}
                        cartItems={cartItems}
                        removeFromCart={removeFromCart}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        onCheckout={onCheckout}
                        isLoading={isCheckoutLoading}
                    />
                </div>
            </div>
        </div>
    )
}


export default DetailPage;