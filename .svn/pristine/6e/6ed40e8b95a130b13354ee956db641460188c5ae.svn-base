import React, { useState, useRef, useEffect } from 'react'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import { Dialog, Button } from 'components/ui'
import { apiGetSearchResult } from 'services/CommonService'
import debounce from 'lodash/debounce'
import { HiOutlineSearch, } from 'react-icons/hi'
import { apiGetdealsearchdrop } from 'services/BookingService'
import DisplayTablewithFilter from 'views/Controls/DisplayTablewithFilter'



const recommendedSearch = ""

export const Search = () => {
    const [searchDialogOpen, setSearchDialogOpen] = useState(false)
    const [searchResult, setSearchResult] = useState(recommendedSearch)
    const [noResult, setNoResult] = useState(false)
    const [dealdata, setDealdata] = useState([])
    const [dealdataCopy, setDealdataCopy] = useState([])
    const inputRef = useRef()



    useEffect(() => {
        ; (async (values) => {
            const resp = await apiGetdealsearchdrop("")
            setDealdata(resp.data)
            setDealdataCopy(resp.data)
        })()
    }, [])

    const handleReset = () => {
        setNoResult(false)
        setSearchResult(recommendedSearch)
    }

    const handleSearchOpen = () => {
        setSearchDialogOpen(true)
    }

    const handleSearchClose = () => {
        setSearchDialogOpen(false)
        if (noResult) {
            setTimeout(() => {
                handleReset()
            }, 300)
        }
    }

    const debounceFn = debounce(handleDebounceFn, 200)

    async function handleDebounceFn(query) {
        if (!query) {
            setSearchResult(recommendedSearch)
            return
        }

        if (noResult) {
            setNoResult(false)
        }
        const respond = await apiGetSearchResult({ query })
        if (respond.data) {
            if (respond.data.length === 0) {
                setNoResult(true)
            }
            setSearchResult(respond.data)
        }
    }

    const handleSearch = (e) => {
        //debounceFn(e.target.value)
        ; (async (values) => {
            const resp = await apiGetdealsearchdrop(e.target.value)
            setDealdata(resp.data)
            setDealdataCopy(resp.data)
        })()
    }

    useEffect(() => {
        if (searchDialogOpen) {
            let timeout = setTimeout(() => inputRef.current?.focus(), 100)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [searchDialogOpen])

    const handleNavigate = () => {
        handleSearchClose()
    }



    return (
        <>
            <div
                className={'text-2xl'}
                onClick={handleSearchOpen}
            >
                <HiOutlineSearch />
            </div>
            <Dialog
                contentClassName="p-0"
                isOpen={searchDialogOpen}
                closable={false}
                onRequestClose={handleSearchClose}
            >
                <div>
                    <div className="px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center">
                            <HiOutlineSearch className="text-xl" />
                            <input
                                ref={inputRef}
                                className="ring-0 outline-none block w-full p-4 text-base bg-transparent text-gray-900 dark:text-gray-100"
                                placeholder="Search..."
                                onChange={handleSearch}
                            />
                        </div>
                        <Button size="xs" onClick={handleSearchClose}>
                            Esc
                        </Button>
                    </div>

                    {dealdataCopy && <div className="py-6 px-5 max-h-[550px] overflow-y-auto">
                        <DisplayTablewithFilter
                            data={dealdata}
                            setData={setDealdata}
                            dataCopy={dealdataCopy}
                            setDataCopy={setDealdataCopy}
                            visiablecolumns={VisableColumns}
                        ></DisplayTablewithFilter>

                    </div>}
                </div>
            </Dialog>
        </>
    )
}

export default withHeaderItem(Search)

export const VisableColumns = [
    {
        header: "DealCode",
        name: "DealCode",
        code: "DealCode",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 0,
        isvisible: true
    },
    {
        header: "ClientName",
        name: "ClientName",
        code: "ClientName",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 1,
        isvisible: true
    },
    {
        header: "AgencyName",
        name: "AgencyName",
        code: "AgencyName",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 2,
        isvisible: true
    }
]; 