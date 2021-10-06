import React, { useEffect, useState, useRef } from 'react'

import '@css/Components/AnimatedText.css';

const timeouts = {
    beforeWriting: 250,
    beforeRemoving: 2000,

    writing: 100,
    removing: 50,

    cursorToggle: 300
}

export default function AnimatedText(props) {

    const [cursorVisible, setCursorVisible] = useState(false);
    const [title, setTitle] = useState('');

    const titleIndex = useRef(0);
    const index = useRef(0);
    const removing = useRef(false);

    useEffect(() => {
        const titles = props.titles;
        if (!titles) return;

        var mounted = true;
        var cursorToggle = false;

        const updateCursor = () => {
            if (!mounted) return;
            cursorToggle = !cursorToggle;
            setCursorVisible(cursorToggle);
            setTimeout(updateCursor, timeouts.cursorToggle);
        }

        const update = () => {
            if (!mounted) return;

            const ti = titleIndex.current;
            const i = index.current;
            const r = removing.current;

            const text = titles[ti];

            if (r) {
                if (i <= 0) {
                    removing.current = false;
                    titleIndex.current = ti < titles.length - 1 ? ti + 1 : 0;
                    setTimeout(update, timeouts.beforeWriting);
                }

                else {
                    index.current--;
                    setTimeout(update, timeouts.removing);
                }
            }

            else {
                if (i >= text.length) {
                    removing.current = true;
                    setTimeout(update, timeouts.beforeRemoving);
                }

                else {
                    index.current++;
                    setTimeout(update, timeouts.writing);
                }
            }

            setTitle(text.substring(0, i));
        }

        update();
        updateCursor();

        return () => mounted = false;
    }, [props.titles]);

    return <div className={`animated-text${props.className ? ` ${props.className}`:''}`}>
        {title}
        {cursorVisible ? <div className="animated-text-cursor" /> : ''}
    </div>
}
