import {TextureLoader, Vector3} from "three";
import {useLoader} from "@react-three/fiber";
import {useEffect, useState} from "react";
import {useTexture} from "@react-three/drei";

export const PlaneImage = ({url, visible}: { url: string, visible: boolean }) => {
    const texture = useTexture(url)
    const [scale, setScale] = useState(new Vector3())

    useEffect(() => {
        const imgWidth = texture.image.width
        const imgHeight = texture.image.height
        const maxWidth = 8.4
        const maxHeight = 5.4

        let scale = new Vector3(1, 1, 1)
        let ratio = 1


        if (imgWidth > imgHeight) {
            // landscape
            ratio = imgWidth / maxWidth
        } else {
            // portrait
            ratio = imgHeight / maxHeight
        }
        scale.x = imgWidth / ratio
        scale.y = imgHeight / ratio
        setScale(scale)
    }, [texture])

    return (
        <>
            <mesh
                visible={visible}
                scale={scale}
            >
                <planeGeometry
                    //attach="geometry"
                />
                <meshStandardMaterial
                    //attach="material"
                    map={texture}
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>
        </>
    )
}