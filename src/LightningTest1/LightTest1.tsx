import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, SSAO } from '@react-three/postprocessing'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PointLight } from 'three'
import * as THREE from 'three'


function GridOfPlanes({ rows = 10, cols = 10, cellSize = 1.0, gap = 0.05 }) {
    // Total grid dimensions, including gaps between cells.
    const totalWidth = cols * cellSize + (cols - 1) * gap
    const totalDepth = rows * cellSize + (rows - 1) * gap
    const offsetX = totalWidth / 2
    const offsetZ = totalDepth / 2

    const planes = []
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
        const x = j * (cellSize + gap) - offsetX + cellSize / 2
        const z = i * (cellSize + gap) - offsetZ + cellSize / 2
        planes.push(
            <mesh
            key={`${i}-${j}`}
            position={[x, -1, z]}
            rotation={[-Math.PI / 2, 0, 0]}
            castShadow
            receiveShadow
            >
            <planeGeometry args={[cellSize, cellSize]} />
            <meshStandardMaterial
                color="white"
                roughness={0.5}
                metalness={0.5}
                side={THREE.FrontSide}
                shadowSide={THREE.FrontSide}
            />
            </mesh>
        )
        }
    }
    return <group>{planes}</group>
}
const Scene = () => {

    // Set root number
    const [m, setM] = useState(3);    

    const lightRefs = useRef<(PointLight | null)[]>([])

    const freq = useRef< number >(1)

    // useFrame(({ clock }) => {
    //     const t = clock.getElapsedTime()
    //     // Loop over each light reference and update its position
    //     lightRefs.current.forEach((light, idx) => {
    //         if (light) {
    //             light.position.x = 15 * Math.sin(t * freq.current + idx)
    //             light.position.y = 5 * Math.cos(t * freq.current + idx) + 2
    //             // light.position.z = 15 * Math.cos(t * freq.current + idx)
    //         }
    //     })
    // })

    const lightPos = [
        {x: 0,y: 2,z: 0},
        {x: 2,y: 2,z: 0},
        {x: -2,y: 2,z: 0},
        // Horizontal axis 
        {x: 0,y: 2,z: 2},
        {x: 0,y: 2,z: -2},
        {x: 2,y: 2,z: -2},
        // Diagonal axis to right
        {x: 2,y: 2,z: 2},
        {x: -2,y: 2,z: -2},
        {x: -2,y: 2,z: 2},
    ]


    return (
        <>
            <hemisphereLight color={0xffffff} groundColor="#444444" intensity={0.3} />

            {/* <ambientLight intensity={1.} color="red" /> */}
            {Array.from({length: m*m}).map((_,idx) => {
                return(
                    <pointLight 
                        key={idx}
                        position={[lightPos[idx].x, lightPos[idx].y, lightPos[idx].z]}
                        // position={[(m * m) - idx, 5, - (m * m) + idx]}  // Make sure this expression is valid
                        intensity={10}
                        ref={(el) => lightRefs.current[idx] = (el)} 
                        castShadow 
                        power={ 5 * Math.PI * 4 }
                        color={0xffffff} 
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-radius={1}
                        shadow-bias={-0.0001}
                    />
                )
            })}
            {/* 0, 1, 2, 3, 4, 5 ,6 ,7 ,8 ,9 */}
            {/* <pointLight 
                position={[0, 5, 1]}
                intensity={100} ref={lightRef2} 
                castShadow 
                power={ 100 * Math.PI * 4 }
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-radius={1}
                shadow-bias={-0.0001}
            />
            <pointLight 
                position={[0, 5, 1]}
                intensity={100} ref={lightRef2} 
                castShadow 
                power={ 100 * Math.PI * 4 }
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-radius={1}
                shadow-bias={-0.0001}
            /> */}
            {/* <pointLight
                position={[0,5,-5]}
                intensity={10}
                ref={lightRef3}
                castShadow
                // receiveShadow
            /> */}

            <group key={"cave"}>
                <mesh position={[0,0,0]} scale={[1,1,1]} castShadow receiveShadow>
                    <boxGeometry args={[1,1,1]} 
                        name='geoBox'
                    />
                    <meshStandardMaterial
                        roughness={0.5}
                        metalness={0.5}
                        name='geoMesh'
                        clipShadows
                        color={"white"}
                        // shadowSide={THREE.DoubleSide} // explicitly tell the material to compute shadows on both sides
                        side={THREE.FrontSide}
                    />
                </mesh>
                <GridOfPlanes/>
                {/* <mesh position={[0, -1 ,0]} scale={[1,1,1]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
                    <planeGeometry args={[10,10,64,64]}
                        name='geoPlane'
                    />
                    <meshStandardMaterial
                        color={"white"}
                        clipShadows
                        roughness={0.5}
                        metalness={0.5}
                        name='geoMesh'


                        side={THREE.FrontSide}
                        shadowSide={THREE.FrontSide} // explicitly tell the material to compute shadows on both sides

                        // shadowSide={  }
                    />  
                </mesh> */}
            </group>
        </>
    )
}

const LightTest1 = () => {
    return (
        <div className='light-comp'>
            <Canvas
                className='canvas-comp'
                shadows
                // flat
                // gl={{ antialias: true, alpha:true }}
                camera={{  position: [ 0, 0, 10 ]}}
            >
                {/* <Environment preset="dawn" /> */}
                <Scene/>
                
                <OrbitControls/>
            </Canvas>
        </div>
    )
}

export default LightTest1