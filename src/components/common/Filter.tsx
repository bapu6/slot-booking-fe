/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Field, Form, Formik } from 'formik';
import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce'

interface FilterValues {
    name: string;
}

const Filter: React.FC<{ onFilter: (values: FilterValues) => void }> = ({ onFilter }) => {

    const initialValues: FilterValues = {
        name: '',
    };

    const [previousValues, setPreviousValues] = useState<FilterValues>(initialValues);
    //Handles change for the field changes
    const handleChange = useCallback(
        debounce((field: keyof FilterValues, value: string, values: FilterValues) => {
            if (previousValues[field] !== value) {
                const newValues = { ...values, [field]: value };
                setPreviousValues(newValues);
                onFilter(newValues);
            }
        }, 300), [previousValues, onFilter]
    );

    //clears the filter values
    const handleClear = (resetForm: () => void) => {
        resetForm();
        setPreviousValues(initialValues);
        onFilter(initialValues);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={() => { }}
            validateOnChange={true}
        >
            {({ values, handleChange: formikHandleChange, resetForm }) => (
                <Form>
                    <div className=" search text-black mb-4 gap-2 flex flex-col sm:flex-row justify-center items-center py-4 rounded-4xl">
                        <Field
                            type="text"
                            placeholder="Search Patients...."
                            name="name"
                            className="sm:w-1/3 p-2 border-gray-600 border-2  rounded"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                formikHandleChange(e);
                                handleChange('name', e.target.value, values);
                            }}
                        />

                        <button
                            type="button"
                            className="border-red-500 border text-gray-600 hover:bg-red-200  px-4 py-2 rounded"
                            onClick={() => handleClear(resetForm)}
                        >
                            Clear
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default React.memo(Filter);