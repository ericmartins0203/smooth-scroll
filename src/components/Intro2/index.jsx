import React, { useLayoutEffect, useRef } from 'react'
import styles from './style.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const anim = {
  initial: {
    opacity: 0
  },
  open: (i) => ({
    opacity: 1,
    transition: {duration: 0, delay: 0.03 * i}
  }),
  closed: (i) => ({
    opacity: 0,
    transition: {duration: 0, delay: 0.03 * i}
  })
}

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

  /**
   * Shuffles array in place (Fisher–Yates shuffle).
   * @param {Array} a items An array containing the items.
   */
  const shuffle = (a) => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  const getBlocks = () => {
    const { innerWidth, innerHeight } = window;
    const blockSize = innerWidth * 0.05;
    const nbOfBlocks = Math.ceil(innerHeight / blockSize);
    const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map( (_, i) => i))
    return shuffledIndexes.map( (randomIndex, index) => {
      return (
        <motion.div 
          key={index} 
          className={styles.block}
          variants={anim}
          initial="initial"
          animate={menuIsActive ? "open" : "closed"}
          custom={randomIndex}
        />
      )
    })
  }

  return (
    <>
      <div className={styles.pixelBackground}>
        {
          [...Array(20)].map( (_, index) => {
            return <div key={index} className={styles.column}>
              {
                (typeof window !== 'undefined') && getBlocks()
              }
            </div>
          })
        }
      </div>
      <div className={styles.intro}>

        <div className={styles.backgroundImage} ref={background}>
          <Image 
            src={'/images/background.jpeg'}
            fill={true}
            alt="background image"
            priority={true}
          />
        </div>
        
        <div className={styles.introContainer}>
          <div ref={introImage} data-scroll data-scroll-speed="0.3" className={styles.introImage}>
            <Image
              src={'/images/intro.png'}
              alt="intro image"
              fill={true} 
              priority={true}
            />
          </div>
          <h1 data-scroll data-scroll-speed="0.7">SMOOTH SCROLL</h1>
        </div>
      </div>
    </>
  )
}