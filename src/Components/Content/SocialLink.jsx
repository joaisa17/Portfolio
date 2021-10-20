import React from 'react'

export default function SocialLink({href, children, ...props}) {
    return <a href={`https://${href}`} target="external" {...props}>{children}</a>
}
