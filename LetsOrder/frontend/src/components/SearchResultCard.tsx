import {Restaurant} from "@/types.ts";
import {Link} from "react-router-dom";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import {Banknote, Clock, Dot} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";


type Props = {
    restaurant: Restaurant;
};

function SearchResultCard({restaurant} : Props) {
    return (
        <Link
            to={`/detail/${restaurant._id}`}
            className={`md:mr-16 border-2 rounded-2xl hover:border-blue-500 hover:shadow-blue-500 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-5 group`}
        >
            <AspectRatio ratio={16/9}>
                <img
                    src={restaurant.imageUrl}
                    alt={`restaurant image`}
                    className={`p-2 rounded-2xl w-full h-full object-cover`}
                />
            </AspectRatio>
            <div className={`p-2`}>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
                    {restaurant.restaurantName}
                </h3>
                <Separator/>
                <div
                    id="card-content"
                    className={`grid mt-10 md:grid-cols-2 gap-2`}
                >
                    <div className="flex flex-row flex-wrap">
                        {restaurant.cuisines.map((cuisine, index) => (
                            <span
                                key={index}
                                className={`flex `}
                            >
                            <span>
                                {cuisine}
                            </span>
                                {index < restaurant.cuisines.length - 1 && (
                                    <Dot

                                    />
                                )}
                        </span>
                        ))}
                    </div>
                    <div className="flex gap-2 flex-col">
                        <div className="flex items-center gap-1 text-green-500">
                            <Clock className={`text-green-500`}/>
                            {restaurant.estimatedDeliveryTime} minutes
                        </div>
                        <div className="flex items-center gap-1">
                            <Banknote className={`text-gold-500`}/>
                            Delivery from ${(restaurant.deliveryFee / 100).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SearchResultCard;