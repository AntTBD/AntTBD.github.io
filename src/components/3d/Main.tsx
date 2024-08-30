import {Suspense, useContext, useEffect, useRef, useState} from 'react'
import {Canvas, PointLightProps} from '@react-three/fiber'
import {CameraControls, Loader, PerformanceMonitor, StatsGl,} from '@react-three/drei'
import {Rocket} from './Rocket'
import {ACESFilmicToneMapping, PointLight} from 'three'
import "./style.css"

import {DepthOfField, EffectComposer,} from '@react-three/postprocessing'
import Trees from "./TreesAndClouds";
import {Laptop} from "./Laptop";
import {useControls} from "leva";
import {Sun} from "./Sun";
import Camera from "./Camera";
import CameraRig from './CameraRig'
import {ThemeContext} from "../themeToggle/ThemeContext";
import {trackGAEvent} from "../googleAnalytics/analytics";

const Light = (props: PointLightProps) => {
    const refLight = useRef<PointLight>(null!)
    //useHelper(refLight, PointLightHelper, 1)

    return (
        <pointLight
            ref={refLight}
            {...props}
        />
    )
}


export const MainScene = () => {
    const {isDarkTheme} = useContext(ThemeContext)

    const [controls, setControls] = useControls("General", () => ({
        enablePostProcess: {
            label: "Enable post process",
            value: false,
        },
        useCameraControl: {
            label: "Use camera controls",
            value: false,
        }
    }))

    const [dpr, setDpr] = useState(1.5)

    useEffect(() => {
        if (!(process.env.NODE_ENV && process.env.NODE_ENV === "development")) {
            document.body.querySelector("#leva__root")?.setAttribute("class", "hide")
        } else {
            document.body.querySelector("#leva__root")?.setAttribute("class", "")
        }
    }, [])

    useEffect(() => {
        trackGAEvent("3d", "useCameraControl_" + controls.useCameraControl, "Free Camera " + (controls.useCameraControl ? "enable" : "disable"))
    }, [controls.useCameraControl]);

    return (
        <>
            <Canvas
                shadows
                gl={{
                    logarithmicDepthBuffer: false,
                    toneMapping: ACESFilmicToneMapping,
                    toneMappingExposure: 0.5,
                }}
                //dpr={[1, 2]}
                dpr={dpr}
                className={"homeCanvas p-0"}

            >
                <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}/>
                {process.env.NODE_ENV && process.env.NODE_ENV === "development" &&
                    <>
                        <StatsGl/>
                    </>
                }
                {/*<fog attach="fog" args={['#cc7b32', 0, 500]}/>*/}

                {/*<color attach="background" args={["#195181"]}/>*/}

                <Light
                    position={[4.5, 2, -4]}
                    intensity={50}
                    color={isDarkTheme ? "#2783a5" : "#19329e"} //rose #ff229f
                    distance={10}/>
                <Light
                    position={[1, 2, -8]}
                    intensity={50}
                    color={isDarkTheme ? "#2783a5" : "#19329e"} //rose #ff229f
                    distance={10}/>
                <Light
                    position={[-2, 2, -7]}
                    intensity={50}
                    color={isDarkTheme ? "#2783a5" : "#19329e"} //rose #ff229f
                    distance={10}/>
                {/*<Light
                    position={[5, 2, 1]}
                    intensity={50}
                    color={"#ffffff"}//white right
                    distance={5}
                />
                <Light
                    position={[-4, 3, 0]}
                    intensity={50}
                    color={"#ffffff"}//white left
                    distance={5}
                />*/}

                {controls.useCameraControl ?
                    <CameraControls/>
                    :
                    <CameraRig>
                        <Camera/>
                    </CameraRig>}

                <Suspense>

                    <Sun/>
                    <group rotation={[0, (-35 * Math.PI) / 180, 0]} position={[2, 0.01, 0]}>

                        <Rocket position={[-2.5, 0.05, 0]}/>
                        <Laptop
                            props={{scale: 0.2, position: [0.05, 0.05, -0.55]}}
                            angle={-17}/>

                        <Trees/>
                        <Trees position={[-2, 0, -2]} rotation={[0, (50 * Math.PI) / 180, 0]}/>
                        {/*<Flamingo />*/}
                        {/*<Sparkles
                            count={100}
                            scale={[20, 6, 20]}
                            size={10}
                            speed={0.2}
                            position={[-2, 3, -2]}
                        />*/}
                    </group>
                    {controls.enablePostProcess &&
                        <EffectComposer
                            enableNormalPass={false}
                        >
                            <DepthOfField
                                target={[1.75, 1, 0]}
                                focalLength={0.005}
                                bokehScale={2}
                                height={600}/>
                        </EffectComposer>}
                </Suspense>
                {/*<Preload all/>*/}
            </Canvas>
            <Loader
                containerStyles={{
                    backgroundColor:"var(--bs-body-bg)"
                }}
                innerStyles={{
                    backgroundColor:"var(--bs-secondary-bg)"
                }}
                barStyles={{
                    backgroundColor:"var(--bs-body-color)"
                }}
                dataStyles={{
                    color:"var(--bs-body-color)"
                }}
            />
        </>
    )
}