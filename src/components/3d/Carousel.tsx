import {PlaneImage} from "./PlaneImage";
import React, {useContext, useEffect, useRef, useState} from "react";
import {ThemeContext} from "../themeToggle/ThemeContext";
import {RectAreaLight} from "three";
import {useHelper, useTexture} from "@react-three/drei";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper";
import {trackGAEvent} from "../googleAnalytics/analytics";

export const Carousel = () => {
    const [imageToDisplay, setImageToDisplay] = useState(0)
    const [imageToLoad, setImageToLoad] = useState(0)
    const {isDarkTheme} = useContext(ThemeContext)
    const [urls] = useState([
        "Gare de Limoges.jpg",
        "IKEA PS 2014.jpg",
        "Hirondelles.jpg",
        "Couché de soleil Chicoutimi.jpg",
        "Falcon9.jpg",
        //"Asus_ROG_STRIX_G.jpg",
    ])
    let interval: NodeJS.Timeout | undefined = undefined;

    const refScreenLight = useRef<RectAreaLight>(null!)
    //useHelper(refScreenLight, RectAreaLightHelper)


    function startInterval() {
        if (interval)
            clearInterval(interval)

        interval = setInterval(() => {
            incrementImageToDisplay()
        }, 5000)

    }

    function incrementImageToDisplay() {
        setImageToDisplay((previousValue) => {
            let newValue = previousValue + 1
            return newValue > urls.length - 1 ? 0 : newValue
        })
    }

    function incrementAndRestartInterval(event: PointerEvent) {
        trackGAEvent("3d", "onClick_carrousel", "On click carrousel")
        incrementImageToDisplay()
        startInterval()
    }

    useEffect(() => {
        const containerHome3d = document.getElementById("containerHome3d")!
        containerHome3d.addEventListener("pointerup", incrementAndRestartInterval);

        startInterval()

        return () => {
            containerHome3d.removeEventListener("pointerup", incrementAndRestartInterval);
            if (interval)
                clearInterval(interval)
        }
    }, []);

    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    return (<>
        {/* background color */}
        <mesh
            castShadow
            receiveShadow
            key={-1}
            position={[0, 0, -0.001]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <planeGeometry
                attach="geometry"
                args={[8.4, 5.4, 1, 1]}
            />
            <meshStandardMaterial
                attach="material"
                color={isDarkTheme ? "rgb(43, 48, 53)" : "rgb(248, 249, 250)"}//{"#333333"}
                roughness={0.6}
                metalness={0.1}
            />
        </mesh>
        {/*simulate screen light*/}
        <rectAreaLight
            ref={refScreenLight}
            height={5.2/5}
            width={8.2/5}
            position={[0, 0, .1]}
            intensity={1.5}
            color={"#ffffff"}
        />
        {
            urls?.map((url, i) => {
                return (
                    <PlaneImage key={i} url={"./assets/img/threejs/"+url} visible={i === imageToDisplay}/>
                )
            })
            // <PlaneImage key={imageToDisplay} url={"./assets/img/threejs/"+urls[imageToDisplay]} visible={true}/>
        }
    </>)
}
