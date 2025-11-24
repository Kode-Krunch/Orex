import { Avatar, Card, Dialog } from 'components/ui'
import React from 'react'
import { FORMATDATE_FOR_EVERY } from 'views/Controls/GLOBALFUNACTION'

const ContractShowDialog = ({ Content, isContractPopup, closeDialogBoxContract, headerExtraContent }) => {
    return (
        <Dialog width={1200} isOpen={isContractPopup} onClose={closeDialogBoxContract}>
            {Content?.Details?.length !== 0 &&

                <div class="grid grid-cols-12 gap-4">
                    <Card header="Contract Deatils" className='col-span-4' style={{ background: 'rgb(41, 52, 69)' }} >
                        <div className="max-h-96 overflow-y-auto ">
                            {Content.Details?.map((item, key) => (
                                <Card key={key} bodyClass="flex items-center " className="mb-4" style={{ background: 'rgb(41, 52, 69)' }} >
                                    <Avatar className="mr-4" src={item?.ContentMaster?.Content_Image} />
                                    <div>
                                        <p class="text-white"> {item?.ContentMaster?.ContentName}</p>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='mr-2 text-slate-300'>{FORMATDATE_FOR_EVERY(item.ContractStartDate)}</p>
                                            To
                                            <p className='ml-2 text-slate-300'>{FORMATDATE_FOR_EVERY(item.ContractEndDate)}</p> </div>
                                    </div>
                                </Card>
                            ))}</div>
                    </Card>

                    <Card header="Contract Master"
                        headerExtra={headerExtraContent} className="col-span-8" style={{ background: 'rgb(41, 52, 69)' }} bodyClass="grid grid-cols-3 gap-x-4 gap-y-6">
                        <div>
                            <p>Contract No</p>
                            <h5 class="text-white">{Content?.Data?.ContractNo}</h5>
                        </div>
                        <div>
                            <p>Contract Name</p>
                            <h5 class="text-white">{Content?.Data?.ContractName}</h5>
                        </div>
                        <div>
                            <p>Agreement Date</p>
                            <h5 class="text-white">{Content?.Data?.AgreementDate}</h5>
                        </div>
                        <div>
                            <p>Authorised Person</p>
                            <h5 class="text-white">{Content?.Data?.AuthorisedPerson}</h5>
                        </div>
                        <div className="col-span-2">
                            <p>Supplier Name</p>
                            <h5 class="text-white">PlanetCast Media Services</h5>
                        </div>

                        <div className="col-span-3">
                            <p>Remarks</p>
                            <h5 class="text-white">{Content?.Data?.Remarks}</h5>
                        </div>


                    </Card>
                </div>
            }
        </Dialog >
    )
}

export default ContractShowDialog