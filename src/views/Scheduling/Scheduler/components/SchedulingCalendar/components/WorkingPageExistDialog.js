import { Button, Dialog } from 'components/ui'
import { format } from 'date-fns';
import React from 'react'
import { useSelector } from 'react-redux';

const WorkingPageExistDialog = ({ isPageOpen, setIsPageOpen, messageShowToUser, setMessageShowToUser, handleUnsavedEvent, clickedDateEvent }) => {
    /* REDUX */
    const channel = useSelector((state) => state.locale.selectedChannel);

    /* EVENT HANDLERS */
    const handleClose = () => {
        try {
            setMessageShowToUser('');
            setIsPageOpen(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit = () => {
        try {
            handleUnsavedEvent(clickedDateEvent)
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            {clickedDateEvent && isPageOpen && (
                <Dialog
                    isOpen={isPageOpen}
                    onClose={handleClose}
                    onRequestClose={handleClose}
                    width={600}
                >
                    <h5 className="mb-4">Working On Same Page</h5>
                    <div className="mt-4 flex flex-col">
                        <div className="py-3 border-b border-dashed border-b-gray-700 flex justify-between">
                            <p className="text-[0.95rem]">Channel</p>
                            <p className="text-white text-base">
                                {channel.LocationName} {channel.ChannelName}
                            </p>
                        </div>
                        <div className="py-3 border-b border-dashed border-b-gray-700 flex justify-between">
                            <p className="text-[0.95rem]">Schedule date</p>
                            <p className="text-white text-base">
                                {format(clickedDateEvent.start, 'dd-MMM-yyyy')}
                            </p>
                        </div>
                        <div className="py-3 border-b border-dashed border-b-gray-700 flex justify-between">
                            <p className="text-base">Message</p>
                            <p className="text-white text-[1rem]">
                                {messageShowToUser}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-white text-[0.95rem]">Do you want to load the screen again?</p>
                        <div>
                            <Button
                                className="mr-2"
                                onClick={handleClose}
                            >
                                No
                            </Button>
                            <Button variant="solid" onClick={handleSubmit}>
                                Yes
                            </Button>
                        </div>
                    </div>
                </Dialog>)}
        </div>
    )
}

export default WorkingPageExistDialog