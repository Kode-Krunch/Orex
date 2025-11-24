import { Button, Dialog } from 'components/ui';
import React, { useMemo } from 'react';

const AchievementDialog = ({
    salesExecutiveData = [],
    isAchievementDialogOpen,
    getSalesExecutiveId,
    setIsAchievementDialogOpen,
    setGetSalesExecutiveId
}) => {
    const selectedExecutive = useMemo(() => salesExecutiveData[getSalesExecutiveId] || {}, [salesExecutiveData, getSalesExecutiveId]);
    const closeDialog = () => {
        setIsAchievementDialogOpen(false);
        setGetSalesExecutiveId('');
    };
    return (
        <Dialog isOpen={isAchievementDialogOpen} onClose={closeDialog} onRequestClose={closeDialog}>
            <h5 className="mb-4">Achievement</h5>

            {selectedExecutive.TargetAmount !== undefined ? (
                <>
                    <div className="border-b border-dashed pb-3 flex justify-between mt-2">
                        <p>Target Amount</p>
                        <p>{selectedExecutive.TargetAmount.toLocaleString('en-IN')}</p>
                    </div>

                    <div className="border-b border-dashed pb-3 flex justify-between mt-2">
                        <p>Target Achieved</p>
                        <p>{selectedExecutive.TargetAcieved.toLocaleString('en-IN')}</p>
                    </div>

                    <div className="border-b border-dashed pb-3 flex justify-between mt-2">
                        <p>Target Achieved Percent</p>
                        <p>{selectedExecutive.TargetAcievedPercent}%</p>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500">No data available</p>
            )}

            <div className="text-right mt-6">
                <Button variant="solid" onClick={closeDialog}>Okay</Button>
            </div>
        </Dialog>
    );
};

export default AchievementDialog;
