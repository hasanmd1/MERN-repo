import {Button} from "@/components/ui/button.tsx";
import {Loader} from "lucide-react";

const LoadingButton = () => {
    return (
        <Button>
            <Loader className="mr-2 h-4 w-4 animate-spin"/>
            Loading
        </Button>
    )
};

export default LoadingButton;