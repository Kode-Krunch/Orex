import { Button, InputGroup, Select, Tooltip } from 'components/ui';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { handleFeatureClose } from '../../utils/utils';
import {
  cellWarningTypesEnum,
  featuresEnum,
  ruleCheckTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import {
  getCommercialRuleCheckTableColumns,
  getRuleCheckTableData,
} from './utils';
import {
  BACK_TO_BACK_COMMERCIALS_FILTER_OPTIONS,
  NON_COMM_RULE_CHECK_TABLE_COLUMNS,
} from 'views/Scheduling/Scheduler/constants';
import NoRuleCheckToShow from './NoRuleCheckToShow';
import AutoScrollTable from '../AutoScrollTable/AutoScrollTable';
import SelectXs from 'views/Controls/SelectXs/SelectXs';

function RuleCheck() {
  /* CONTEXT */
  const {
    schedulingTableData,
    activeFeatures,
    setActiveFeatures,
    secondaryAreaZindexRef,
  } = useContext(SchedulerContext);

  /* STATES */
  const [ruleCheckTableData, setRuleCheckTableData] = useState([]);
  const [filteredRuleCheckTableData, setFilteredRuleCheckTableData] = useState(
    [],
  );
  const [filterBy, setFilterBy] = useState({ value: 'all', label: 'All' });

  /* USE EFFECTS */
  useEffect(() => {
    try {
      setRuleCheckTableData(
        getRuleCheckTableData(
          schedulingTableData,
          activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType,
        ),
      );
    } catch (error) {
      openNotification(
        'danger',
        `Something went wrong while fetching ${
          activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
          ruleCheckTypesEnum.BACK_TO_BACK_PROMOS
            ? 'back to back promos'
            : activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
              ruleCheckTypesEnum.BACK_TO_BACK_SONGS
            ? 'back to back songs'
            : activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
              ruleCheckTypesEnum.BACK_TO_BACK_COMMERCIALS
            ? 'back to back commercials'
            : activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
              ruleCheckTypesEnum.MULTI_SPOTS
            ? 'multi spots'
            : activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
              ruleCheckTypesEnum.OUT_OF_TIMEBAND
            ? 'out of RODP/TimeBand'
            : 'rule check'
        }`,
      );
    }
  }, [
    schedulingTableData,
    activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType,
  ]);

  useEffect(() => {
    try {
      if (
        activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
        ruleCheckTypesEnum.BACK_TO_BACK_COMMERCIALS
      ) {
        if (filterBy.value === 'all') {
          setFilteredRuleCheckTableData(ruleCheckTableData);
        } else {
          setFilteredRuleCheckTableData(
            ruleCheckTableData.filter(
              (row) =>
                row.cellWarning.filter(
                  (cellWarning) =>
                    cellWarning.cell === filterBy.value &&
                    cellWarning.warningType ===
                      cellWarningTypesEnum.BACK_TO_BACK,
                ).length > 0,
            ),
          );
        }
      } else {
        setFilteredRuleCheckTableData(ruleCheckTableData);
      }
    } catch (error) {
      console.error(error);
    }
  }, [filterBy, ruleCheckTableData]);

  return (
    <div
      className="h-full w-full flex flex-col bg-gray-800 p-3 pt-2 rounded-lg absolute top-0 left-0"
      style={{
        zIndex: secondaryAreaZindexRef.current[featuresEnum.RULE_CHECK],
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <h5>
            {activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
              ruleCheckTypesEnum.BACK_TO_BACK_PROMOS && 'Back to Back Promos'}
            {activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
              ruleCheckTypesEnum.BACK_TO_BACK_SONGS && 'Back to Back Songs'}
            {activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
              ruleCheckTypesEnum.BACK_TO_BACK_COMMERCIALS &&
              'Back to Back Commercials'}
            {activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
              ruleCheckTypesEnum.MULTI_SPOTS && 'Multi Spots'}
            {activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
              ruleCheckTypesEnum.OUT_OF_TIMEBAND && 'Out of RODP/TimeBand'}
          </h5>
          {filteredRuleCheckTableData.length > 0 && (
            <h6 className="rounded-md px-1.5 py-0.5 bg-gray-600 flex items-center justify-center">
              {filteredRuleCheckTableData.length}
            </h6>
          )}
        </div>
        <Tooltip title="Close">
          <Button
            size="xs"
            icon={<IoMdClose />}
            onClick={() =>
              handleFeatureClose(setActiveFeatures, featuresEnum.RULE_CHECK)
            }
          />
        </Tooltip>
      </div>
      {activeFeatures[featuresEnum.RULE_CHECK].ruleCheckType ===
      ruleCheckTypesEnum.BACK_TO_BACK_COMMERCIALS ? (
        <div className="h-[92%] flex flex-col gap-3">
          <InputGroup className="flex">
            <div className="h-[34px] bg-gray-700 border-y border-l border-gray-600 rounded-tl rounded-bl flex items-center justify-center px-2 text-white">
              Filter By
            </div>
            <SelectXs
              placeholder="Filter By"
              options={BACK_TO_BACK_COMMERCIALS_FILTER_OPTIONS}
              size="sm"
              className="h-[38px] grow"
              styles={{
                valueContainer: (baseStyles) => ({
                  ...baseStyles,
                  paddingRight: 0,
                }),
              }}
              value={filterBy}
              onChange={(value) => setFilterBy(value)}
            />
          </InputGroup>
          {filteredRuleCheckTableData.length > 0 ? (
            <div className="grow overflow-y-scroll no-scrollbar">
              <AutoScrollTable
                tableData={filteredRuleCheckTableData}
                columns={getCommercialRuleCheckTableColumns(filterBy)}
              />
            </div>
          ) : (
            <NoRuleCheckToShow />
          )}
        </div>
      ) : (
        <>
          {ruleCheckTableData.length > 0 ? (
            <div className="grow overflow-y-scroll no-scrollbar">
              <AutoScrollTable
                tableData={filteredRuleCheckTableData}
                columns={NON_COMM_RULE_CHECK_TABLE_COLUMNS}
              />
            </div>
          ) : (
            <NoRuleCheckToShow />
          )}
        </>
      )}
    </div>
  );
}

export default RuleCheck;
