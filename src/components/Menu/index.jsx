import React, { useLayoutEffect, useRef } from 'react'
import styles from './style.module.css';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Link from 'next/link';


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

export default function Menu({menuIsActive, setMenuIsActive}) {

  useLayoutEffect( () => {

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
      <Link 
        onClick={() => setMenuIsActive(false)} 
        href={'#top'}
      >
        <p className='text'>Home</p>
      </Link>
      <Link 
        onClick={() => setMenuIsActive(false)} 
        href={'#description'}
      >
        <p className='text'>Description</p>
      </Link>
      <Link 
        onClick={() => setMenuIsActive(false)} 
        href={'#projects'}
      >
        <p className='text'>Places</p>
      </Link>
    </motion.div>
  )
}