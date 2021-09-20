import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function DiscordEmbed({...props}) {

    const { user } = useAuth0();

    return <iframe {...props} src={`https://discord.com/widget?id=620632390657769502&theme=dark${user ? `&username=${user.Name}` : ''}`} title="discord" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
}
