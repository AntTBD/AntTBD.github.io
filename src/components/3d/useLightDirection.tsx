import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useState } from "react";
import { Vector3 } from "three";

const initialSunDistance = 100
const initialSunRotationAxis = new Vector3(0, 0, 1)
const initialSunRotation = new Vector3(initialSunDistance, 0, 0).applyAxisAngle(
    initialSunRotationAxis,
    Math.PI * (13 / 180)
);

export const useLightDirection = () => {

    const [lightDirection, setLightDirection] = useState<Vector3>(
        initialSunRotation.clone()
    );

    const [lightDistance, setLightDistance] = useState<number>(initialSunDistance)
    const [lightAngle, setLightAngle] = useState<number>(13)

    const [config, setControls]: any = useControls("Old Sun", () => ({
        sunRotation: {
            label: "Sun rotation",
            value: 0,
            min: 0,
            max: 360,
            step: 0.1,
        },
        autoRotate: {
            label: "Auto rotate",
            value: false,
        }
    }))

    useFrame((_, delta) => {
        if (config.autoRotate) {
            if(config.sunRotation + delta >= 360)
                delta = -360
            setControls({ sunRotation: config.sunRotation + delta })
        }
    })

    useEffect(() => {
        const rotationAxis = initialSunRotationAxis
        const angle = Math.PI * (-config.sunRotation / 180)
        setLightAngle(config.sunRotation/360.0)
        setLightDirection(
            initialSunRotation.clone().applyAxisAngle(rotationAxis, angle)
        )
    }, [config.sunRotation])

    return {lightDirection, lightDistance, lightAngle}
}