import { useState, useEffect, useMemo, useCallback } from 'react'
import { Alert, Button, Card, Tooltip } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import { apiGetAgencyPaymentMaster } from 'services/CreditcontrolService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import HeaderExtra from 'views/Controls/HeaderExtra'
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable'
import InputwithVoice from 'components/ui/Input/InputwithVoice'
import { formatDate_secondary } from 'views/Controls/GLOBALFUNACTION'
import { useDispatch } from 'react-redux'
import { setContent } from 'store/base/commonSlice'
import { useNavigate } from 'react-router-dom'
import { FaPencil } from 'react-icons/fa6'

const TooblbarOption = { groupBy: false, manageColumns: false }

const formatAmount = (value) => {
  if (!value) return '0.00'
  return `${Number(value).toLocaleString('en-IN')}.00`
}

const headerExtraContent = (navigate, globalFilter, setGlobalFilter) => (
  <span className="flex items-center gap-2">
    <InputwithVoice
      value={globalFilter ?? ''}
      className="solid"
      placeholder="Search all columns..."
      size="sm"
      onChange={(e) => {
        if (/^[0-9a-zA-Z\s.]*$/.test(e.target.value)) {
          setGlobalFilter(e.target.value)
        }
      }}
    />
    <Button
      variant="solid"
      size="sm"
      icon={<HiPlusCircle />}
      onClick={() => navigate('/AgencyPaymentEdit')}
    >
      Add Agency Payment
    </Button>
  </span>
)

const AgencyPaymentMaster = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [globalFilter, setGlobalFilter] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useTimeOutMessage()
  const [log, setLog] = useState('')
  const [managedColumns, setManagedColumns] = useState([])

  const columns = useMemo(
    () => [
      {
        header: 'Agency',
        accessorKey: 'AgencyMaster.AgencyName',
      },
      {
        header: 'City',
        accessorKey: 'Place.PlaceName',
      },
      {
        header: 'Received Date',
        accessorKey: 'ChqueDate',
        cell: ({ row }) => {
          const date = row.original?.ChqueDate?.split('T')[0] || ''
          return (
            <span>{date ? formatDate_secondary(date) : 'N/A'}</span>
          )
        },
      },
      {
        header: 'Received Amount',
        accessorKey: 'RecdAmt',
        cell: ({ row }) => (
          <span>{formatAmount(row.original?.RecdAmt)}</span>
        ),
      },
      {
        header: 'Action',
        accessorKey: 'action',
        actions: [
          {
            action: (rowIndex, rowData) => (
              <div className="text-xs font-medium !w-max">
                <div className="flex gap-2 justify-center">
                  <Tooltip title="Edit Prormo">
                    <Button
                      size="xs"
                      icon={<FaPencil />}
                      onClick={() => {
                        dispatch(setContent(rowData));
                        navigate('/AgencyPaymentEdit')
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            ),
          },
        ],
      },
    ],
    []
  )

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const resp = await apiGetAgencyPaymentMaster()
      setData(resp.data || [])
    } catch (error) {
      setMessage('Failed to load Agency Payments')
      setLog('danger')
    } finally {
      setLoading(false)
    }
  }, [setMessage])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const openDrawer = (d) => {
    dispatch(setContent(d))
    navigate('/AgencyPaymentEdit', {
      state: { agencyDetails: d },
    })
  }

  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}

      <Card
        header={<HeaderExtra Component="Agency Payment Master" />}
        headerExtra={headerExtraContent(navigate, globalFilter, setGlobalFilter)}
        className="flex flex-col h-[87vh]"
        bodyClass="grow"
      >
        <ReportsTable
          tableData={data}
          originalColumns={columns}
          managedColumns={managedColumns}
          setManagedColumns={setManagedColumns}
          toolbarOptions={TooblbarOption}
          externalGlobalFilter={globalFilter}
          exportFileName="AgencyPayment"
          columnsToFormatInINR={[]}
          loading={loading}
          onRowClick={openDrawer}
        />
      </Card>
    </>
  )
}

export default AgencyPaymentMaster
