import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import style from './marquee.module.css'
import React from 'react'

function Marquee({ text }: { text: string }) {
  const marqueeVariants = {
    animate: {
      x: [0, -500],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 5,
          ease: "linear",
        },
      },
    },
  };
  
  return (
    <Box className={style.marquee}>
      <Box
        as = {motion.div}
        className={style.track}
        variants={marqueeVariants}
        animate="animate"
      >
        {text}
      </Box>
    </Box>
  )
}

export default Marquee
