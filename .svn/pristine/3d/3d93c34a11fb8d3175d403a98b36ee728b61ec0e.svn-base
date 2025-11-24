import { Avatar, Tooltip } from 'components/ui';
import React from 'react';

const Table = ({ data, keyS, name }) => {
    return (
        <div className="mt-3">
            <div
                className="flex justify-between items-center px-2 py-2 dark:!bg-[#191f31] bg-white"
                style={{
                    borderBottom: '1px solid #2b1b1b7a',
                }}
            >
                <p className="font-semibold dark:!text-white text-black">{name}</p>
                <p className="font-semibold dark:!text-white text-black">TargetAmount</p>
                <p className="font-semibold dark:!text-white text-black">AchievedAmount</p>
            </div>
            <div
                style={{ height: 250 }}
                className="overflow-hidden hover:overflow-y-scroll  hover:overflow-x-scroll hover:pr-2"
            >
                {data &&
                    data.map((item, index) => (
                        <div
                            key={index}
                            //className="flex justify-between items-center px-1 py-2"
                            className="flex justify-between items-center px-2 py-2 dark:!bg-[#191f31] bg-white"
                            style={{
                                borderBottom: '1px solid #9d9d9d7a',
                                borderStyle: 'dashed',
                            }}
                        >
                            <Tooltip title={item[keyS]} placement="top-start">
                                <div className="flex items-center">
                                    <Avatar
                                        size="sm"
                                        className={`mr-2 dark:${item.color} ${item.color} dark:!text-white text-black`}
                                    >
                                        {item[keyS].slice(0, 1)}
                                    </Avatar>
                                    <p
                                        className="font-semibold text-xs dark:!text-white text-black"
                                        style={{
                                            width: 160,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {item[keyS]}
                                    </p>
                                </div>
                            </Tooltip>
                            <p className="font-semibold text-md dark:!text-white text-black items-center">
                                ₹{item.TargetAmount?.toLocaleString('en-IN')}.00
                            </p>

                            <p className="font-semibold text-md dark:!text-white text-black items-center">
                                ₹{item.AchievedAmount?.toLocaleString('en-IN')}.00
                            </p>

                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Table;
