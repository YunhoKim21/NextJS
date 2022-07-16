import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function TorusKnotGeomoery(props) {
  const mesh = useRef()
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  useFrame((state, delta) => (mesh.current.rotation.y += 0.01))
  return (
    <mesh {...props} ref={mesh} scale={0.1}>
      <torusKnotGeometry args={[10, 3, 100, 32, 2, 5]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  )
}

export default function test() {
  return (
    <div style={{ position: 'relative', height: 500 }}>
      <Canvas width="1">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <TorusKnotGeomoery position={[0, 0, 0]} />
      </Canvas>
    </div>
  )
}
