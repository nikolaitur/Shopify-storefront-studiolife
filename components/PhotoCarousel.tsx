import { Box, AspectRatio, Image, ImageProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { wrap } from "@popmotion/popcorn";

const MotionImage = motion<ImageProps>(Image);

function PhotoCarousel({ images }: any) {
  const controls = useAnimation();

  const [[page, direction], setPage] = useState([0, 0]);

  const index = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Box
      pos="sticky"
      top={20}
      maxW={["100%"]}
      minW={["100%"]}
      maxH={["400px", "100%"]}
    >
      <AspectRatio ratio={1}>
        <AnimatePresence exitBeforeEnter>
          <MotionImage
            key={images[index].node.url}
            src={images[index].node.url}
            alt={``}
            objectFit="fill"
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          />
        </AnimatePresence>
      </AspectRatio>
      {images.length > 1 && (
        <>
          <Box
            pos="absolute"
            left={10}
            bottom={[4, "50%"]}
            onClick={() => paginate(-1)}
            fontSize={"2xl"}
          >
            ←
          </Box>
          <Box
            pos="absolute"
            right={10}
            bottom={[4, "50%"]}
            onClick={() => paginate(1)}
            fontSize={"2xl"}
          >
            →
          </Box>
        </>
      )}
    </Box>
  );
}

export default PhotoCarousel;
