import {MenuItem} from "@/types.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";


type Props = {
    item: MenuItem,
    addToCart: () => void
}

const MenuItems = ({item, addToCart}: Props) => {

    return (
        <Card className={`cursor-pointer`} onClick={addToCart}>
            <CardHeader key={`${item._id}`}>
                <CardTitle>
                    {item.name}
                </CardTitle>
            </CardHeader>
            <CardContent className={`font-bold`}>
                ${(item.price / 100).toFixed(2)}
            </CardContent>
        </Card>
    )
}

export default MenuItems;