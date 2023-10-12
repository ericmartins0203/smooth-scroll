'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import Intro from '../components/Intro2';
import Description from '../components/Description';
import Projects from '../components/Projects';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Preloader from '../components/Preloader'

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [menuIsActive, setMenuIsActive] = useState(false);

  useEffect( () => {

    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()

  }, [])

  useEffect( () => {
    setTimeout( () => {
      setIsLoading(false);
      document.body.style.cursor = 'default'
      window.scrollTo(0,0);
    }, 2000)
  }, [])

  return (
    <main className={styles.main}>
      {isLoading && <Preloader />}
      <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive}/>
      <Menu menuIsActive={menuIsActive}/>
      <Intro menuIsActive={menuIsActive}/>
      <Description />
      <Projects />
    </main>
  )
}
