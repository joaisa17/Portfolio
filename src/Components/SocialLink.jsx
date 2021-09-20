import React from 'react'

export default function SocialLink({href, children, ...props}) {
    return <a href={`https://www.${href}`} target="external" {...props}>{children}</a>
}
