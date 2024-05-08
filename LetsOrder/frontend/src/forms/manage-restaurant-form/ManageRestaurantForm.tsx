import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../components/ui/form";
import DetailsSection from "@/forms/manage-restaurant-form/DetailsSection.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import CuisinesSection from "@/forms/manage-restaurant-form/CuisinesSection.tsx";
import MenuSection from "@/forms/manage-restaurant-form/MenuSection.tsx";
import ImageSection from "@/forms/manage-restaurant-form/ImageSection.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Restaurant} from "@/types.ts";
import {useEffect} from "react";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant name is required",
    }),
    city: z.string({
        required_error: "City is required",
    }),
    country: z.string({
        required_error: "Country is required",
    }),
    deliveryFee: z.coerce.number({
        required_error: "Delivery fee is required",
        invalid_type_error: "Delivery fee must be a number",
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated delivery time is required",
        invalid_type_error: "Estimated delivery time must be a number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Select at least one cuisine",
    }),
    menuItems: z.array(z.object({
        name: z.string({
            required_error: "Menu item name is required",
        }),
        price: z.coerce.number({
            required_error: "Menu item price is required",
        }).min(1, "Menu item price must be greater than 0"),
    })),

    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, {
        message: "Image is required",
    }).optional().nullable(),
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either upload an image or provide an image URL",
    path: ["imageFile"],
});

type restaurantFormData = z.infer<typeof formSchema>;


type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}
// eslint-disable-next-line no-empty-pattern
const ManageRestaurantForm = ({restaurant, isLoading, onSave}: Props) => {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName: "",
            city: "",
            country: "",
            deliveryFee: 0,
            estimatedDeliveryTime: 0,
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
            imageFile: null,
            imageUrl: "",
        },
    });

    useEffect(() => {
        if (!restaurant) {
            return;
        }

        const deliveryFeeFormatted = parseInt((restaurant.deliveryFee / 100).toFixed(2));
        const menuItemsFormatted = restaurant.menuItems.map((menuItem) => ({
            ...menuItem,
            price: parseInt((menuItem.price / 100).toFixed(2)),
        }));

        const updatedRestaurant = {
            ...restaurant,
            deliveryFee: deliveryFeeFormatted,
            menuItems: menuItemsFormatted,
            imageFile: null,
        }

        form.reset(updatedRestaurant);


    }, [form, restaurant])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (formDataJson: restaurantFormData) => {
        const formData = new FormData()

        formData.append("restaurantName", formDataJson.restaurantName);

        formData.append("city", formDataJson.city);

        formData.append("country", formDataJson.country);

        formData.append("deliveryFee",
            (formDataJson.deliveryFee * 100).toString());

        formData.append("estimatedDeliveryTime",
            formDataJson.estimatedDeliveryTime.toString());

        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });

        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
        });

        console.log("Image File:", formDataJson.imageFile);
        if (formDataJson.imageFile) {
            formData.append("imageFile", formDataJson.imageFile);

        }
        console.log(formDataJson.imageFile);
        onSave(formData);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={(event) => {
                    console.log("Submit", form.getValues());

                    form.handleSubmit(onSubmit)(event);
                }}
                className="space-y-8 bg-gray-50 rounded-lg p-10"
            >
                <DetailsSection/>
                <Separator/>
                <CuisinesSection/>
                <Separator/>
                <MenuSection/>
                <Separator/>
                <ImageSection/>
                {isLoading ? <LoadingButton/> :
                    <Button type="submit">
                        Submit
                    </Button>
                }
            </form>
        </Form>
    )
};

export default ManageRestaurantForm;