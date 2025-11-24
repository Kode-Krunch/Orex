import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Tag = forwardRef((props, ref) => {
    const {
        className,
        children,
        prefix,
        suffix,
        prefixClass,
        suffixClass,
        rest,
        onClose,
        showCloseButton,

    } = props

    return (
        <div className={classNames('tag', className)} ref={ref} {...rest}

        >
            {prefix && typeof prefix === 'boolean' && (
                <span
                    className={classNames('tag-affix tag-prefix', prefixClass)}
                > </span>
            )}
            {typeof prefix === 'object' && prefix}
            {children}
            {showCloseButton &&
                <span className="close-button" onClick={onClose} style={{ fontSize: '7px' }} >
                    &nbsp;&nbsp;&#10060;</span>}
            {suffix && typeof suffix === 'boolean' && (
                <span
                    className={classNames('tag-affix tag-suffix', suffixClass)}
                ></span>

            )}
            {typeof suffix === 'object' && suffix}
        </div>
    )
})

Tag.defaultProps = {
    prefix: false,
    suffix: false,
    showCloseButton: true,
}

Tag.propTypes = {
    prefix: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    suffix: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    prefixClass: PropTypes.string,
    onClose: PropTypes.func,
}

export default Tag
