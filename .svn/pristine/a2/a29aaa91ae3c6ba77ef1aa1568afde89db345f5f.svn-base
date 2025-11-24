import { Checkbox, Input, Switcher, TimeInput } from 'components/ui';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import SelectXs from 'views/Controls/SelectXs/SelectXs';
import SimpleTable from 'views/Controls/SimpleTable/SimpleTable';
import SectionLabel from './FormFields/SectionLabel';
import TotalField from './FormFields/TotalField';
import NumberInputWithLabel from './FormFields/NumberInputWithLabel';
import { bulkEditDialogFieldsEnum } from '../../../enum';
import { handleFieldChange } from '../utils';
import { memo } from 'react';

function ContractDetails({
  countryOptions,
  amortisationTypeOptions,
  formState,
  setFormState,
  tableData,
  columns,
  className,
  eventType,
  selectedCurrency,
}) {
  return (
    <div
      className={`bg-gray-900 bg-opacity-40 p-3 rounded-md overflow-auto h-full ${className}`}
    >
      <div className="grid grid-cols-12 gap-x-4">
        <SectionLabel className="col-span-12" label="CONTRACT DETAILS" />
        {/* CONTRACT DATE, AMORTISATION TYPE, COUNTRIES */}
        <div className="mb-7 col-span-4">
          <p className="text-gray-200 mb-1">
            Contract Date <span className="text-red-500">*</span>
          </p>
          <DatePickerRange
            placeholder="Date range"
            size="sm"
            value={formState[bulkEditDialogFieldsEnum.DATE_RANGE]}
            inputFormat="DD-MMM-YYYY"
            onChange={(dateRange) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.DATE_RANGE,
                value: dateRange,
                setFormState,
              })
            }
          />
        </div>
        <div className="mb-7 col-span-4">
          <p className="text-gray-200 mb-1">
            Amortisation Type <span className="text-red-500">*</span>
          </p>
          <SelectXs
            options={amortisationTypeOptions}
            value={formState[bulkEditDialogFieldsEnum.AMORTISATION_TYPE]}
            onChange={(value) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.AMORTISATION_TYPE,
                value,
                setFormState,
              })
            }
          />
        </div>
        <div className="mb-7 col-span-4">
          <p className="text-gray-200 mb-1">
            Geological Rights <span className="text-red-500">*</span>
          </p>
          <SelectXs
            isMulti={true}
            options={countryOptions}
            value={formState[bulkEditDialogFieldsEnum.COUNTRIES]}
            onChange={(value) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.COUNTRIES,
                value,
                setFormState,
              })
            }
          />
        </div>
        {/* COST PER PLAY, START TIME, END TIME, DAILY PERMISSIBLE DUR, DAYS */}
        <div className="mb-7 col-span-2">
          <p className="text-gray-200 mb-1">
            Cost Per Play <span className="text-red-500">*</span>
          </p>
          <Input
            placeholder="Cost"
            size="sm"
            type="number"
            prefix={selectedCurrency.CurrencySymbol}
            value={formState[bulkEditDialogFieldsEnum.COST_PER_PLAY]}
            onChange={(event) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.COST_PER_PLAY,
                value: Number(event.target.value),
                setFormState,
              })
            }
          />
        </div>
        <div className="mb-7 col-span-2">
          <p className="text-gray-200 mb-1">Start Time</p>
          <TimeInput
            size="sm"
            value={formState[bulkEditDialogFieldsEnum.BROADCAST_START_TIME]}
            onChange={(date) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.BROADCAST_START_TIME,
                value: date,
                setFormState,
              })
            }
          />
        </div>
        <div className="mb-7 col-span-2">
          <p className="text-gray-200 mb-1">End Time</p>
          <TimeInput
            size="sm"
            value={formState[bulkEditDialogFieldsEnum.BROADCAST_END_TIME]}
            onChange={(date) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.BROADCAST_END_TIME,
                value: date,
                setFormState,
              })
            }
          />
        </div>
        <div className="mb-7 col-span-3">
          <NumberInputWithLabel
            label="Daily Permissible Dur"
            placeholder="Duration"
            suffix="(Min)"
            value={formState[bulkEditDialogFieldsEnum.PERMISSIBLE_DURATION]}
            onChange={(event) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.PERMISSIBLE_DURATION,
                value:
                  event.target.value.length > 0
                    ? Number(event.target.value)
                    : null,
                setFormState,
                eventType,
              })
            }
          />
        </div>
        <div className="mb-7 col-span-3">
          <Checkbox.Group
            className="w-full flex items-center justify-between"
            value={formState[bulkEditDialogFieldsEnum.DAYS]}
            onChange={(value) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.DAYS,
                value,
                setFormState,
              })
            }
          >
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-200 mb-1">S</p>
              <Checkbox value={0} className="m-0" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-200 mb-1">M</p>
              <Checkbox value={1} className="m-0" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-200 mb-1">T</p>
              <Checkbox value={2} className="m-0" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-200 mb-1">W</p>
              <Checkbox value={3} className="m-0" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-200 mb-1">T</p>
              <Checkbox value={4} className="m-0" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-200 mb-1">F</p>
              <Checkbox value={5} className="m-0" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-200 mb-1">S</p>
              <Checkbox value={6} className="m-0" />
            </div>
          </Checkbox.Group>
        </div>
        {/* UNLIMITED RUNS, TOTAL COST, REMARKS */}
        <div className="mb-7 col-span-2">
          <p className="text-red-500 mb-1">Unlimited Runs</p>
          <Checkbox
            checked={formState[bulkEditDialogFieldsEnum.IS_UNLIMITED_RUNS]}
            onChange={(value) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.IS_UNLIMITED_RUNS,
                value,
                setFormState,
                eventType,
              })
            }
          />
        </div>
        <div className="mb-7 col-span-3">
          <TotalField
            label="Total Cost"
            value={formState[bulkEditDialogFieldsEnum.TOTAL_COST]}
          />
        </div>
        <div className="mb-7 col-span-1">
          <p className="text-gray-200 mb-1">Active</p>
          <Switcher
            checked={formState[bulkEditDialogFieldsEnum.IS_ACTIVE]}
            onChange={(value) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.IS_ACTIVE,
                value: !value,
                setFormState,
              })
            }
          />
        </div>
        <div className="mb-7 col-span-6">
          <p className="text-gray-200 mb-1">Remarks</p>
          <Input
            size="sm"
            placeholder="Remarks"
            value={formState[bulkEditDialogFieldsEnum.REMARKS]}
            onChange={(event) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.REMARKS,
                value: event.target.value,
                setFormState,
              })
            }
          />
        </div>
        {/* SELECTED CONTENTS */}
        <p className="font-semibold text-[15px] border-b border-b-gray-700 pb-1 col-span-12 text-teal-500 mb-2">
          SELECTED CONTENTS
        </p>
        <div className="col-span-12 h-52">
          <SimpleTable data={tableData} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default memo(ContractDetails);
