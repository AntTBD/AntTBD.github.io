import {useFrame, useThree} from "@react-three/fiber";
import {useContext, useEffect, useRef, useState} from "react";
import {DirectionalLight, Group, OrthographicCamera, Vector3} from "three";
import {Sky, SoftShadows, Stars} from "@react-three/drei";
import {useControls} from "leva";
import SunCalc from "suncalc";
import {Terrain} from "./Terrain";
import {ThemeContext} from "../themeToggle/ThemeContext";
import {Moon} from "./Moon";


export const Sun = () => {
    const {isDarkTheme} = useContext(ThemeContext)

    const refLight = useRef<DirectionalLight>(null!)
    //useHelper(refLight, DirectionalLightHelper)
    const refOrthoCam = useRef<OrthographicCamera>(null!)
    //useHelper(refOrthoCam, CameraHelper)
    const [selectedTime, setSelectedTime] = useState<number>(new Date().getTime())

    //london
    const latitude = 48.866667
    const longitude = 2.333333

    const lightDistance = 100

    const {gl} = useThree()


    const [config, setControls]: any = useControls("Sun", () => ({
        enableSoftShadows: {
            label: "Enable soft shadow",
            value: false,
        },
        day: {
            label: "Day",
            value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0,0,0,0).getTime(),
            min: new Date(new Date().getFullYear(), 0, 0).setHours(0, 0, 0, 0),
            max: new Date(new Date().getFullYear(), 11, 31).setHours(0, 0, 0, 0),
            step: new Date(0,0,1, 0,0,0,0).getTime()-new Date(0,0,0, 0,0,0,0).getTime(),
        },
        dayTime: {
            label: "Time",
            value: new Date(0,0,0, new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds()).getTime(),
            min: new Date(0,0,0, 0,0,0,0).getTime(),
            max: new Date(0,0,0, 23, 59, 59, 999).getTime(),
            step: new Date(0,0,0, 0,0,1,0).getTime()-new Date(0,0,0, 0,0,0,0).getTime(),
        },
        enableDayTimeAutoUpdate: {
            label: "Enable time auto update",
            value: true,
        },
    }));

    useEffect(() => {
        let dayDate = new Date(config.day)
        let timeDate = new Date(config.dayTime)
        let newDate = new Date(
            dayDate.getFullYear(),
            dayDate.getMonth(),
            dayDate.getDate(),
            timeDate.getHours(),
            timeDate.getMinutes(),
            timeDate.getSeconds()
        )
        setSelectedTime(newDate.getTime())
    }, [config.dayTime, config.day])

    useFrame((state, delta, frame) => {
        // if auto update, update each seconds
        let currentTime = new Date()
        let time = new Date(0,0,0, currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds())
        if (config.enableDayTimeAutoUpdate && Math.abs(time.getTime() - config.dayTime) > 60 * 1000) {
            //setSelectedTime(new Date().getTime())
            setControls({
                dayTime: time.getTime(),
                day: new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 0,0,0,0).getTime()
            })
        }
    })

    const getSunPosition = (date: Date, radius: number, latitude: number, longitude: number): Vector3 => {
        let sunPosition = SunCalc.getPosition(date, latitude, longitude)
        let x = radius * (Math.cos(sunPosition.altitude)) * (Math.cos(sunPosition.azimuth))
        let z = radius * (Math.cos(sunPosition.altitude)) * (Math.sin(sunPosition.azimuth))
        let y = radius * (Math.sin(sunPosition.altitude))
        return new Vector3(x, y, z)
    }

    const [sunPos, setSunPos] = useState<Vector3>(getSunPosition(new Date(selectedTime), lightDistance, latitude, longitude))
    const refStars = useRef<Group>(null!)
    const refSky = useRef<any>(null!)
    useEffect(() => {
        let date = new Date(selectedTime)
        setSunPos(getSunPosition(date, lightDistance, latitude, longitude))
    }, [selectedTime, isDarkTheme]);


    useEffect(() => {
        refStars.current?.lookAt(sunPos)
    }, [sunPos]);

    useEffect(() => {
        //gl.toneMappingExposure = sunPos.y < -lightDistance * 0.1 ? 0 : (sunPos.y + lightDistance * 0.1)/(lightDistance + lightDistance * 0.1)/2
    }, [sunPos.y]);


    return (
        <>
            <color attach="background" args={['#202020']}/>
            {/*<fog attach="fog" args={['grey', 10, 20]}/>*/}
            <hemisphereLight
                intensity={sunPos.y / lightDistance}
                position={[0, 0, 0]}
                groundColor={"#000000"}
                color={"#ffffff"}
            />
            <directionalLight
                ref={refLight}
                position={sunPos}
                visible={sunPos.y > -lightDistance * 0.1}
                intensity={(sunPos.y + lightDistance * 0.1) / (lightDistance + lightDistance * 0.1) * 10}
                castShadow
                color={isDarkTheme ? "#505050" : "#fff"}
                shadow-mapSize={1024}
                shadow-radius={10}
                shadow-bias={-0.001}
            >
                <orthographicCamera
                    ref={refOrthoCam}
                    castShadow
                    attach="shadow-camera"
                    args={[-50, 50, 50, -50, 10, lightDistance + 100]}
                />
            </directionalLight>

            <Sky
                ref={refSky}
                sunPosition={sunPos}
                mieCoefficient={isDarkTheme ? 0.001 : 0.009}//{0.001}
                mieDirectionalG={isDarkTheme ? 0.9999 : 0.9999}//{0.9999} // sun size
                turbidity={isDarkTheme ? Math.min((sunPos.y) / lightDistance * 1000, 100) : 10}//10
                rayleigh={(Math.min(lightDistance - sunPos.y,9*lightDistance/10)) / lightDistance * (isDarkTheme ? 0.2 : 2)}//2

            />
            {/* Moon */}
            <Moon
                time={selectedTime}
                latitude={latitude}
                longitude={longitude}
            />
            <>
                {/* Stars */}
                {sunPos.y < -2 &&
                    <group ref={refStars}>
                        <Stars
                            radius={300} // Radius of the inner sphere (default=100)
                            depth={50} // Depth of area where stars should fit (default=50)
                            count={5000} // Amount of stars (default=5000)
                            factor={sunPos.y < -5 ? 10 : sunPos.y < -2 ? ((sunPos.y + 2) / (-5 + 2)) * 10 : 0} // Size factor (default=4)
                            saturation={0} // Saturation 0-1 (default=0)
                            fade={true} // Faded dots (default=false)
                        />
                    </group>
                }
            </>

            {/* ground */}
            <Terrain/>
            {config.enableSoftShadows && <SoftShadows/>}
        </>
    )
}