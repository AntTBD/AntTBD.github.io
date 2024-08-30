
import React, {useLayoutEffect, useMemo, useRef} from 'react'
import {useGLTF, Merged} from '@react-three/drei'
import {GLTF} from 'three-stdlib'
import {Carousel} from "./Carousel";
import {gsap} from "gsap";
import {Group, Mesh, MeshStandardMaterial} from "three";

type GLTFResult = GLTF & {
    nodes: {
        Cube008: Mesh
        Cube008_1: Mesh
        Cube008_2: Mesh
        keyboard: Mesh
        Cube002: Mesh
        Cube002_1: Mesh
        touchbar: Mesh
    }
    materials: {
        aluminium: MeshStandardMaterial
        ['matte.001']: MeshStandardMaterial
        ['screen.001']: MeshStandardMaterial
        keys: MeshStandardMaterial
        trackpad: MeshStandardMaterial
        touchbar: MeshStandardMaterial
    }
}


export function Laptop({props, angle, urls}: {
    props: JSX.IntrinsicElements['group'],
    angle: number,
    urls?: string[]
}) {
    const {nodes, materials} = useGLTF('./assets/models/laptop.glb') as GLTFResult


    const screen = useRef<Group>(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(()=>{
            const timeline = gsap.timeline()
            if(screen.current)
                timeline.to(screen.current.rotation, {
                    x: angle / 180 * Math.PI,
                    duration: 2,
                    delay: 0.3,
                    ease: 'power1.easeOut',
                })
        }, screen)
    }, []);

    const meshes = useMemo(() => ({
        Keyboard: nodes.keyboard,
        Structure1: nodes.Cube002,
        Structure2: nodes.Cube002_1,
        TouchBar: nodes.touchbar
    }), [nodes])

    return (
        <group
            {...props}
            //dispose={null}
        >
            <group position={[0.002, -0.038, 0.414]} rotation={[90 / 180 * Math.PI, 0, 0]} ref={screen}>
                <group position={[0, 2.965, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube008.geometry}
                        material={materials.aluminium}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube008_1.geometry}
                        material={materials['matte.001']}
                    />
                    {/*<mesh geometry={nodes.Cube008_2.geometry} material={materials['screen.001']}/>*/}
                    <group rotation={[-Math.PI / 2, 0, 0]}>
                        <group position={[0, 0.09, 0]}>
                            <Carousel/>
                        </group>
                    </group>
                </group>
            </group>
            <Merged castShadow receiveShadow meshes={meshes}>
                {(models: any) => (
                    <>
                        <models.Keyboard
                            material={materials.keys}
                            position={[1.793, 0, 3.451]}/>
                        <group position={[0, -0.1, 3.394]}>
                            <models.Structure1 material={materials.aluminium}/>
                            <models.Structure2 material={materials.trackpad}/>
                        </group>
                        <models.TouchBar
                            material={materials.touchbar}
                            position={[0, -0.027, 1.201]}/>
                    </>
                )}
            </Merged>
            {/*<mesh
                castShadow
                receiveShadow
                geometry={nodes.keyboard.geometry}
                material={materials.keys}
                position={[1.793, 0, 3.451]}
            />
            <group position={[0, -0.1, 3.394]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002.geometry}
                    material={materials.aluminium}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002_1.geometry}
                    material={materials.trackpad}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.touchbar.geometry}
                material={materials.touchbar}
                position={[0, -0.027, 1.201]}
            />*/}
        </group>
    )
}

// useGLTF.preload('./assets/models/laptop.glb')
