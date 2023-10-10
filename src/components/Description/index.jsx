import React, { useLayoutEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import styles from './style.module.css';

const phrases = ["Los Flamencos National Reserve", "is a nature reserve located", "in the commune of San Pedro de Atacama", "The reserve covers a total area", "of 740 square kilometres (290 sq mi)"]

export default function Index() {

  return (
    <div className={styles.description} >
      {
        phrases.map( (phrase, index) => {
          return <AnimatedText key={index}>{phrase}</AnimatedText>
        })
      }
    </div>
  )
}

function AnimatedText({children}) {
  const text = useRef(null);
  const [width, setwidth] = useState(0);

  useLayoutEffect( () => {
    setwidth(window.innerWidth)
  },[])


  useLayoutEffect( () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(text.current, {
      scrollTrigger: {
        trigger: text.current,
        scrub: true,
        start: width > 600 ? "0px bottom" : `200px bottom`,
        end: "bottom+=400px bottom",
      },
      opacity: 0,
      left: "-200px",
      ease: "power3.Out"
    })
  }, [])

  return <p ref={text}>{children}</p>
}