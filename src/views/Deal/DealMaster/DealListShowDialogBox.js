import React, { useState, useEffect, useMemo } from 'react';
import {
    Dialog, Tooltip, Button, Input, Card, Spinner, Checkbox, Table
} from 'components/ui';
import { BsInfoLg } from 'react-icons/bs';
import DealDetailsDialog from 'views/Controls/DealDetailsDialog/DealDetailsDialog';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { useSelector } from 'react-redux';
import { StickyFooter } from 'components/shared';

const { Tr, Th, Td, THead, TBody } = Table;

const DealListShowDialogBox = ({
    Channel,
    isDialogbox,
    setisDialogbox,
    formState,
    selectedDealData,
    selectedDeal,
    setSelectedDeal,
}) => {
    const [dealOptions, setDealOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dialogDeal, setDialogDeal] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [localSelected, setLocalSelected] = useState([]);

    const ChannelState = useSelector((state) => state.locale.selectedChannel);

    useEffect(() => {
        setLocalSelected(selectedDeal || []);
    }, [selectedDeal]);

    useEffect(() => {
        if (!isDialogbox) return;

        const fetchDeals = async () => {
            setLoading(true);
            try {
                const params = {
                    par_ChannelCode: Channel?.ChannelCode ?? '',
                    par_LocationCode: Channel?.LocationCode ?? '',
                    par_ContentCode: formState?.ContentCode?.value ?? '',
                    par_DealFromDate: selectedDealData?.DealPeriodFromDate ?? '',
                    par_DealToDate: selectedDealData?.DealPeriodToDate ?? '',
                };

                const { status, data } = await apiCallstoreprocedure('GetSponsorDealDetails', params);

                if (![200, 204].includes(status)) {
                    openNotification('danger', `Failed to fetch Deal Details (Status: ${status})`);
                    setDealOptions([]);
                } else if (!data?.length) {
                    openNotification('info', 'No Deal Details found.');
                    setDealOptions([]);
                } else {
                    setDealOptions(data.map((deal, idx) => ({
                        ...deal, id: idx, value: deal.DealNumber,
                        label: deal.DealCode,
                    })));
                }
            } catch (error) {
                openNotification('danger', `Error: ${error.message}`);
                setDealOptions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, [Channel, formState, selectedDealData, isDialogbox]);

    const handleToggleDeal = (deal) => {
        setLocalSelected(prev =>
            prev.some(d => d.id === deal.id)
                ? prev.filter(d => d.id !== deal.id)
                : [...prev, deal]
        );
    };

    const handleSelectAll = () => setLocalSelected(dealOptions);
    const handleClearSelection = () => setLocalSelected([]);
    const handleClose = () => {
        setSelectedDeal(localSelected);
        setisDialogbox(false);
    };

    const isSelected = (id) => localSelected.some(d => d.id === id);

    const filteredDeals = useMemo(() => {
        const term = globalFilter.toLowerCase();
        return dealOptions.filter(deal =>
            [deal.AgencyName, deal.ClientName, deal.DealCode, deal.DealLineItemNo?.toString()]
                .some(field => field?.toLowerCase().includes(term))
        );
    }, [dealOptions, globalFilter]);



    return (
        <Dialog
            isOpen={isDialogbox}
            onClose={handleClose}
            maxWidth="lg"
            width={1500}
            className="bg-gray-800 text-white"
        >
            <div className="p-0">
                <h3 className="text-xl font-semibold mb-4">Select Deals</h3>
                <Card className="bg-gray-900">
                    <div className="flex justify-between mb-4">
                        <Input
                            className="w-80 bg-gray-700 text-white border-gray-600"
                            placeholder="Search deals..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            size="sm"
                        />
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleSelectAll} variant="solid"  >
                                Select All
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleClearSelection}
                                disabled={!localSelected.length}
                            >
                                Clear Selection
                            </Button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <Spinner size="lg" />
                        </div>
                    ) : (
                        <Table compact className="bg-gray-900 text-white">
                            <THead>
                                <Tr>
                                    <Th>
                                    </Th>
                                    <Th>Agency</Th>
                                    <Th>Client</Th>
                                    <Th>Deal</Th>
                                    <Th>Start</Th>
                                    <Th>End</Th>
                                    <Th>Spots</Th>
                                    <Th>Rate</Th>
                                    <Th>Amount</Th>
                                    <Th>Weeks</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                {filteredDeals.map((deal) => (
                                    <Tr key={deal.id} >
                                        <Td className="border-b border-gray-600">
                                            <div className="flex items-center gap-3">

                                                <Checkbox
                                                    checked={isSelected(deal.id)}
                                                    onChange={() => handleToggleDeal(deal)}
                                                    className="form-checkbox bg-slate-700 border-slate-500"
                                                />
                                            </div>
                                        </Td>
                                        <Td className="max-w-[150px] truncate border-b border-gray-600">{deal.AgencyName}</Td>
                                        <Td className="max-w-[150px] truncate border-b border-gray-600">{deal.ClientName}</Td>
                                        <Td className="border-b border-gray-600">
                                            <div className="flex items-center gap-2 ">
                                                <span>{deal.DealCode}</span>
                                                <Tooltip title="Show Deal Details">
                                                    <Button
                                                        size="xs"
                                                        shape="circle"
                                                        variant="solid"
                                                        icon={<BsInfoLg className="text-sm text-white" />}
                                                        className="h-5 w-5 bg-slate-500 hover:bg-slate-400"
                                                        onClick={() => setDialogDeal(deal)}
                                                    />
                                                </Tooltip>
                                            </div>
                                        </Td>
                                        <Td className="border-b border-gray-600">{deal.StartTime}</Td>
                                        <Td className="border-b border-gray-600">{deal.EndTime}</Td>
                                        <Td className="border-b border-gray-600">{deal.TotalSpots}</Td>
                                        <Td className="border-b border-gray-600">{deal.Rate}</Td>
                                        <Td className="border-b border-gray-600">{deal.Amount}</Td>
                                        <Td className="border-b border-gray-600">{deal.NoWeeks}</Td>
                                    </Tr>
                                ))}
                            </TBody>
                        </Table>
                    )}
                </Card>
            </div>
            <StickyFooter
                className="-mx-8 px-8 flex items-center justify-end py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
                <div className="md:flex items-center">
                    <Button
                        size="sm"
                        onClick={() => { setLocalSelected([]); setSelectedDeal(localSelected); setisDialogbox(false); }}
                        className="bg-red-600 hover:bg-red-500 mr-2">
                        Discard
                    </Button>
                    <Button
                        variant="solid"
                        size="sm"
                        type="submit"
                        onClick={handleClose}
                    >
                        Done
                    </Button>
                </div>
            </StickyFooter>
            {dialogDeal && (
                <DealDetailsDialog
                    isDialogOpen={!!dialogDeal}
                    setIsDialogOpen={() => setDialogDeal(null)}
                    dealNumber={dialogDeal.DealNumber}
                    dealCode={dialogDeal.DealCode}
                />
            )}
        </Dialog>
    );
};

export default DealListShowDialogBox;
