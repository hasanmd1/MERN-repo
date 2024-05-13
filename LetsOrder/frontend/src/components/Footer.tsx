
const Footer = () => {
    return (
        <div className="bg-blue-500 py-10 text-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <span className="text-3xl font-bold tracking-tight">
                    Let's Order
                </span>
                <span className="fond-bold tracking-tight gap-4 flex">
                    <span>© Let's Order 2022</span>
                    <span>|</span>
                    <span>Terms of Service</span>
                    <span>Privacy Policy</span>
                    <span>All rights reserved</span>
                </span>
            </div>
        </div>
    );
};

export default Footer;