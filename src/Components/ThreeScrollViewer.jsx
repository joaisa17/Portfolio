import React, { useEffect, useState } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScrollViewer = props => {
    
    const [renderer, setRenderer] = useState(undefined);
    const [scene] = useState(new THREE.Scene());
    const [camera] = useState(new THREE.PerspectiveCamera(
        45,
        window.screen.width / window.screen.height,
        0.001,
        1000
    ));

    const [mounted, setMounted] = useState(false);
    const [div, setDiv] = useState();

    useEffect(() => {
        setMounted(true);

        if (!renderer) return setRenderer(new THREE.WebGLRenderer({alpha: true, antialias: true}));
        scene.children.forEach(obj => scene.remove(obj));

        renderer.setSize(window.screen.width, window.screen.height);

        const newLight = (x, y, z) => {
            const light = new THREE.PointLight(0xeeeeff, 1.2, 480);
            light.position.set(x, y, z);

            scene.add(light);
            return light
        }

        const loader = new GLTFLoader();
        loader.load(props.src, gltf => {
            scene.add(gltf.scene);
            camera.lookAt(gltf.scene.position);

            const sky = gltf.scene.getObjectByName('Sky');
            if (sky) sky.receiveShadow = false;

            const floor = gltf.scene.getObjectByName('Floor');

            newLight(-3, 4, 2);
            newLight(3, 4, -2);

            const startingOffAngle = -135;
            
            let render = () => {
                let scroll = window.scrollY;

                camera.position.set(
                    Math.sin((startingOffAngle / 180) * Math.PI + (scroll / 250)) * 10,
                    Math.max(5 - (scroll / 220), (floor ? floor.position.y : 0) + 1),
                    Math.cos((startingOffAngle / 180) * Math.PI + (scroll / 250)) * 10
                );

                camera.lookAt(gltf.scene.position);
                
                renderer.render(scene, camera);
            }

            if (div) {
                div.appendChild(renderer.domElement);
                const listener = () => {
                    if (mounted) requestAnimationFrame(render);
                    else document.removeEventListener('scroll', listener);
                }
                document.addEventListener('scroll', listener);
                requestAnimationFrame(render);
            }
        });

        return () => {
            scene.children.forEach(obj => scene.remove(obj));
            setMounted(false);
            renderer.domElement.remove();
            renderer.clear();
        }
    }, [props.src, div, mounted, camera, renderer, scene]);

    return <div className={`three-viewer${props.className ? ` ${props.className}`:''}`} ref={ref => setDiv(ref)} />
}

export default ThreeScrollViewer;