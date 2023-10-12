import React, { useLayoutEffect, useRef } from 'react'
import styles from './style.module.css';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const anim = {
  initial: {
    opacity: 0
  },
  open: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
}

export default function Menu({menuIsActive}) {

  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);


  useLayoutEffect( () => {

    /* const tl = gsap.timeline()
    tl
      .to('.text', {
        opacity: 1,
        delay: 1,
        duration: 1,
        stagger: 0.2,
      })

    return () => {
      tl.kill()
    } */

    let ctx = gsap.context(() => {
      gsap
        .fromTo('.text', {
          opacity: 0,
        },{
          opacity: 1,
          duration: 1,
          delay: .5,
          stagger: 0.2, 
        })
      })
  
      return () => ctx.kill();
      
  }, [menuIsActive])

  return (
    <motion.div 
      className={styles.menu}
      variants={anim}
      initial="initial"
      animate={menuIsActive ? "open" : "closed"}
    >
      <p ref={text1} className='text'>Home</p>
      <p ref={text2} className='text'>About</p>
      <p ref={text3} className='text'>Contact</p>
    </motion.div>
  )
}