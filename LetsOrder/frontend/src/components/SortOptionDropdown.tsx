import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";


type Props = {
    onChange: (value: string) => void;
    sortOptions: string;
}

const SORT_OPTIONS = [
    {
        value: "bestMatch",
        label: "Best Match",
    },
    {
        value: "deliveryFee",
        label: "Delivery Fee",
    },
    {
        label: "Estimated Delivery Time",
        value: "estimatedDeliveryTime",
    }
]

const SortOptionDropdown = ({onChange, sortOptions}: Props) => {

    const selectedOption = SORT_OPTIONS
        .find((option) => option.value === sortOptions)?.label
    || SORT_OPTIONS[0].label;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={`cursor-pointer`}>
                <Button
                    variant={`outline`}
                    className={`w-full`}
                >
                    Sort by: {selectedOption}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                        className={`cursor-pointer`}
                        key={option.value}
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export default SortOptionDropdown;