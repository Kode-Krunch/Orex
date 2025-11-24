import React from 'react'
import BasicDetailsForm from './Forms/BasicDetailsForm'
import ContactDetailsForm from './Forms/ContactDetailsForm'
import CreditDetailsForm from './Forms/CreditDetailsForm'

function AgencyDetails({ creditRateLimitOptions, businessTypeOptions }) {
    return (
        <div className='grid grid-cols-2 h-full'>
            <div className='border-r border-r-gray-700 pr-3'>
                <BasicDetailsForm creditRateLimitOptions={creditRateLimitOptions} businessTypeOptions={businessTypeOptions} />
            </div>
            <div className='px-3'>
                <ContactDetailsForm />
                <div className='mt-12'>
                    <CreditDetailsForm />
                </div>
            </div>
        </div>
    )
}

export default AgencyDetails