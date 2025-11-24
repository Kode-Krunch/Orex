import React from 'react';

function CustomField({
  label,
  field,
  required = true,
  containerClassNames,
  errorMsg,
}) {
  return (
    <div className={containerClassNames}>
      <p className="mb-1 text-gray-200">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      {field}
      {errorMsg && <p className="text-red-500 mt-1">{errorMsg}</p>}
    </div>
  );
}

export default CustomField;
