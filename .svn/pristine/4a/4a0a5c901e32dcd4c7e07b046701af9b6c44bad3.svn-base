import { Button, Select } from 'components/ui';
import { convertDateToYMD } from 'components/validators';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';

const ConditionalApi = ({ selectedItem, formState, setFormState, fetchCheckScheduling }) => {
    const [agencyList, setAgencyList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [dealList, setDealList] = useState([]);

    const Channel = useSelector((state) => state.locale.selectedChannel);

    useEffect(() => {
        if (selectedItem && formState?.datesrange[1]) {
            fetchData();
        }
    }, [formState?.datesrange, selectedItem]);

    // Memoized fetch function to prevent unnecessary re-renders
    const fetchData = useCallback(async () => {
        try {
            const payloadAgency = {
                LocationCode: Channel.LocationCode,
                ChannelCode: Channel.ChannelCode,
                ClientCode: selectedItem?.value,
                FromDate: convertDateToYMD(formState.datesrange[0]),
                ToDate: convertDateToYMD(formState.datesrange[1]),
            };
            const payloadDeal = {
                LocationCode: Channel.LocationCode,
                ChannelCode: Channel.ChannelCode,
                ClientCode: selectedItem?.value,
                AgencyCode: 0,
                FromDate: convertDateToYMD(formState.datesrange[0]),
                ToDate: convertDateToYMD(formState.datesrange[1]),
            };
            const payloadBrand = {
                LocationCode: Channel.LocationCode,
                ChannelCode: Channel.ChannelCode,
                ClientCode: selectedItem?.value,
                DealNumber: 0,
                FromDate: convertDateToYMD(formState.datesrange[0]),
                ToDate: convertDateToYMD(formState.datesrange[1]),
            };
            const [agencyResponse, dealResponse, brandResponse] = await Promise.all([
                apiCallstoreprocedure('USP_Fill_AgencyUsing_Client', payloadAgency),
                apiCallstoreprocedure('USP_FillDealUsingClient', payloadDeal),
                apiCallstoreprocedure('USP_FillBrandUsingClient', payloadBrand),
            ]);
            setAgencyList(formatDropdownOptions(agencyResponse.data));
            setDealList(formatDropdownOptions(dealResponse.data));
            setBrandList(formatDropdownOptions(brandResponse.data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [Channel, formState.datesrange, selectedItem]);


    const formatDropdownOptions = (data) => [
        { value: 0, label: 'All' },
        ...(data?.map((item) => ({ value: item.ValueMember, label: item.DisplayMember })) || [])
    ];


    return (
        <div className="grid grid-cols-4 gap-2 mb-5">
            <Dropdown label="Select Deal" options={dealList} onChange={(value) => setFormState((prev) => ({ ...prev, Deal: value }))} />
            <Dropdown label="Select Agency" options={agencyList} onChange={(value) => setFormState((prev) => ({ ...prev, Agency: value }))} />
            <Dropdown label="Select Brand" options={brandList} onChange={(value) => setFormState((prev) => ({ ...prev, Brand: value }))} />
            <Button size='sm' variant="solid" className='ml-2 w-32 mt-6' onClick={fetchCheckScheduling}>Search</Button>
        </div>
    );
};

// Reusable dropdown component to reduce duplication
const Dropdown = ({ label, options, onChange }) => (
    <div>
        {/* lbale */}
        <p className="label">{label}</p>
        <Select options={options} onChange={(e) => onChange(e.value)} />
    </div>
);

export default ConditionalApi;
