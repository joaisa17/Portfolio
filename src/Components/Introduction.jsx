import React from 'react'

export default function Introduction(props) {
    return <h5 className="w-50 mx-auto text-center" style={{fontSize: 'calc(1vh + 16px)'}}>
        {props.children}
    </h5>
}
