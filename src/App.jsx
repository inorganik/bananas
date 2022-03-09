
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';


function Box() {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    // move back and forth
    // ref.current.position.x = Math.sin(state.clock.elapsedTime) // -1 to 1

    // animate forward and back on click
    // ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, clicked ? 1 : 0, 0.1)

    // go up and down
    ref.current.position.y += 0.01
    if (ref.current.position.y > 3) {
      ref.current.position.y = -3;
    }
  });

  return (
    <mesh ref={ref} onClick={() => setClicked(!clicked)}>
      <boxGeometry />
      <meshBasicMaterial color="green" />
    </mesh>
  )
}

export default function App() {
  return <Canvas>
    <Box />
  </Canvas>
}


