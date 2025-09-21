'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

interface Props {
    rating: number
    setRating: Dispatch<SetStateAction<number>>
}

export default function Rate({ rating, setRating }: Props) {

    const [hover, setHover] = useState(0);

    const handleClick = (value: number) => {
        setRating(value);
    };

    console.log(rating)

    return (
        <div className="star-rating" dir="rtl">
            {[...Array(5)].map((_, index) => {
                const value = 5 - index;
                const isFilled = value <= (hover || rating);

                return (
                    <span
                        key={value}
                        className="star"
                        onClick={() => handleClick(value)}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                    >
                        {isFilled ? <FaStar className='text-[#ffd700]' /> : <FaRegStar className='text-[#ffd700]' />}
                    </span>
                );
            })}
        </div>
    );
}
