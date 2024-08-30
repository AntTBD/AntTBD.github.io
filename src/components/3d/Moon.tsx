import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {Group, Shape, Vector3} from "three";
import {ThemeContext} from "../themeToggle/ThemeContext";
import SunCalc, {GetMoonIlluminationResult} from "suncalc";
import {Circle} from "@react-three/drei";

function MoonExtrusion({start = [0, 0], paths = [[25, 25]], ...props}) {
    const shape = useMemo(() => {
        const shape = new Shape()
        shape.moveTo(start[0], start[1])
        paths.forEach((path) => shape.lineTo(
            path[0],
            path[1]
        ))
        return shape
    }, [start, paths])
    return (
        <mesh>
            <extrudeGeometry args={[shape, props]}/>
            <meshStandardMaterial
                color={"#9a9a9a"}
                emissive={"#444444"}
                emissiveIntensity={10}
                toneMapped={false}
            />
        </mesh>
    )
}


interface MoonProps {
    time: number,
    latitude: number,
    longitude: number
}

export const Moon = ({time, latitude, longitude}: MoonProps) => {
    const {isDarkTheme} = useContext(ThemeContext)


    const getMoonPosition = (date: Date, radius: number, latitude: number, longitude: number): Vector3 => {
        let moonPosition = SunCalc.getMoonPosition(date, latitude, longitude)
        let x = radius * (Math.cos(moonPosition.altitude)) * (Math.cos(moonPosition.azimuth))
        let z = radius * (Math.cos(moonPosition.altitude)) * (Math.sin(moonPosition.azimuth))
        let y = radius * (Math.sin(moonPosition.altitude))
        return new Vector3(x, y, z)
    }

    const [moonPos, setMoonPos] = useState<Vector3>(getMoonPosition(new Date(time), 600, latitude, longitude))
    const [moonIllumination, setMoonIllumination] = useState<GetMoonIlluminationResult>(SunCalc.getMoonIllumination(new Date(time)))
    const refMoon = useRef<Group>(null!)


    useEffect(() => {
        let date = new Date(time)
        setMoonPos(getMoonPosition(date, 600, latitude, longitude))
        //https://github.com/mourner/suncalc?tab=readme-ov-file#moon-illumination
        setMoonIllumination(SunCalc.getMoonIllumination(date))
        //console.log(SunCalc.getMoonIllumination(date))
    }, [time, isDarkTheme])

    useEffect(() => {
        refMoon.current?.lookAt(0, 0, 0)
    }, [moonPos]);

    function getX(phase: number, angle: number, r: number, w: number) {
        const rad = Math.PI / 180;
        const f = Math.cos(phase * rad);

        let x;
        const cosi = Math.cos(angle * rad);
        x = f * r * cosi + w / 2;

        if ((phase <= 180 && cosi < 0) || (phase > 180 && cosi > 0)) {
            x = r * cosi + w / 2;
        }
        return -x;
    }

    function drawLightSide(phase: number, width: number, height: number) {
        return drawDarkSide(360-phase, width, height)
    }
    function drawDarkSide(phase: number, width: number, height: number) {
        // https://codepen.io/gmiller123456/pen/BaPxLbG

        const rad = Math.PI / 180;
        const w = width;
        const h = height;
        const r = w / 2 * .91;
        //Gradient set to 2 degrees.  The Sun is .5 deg, but
        //the topology of the moon makes it appear greater.
        const gradient = 2;


        const gradientPoints = [];
        let startPoint = [];

        let x = getX(phase + gradient, 0, r, w)
        if (phase > 180) {
            x = getX(phase - gradient, 0, r, w)
        }
        let y = r * Math.sin(0);
        startPoint = [x - w / 2, y + 1];

        let x2;
        for (let i = 0; i <= 360; i += 1) {
            x = getX(phase + gradient, i, r, w);
            x2 = getX(phase - gradient, i, r, w);

            if (phase > 180) {
                x = x2;
            }
            y = r * Math.sin(i * rad);

            gradientPoints.push([x - w / 2, y + 1])
        }
        return {startPoint, gradientPoints};
    }

    return (

        <group
            position={moonPos}
            ref={refMoon}
        >
            {/*<Circle
                scale={5}
            >
                <meshStandardMaterial
                    color={"#9a9a9a"}
                    emissive={"#444444"}
                    emissiveIntensity={10}
                    toneMapped={false}
                />
            </Circle>*/}
            <MoonExtrusion
                start={drawLightSide((moonIllumination.phase-0.5) * 360, 10, 10).startPoint}
                paths={drawLightSide((moonIllumination.phase-0.5) * 360, 10, 10).gradientPoints}
                bevelEnabled
                amount={8}
            />
        </group>
    )
}