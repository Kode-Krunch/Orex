/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from 'react'
import { Group } from './Group'

export const GroupWrapper = (
    propos,
    {
        className,
        divClassName,
        text = 'User name',
        groupGroupClassName,
        groupDivClassName,
        groupText = 'Enter your user name',
        name,
    }
) => {
    console.log(propos.name)
    return (
        <div className={`relative w-[423px] h-[92px] ${className}`}>
            <div
                className={`absolute w-[390px] -top-px left-0 [font-family:'Poppins',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] ${divClassName}`}
            >
                {text}
            </div>
            <Group
                className={groupGroupClassName}
                divClassName={groupDivClassName}
                text={groupText}
                name={propos.name}
            />
        </div>
    )
}
