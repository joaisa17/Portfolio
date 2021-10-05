import React from 'react'

export default function ExternalLink(props) {
    return <a href={`https://${props.href}`} className="link" target="external">{props.children}</a>
}
