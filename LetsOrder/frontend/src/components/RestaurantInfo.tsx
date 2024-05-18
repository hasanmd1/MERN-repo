import {Restaurant} from "@/types.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Dot} from "lucide-react";


type Props = {
    restaurant: Restaurant,
}

const RestaurantInfo = ({restaurant}: Props) => {

    return (
        <Card className={`border-sla`} key={`${restaurant._id}`}>
            <CardHeader>
                <CardTitle className={`text-3xl font-bold tracking-tight`}>
                    {restaurant.restaurantName}
                </CardTitle>
                <CardDescription>
                    {restaurant.city}, {restaurant.country}
                </CardDescription>
            </CardHeader>
            <CardContent className={`flex`}>
                {restaurant.cuisines.map((cuisine, index) => (
                    <span className={`flex`}>
                        <span>{cuisine}</span>
                        {index < restaurant.cuisines.length - 1 && <Dot/>}
                    </span>
                ))}
            </CardContent>
        </Card>
    )
}

export default RestaurantInfo;