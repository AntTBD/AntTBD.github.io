import {Plane, useTexture} from "@react-three/drei";
import React, {useContext, useEffect, useRef} from "react";
import {Float32BufferAttribute, Mesh, RepeatWrapping, TextureLoader} from "three";
import {ThemeContext} from "../themeToggle/ThemeContext";
import {useLoader} from "@react-three/fiber";

//https://manticorp.github.io/unrealheightmap/#latitude/28.7387639713703/longitude/85.7318115234375/zoom/9/outputzoom/10/width/512/height/512
export const Terrain = () => {
    const {isDarkTheme} = useContext(ThemeContext)
    let heightMap = useTexture('./assets/models/heightmap.png')
    const texture = useTexture('./assets/models/colormap.png')
    const planeGeometryRef = useRef<Mesh>(null!)

    useEffect(() => {
        if (heightMap && planeGeometryRef.current) {
            const displacementMap = heightMap
            displacementMap.wrapS = displacementMap.wrapT = RepeatWrapping
            planeGeometryRef.current.geometry.setAttribute(
                'displacement',
                new Float32BufferAttribute(displacementMap.image?.data, 3)
            )
        }
    }, [heightMap, planeGeometryRef.current])

    return (
        <group rotation={[0, -2*Math.PI/5, 0]}>
            {/*<mesh
                scale={1000}
                castShadow
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.001, 0]}
            >
                <planeGeometry/>
                <meshStandardMaterial side={2} color={isDarkTheme ? "#222222" : "#555555"}/>
            </mesh>*/}
            <group
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -13.52, 0]}
            >
                    <Plane
                        args={[1024, 1024, 1024/2, 1024/2]}
                        ref={planeGeometryRef}
                        castShadow
                        receiveShadow
                    >
                        {texture && heightMap &&
                            <meshStandardMaterial
                                displacementMap={heightMap}
                                displacementScale={100}
                                map={texture}
                                metalness={0.2}
                            />
                        }
                    </Plane>
            </group>
        </group>
    );
};

// useTexture.preload('./assets/models/heightmap.png')
// useTexture.preload('./assets/models/colormap.png')