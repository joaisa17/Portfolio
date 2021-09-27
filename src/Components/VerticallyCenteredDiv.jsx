import React from 'react'

export default function VerticallyCenteredDiv({children, className, ...props}) {
    return <div {...props} className={`${className} row h-100 align-items-center`}>
        <div className="col-sn-12 my-auto">
            {children}
        </div>
    </div>
}
