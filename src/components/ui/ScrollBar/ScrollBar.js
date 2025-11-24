import React, { forwardRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

const ScrollBar = forwardRef((props, ref) => {
    const { direction = 'ltr', ...rest } = props

    return (
        <Scrollbars
            ref={ref}
            renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" />}
            // renderTrackVertical={props => <div {...props} className="thumb-horizontal" />}
            renderView={(props) => (
                <div
                    {...props}
                    style={{
                        overflowY: 'auto',
                        ...props.style,
                        ...(direction === 'rtl' && {
                            marginLeft: props.style.marginRight,
                            marginRight: 0,
                        }),

                    }}
                />
            )}
            {...rest}
        />
    )
})

export default ScrollBar
