import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Select } from 'components/ui'
import HeaderExtra from 'views/Controls/HeaderExtra'
import { apiGetdealsearchdrop } from 'services/BookingService'
import { setDealData, setDealDataDetails } from 'store/auth/userSlice'
import { apiGetdealdetailId } from 'services/DealServices'

const BookingMerge = () => {
  const dispatch = useDispatch()
  const Channel = useSelector((state) => state.locale.selectedChannel)

  // Dropdown states
  const [dealNumber, setDealNumber] = useState(null)
  const [dealLineNumber, setDealLineNumber] = useState(null)
  const [bookingNumber, setBookingNumber] = useState(null)

  const [updateDealNumber, setUpdateDealNumber] = useState(null)
  const [updateDealLineNumber, setUpdateDealLineNumber] = useState(null)

  // Dropdown options (dynamic from API)
  const [dealOptions, setDealOptions] = useState([])
  const [updateDealOptions, setUpdateDealOptions] = useState([])
  const [lineOptions, setLineOptions] = useState([])
  const [bookingOptions, setBookingOptions] = useState([])

  // fetch deals on load
  useEffect(() => {
    (async () => {
      try {
        let Parameters = {
          LocationCode: Channel?.LocationCode,
          ChannelCode: Channel?.ChannelCode,
        }
        const resp = await apiGetdealsearchdrop(Parameters, '%20')
        const formattedOptions = resp.data.map((option) => ({
          value: option.DealNumber,
          label: option.DealCode,
        }))
        setDealOptions(formattedOptions)
        setUpdateDealOptions(formattedOptions)
      } catch (err) {
        console.error('Error fetching deals:', err)
        setDealOptions([])
        setUpdateDealOptions([])
      }
    })()

    dispatch(setDealData([]))
    dispatch(setDealDataDetails([]))
  }, [Channel, dispatch])

  // dummy static options (replace with your API later)
  useEffect(() => {

    if (dealNumber?.value) {
      (async () => {
        try {
          const resp = await apiGetdealdetailId(dealNumber?.value)
          const formattedOptions = resp.data.map((option) => ({
            value: option.DealLineItemNo,
            label: option.DealLineItemNo,
          }))
          setLineOptions(formattedOptions)

        } catch (err) {
          console.error('Error fetching deals:', err)
          setLineOptions([])
        }
      })()
    }

    setBookingOptions([
      { label: 'EP25O80001N', value: 'EP25O80001N' },
      { label: 'EP25O80002N', value: 'EP25O80002N' },
    ])
  }, [dealNumber])

  // useEffect(() => {
  //   (async () => {
  //     let tableData = [];
  //     try {
  //       if (!dealDetails) return;
  //       const response = await apiCallstoreprocedure(
  //         'USP_GetBookingsFromDealine',
  //         {
  //           LocationCode: Channel?.LocationCode,
  //           ChannelCode: Channel?.ChannelCode,
  //           DealNumber: dealNumber.value,
  //           DealLineItemNo: dealLineNumber.value
  //         },
  //       );
  //       if (response.status === 200) {
  //         tableData = response.data;
  //         setColumns(
  //           Object.keys(tableData[0]).map((column) => ({
  //             accessorKey: column,
  //             header: column,
  //           })),
  //         );
  //       } else if (response.status === 204)
  //         openNotification('info', 'No booking details found');
  //       else
  //         openNotification(
  //           'danger',
  //           'Something went wrong while fetching booking details',
  //         );
  //     } catch (error) {
  //       console.error(error);
  //       openNotification(
  //         'danger',
  //         'Something went wrong while fetching booking details',
  //       );
  //     } finally {
  //       setTableData(tableData);
  //     }
  //   })();
  // }, [channel, dealDetails]);


  // Display details only when all dropdowns are selected
  const showDetails =
    dealNumber && dealLineNumber && bookingNumber && updateDealNumber && updateDealLineNumber

  return (
    <Card header={<HeaderExtra Component={'Caption Replacement'} />}>
      <Card className="mt-4 p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Select Deal Number <span className="text-red-500">*</span>
              </label>
              <Select options={dealOptions} value={dealNumber} onChange={setDealNumber} />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Select Deal Line Number <span className="text-red-500">*</span>
              </label>
              <Select options={lineOptions} value={dealLineNumber} onChange={setDealLineNumber} />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Booking Number <span className="text-red-500">*</span>
              </label>
              <Select options={bookingOptions} value={bookingNumber} onChange={setBookingNumber} />
            </div>

            {showDetails && (
              <>
                <div>
                  <label className="block text-sm font-medium">Deal Item Type :</label>
                  <p className="mt-1">RODP wise</p>
                </div>

                <div>
                  <label className="block text-sm font-medium">RODP Name :</label>
                  <p className="mt-1">RODP 22:00 TO 23:00 HRS</p>
                </div>
              </>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Select Update Deal Number</label>
              <Select
                options={updateDealOptions}
                value={updateDealNumber}
                onChange={setUpdateDealNumber}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Select Update Deal Line Number</label>
              <Select
                options={lineOptions}
                value={updateDealLineNumber}
                onChange={setUpdateDealLineNumber}
              />
            </div>

            {showDetails && (
              <>
                <div>
                  <label className="block text-sm font-medium">Update Deal Item Type :</label>
                  <p className="mt-1">RODP wise</p>
                </div>

                <div>
                  <label className="block text-sm font-medium">Update RODP Name :</label>
                  <p className="mt-1">RODP 22:00 TO 23:00 HRS</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="solid">Update</Button>
          <Button variant="default">Clear</Button>
        </div>
      </Card>
    </Card>
  )
}

export default BookingMerge
