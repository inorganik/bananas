
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { Environment, useGLTF } from '@react-three/drei';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';


function Banana({ z }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF('/banana-v2-transformed.glb')

  // const [clicked, setClicked] = useState(false);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0,0,z])

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2), // -1 - 1
    y: THREE.MathUtils.randFloatSpread(height),
    rx: Math.random() * Math.PI,
    ry: Math.random() * Math.PI,
    rz: Math.random() * Math.PI,
  })

  useFrame((state) => {
    // move back and forth
    // ref.current.position.x = Math.sin(state.clock.elapsedTime) // -1 to 1

    // animate forward and back on click
    // ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, clicked ? 1 : 0, 0.1)

    // animate
    ref.current.rotation.set((data.rx += 0.005), data.ry, data.rz);
    ref.current.position.set(data.x * width, (data.y += 0.01), z)
    if (data.y > height / 1.2) {
      data.y = -height / 1.5;
    }
  
  });

  return (
    <mesh ref={ref} geometry={nodes.banana.geometry} material={materials['ripe-banana_u1_v1']} scale={0.2} />
  )
}

export default function App({ count = 100 }) {
  return <Canvas gl={{alpha: false }} camera={{ near: 0.01, far: 110 }}>
    <color attach="background" args={["#ffbf40"]} />
    <ambientLight intensity={0.5} />
    <Suspense fallback={null}>
      {[...Array(count)].map((_, i) => (<Banana key={i} z={-i} />))}
      <Environment preset="sunset" />
      <EffectComposer>
        <DepthOfField target={[0, 0, 10]} focalLength={0.2} bokehScale={11} height={700} />
      </EffectComposer>
    </Suspense>
  </Canvas>
}


