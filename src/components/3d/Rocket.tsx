import {gsap} from 'gsap'
import React, {useEffect, useRef} from 'react'
import {Float, MeshWobbleMaterial, useGLTF} from '@react-three/drei'
import {GroupProps, useFrame} from '@react-three/fiber'
import {Group, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, SpotLight} from "three";
import {GLTF} from "three-stdlib";
import {useControls} from "leva";


//  npx gltfjsx .\public\assets\models\rocket.glb --types --transform
export type GLTF_rocket_data = GLTF & {
    nodes: {
        spheres: Mesh
        smoke: Mesh
        rocket001: Mesh
        rocket001_1: Mesh
        rocket001_2: Mesh
        rocket001_3: Mesh
    }
    materials: {
        spheres_Baked_Baked: MeshStandardMaterial
        rocket_Baked: MeshStandardMaterial
        flame: MeshStandardMaterial
        ['Material.006']: MeshStandardMaterial
        ['Material.001']: MeshPhysicalMaterial
    }
}

export const Rocket = (props: GroupProps) => {
    const {nodes, materials} = useGLTF(
        './assets/models/rocket-transformed.glb'
    ) as GLTF_rocket_data

    const pointer = useRef({x: 0, y: 0})
    useEffect(() => {
        // Listen for mouse move events on the document
        document.addEventListener('mousemove', handleMouseMove)

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    const handleMouseMove = (event: MouseEvent) => {
        const canvas = document.querySelector('canvas')
        if (!canvas) return

        const canvasRect = canvas.getBoundingClientRect()

        const mouseX = event.clientX - canvasRect.left
        const mouseY = event.clientY - canvasRect.top

        // Calculate the mouse position relative to the canvas
        pointer.current = {
            //x: (mouseX / canvasRect.width) * 2 - 1,
            x: -0.5 * 2 - 1,
            y: Math.max(-(mouseY / canvasRect.height) * 2 + 1, -0.75),
        }
    }

    const rocket = useRef<Group>(null!)
    useFrame(() => {
        if(!rocket.current) return

        gsap.to(rocket.current.position, {
            y: pointer.current.y / 2 + 0.75,
            ease: 'power1.easeOut',
        })
        gsap.to(rocket.current.rotation, {
            y: pointer.current.y - 1,
            ease: 'power1.easeOut',
        })
        gsap.to(rocket.current.rotation, {
            x: pointer.current.x / 10 + 0.5,
            ease: 'power1.easeOut',
        })
    })

    // fake flame light
    const refRocketFlame = useRef<SpotLight>(null!)
    //useHelper(refRocketFlame, SpotLightHelper)
    const refRocketFlameSpotLightTarget = useRef<Mesh>(null!)
    const refRocketGroundSpotLight = useRef<SpotLight>(null!)
    //useHelper(refRocketGroundSpotLight, SpotLightHelper)
    const refRocketGroundSpotLightTarget = useRef<Mesh>(null!)

    useEffect(() => {
        if (refRocketFlame.current && refRocketFlameSpotLightTarget.current) {
            refRocketFlame.current.target = refRocketFlameSpotLightTarget.current
            refRocketFlame.current.updateMatrix()
        }
        if (refRocketGroundSpotLight.current && refRocketGroundSpotLightTarget.current) {
            refRocketGroundSpotLight.current.target = refRocketGroundSpotLightTarget.current
            refRocketGroundSpotLight.current.updateMatrix()
        }
    }, [])

    return (
        <group
            {...props}
            //dispose={null}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.spheres.geometry}
                material={materials.spheres_Baked_Baked}
                position={[1.005, 0.056, -0.225]}
                rotation={[0, 0.417, 0]}
                scale={0.056}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.smoke.geometry}
                material={nodes.smoke.material}
                position={[-0.095, 0.305, -0.162]}
                rotation={[-0.088, 0, 0]}
                scale={0.069}
            >
                <MeshWobbleMaterial factor={0.3} speed={1}/>
            </mesh>
            <Float
                speed={1} // Animation speed, defaults to 1
                rotationIntensity={0.1}
                floatIntensity={0.2}
                floatingRange={[0, 1]}
            >
                <group
                    position={[-0.001, 0.531, -0.065]}
                    scale={0.952}
                    ref={rocket}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.rocket001.geometry}
                        material={materials.rocket_Baked}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.rocket001_1.geometry}
                        material={materials.flame}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.rocket001_2.geometry}
                        material={materials['Material.006']}
                    />
                    <mesh
                        geometry={nodes.rocket001_3.geometry}
                        //material={materials['Material.001']}
                    >
                        <meshStandardMaterial color={"#ebc853"} roughness={1}/>
                    </mesh>
                        <mesh ref={refRocketFlameSpotLightTarget} position={[0, -1, 0]}/>
                        <mesh ref={refRocketGroundSpotLightTarget} position={[0, 0.5, 0]}/>
                        <spotLight
                            ref={refRocketFlame}
                            color={"#ef861b"}
                            position={[0, 0.3, 0]}
                            distance={3}
                            angle={Math.PI / 12}
                            intensity={5}
                            penumbra={1}
                            castShadow
                            target={refRocketFlameSpotLightTarget.current ?? undefined}
                        />
                </group>
            </Float>
            <spotLight
                ref={refRocketGroundSpotLight}
                color={"#fff"}
                position={[2, 1, 2]}
                distance={5}
                angle={Math.PI / 10}
                intensity={100}
                penumbra={1}
                castShadow
                target={refRocketGroundSpotLightTarget.current ?? undefined}
            />
        </group>
    )
}

// useGLTF.preload(
//     './assets/models/rocket-transformed.glb'
// )
