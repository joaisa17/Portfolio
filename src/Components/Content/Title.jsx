import React from 'react'

export default function Title(props) {
    return <h1 className={`pb-4 text-center${props.className ? ' ' + props.className : ''}`} style={{fontSize: 'calc(1vh + 24px)'}}>
        {props.children}
    </h1>
}
