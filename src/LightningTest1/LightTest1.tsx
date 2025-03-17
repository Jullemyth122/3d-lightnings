import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, SSAO } from '@react-three/postprocessing'
import { useEffect, useMemo, useRef } from 'react'
import { PointLight } from 'three'
import * as THREE from 'three'
const Scene = () => {
    
    const lightRef = useRef< PointLight |  null>(null)
    const lightRef2 = useRef< PointLight |  null>(null)
    const lightRef3 = useRef< PointLight |  null>(null)
    const freq = useRef< number >(1)

    useFrame(({ clock }) => {
        if (lightRef.current && lightRef2.current) {
            lightRef.current.position.x = 10 * Math.sin(clock.getElapsedTime() * freq.current)
            lightRef2.current.position.x = 10 * Math.cos(clock.getElapsedTime() * freq.current)
            // lightRef.current.rotation.y = 10 * Math.sin(clock.getElapsedTime() * freq.current)
        }
    })


    return (
        <>
            {/* <ambientLight intensity={0.25} color="#ffffff" /> */}

            <pointLight 
                position={[0, 5, 5]} 
                intensity={100} ref={lightRef} 
                castShadow 
                power={ 100 * Math.PI * 4 }
                color={0xffffff} 
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-radius={2}
                shadow-bias={-0.0001}
            />
            <pointLight 
                position={[0, 10, 0]}
                intensity={100} ref={lightRef2} 
                castShadow 
                power={ 100 * Math.PI * 4 }
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-radius={2}
                shadow-bias={-0.0001}
            />
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
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <mesh position={[0, -1 ,0]} scale={[1,1,1]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
                    <planeGeometry args={[10,10,64,64]}
                        name='geoPlane'
                    />
                    <meshStandardMaterial
                        color={"white"}
                        clipShadows
                        roughness={0.5}
                        metalness={0.5}
                        name='geoMesh'
                        side={THREE.DoubleSide}
                        // shadowSide={THREE.DoubleSide} // explicitly tell the material to compute shadows on both sides

                        // shadowSide={  }
                    />  
                </mesh>
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
                <Scene/>
                <OrbitControls/>
{/* 
                <EffectComposer multisampling={8}>
                    <SSAO samples={31} radius={0.1} intensity={40} luminanceInfluence={0.6} color={ new THREE.Color(1,1,1) } />
                </EffectComposer> */}
            </Canvas>
        </div>
    )
}

export default LightTest1