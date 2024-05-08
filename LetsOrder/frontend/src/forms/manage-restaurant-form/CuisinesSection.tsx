import {useFormContext} from "react-hook-form";
import {FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {cuisineList} from "@/config/restaurant-options-config.ts";
import CuisineCheckBox from "@/forms/manage-restaurant-form/CuisineCheckBox.tsx";

const CuisinesSection = () => {
    const {control} = useFormContext();
    return (
        <div className="space-y-2 ">
            <div>
                <h2 className="text-2xl font-bold">
                    Cuisines
                </h2>
                <FormDescription>
                    Select your restaurant cuisines
                </FormDescription>
            </div>
            <FormField control={control} name="cuisines" render={({field}) => (
                <FormItem>
                    <div className="grid md:grid-cols-5 gap-1">
                        {cuisineList.map((cuisineItem) => (
                            <CuisineCheckBox cuisine={cuisineItem} field={field}/>
                        ))}
                    </div>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
    );
};

export default CuisinesSection;
