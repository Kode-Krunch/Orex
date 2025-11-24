import React from 'react';

function Input({ label, required, InputComponent }) {
  return (
    <div className="flex flex-col gap-1">
      <p for="client" className="text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      {InputComponent}
    </div>
  );
}

export default Input;
