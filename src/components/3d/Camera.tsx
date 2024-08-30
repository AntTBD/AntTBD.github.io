import React from 'react'
import {PerspectiveCamera} from '@react-three/drei'
import {useThree} from "@react-three/fiber";

export default function Camera() {
    const {size} = useThree()

    return (
        <PerspectiveCamera
            name="Camera"
            makeDefault={true}
            far={1000}
            near={0.1}
            fov={Math.max(size.height / size.width * 27, 27)}
            focus={0.0001}
            position={[1.3, 0.9, 9]}
            //position={[1, 20, -9]}
            //rotation={[-90,0,0]}
        />
    )
}