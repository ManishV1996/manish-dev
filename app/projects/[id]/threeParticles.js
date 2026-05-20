"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeParticles() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const palette   = [
      new THREE.Color(0x3b82f6),
      new THREE.Color(0x6366f1),
      new THREE.Color(0x14b8a6),
      new THREE.Color(0x8b5cf6),
    ];
    for (let i = 0; i < count; i++) {
      positions[i*3]   = (Math.random() - .5) * 12;
      positions[i*3+1] = (Math.random() - .5) * 12;
      positions[i*3+2] = (Math.random() - .5) * 8;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const cv = document.createElement('canvas');
    cv.width = 32; cv.height = 32;
    const cx = cv.getContext('2d');
    const gr = cx.createRadialGradient(16,16,0,16,16,16);
    gr.addColorStop(0,  'rgba(255,255,255,1)');
    gr.addColorStop(.4, 'rgba(255,255,255,.6)');
    gr.addColorStop(1,  'rgba(255,255,255,0)');
    cx.fillStyle = gr;
    cx.fillRect(0, 0, 32, 32);

    const mat = new THREE.PointsMaterial({
      size: .04, vertexColors: true,
      map: new THREE.CanvasTexture(cv),
      transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: .7,
    });

    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    const tr = { x: 0, y: 0 };
    const onMM = (e) => {
      tr.y = ((e.clientX / window.innerWidth)  * 2 - 1) * .4;
      tr.x = (-(e.clientY / window.innerHeight) * 2 + 1) * .2;
    };
    const onR = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('mousemove', onMM);
    window.addEventListener('resize', onR);

    let id;
    const animate = () => {
      id = requestAnimationFrame(animate);
      pts.rotation.y += (tr.y - pts.rotation.y) * .04;
      pts.rotation.x += (tr.x - pts.rotation.x) * .04;
      pts.rotation.y += .0008;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', onMM);
      window.removeEventListener('resize', onR);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
}