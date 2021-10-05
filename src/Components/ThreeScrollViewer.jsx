import React, { useEffect, useState } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
const scene = new THREE.Scene();

const ambient = new THREE.AmbientLight(0xeeeeff, 0.4);
scene.add(ambient);

const newLight = (x, y, z) => {
    const light = new THREE.DirectionalLight(0xeeeeff, 0.5);
    light.position.set(x, y, z);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    return light;
}

for (var i = 0; i < 360; i+=360 / 3) {
    newLight(
        Math.sin((i / 180) * Math.PI) * 5,
        5,
        Math.cos((i / 180) * Math.PI) * 5
    )
}

const ThreeScrollViewer = props => {
    
    const [src] = useState(props.src);
    const [gltf, setGLTF] = useState(undefined);
    console.log(scene.children);
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
        renderer.setSize(window.screen.width, window.screen.height);

        if (!gltf || props.src !== src) {
            const loader = new GLTFLoader();
            loader.load(props.src, obj => {
                if (scene.getObjectByName('Scene')) return;
                scene.add(obj.scene);
                setGLTF(obj);
            });
        }

        if (!scene || !gltf) return;

        const startingOffAngle = -135;
        const floor = gltf.scene.getObjectByName('Floor');

        const render = () => {
            const scroll = window.scrollY;
            const floorHeight = !floor ? 0 : floor.position.y;

            const heightExp = Math.sin(
                Math.min(
                    ((scroll / 32) / 180) * Math.PI,
                    (90 / 180) * Math.PI
                )
            );

            console.log(heightExp);

            camera.position.set(
                Math.sin((startingOffAngle / 180) * Math.PI + (scroll / 250)) * (10 - heightExp * 2),
                floorHeight + 6 - heightExp * 5,
                Math.cos((startingOffAngle / 180) * Math.PI + (scroll / 250)) * (10 - heightExp * 2)
            );

            camera.lookAt(gltf.scene.position);
                
            renderer.render(scene, camera);
        }

        const listener = () => {
            if (!mounted) return document.removeEventListener('scroll', listener);

            requestAnimationFrame(render);
        }

        document.addEventListener('scroll', listener);

        div.appendChild(renderer.domElement);
        requestAnimationFrame(render);

        return () => {
            scene.remove(scene.getObjectByName('Scene'));
        }
    }, [props.src, div, mounted, camera, gltf, src]);

    return <div className={`three-viewer${props.className ? ` ${props.className}`:''}`} ref={ref => setDiv(ref)} />
}

export default ThreeScrollViewer;