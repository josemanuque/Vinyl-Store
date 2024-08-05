import { useEffect, useState } from "react";
import "./CoverFlow.css";
import { VinylInterface } from "../../interfaces/Vinyl.Interface";
import { getVinyls } from "../../services/VinylService";
import AlbumPlaceholder from "../Placeholders/AlbumPlaceholder";

const CoverFlow = () => {
    const [vinyls, setVinyls] = useState<VinylInterface[]>([]);

    useEffect(() => {
        const fetchVinyls = async () => {
            const data = await getVinyls();
            setVinyls(data);
        }
        fetchVinyls();
    }, []);

    useEffect(() => {
        const cards = document.querySelector('.cards') as HTMLElement;
        const items = document.querySelectorAll('.cards li') as NodeListOf<HTMLElement>;

        const updateCenteredItem = () => {
            let centeredItem: HTMLElement | null = null;
            let minDistance = Infinity;

            items.forEach((item: HTMLElement) => {
                const rect = item.getBoundingClientRect();
                const distance = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);

                if (distance < minDistance) {
                    minDistance = distance;
                    centeredItem = item;
                }
            });

            items.forEach((item: HTMLElement) => item.classList.remove('centered'));
            if (centeredItem !== null) {
                (centeredItem as HTMLElement).classList.add('centered');
            }
        };

        cards.addEventListener('scroll', updateCenteredItem);
        updateCenteredItem(); // Initial call to set the centered item

        // Vanilla JS code for click-and-drag scrolling
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const handlePointerDown = (e: PointerEvent) => {
            isDown = true;
            cards.classList.add('active');
            startX = e.pageX - cards.offsetLeft;
            scrollLeft = cards.scrollLeft;
        };

        const handlePointerLeave = () => {
            isDown = false;
            cards.classList.remove('active');
        };

        const handlePointerUp = () => {
            isDown = false;
            cards.classList.remove('active');
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - cards.offsetLeft;
            const walk = (x - startX) * 3; // scroll-fast
            cards.scrollLeft = scrollLeft - walk;
        };

        cards.addEventListener('pointerdown', handlePointerDown);
        cards.addEventListener('pointerleave', handlePointerLeave);
        cards.addEventListener('pointerup', handlePointerUp);
        cards.addEventListener('pointermove', handlePointerMove);

        return () => {
            cards.removeEventListener('scroll', updateCenteredItem);
            cards.removeEventListener('pointerdown', handlePointerDown);
            cards.removeEventListener('pointerleave', handlePointerLeave);
            cards.removeEventListener('pointerup', handlePointerUp);
            cards.removeEventListener('pointermove', handlePointerMove);
        };
    }, [vinyls]);


    return (
        <div className="coverflow-container">
            <ul className="cards">
                {vinyls.map(vinyl => (
                    <li key={vinyl._id} data-title={vinyl.title}>
                        {vinyl.coverImage ? (
                            <img src={vinyl.coverImage} alt={vinyl.title + " Image"} />
                        ) : (
                            <AlbumPlaceholder className={"svg-container coverflow-img"}/>
                        )}
                    </li>
                ))}
            </ul>

            <div className="warning">
                <p>⚠️ Your browser does not support CSS Scroll-Linked Animations with <code>view-timeline</code>. Please try Chrome Canary 115+.</p>
            </div>
        </div>
    );
};

export default CoverFlow;