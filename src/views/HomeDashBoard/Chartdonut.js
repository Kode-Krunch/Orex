import React, { useEffect, useState } from 'react'
import { Card, Badge, Button, DatePicker } from 'components/ui'
import { Chart } from 'components/shared'
import isEmpty from 'lodash/isEmpty'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { HiCake } from 'react-icons/hi'
import { convertDateToYMD, validate } from 'components/validators'
import { apiGetUSP_Dashboard_Events } from 'services/DashBoardService'
import { COLORS } from 'constants/chart.constant'

const getcolor = ['#4F46E5', '#3A82F6', '#47B981']

const Chartdonut = () => {

    const [data, setdata] = useState([]);
    const [windowSize, setwindowSize] = useState(window.innerWidth);
    const [currentDate, setCurrentDate] = useState(new Date(2024, 1, 9));
    const [EventData, setEventData] = useState([]);
    console.log(EventData);
    useEffect(() => {
        const labels = EventData.map(item => item.EventType);
        const data = EventData.map(item => item.Consumption);

        const result = { labels, data };
        setdata(result)
    }, [EventData])

    useEffect(() => {

        ; (async (values) => {
            const resp = await apiGetUSP_Dashboard_Events(1, 1, convertDateToYMD(currentDate))
            setEventData(resp.data)
        })();
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setwindowSize(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handlePreviousDate = async () => {
        const previousDate = new Date(currentDate);
        console.log(previousDate);
        console.log(convertDateToYMD(previousDate));
        previousDate.setDate(currentDate.getDate() - 1);

        setCurrentDate(previousDate);
        try {
            const resp = await apiGetUSP_Dashboard_Events(1, 1, convertDateToYMD(previousDate))
            setEventData(resp.data)
        } catch (error) {
            setdata([])
        }

    };
    const handleNewDate = async () => {
        const previousDate = new Date(currentDate);
        previousDate.setDate(currentDate.getDate() + 1);

        setCurrentDate(previousDate);
        try {
            const resp = await apiGetUSP_Dashboard_Events(1, 1, convertDateToYMD(previousDate))
            setEventData(resp.data)
        } catch (error) {
            setdata([])
        }

    };
    return (
        <Card>

            <div >

                <div className='flex justify-between'>
                    <Button size='sm' icon={<FaChevronLeft />} onClick={handlePreviousDate} />

                    <p style={{
                        fontSize: '16px',
                        marginTop: '5px', fontWeight: 'bolder',
                        color: 'white',
                        opacity: '0.8'
                    }}>{convertDateToYMD(currentDate)}</p>


                    <Button size='sm' icon={<FaChevronRight />} onClick={handleNewDate} />
                    {/* <DatePicker
                        name="EventDate"
                        size="sm"
                        prefix={<HiCake className="text-xl" />}
                        Value={
                            validate(EventDate)
                                ? new Date(EventDate)
                                : ''
                        }
                        onChange={async (date) => {
                            setEventDate(convertDateToYMD(date))
                            const resp = await apiGetUSP_Dashboard_Events(1, 1, convertDateToYMD(date))
                            setEventData(resp.data)
                        }}
                    /> */}

                </div>
            </div>
            <div className="mt-6 ">
                {!isEmpty(data) && (
                    <>

                        <div className='flex justify-center'>
                            {/* <Chart
                                donutTitle={`${data.data.reduce(
                                    (a, b) => a + b,
                                    0
                                )}`}
                                donutText="Total FCT [min]"
                                series={data.data}
                                customOptions={{ labels: data.labels }}
                                type="donut"
                                width={windowSize < 1300 ? '250px' : '300px'}
                                height={windowSize < 1300 ? '250px' : '300px'}
                            /> */}
                        </div>
                        {data.data.length === data.labels.length && (
                            <div className="mt-6 grid grid-cols-2 gap-2 max-w-[400px] mx-auto mb-4" style={{ paddingLeft: 25 }}>
                                {data.labels.map((value, index) => (
                                    <div
                                        key={value}
                                        className="flex items-center gap-1"
                                    >
                                        <Badge
                                            badgeStyle={{
                                                backgroundColor: COLORS[index],
                                            }}
                                        />
                                        <span className="font-semibold">
                                            {value}
                                        </span>
                                        <span>
                                            {data.data[index]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </Card>
    )
}

export default Chartdonut