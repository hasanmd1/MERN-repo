import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {CircleUserRound, Menu} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAuth0} from "@auth0/auth0-react";
import MobileNavLinks from "@/components/MobileNavLinks.tsx";

const MobileNav = () => {
    const {isAuthenticated, loginWithRedirect, user} = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-blue-500 "/>
            </SheetTrigger>
            <SheetContent className="space-y-3 padding-x-5">
                <SheetHeader>
                    <SheetTitle>
                        {isAuthenticated ? (
                            <span className="flex items-center font-bold gap-2">
                                <CircleUserRound className="text-blue-500"/>
                                {user?.email}
                            </span>
                        ) : (
                            <span>Welcome to our platform!</span>
                        )}
                    </SheetTitle>
                </SheetHeader>

                <Separator/>

                <SheetDescription className="flex flex-col gap-4">
                    {isAuthenticated ? (
                        <MobileNavLinks/>
                    ) : (
                        <Button
                            className="flex-1 font-bold bg-blue-500"
                            onClick={async () => await loginWithRedirect()}
                        >
                            Log In
                        </Button>

                    )}
                    </SheetDescription>
            </SheetContent>
        </Sheet>
    )
};

export default MobileNav;