import React, {useMemo} from 'react'
import {Merged, useGLTF} from '@react-three/drei'
import {GroupProps} from "@react-three/fiber";
import {GLTF} from "three-stdlib";
import {Mesh, MeshStandardMaterial} from "three";

export type GLTF_TreesAndClouds = GLTF & {
    nodes: {
        Icosphere033: Mesh
        Icosphere033_1: Mesh
        tree_03_1: Mesh
        tree_03_2: Mesh
        tree_02_1: Mesh
        tree_02_2: Mesh
        tree_01_1: Mesh
        tree_01_2: Mesh
        cloud_03001: Mesh
        cloud_03001_1: Mesh
        cloud_02001: Mesh
        cloud_02001_1: Mesh
        cloud_01: Mesh
    }
    materials: {
        ['Material.004']: MeshStandardMaterial
        ['LP_bark.002']: MeshStandardMaterial
        ['LP_wood.001']: MeshStandardMaterial
        ['LP_wood.002']: MeshStandardMaterial
        LP_wood: MeshStandardMaterial
        lightning: MeshStandardMaterial
        cloud: MeshStandardMaterial
    }
}

const Trees = (props: GroupProps) => {
    const { nodes, materials } = useGLTF(
        './assets/models/trees_and_clouds-transformed.glb'
    ) as GLTF_TreesAndClouds

    const meshes = useMemo(() => ({
        Icosphere033: nodes.Icosphere033,
        Icosphere033_1: nodes.Icosphere033_1,
        tree_03_1: nodes.tree_03_1,
        tree_03_2: nodes.tree_03_2,
        tree_02_1: nodes.tree_02_1,
        tree_02_2: nodes.tree_02_2,
        tree_01_1: nodes.tree_01_1,
        tree_01_2: nodes.tree_01_2,
        cloud_03001: nodes.cloud_03001,
        cloud_03001_1: nodes.cloud_03001_1,
        cloud_02001: nodes.cloud_02001,
        cloud_02001_1: nodes.cloud_02001_1,
        cloud_01: nodes.cloud_01,
    }), [nodes])

    return (
        <group
            {...props}
            //dispose={null}
        >
            <Merged castShadow receiveShadow meshes={meshes}>
                {(models: any) => (
                    <>
                        <group
                            position={[-0.04, 1.0, -4.22]}
                            rotation={[Math.PI, 0.52, 0]}
                            scale={[0.17, 0.12, 0.17]}
                        >
                            <models.Icosphere033 material={materials['Material.004']}/>
                            <models.Icosphere033_1 material={materials['LP_bark.002']}/>
                        </group>
                        <group
                            position={[0.59, 0, -2.25]}
                            rotation={[Math.PI, 0, Math.PI]}
                            scale={0.28}
                        >
                            <models.tree_03_1 material={materials['LP_bark.002']} />
                            <models.tree_03_2 material={materials['LP_wood.001']} />
                        </group>
                        <group
                            position={[-2.5, 1.31, -4.78]}
                            rotation={[2.54, 0.41, 2.49]}
                            scale={[0.13, 0.22, 0.18]}
                        >
                            <models.tree_02_1 material={materials['LP_wood.002']}/>
                            <models.tree_02_2 material={materials['LP_bark.002']}/>
                        </group>
                        <group
                            position={[-2.39, 0.68, -3.3]}
                            rotation={[0.13, 0.21, -0.68]}
                            scale={0.12}
                        >
                            <models.tree_01_1 material={materials.LP_wood}/>
                            <models.tree_01_2 material={materials['LP_bark.002']}/>
                        </group>
                        <group
                            position={[1.28, 1.6, -7.93]}
                            rotation={[Math.PI / 2, 0, 0]}
                            scale={0.23}
                        >
                            {/*right clouds*/}
                            <models.cloud_03001 material={materials.lightning}/>
                            <models.cloud_03001_1 material={materials.cloud}/>
                        </group>
                        <group
                            position={[-1.44, 2.29, -8.74]}
                            rotation={[Math.PI / 2, 0, 0]}
                            scale={0.2}
                        >
                            {/*middle clouds*/}
                            <models.cloud_02001 material={materials.lightning}/>
                            <models.cloud_02001_1 material={materials.cloud}/>
                        </group>
                        <group
                            position={[-3.16, 1.57, -6.41]}
                            rotation={[0, 0, 0]}
                            scale={0.18}
                        >
                            {/*left clouds*/}
                            <models.cloud_01 material={materials.cloud}/>
                        </group>
                    </>
                )}
            </Merged>
            {/*<group
                position={[-0.04, 1.0, -4.22]}
                rotation={[Math.PI, 0.52, 0]}
                scale={[0.17, 0.12, 0.17]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Icosphere033.geometry}
                    material={materials['Material.004']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Icosphere033_1.geometry}
                    material={materials['LP_bark.002']}
                />
            </group>
            <group
                position={[0.59, 0, -2.25]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.28}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.tree_03_1.geometry}
                    material={materials['LP_bark.002']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.tree_03_2.geometry}
                    material={materials['LP_wood.001']}
                />
            </group>
            <group
                position={[-2.5, 1.31, -4.78]}
                rotation={[2.54, 0.41, 2.49]}
                scale={[0.13, 0.22, 0.18]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.tree_02_1.geometry}
                    material={materials['LP_wood.002']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.tree_02_2.geometry}
                    material={materials['LP_bark.002']}
                />
            </group>
            <group
                position={[-2.39, 0.68, -3.3]}
                rotation={[0.13, 0.21, -0.68]}
                scale={0.12}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.tree_01_1.geometry}
                    material={materials.LP_wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.tree_01_2.geometry}
                    material={materials['LP_bark.002']}
                />
            </group>
            <group
                position={[1.28, 1.6, -7.93]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.23}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.cloud_03001.geometry}
                    material={materials.lightning}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.cloud_03001_1.geometry}
                    material={materials.cloud}
                />
            </group>
            <group
                position={[-1.44, 2.29, -8.74]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.2}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.cloud_02001.geometry}
                    material={materials.lightning}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.cloud_02001_1.geometry}
                    material={materials.cloud}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_01.geometry}
                material={materials.cloud}
                position={[-3.16, 1.57, -6.41]}
                rotation={[Math.PI, 0, -0.07]}
                scale={-0.18}
            />*/}
        </group>
    )
}

export default Trees

// useGLTF.preload(
//     './assets/models/trees_and_clouds-transformed.glb'
// )