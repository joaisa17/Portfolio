import React, { useEffect, useState, useRef, useCallback } from 'react'

import '@css/Components/GameWithCanvas.css';

import { Row, Col } from 'react-bootstrap';
import { FullscreenButton } from '@Media/svg/ui';

const preventScrollingKeys = [
    'Space',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    
    // For compatibility with older browsers
    32,
    37,
    38,
    39,
    40
];

function clamp(number, min, max) {
    return Math.max(
        min,
        Math.min(number, max)
    );
}

const GameWithCanvas = ({game, ...props}) => {
    const gameWidth = clamp(window.screen.width, 800, 2000);
    const gameHeight = clamp(window.screen.height, 800, 2000);
    
    const [canvasWidth, setCanvasWidth] = useState(gameWidth);
    const [canvasHeight, setCanvasHeight] = useState(gameHeight);

    const mountedRef = useRef(false);

    const gameRef = useRef();
    const ctxRef = useRef();

    const lastTime = useRef(0);

    function toggleFullScreen() {
        const container = document.querySelector('#game-container');
        if (!container) return;

        if (document.fullscreenElement !== null)
            document.exitFullscreen().catch(() => {});
        else
            container.requestFullscreen().catch(() => {});
    }

    function preventScroll(e) {
        if (preventScrollingKeys.indexOf(e.code) > -1 || preventScrollingKeys.indexOf(e.keyCode) > -1) e.preventDefault();
    }

    const gameLoop = useCallback(ts => {
        if (!mountedRef.current) return;
        let dt = ts - lastTime.current;
        lastTime.current = ts;

        if (dt && ctxRef.current && gameRef.current) {
            gameRef.current.update(dt);

            ctxRef.current.clearRect(0, 0, gameWidth, gameHeight);
            gameRef.current.draw(ctxRef.current);
        }

        requestAnimationFrame(gameLoop);
    }, [gameRef, gameHeight, gameWidth]);

    useEffect(() => {
        const canvas = document.querySelector('#game-canvas');
        mountedRef.current = true;

        gameRef.current = new game({
            gameWidth: gameWidth,
            gameHeight: gameHeight,
            canvas: canvas,
            ...props
        });

        ctxRef.current = canvas.getContext('2d');

        // Event listeners, for ergonomics and cheat prevention

        window.addEventListener('resize', () => {
            const newWidth = clamp(window.screen.width, 800, 2000);
            const newHeight = clamp(window.screen.height, 800, 2000);

            gameRef.current.onResize(newWidth, newHeight);

            setCanvasWidth(newWidth);
            setCanvasHeight(newHeight);
        });

        window.addEventListener('keydown', e => {
            if (!mountedRef.current) return;
            if (e.code === 'KeyF') toggleFullScreen();
            else preventScroll(e);
        }, false);

        window.addEventListener('blur', () => {
            if (game.current && game.current.state !== 'paused') game.current.togglePause();
        });

        requestAnimationFrame(gameLoop);

        return () => {
            gameRef.current.onUnmount();
            mountedRef.current = false;
            window.removeEventListener('keydown', preventScroll);
        }
    }, [game, gameHeight, gameWidth, props, gameLoop]);

    return <div id="game-container" className="game-container">
        <canvas id="game-canvas" className="game-canvas" width={canvasWidth} height={canvasHeight} />

        <div className="bottom-ui">
            <Row className="float-end">
                <Col><img src={FullscreenButton} className="toggle-fullscreen-button" alt="Toggle Fullscreen" onClick={toggleFullScreen} /></Col>
            </Row>
        </div>
    </div>
}

export default GameWithCanvas;