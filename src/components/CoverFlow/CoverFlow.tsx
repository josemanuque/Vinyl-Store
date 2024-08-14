import { FC, useEffect } from "react";
import "./CoverFlow.css";
import { VinylListProps } from "../../interfaces/Vinyl.Interface";
import AlbumPlaceholder from "../Placeholders/AlbumPlaceholder";
import { useNavigate } from "react-router-dom";
import useFormatCurrency from "../../hooks/useFormatCurrency";

const CoverFlow: FC<VinylListProps> = ({vinyls}) => {
    const navigate = useNavigate();
    const formatPrice = useFormatCurrency('en-US', 'USD');

    useEffect(() => {
        const cards = document.querySelector('.cards') as HTMLElement;
        const items = document.querySelectorAll('.cards li') as NodeListOf<HTMLElement>;
        

        if (!cards) {
            return;
        }

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
        let startY: number;
        const dragThreshold = 5; // Threshold to differentiate between click and drag

        const handlePointerDown = (e: PointerEvent) => {
            isDown = true;
            cards.classList.add('active');
            startX = e.pageX - cards.offsetLeft;
            startY = e.pageY - cards.offsetTop;
            scrollLeft = cards.scrollLeft;
        };

        const handlePointerLeave = () => {
            isDown = false;
            cards.classList.remove('active');
        };

        const handlePointerUp = (e: PointerEvent) => {
            isDown = false;
            cards.classList.remove('active');

            const endX = e.pageX - cards.offsetLeft;
            const endY = e.pageY - cards.offsetTop;
            const distanceX = Math.abs(endX - startX);
            const distanceY = Math.abs(endY - startY);
            console.log('distanceX:', distanceX, 'distanceY:', distanceY);
            // Only navigate if the pointer didn't move beyond the threshold
            if (distanceX < dragThreshold && distanceY < dragThreshold) {
                const target = e.target as HTMLElement;
                const activeCard = document.querySelector('.cards li.centered') as HTMLElement;

                if (activeCard && target.tagName === 'IMG' && activeCard.contains(target)) {
                    const vinylId = activeCard.getAttribute('data-id');
                    if (vinylId) {
                        navigate(`/vinyls/${vinylId}`);
                    }
                }
            }
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - cards.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            cards.scrollLeft = scrollLeft - walk;
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                // Find the centered item
                const centeredItem = document.querySelector('.cards li.centered') as HTMLElement;
                console.log('Centered Item:', centeredItem);

                // Navigate using the centered item's ID
                if (centeredItem) {
                    const vinylId = centeredItem.dataset.id;
                    if (vinylId) {
                        navigate(`/vinyls/${vinylId}`);
                    }
                }
            }
        };

        cards.addEventListener('pointerdown', handlePointerDown);
        cards.addEventListener('pointerleave', handlePointerLeave);
        cards.addEventListener('pointerup', handlePointerUp);
        cards.addEventListener('pointermove', handlePointerMove);
        cards.addEventListener('keydown', handleKeyDown);

        return () => {
            cards.removeEventListener('scroll', updateCenteredItem);
            cards.removeEventListener('pointerdown', handlePointerDown);
            cards.removeEventListener('pointerleave', handlePointerLeave);
            cards.removeEventListener('pointerup', handlePointerUp);
            cards.removeEventListener('pointermove', handlePointerMove);
            cards.removeEventListener('keydown', handleKeyDown);
        };
    }, [vinyls]);


    return (
        <div className="coverflow-container">
            
            {vinyls && vinyls.length > 0 ? (
                <ul className="cards">
                    {vinyls.map(vinyl => (
                        <li key={vinyl.id} data-id={vinyl.id} data-title={vinyl.title} data-price={vinyl.price}>
                            {vinyl.coverImage ? (
                                <img src={vinyl.coverImage} alt={vinyl.title + " Image"} draggable="false"/>
                            ) : (
                                <AlbumPlaceholder className={"svg-container coverflow-img"}/>
                            )}
                            <div className="details-container">
                                <h3>{vinyl.title}</h3>
                                <p>{formatPrice(vinyl.price)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="loading">
                    <p>No Vinyls Added Yet</p>
                </div>
            )}
            <div className="warning">
                <p>⚠️ Your browser does not support CSS Scroll-Linked Animations with <code>view-timeline</code>. Please try Chrome Canary 115+.</p>
            </div>
        </div>
    );
};

export default CoverFlow;