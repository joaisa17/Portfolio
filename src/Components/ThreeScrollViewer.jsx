import React, { useEffect, useState } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScrollViewer = props => {
    
    const [renderer, setRenderer] = useState(new THREE.WebGLRenderer({alpha: true, antialias: true}));
    const [scene, setScene] = useState();
    const [camera, setCamera] = useState();

    const [mounted, setMounted] = useState(false);
    const [div, setDiv] = useState();

    useEffect(() => {
        setMounted(true);

        
        
        if (!camera) {
            const viewAngle = 45;
            const aspectRatio = window.screen.width / window.screen.height;
            const near = 0.1;
            const far = 10000;

            setCamera(
                new THREE.PerspectiveCamera(
                    viewAngle,
                    aspectRatio,
                    near,
                    far
                )
            );
        }

        if (!scene) setScene(new THREE.Scene());
        scene.children.forEach(obj => scene.remove(obj));    

        const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setSize(window.screen.width, window.screen.height);

        const newLight = (x, y, z) => {
            const light = new THREE.PointLight(0xeeeeff, 0.8, 0);
            light.position.set(x * 2, y, z * 2);

            scene.add(light);
            return light
        }

        let loader = new GLTFLoader();
        loader.load(props.src, gltf => {
            scene.add(gltf.scene);
            camera.lookAt(gltf.scene.position);

            const sky = gltf.scene.getObjectByName('Sky');
            sky.receiveShadow = false;

            newLight(-6, 10, 5);
            newLight(5, 10, -6);

            camera.position.set(-8, 0, 6);

            const startingOffAngle = -135;
            
            let render = () => {
                let scroll = window.scrollY;

                camera.position.set(
                    Math.sin((startingOffAngle / 180) * Math.PI + (scroll / 250)) * 10,
                    Math.max(5 - (scroll / 200), 1),
                    Math.cos((startingOffAngle / 180) * Math.PI + (scroll / 250)) * 10
                );

                camera.lookAt(gltf.scene.position);

                sky.rotation.y = camera.rotation.y;
                
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
    }, [props.src, div, mounted]);

    return <React.Fragment>
        <div className={`three-viewer${props.className ? ` ${props.className}`:''}`} ref={ref => setDiv(ref)} />
    </React.Fragment>
}

export default ThreeScrollViewer;