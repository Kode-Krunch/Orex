import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { format } from 'date-fns';
import AphexChart from '../Donut';


const DonutGraph = ({ currentDate, dashBoardDoughnut = [], sum, handlePreviousMonth, handleNextMonth, title }) => {
    const formattedDate = format(currentDate, 'dd MMM yyyy');
    const hasData = dashBoardDoughnut.length > 0;
    const buttonStyles = "p-2 rounded bg-black dark:bg-sky-700 hover:bg-sky-700 cursor-pointer";

    return (
        <>
            <h4 className="mt-5 mx-5 text-lg font-bold dark:text-gray-400 text-gray-800">
                {title}
            </h4>
            <div className="flex justify-between items-center mx-5 mt-5">
                <button className={buttonStyles} onClick={handlePreviousMonth}>
                    <FaChevronLeft />
                </button>
                <div className="text-md font-black dark:text-blue-50 text-gray-800">
                    {formattedDate}
                </div>
                <button className={buttonStyles} onClick={handleNextMonth}>
                    <FaChevronRight />
                </button>
            </div>
            <div className="card-bodyR text-center mt-4">
                {hasData ? <AphexChart data={dashBoardDoughnut} name="DealMaster" /> : <h3>Data Not Found</h3>}
                <div className="mt-4">
                    <h3 className="font-normal dark:text-slate-200 text-gray-800">
                        ₹{sum?.toLocaleString('en-IN') || 0}
                    </h3>
                    <h3>Total Earn</h3>
                </div>
            </div>
        </>
    );
};

export default DonutGraph;
