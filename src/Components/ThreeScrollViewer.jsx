import React, { useEffect, useState } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer({antialias: true});

const ThreeScrollViewer = props => {
    
    const [scene, setScene] = useState(undefined);
    const [gltf, setGLTF] = useState(undefined);;
    const [camera] = useState(new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.001,
        1000
    ));

    const [mounted, setMounted] = useState(false);
    const [div, setDiv] = useState();

    useEffect(() => {
        setMounted(true);
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (!scene) {
            const newScene = new THREE.Scene();
            
            loader.load(props.src, obj => {
                newScene.add(obj.scene);
                setGLTF(obj);
                setScene(newScene);
            });
        }

        if (!scene || !gltf) return;

        const startingOffAngle = -135;
        const floor = gltf.scene.getObjectByName('Floor');

        const render = () => {
            if (!renderer) return;
            const scroll = window.scrollY;
            const floorHeight = !floor ? 0 : floor.position.y;

            const heightExp = Math.sin(
                Math.min(
                    ((scroll / 40) / 180) * Math.PI,
                    (90 / 180) * Math.PI
                )
            );

            camera.position.set(
                Math.sin((startingOffAngle / 180) * Math.PI + (scroll / 250)) * (10 - heightExp * 2),
                floorHeight + 6 - heightExp * 5,
                Math.cos((startingOffAngle / 180) * Math.PI + (scroll / 250)) * (10 - heightExp * 2)
            );

            camera.lookAt(gltf.scene.position);
                
            renderer.render(scene, camera);
        }

        const scrollListener = () => {
            if (!mounted) return document.removeEventListener('scroll', scrollListener);

            requestAnimationFrame(render);
        }

        const resizeListener = () => {
            if (!mounted) return window.removeEventListener('resize', resizeListener);

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            render();
        }

        document.addEventListener('scroll', scrollListener, false);
        window.addEventListener('resize', resizeListener, false);

        div.appendChild(renderer.domElement);
        requestAnimationFrame(render);

        return () => {
            renderer.clear();
            renderer.domElement.remove();
            if (!scene) return;
            scene.remove(scene.getObjectByName('Scene'));
        }
    }, [props.src, scene, div, mounted, camera, gltf]);

    return <div className={`three-viewer${props.className ? ` ${props.className}`:''}`} ref={ref => setDiv(ref)} />
}

export default ThreeScrollViewer;