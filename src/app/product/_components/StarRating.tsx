"use client"
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';  // استيراد أيقونات النجوم

interface Props {
    rating: number
    textSize: string
    show: boolean
}

const StarRating = ({ rating, textSize, show }: Props) => {
    const fullStars = Math.floor(rating); // النجوم الممتلئة
    const hasHalfStar = rating % 1 >= 0.5; // إذا كان هناك نصف نجم
    // const emptyStars = 5 - Math.ceil(rating); // النجوم الفارغة
    let emptyStars

    if (rating % 1 >= 0.5) {
        emptyStars = 5 - Math.ceil(rating);
    } else {
        emptyStars = 5 - Math.floor(rating);
    }

    return (
        <div className='flex items-center gap-3'>
            <div className='flex items-center'>
                {/* عرض النجوم الممتلئة */}
                {[...Array(fullStars)].map((_, index) => (
                    <FaStar key={index} className={`text-[#ffd700] ${textSize}`} />
                ))}

                {/* عرض نصف النجمة إذا كان هناك نصف نجم */}
                {hasHalfStar && <FaStarHalfAlt className={`text-[#ffd700] ${textSize}`} />}

                {/* عرض النجوم الفارغة */}
                {[...Array(emptyStars)].map((_, index) => (
                    <FaRegStar key={index} className={`text-[#ffd700] ${textSize}`} />
                ))}
            </div>

            {show && <div>{rating} out of 5</div>}
        </div>
    );
};

export default StarRating;
