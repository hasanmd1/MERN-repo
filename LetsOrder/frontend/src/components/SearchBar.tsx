import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect} from "react";

const formSchema = z.object({

    searchQuery: z.string({
        required_error: "Please enter city or restaurant name to search",
    }).nonempty({
        message: "Please enter city or restaurant name to search",
    }),
});

export type SearchForm = z.infer<typeof formSchema>;



type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset: () => void;
    searchQuery: string;
}


const SearchBar = ({searchQuery, onSubmit, placeHolder, onReset}: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: searchQuery || "",
        },
    });

    useEffect(() => {
        form.reset({searchQuery})
    }, [form, searchQuery])


    const handleReset = () => {
        form.reset({
            searchQuery: "",
        });

        if (onReset) {
            onReset();
        }
    };


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`flex items-center gap-3 justify-between
                 flex-row border-2 rounded-full p-3 mx-5 
                ${(
                    form.formState.errors.searchQuery) ? "border-red-500" : ""
                }`}
            >
                <Search
                    strokeWidth={3}
                    size={25}
                    className="mx-1 text-blue-500 hidden md:block"
                />

                <FormField
                    control={form.control}
                    name={`searchQuery`}
                    render={({field}) => (
                        <FormItem className={`flex-1 `}>
                            <FormControl>
                                <Input {...field}
                                    className={`border-none shadow-none text-xl focus-visible:ring-0`}
                                    placeholder={placeHolder}

                                />
                            </FormControl>
                        </FormItem>
                    )}

                />
                <Button
                    type={`button`}
                    variant={`outline`}
                    className={`rounded-full hover:border-2 hover:border-red-500`}
                    onClick={handleReset}
                >
                    Reset
                </Button>

                <Button
                    type={`submit`}
                    className={`rounded-full bg-blue-500 text-white hover:bg-white hover:border-2 hover:border-blue-500 hover:text-blue-500`}
                >
                    Search
                </Button>
            </form>
        </Form>
    );
};

export default SearchBar;
