import React from 'react'

export default function Introduction({children, className, ...props}) {
    return <h3 {...props} className={`mt-3 w-50 mx-auto text-center ${className}`} style={{fontSize: 'var(--size-normal)'}}>
        {children}
    </h3>
}
