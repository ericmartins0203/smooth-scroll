import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './style.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Centered from '../PixelTransition/Centered/Index';
import Horizontal from '../PixelTransition/Horizontal';
import Vertical from '../PixelTransition/Vertical';


export default function Index({menuIsActive}) {

  const background = useRef(null);
  const introImage = useRef(null);  

  useLayoutEffect( () => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: "top",
        end: "+=500px",
      },
    })
    timeline
      .from(background.current, {clipPath: `inset(15%)`})
      .to(introImage.current, {height: "200px"}, 0)
  }, [])

  return (
    <div className={styles.container}>
      <Centered menuIsActive={menuIsActive}/>
      <div className={styles.intro}>

        <div className={styles.backgroundImage} ref={background}>
          <Image 
            src={'/images/background.jpeg'}
            fill={true}
            alt="background image"
            priority={true}
            quality={100}
          />
        </div>
        
        <div className={styles.introContainer}>
          <div ref={introImage} data-scroll data-scroll-speed="0.3" className={styles.introImage}>
            <Image
              src={'/images/intro.png'}
              alt="intro image"
              fill={true} 
              priority={true}
              quality={100}
            />
          </div>
          <h1 data-scroll data-scroll-speed="0.7">SMOOTH SCROLL</h1>
        </div>
      </div>
    </div>
  )
}