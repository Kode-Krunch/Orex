import React, { useState, useRef, forwardRef, useEffect } from 'react'
import { HiOutlineFilter } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
    Card,
} from 'components/ui'
import { Field, FieldArray, Form, Formik } from 'formik'



const FilterForm = forwardRef(({ onSubmitComplete, distinctData, ColumnsToFilter, setFilterData, filterSelections, setFilterSelections }, ref) => {


    const initialValues = ColumnsToFilter.reduce((acc, column) => {
        acc[column] = distinctData[column].map((item) => ({
            item,
            checkboxStatus: filterSelections[column]?.find(filter => filter.item === item)?.checkboxStatus || false
        }));
        return acc;
    }, {});

    const handleSubmit = (values) => {
        const selectedFilters = [];

        ColumnsToFilter.forEach((column) => {
            if (values[column]) {
                values[column].forEach(({ item, checkboxStatus }) => {
                    if (checkboxStatus) {
                        selectedFilters.push({
                            column,
                            item,
                            checkboxStatus
                        });
                    }
                });
            }
        });

        setFilterData(selectedFilters);
        // Save selections
        setFilterSelections(selectedFilters.reduce((acc, filter) => {
            if (!acc[filter.column]) acc[filter.column] = [];
            acc[filter.column].push(filter);
            return acc;
        }, {}));
        onSubmitComplete();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            innerRef={ref}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    {ColumnsToFilter.map((column, idx) => (
                        <div key={idx}>
                            {/* <h6 className="mb-1">{column}</h6> */}
                            <FieldArray name={column}>
                                {() => (
                                    <Card header={<h6>{column}</h6>}
                                        className="mb-4" >

                                        {distinctData[column].map((item, itemIdx) => (
                                            <div key={itemIdx} className="">
                                                <Checkbox
                                                    name={`${column}[${itemIdx}].checkboxStatus`}
                                                    checked={values[column][itemIdx].checkboxStatus}
                                                    onChange={(e) => {
                                                        setFieldValue(`${column}[${itemIdx}].checkboxStatus`, e);
                                                    }}
                                                >
                                                    {item}
                                                </Checkbox>
                                            </div>
                                        ))}

                                    </Card>
                                )}
                            </FieldArray>
                        </div>
                    ))}
                </Form>
            )}
        </Formik>
    );
});

const DrawerFooter = ({ onSaveClick, onCancel }) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Apply Filter
            </Button>
        </div>
    );
};

const SpotFilter = ({ data, ColumnsToFilter, setSpotFilterData }) => {
    const [distinctData, setDistinctData] = useState({});
    const formikRef = useRef();

    const [isOpen, setIsOpen] = useState(false);
    const [filterSelections, setFilterSelections] = useState({});

    const openDrawer = () => {
        setIsOpen(true);
    };

    const onDrawerClose = () => {
        setIsOpen(false);
    };

    const formSubmit = () => {
        formikRef.current?.submitForm();
    };

    const getDistinctData = (data, ColumnsToFilter) => {
        const distinctData = ColumnsToFilter.reduce((acc, column) => {
            acc[column] = Array.from(new Set(data.map(item => item[column])));
            return acc;
        }, {});

        return distinctData;
    };

    useEffect(() => {
        const distinctData = getDistinctData(data, ColumnsToFilter);
        setDistinctData(distinctData);
    }, [data, ColumnsToFilter]);

    return (
        <>
            <Button
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                icon={<HiOutlineFilter />}
                onClick={openDrawer}
            >
                Filter
            </Button>
            <Drawer
                title="Filter"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
            >
                <FilterForm
                    ref={formikRef}
                    onSubmitComplete={onDrawerClose}
                    distinctData={distinctData}
                    ColumnsToFilter={ColumnsToFilter}
                    setFilterData={(filters) => setSpotFilterData(filters)}
                    filterSelections={filterSelections}
                    setFilterSelections={setFilterSelections}
                />
            </Drawer>
        </>
    );
};


export default SpotFilter;
