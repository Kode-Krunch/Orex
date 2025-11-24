import { Select, FormItemcompact } from 'components/ui'
import React, { useState, useRef, useEffect } from 'react'
import { apiGetclientmasterdropmaster } from 'services/CreditcontrolService'
const ClientDropDown = ({ errors, touched, ClientCode, setClientCode }) => {
    const count = useRef(0)
    const [Client, setClient] = useState(null)

    useEffect(() => {
        count.current = count.current + 1
        if (count.current == 1) {
            ;(async (values) => {
                const Client = await apiGetclientmasterdropmaster(values)
                const formattedOptions = Client.data.map((option) => ({
                    value: option.ClientCode,
                    label: option.ClientName,
                }))
                setClient(formattedOptions)
            })()
        }
    }, [])

    return (
        <>
            <div className="col-span-1">
                <FormItemcompact
                    asterisk
                    label="Client Name"
                    invalid={errors.ClientCode && touched.ClientCode}
                    errorMessage={errors.ClientCode}
                    style={{
                        width: '250px',
                    }}
                >
                    {Client !== null ? (
                        <Select
                            placeholder="Please Select"
                            options={Client}
                            onChange={(e) => {
                                setClientCode(e.value)
                            }}
                            defaultValue={
                                Client[
                                    Client.findIndex(
                                        (Client) => Client.value === ClientCode
                                    )
                                ]
                            }
                        />
                    ) : (
                        ''
                    )}
                </FormItemcompact>
            </div>
        </>
    )
}

export default ClientDropDown
