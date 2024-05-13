import {cuisineList} from "@/config/restaurant-options-config.ts";
import {Label} from "@/components/ui/label.tsx";
import {Check, ChevronDown, ChevronUp} from "lucide-react";
import {ChangeEvent} from "react";
import {Button} from "@/components/ui/button.tsx";


type Props = {
    onChange: (cuisines: string[]) => void;
    selectedCuisines: string[];
    isExpanded: boolean;
    onExpandedClick: () => void;
}

export const CuisineFilter = ({
                                  onChange,
                                  selectedCuisines,
                                  isExpanded,
                                  onExpandedClick
} : Props) => {

    const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedCuisine = event.target.value;

        const isChecked = event.target.checked;


        const newCuisineList = isChecked
            ? [...selectedCuisines, clickedCuisine]
            : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

        onChange(newCuisineList);
    }

    const handleCuisineReset = () => {
        onChange([]);
    }

    return (
        <>
            <div className={`flex items-center justify-between`}>
                <div className={`text-md font-semibold mb-2`}>
                    Filter by cuisines
                </div>
                <div
                    onClick={handleCuisineReset}
                    className="text-sm font-semibold pl-2 mb-2 underline cursor-pointer text-blue-500">
                    Reset Filters
                </div>
            </div>

            <div className="space-y-2 flex flex-col">
                {cuisineList.slice(0, isExpanded ? cuisineList.length : 5).map((cuisine) => {
                    const isSelected = selectedCuisines.includes(cuisine);
                    return <div key={`cuisine_${cuisine}`}>
                        <input
                            id={`cuisine_${cuisine}`}
                            type="checkbox"
                            className="hidden"
                            checked={isSelected}
                            value={cuisine}
                            onChange={handleCuisineChange}
                        />

                        <Label
                        htmlFor={`cuisine_${cuisine}`}
                        className={`flex flex-1 items-center 
                            text-sm rounded-full px-4 py-2 
                            font-semibold cursor-pointer
                            ${
                            isSelected ?
                                'border-green-500 border text-green-500'
                                : 'border border-slate-500'
                        }`}
                    >
                        {isSelected && (<Check size={20} strokeWidth={2}/>)}
                        {cuisine}

                    </Label>
                    </div>;
                })}

                <Button
                    variant={`link`}
                    onClick={onExpandedClick}
                    className={`mt-4 flex-1 hover:text-blue-500`}
                >
                    {isExpanded ? (<span className={`flex flex-row items-center`}>
                        View Less <ChevronUp/>
                    </span>) : (<span className={`flex flex-row items-center`}>
                        View More <ChevronDown/>
                    </span>)}
                </Button>
            </div>
        </>
    )
}