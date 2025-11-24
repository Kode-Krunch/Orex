import { Checkbox } from 'components/ui';
import React, { useEffect, useRef } from 'react';

function IndeterminateCheckbox({ indeterminate, onChange, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return <Checkbox ref={ref} onChange={(_, e) => onChange(e)} {...rest} />;
}

export default IndeterminateCheckbox;
