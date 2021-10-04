import React from 'react'

export default function DiscordEmbed({...props}) {

    return <iframe {...props}
        src='https://discord.com/widget?id=620632390657769502&theme=dark'
        title="discord"
        allowtransparency="true"
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
    </iframe>
}
