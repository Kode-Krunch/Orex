import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Notification, toast as toa } from 'components/ui'
import { Toast } from 'primereact/toast'
import { ConfirmDialog } from 'primereact/confirmdialog'
import HeaderExtra from 'views/Controls/HeaderExtra'
import DisplaytablewithEdit, { headerExtra } from 'views/Controls/DisplaytablewithEdit'
import {
  apiGetCategoryMaster,
  AddCategory,
  PutUpdateCategory,
} from 'services/EventServices'

const CategoryNameMaster = () => {
  const token = useSelector((state) => state.auth.session.token)
  const count = useRef(0)
  const toast = useRef(null)

  const [CategoryList, setCategoryList] = useState([])
  const [CategoryName, setCategoryName] = useState('')
  const [addnew, setaddnew] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const [visible, setVisible] = useState(false)
  const [yup, setyup] = useState(null)

  /** ✅ Toast Helper */
  function closeAfter2000ms(message, type) {
    toa.push(
      <Notification
        closable
        type={type}
        duration={1000}
        title={type.charAt(0).toUpperCase() + type.slice(1)}
      >
        {message}
      </Notification>
    )
  }

  /** ✅ Fetch Data Function */
  const refreshCategoryList = async () => {
    try {
      const resp = await apiGetCategoryMaster()
      const reversed = [...resp.data].reverse().map((category, index) => ({
        ...category,
        serialNumber: index + 1,
      }))
      setCategoryList(reversed)
    } catch (err) {
      console.error(err)
    }
  }

  /** ✅ Initial Fetch */
  useEffect(() => {
    count.current += 1
    if (count.current === 1) {
      refreshCategoryList()
    }
  }, [])

  /** ✅ Row Edit Handler */
  const onRowEditComplete = async (e) => {
    const { newData } = e
    if (!newData.CategoryName) {
      closeAfter2000ms('Category Name cannot be empty.', 'danger')
      return
    }

    try {
      const response = await PutUpdateCategory(newData, token)
      if (response.status === 204) {
        closeAfter2000ms('Data Already Exists.', 'warning')
        return
      }
      closeAfter2000ms('Data Updated Successfully', 'success')
      await refreshCategoryList()
    } catch (error) {
      console.error(error)
      closeAfter2000ms('Something went wrong while updating.', 'danger')
    }
  }

  /** ✅ Add New Record */
  const addNewRecord = async () => {
    if (!CategoryName || CategoryName.trim() === '') {
      closeAfter2000ms('Kindly Enter Category Name', 'danger')
      return
    }

    const newRecord = {
      CategoryName: CategoryName.trim(),
      IsActive: 1,
    }

    try {
      const response = await AddCategory(newRecord, token)
      if (response.status === 204) {
        closeAfter2000ms('Data Already Exists.', 'warning')
      } else if (response.status === 200) {
        closeAfter2000ms('Data Added Successfully', 'success')
        await refreshCategoryList() // ✅ fetch updated list
      }
    } catch (error) {
      console.error(error)
      closeAfter2000ms('Something went wrong while adding.', 'danger')
    } finally {
      setCategoryName('')
      setaddnew(false)
    }
  }

  /** ✅ Toggle Active/Inactive */
  const toggleSwitch = async (index) => {
    const row = CategoryList[index]
    const updatedRow = { ...row, IsActive: row.IsActive === 1 ? 0 : 1 }

    try {
      const response = await PutUpdateCategory(updatedRow, token)
      if (response.status === 204) {
        closeAfter2000ms('Data Already Exists.', 'warning')
        return
      }
      closeAfter2000ms('Data Updated Successfully', 'success')
      await refreshCategoryList() // ✅ re-fetch after toggle
    } catch (error) {
      console.error(error)
      closeAfter2000ms('Something went wrong while updating.', 'danger')
    }
  }

  const accept = () => toggleSwitch(yup)

  /** ✅ Table Columns */
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'CategoryName', header: 'Category Name', width: '20%' },
  ]

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
      />

      <Card
        header={
          <div className="flex justify-between">
            <HeaderExtra
              ModuleText="Programming"
              Component="CategoryName Master"
            />
          </div>
        }
        headerExtra={headerExtra(
          globalFilter,
          setGlobalFilter,
          setaddnew,
          addnew,
          addNewRecord,
          CategoryName,
          setCategoryName,
          'Category',
          CategoryList,
          columns
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={CategoryList}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="CategoryNameCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  )
}

export default CategoryNameMaster
