
import React, { useState, useEffect } from 'react'
import styles from '../Centered/style.module.css';
import { motion } from 'framer-motion';

const anim = {
  initial: {
    opacity: 0
  },
  open: (delay) => ({
    opacity: 1,
    transition: {duration: 0, delay: 0.02 * delay[0]}
  }),
  closed: (delay) => ({
    opacity: 0,
    transition: {duration: 0, delay: 0.02 * delay[1]}
  })
}

export default function Horizontal({menuIsActive}) {

  const [width, setwidth] = useState(1200);
  const [height, setheight] = useState(900);
  
  /**
   * Shuffles array in place (Fisher–Yates shuffle).
   * @param {Array} a items An array containing the items.
   */
  const shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  useEffect(() => {
    const { innerWidth, innerHeight } = window;

    setwidth(innerWidth)
    setheight(innerHeight)
    
  },[width, height])

  const getBlocks = (indexOfColum) => {
    const blockSize = width * 0.05;
    const nbOfBlocks = Math.ceil(height / blockSize);
    const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map( (_, i) => i))
    return shuffledIndexes.map( (randomIndex, index) => {
      return (
        <motion.div 
          key={index} 
          className={styles.block}
          variants={anim}
          initial="initial"
          animate={menuIsActive ? "open" : "closed"}
          custom={[indexOfColum + randomIndex, (20 - indexOfColum + randomIndex)]}
        />
      )
    })
  }

  return (
    <div className={styles.pixelBackground}>
      {
        [...Array(20)].map( (_, index) => {
          return <div key={index} className={styles.column}>
            {
              getBlocks(index)
            }
          </div>
        })
      }
    </div>
  )
}