import hero2 from '../assets/Hero-2.jpeg';
import hero3 from '../assets/hero-3.webp';
import hero from '../assets/hero.jpeg';
import {useState, useEffect} from "react";

const Hero = () => {
    const images = [hero, hero2, hero3];
    const[currentImageIndex, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [images]);

    return (
        <div>
            <img src={images[currentImageIndex]} className="w-full max-h-[400px] object-cover" alt={`Hero ${currentImageIndex + 1}`} />
        </div>
    );
};

export default Hero;