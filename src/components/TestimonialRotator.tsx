'use client';

import { useState, useEffect } from 'react';


import TestimonialCard from "./TestimonialCard";

// Client-side testimonial rotation logic
export default  function TestimonialRotator(testimonials: string[]) {

    const [index, setIndex] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 10000);
      return () => clearInterval(interval);
    }, []);
    return <TestimonialCard text={testimonials[index]} />;
  }