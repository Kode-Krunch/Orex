import React from 'react'

export const Group = ({
    className,
    divClassName,
    text = 'Enter your user name',
    name,
}) => {
    console.log(name)
    return (
        <input
            name={name}
            className={`relative w-[423px] h-[59px] bg-white rounded-[6px] border-[0.7px] border-solid border-black ${className}`}
        />
    )
}
