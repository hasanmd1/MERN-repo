import {FormDescription, FormMessage, FormItem, FormField, FormControl, FormLabel} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useFormContext} from "react-hook-form";


const DetailsSection = () => {
    const {control} = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2 className="test-2xl font-bold">
                    Restaurant Details
                </h2>
                <FormDescription>
                    Update your restaurant details
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="restaurantName"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Restaurant Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex gap-4">
                <FormField
                    control={control}
                    name="city"
                    render={({field}) => (
                        <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="country"
                    render={({field}) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={control}
                name="deliveryFee"
                render={({field}) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel>Delivery Price ($)</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="1.50"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="estimatedDeliveryTime"
                render={({field}) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="40"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
};

export default DetailsSection;