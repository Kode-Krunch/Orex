import SectionLabel from '../FormFields/SectionLabel';
import NextRunWithin from '../FormFields/NextRunWithin';
import NumberInputWithLabel from '../FormFields/NumberInputWithLabel';
import TotalField from '../FormFields/TotalField';
import { Input } from 'components/ui';
import SelectXs from 'views/Controls/SelectXs/SelectXs';
import { bulkEditDialogFieldsEnum } from '../../../../enum';
import { memo } from 'react';
import { handleFieldChange, isFieldDisabled } from '../../utils';

function ShowsBroadcastRunDetails({
  formState,
  setFormState,
  className,
  seasonOptions,
  episodeOptions,
  eventType,
}) {
  /* CONSTANTS */
  const IS_UNL_RUNS = formState[bulkEditDialogFieldsEnum.IS_UNLIMITED_RUNS];

  return (
    <div
      className={`bg-gray-900 bg-opacity-40 p-3 rounded-md overflow-auto h-full ${className}`}
    >
      <div className="grid grid-cols-2 gap-x-4">
        <SectionLabel className="col-span-2" label="CONTENT DETAILS" />
        {/* SEASONS AND EPISODES */}
        <div className="mb-7 col-span-2 grid grid-cols-4 gap-x-4">
          <div>
            <p className="text-gray-200 mb-1">
              Seasons {!IS_UNL_RUNS && <span className="text-red-500">*</span>}
            </p>
            <SelectXs
              options={seasonOptions}
              value={formState[bulkEditDialogFieldsEnum.SEASONS]}
              onChange={(value) =>
                handleFieldChange({
                  field: bulkEditDialogFieldsEnum.SEASONS,
                  value,
                  setFormState,
                })
              }
              isDisabled={isFieldDisabled(
                bulkEditDialogFieldsEnum.SEASONS,
                formState,
              )}
            />
          </div>
          <div>
            <p className="text-gray-200 mb-1">
              Start Episode{' '}
              {!IS_UNL_RUNS && <span className="text-red-500">*</span>}
            </p>
            <SelectXs
              options={episodeOptions}
              value={formState[bulkEditDialogFieldsEnum.START_EPISODE]}
              onChange={(value) =>
                handleFieldChange({
                  field: bulkEditDialogFieldsEnum.START_EPISODE,
                  value,
                  formState,
                  setFormState,
                })
              }
              isDisabled={isFieldDisabled(
                bulkEditDialogFieldsEnum.START_EPISODE,
                formState,
              )}
            />
          </div>
          <div>
            <p className="text-gray-200 mb-1">
              End Episode{' '}
              {!IS_UNL_RUNS && <span className="text-red-500">*</span>}
            </p>
            <SelectXs
              options={episodeOptions}
              value={formState[bulkEditDialogFieldsEnum.END_EPISODE]}
              onChange={(value) =>
                handleFieldChange({
                  field: bulkEditDialogFieldsEnum.END_EPISODE,
                  value,
                  formState,
                  setFormState,
                })
              }
              isDisabled={isFieldDisabled(
                bulkEditDialogFieldsEnum.END_EPISODE,
                formState,
              )}
            />
          </div>
          <div>
            <p className="text-gray-200 mb-1">Total Episodes</p>
            <Input
              size="sm"
              placeholder="Episodes"
              value={formState[bulkEditDialogFieldsEnum.TOTAL_EPISODES]}
              disabled={true}
            />
          </div>
        </div>
        <SectionLabel className="col-span-2" label="ORIGINAL PLAY RUN" />
        {/* TOTAL ORIGINAL RUN */}
        <div className="mb-7 col-span-2 flex items-center gap-x-4">
          <NumberInputWithLabel
            label="Original Play Run"
            placeholder="Play run"
            value={formState[bulkEditDialogFieldsEnum.ORIGINAL_PLAY_RUN]}
            disabled={true}
          />
          <div className="h-full flex items-end pb-2">X</div>
          <NumberInputWithLabel
            label="Total Episodes"
            value={formState[bulkEditDialogFieldsEnum.TOTAL_EPISODES]}
            disabled={true}
          />
          <div className="h-full flex items-end pb-2 text-base">=</div>
          <TotalField
            label="Total Original Run"
            value={formState[bulkEditDialogFieldsEnum.TOTAL_ORIGINAL_RUN]}
            className="w-[40%]"
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
          className="mb-7"
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
        {/* REPEAT RUN PLAY */}
        <SectionLabel className="col-span-2" label="REPEAT PLAY RUN" />
        {/* TOTAL REPEAT RUN */}
        <div className="mb-7 col-span-2 flex items-center gap-x-4">
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
          <div className="h-full flex items-end pb-2">X</div>
          <NumberInputWithLabel
            label="Total Episodes"
            value={formState[bulkEditDialogFieldsEnum.TOTAL_EPISODES]}
            disabled={true}
          />
          <div className="h-full flex items-end pb-2 text-base">=</div>
          <TotalField
            label="Total Repeat Run"
            value={formState[bulkEditDialogFieldsEnum.TOTAL_REPEAT_RUN]}
            className="w-[40%]"
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
          label="Next Repeat Run Within"
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

export default memo(ShowsBroadcastRunDetails);
