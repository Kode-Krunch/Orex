import SectionLabel from '../FormFields/SectionLabel';
import NextRunWithin from '../FormFields/NextRunWithin';
import NumberInputWithLabel from '../FormFields/NumberInputWithLabel';
import TotalField from '../FormFields/TotalField';
import { bulkEditDialogFieldsEnum } from '../../../../enum';
import { memo } from 'react';
import { handleFieldChange, isFieldDisabled } from '../../utils';

function SongsBroadcastRunDetails({
  formState,
  setFormState,
  className,
  eventType,
}) {
  return (
    <div
      className={`bg-gray-900 bg-opacity-40 p-3 rounded-md overflow-auto h-full ${className}`}
    >
      <div className="grid grid-cols-2 gap-x-4">
        <SectionLabel className="col-span-2" label="ORIGINAL PLAY RUN" />
        {/* TOTAL ORIGINAL RUN */}
        <div className="mb-7 col-span-2 grid grid-cols-2 gap-x-4">
          <NumberInputWithLabel
            label="Original Play Run"
            placeholder="Play run"
            value={formState[bulkEditDialogFieldsEnum.ORIGINAL_PLAY_RUN]}
            disabled={true}
          />
          <TotalField
            label="Total Original Run"
            value={formState[bulkEditDialogFieldsEnum.TOTAL_ORIGINAL_RUN]}
          />
        </div>
        {/* ORIGINAL RUN WITHIN 24 HR */}
        <NumberInputWithLabel
          className="mb-7"
          label="Original Run Within 24 Hr"
          placeholder="Run within 24 hr"
          value={formState[bulkEditDialogFieldsEnum.ORIGINAL_RUN_WITHIN_24HR]}
          onChange={(event) =>
            handleFieldChange({
              field: bulkEditDialogFieldsEnum.ORIGINAL_RUN_WITHIN_24HR,
              value: Number(event.target.value),
              setFormState,
            })
          }
          disabled={isFieldDisabled(
            bulkEditDialogFieldsEnum.ORIGINAL_RUN_WITHIN_24HR,
            formState,
          )}
        />
        {/* NEXT ORIGINAL RUN AFTER */}
        <NextRunWithin
          className="mb-9"
          label="Next Original Run After"
          inputPlaceholder="Run after"
          typeValue={formState[bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_TYPE]}
          typeOnChange={(value) =>
            handleFieldChange({
              field: bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_TYPE,
              value,
              setFormState,
            })
          }
          runWithinValue={
            formState[bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_WITHIN]
          }
          runWithinOnChange={(event) =>
            handleFieldChange({
              field: bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_WITHIN,
              value: Number(event.target.value),
              setFormState,
            })
          }
          disabled={isFieldDisabled(
            bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_WITHIN,
            formState,
          )}
        />
        <SectionLabel className="col-span-2" label="REPEAT PLAY RUN" />
        {/* TOTAL REPEAT RUN */}
        <div className="mb-7 col-span-2 grid grid-cols-2 gap-x-4">
          <NumberInputWithLabel
            label="Repeat Play Run"
            placeholder="Play run"
            value={formState[bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN]}
            onChange={(event) =>
              handleFieldChange({
                field: bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN,
                value: Number(event.target.value),
                formState,
                setFormState,
                eventType,
              })
            }
            disabled={isFieldDisabled(
              bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN,
              formState,
            )}
          />
          <TotalField
            label="Total Repeat Run"
            value={formState[bulkEditDialogFieldsEnum.TOTAL_REPEAT_RUN]}
          />
        </div>
        {/* REPEAT RUN WITHIN 24 HR */}
        <NumberInputWithLabel
          className="mb-7"
          label="Repeat Run Within 24 Hr"
          placeholder="Run within 24 hr"
          value={formState[bulkEditDialogFieldsEnum.REPEAT_RUN_WITHIN_24HR]}
          onChange={(event) =>
            handleFieldChange({
              field: bulkEditDialogFieldsEnum.REPEAT_RUN_WITHIN_24HR,
              value: Number(event.target.value),
              setFormState,
            })
          }
          disabled={isFieldDisabled(
            bulkEditDialogFieldsEnum.REPEAT_RUN_WITHIN_24HR,
            formState,
          )}
        />
        {/* NEXT REPEAT RUN WITHIN */}
        <NextRunWithin
          className="mb-7"
          label="Next Repeat Run WITHIN"
          inputPlaceholder="Run within"
          typeValue={formState[bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_TYPE]}
          typeOnChange={(value) =>
            handleFieldChange({
              field: bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_TYPE,
              value,
              setFormState,
            })
          }
          typeMenuPlacement="top"
          runWithinValue={
            formState[bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_WITHIN]
          }
          runWithinOnChange={(event) =>
            handleFieldChange({
              field: bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_WITHIN,
              value: Number(event.target.value),
              setFormState,
            })
          }
          disabled={isFieldDisabled(
            bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_WITHIN,
            formState,
          )}
        />
      </div>
    </div>
  );
}

export default memo(SongsBroadcastRunDetails);
