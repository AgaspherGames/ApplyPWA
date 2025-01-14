import { ReactNode, createContext, useState } from "react";

interface ScrollSectionProps {
    height: number;
    index: number;
    children: ReactNode
}

export const RangeContext = createContext([-1, 0, 1])

const ScrollSection: React.FC<ScrollSectionProps> = ({
    height, index, children
}) => {

    console.log(height);
    

    return <RangeContext.Provider value={[
        (height) * (index - 1),
        (height) * index,
        (height) * (index + 1),
    ]}>
        {children}
    </RangeContext.Provider>
};

export default ScrollSection;