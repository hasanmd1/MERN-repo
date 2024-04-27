import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Menu} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";

const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500 "/>
            </SheetTrigger>
            <SheetContent className="space-y-3 padding-x-5">
                <SheetHeader>
                    <SheetTitle>Get Started With Us!</SheetTitle>
                </SheetHeader>

                <Separator/>

                <SheetDescription className="flex">
                    <Button className="flex-1 font-bold bg-orange-500">Log In</Button>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
};

export default MobileNav;