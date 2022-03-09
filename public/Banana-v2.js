/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/banana-v2-transformed.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.banana.geometry} material={materials['ripe-banana_u1_v1']} scale={0.2} />
    </group>
  )
}

useGLTF.preload('/banana-v2-transformed.glb')
