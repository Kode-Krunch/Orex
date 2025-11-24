import React from 'react';

function LabelValuePair({ label, value }) {
  return (
    <div>
      <p>{label}</p>
      <p className="text-white">{value}</p>
    </div>
  );
}

export default LabelValuePair;
