'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import Intro from '../components/Intro2';
import Description from '../components/Description';
import Projects from '../components/Projects';
import Header from '../components/Header';
import Menu from '../components/Menu';

export default function Home() {

  const [menuIsActive, setMenuIsActive] = useState(false);

  useEffect( () => {

    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()

  }, [])

  return (
    <main className={styles.main}>
      <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive}/>
      <Menu menuIsActive={menuIsActive}/>
      <Intro menuIsActive={menuIsActive}/>
      <Description />
      <Projects />
    </main>
  )
}
