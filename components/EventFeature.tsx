import {
  Box,
  Stack,
  Tag,
  TagLeftIcon,
  TagLabel,
  AspectRatio,
  Image,
  Text,
  HStack,
} from '@chakra-ui/react';

import { FaCalendarDay, FaClock } from 'react-icons/fa';
import NextLink from 'next/link';

const EventFeature = ({ node }: { node: any }) => {
  const returnLink = (type: string, handle: string) => {
    switch (type) {
      case 'Benefit':
        return `/benefit/${node.handle}`;
      case 'Live Event':
        return `/event/${node.handle}`;
      case 'On-Demand Workshop':
        return `/workshop/${node.handle}`;
      default:
        return `/event/${node.handle}`;
    }
  };

  return (
    <NextLink href={returnLink(node.productType, node.handle)} passHref>
      <Box
        shadow={'sm'}
        border={'1px solid rgba(0,0,0,0.05)'}
        borderRadius={'10px'}
        p={4}
        cursor={'pointer'}
        bgColor="white"
      >
        <Stack
          direction={'row'}
          spacing={2}
          mb={2}
          alignItems={'center'}
          justifyContent={'flex-start'}
        >
          <Tag size="md">{node.productType}</Tag>
        </Stack>
        <Stack direction={["column", 'row']} spacing={5}>
          <Stack alignItems={'flex-start'}>
            <AspectRatio ratio={1 / 1} boxSize={['full', '250px']}>
              <Image
                borderRadius={'5px'}
                src={node.images.edges[0].node.transformedSrc}
                minWidth={'100%'}
                alt={node.title}
              />
            </AspectRatio>
          </Stack>
          <Stack alignItems={'flex-start'} spacing={4}>
            <Box>
              <Text fontSize="2xl">{node.title}</Text>
              <Text>with {node.teacher?.value}</Text>
            </Box>
            <HStack>
              {node.productType !== 'On-Demand Workshop' && (
                <Tag size="lg">
                  <TagLeftIcon boxSize={4} as={FaCalendarDay} />
                  <TagLabel>
                    {new Date(
                      node.date?.value
                    ).toLocaleDateString()}
                  </TagLabel>
                </Tag>
              )}
              <Tag size="lg">
                <TagLeftIcon boxSize={4} as={FaClock} />
                <TagLabel>{node.duration?.value}</TagLabel>
              </Tag>
            </HStack>
            <Text noOfLines={5}>{node.description}</Text>
          </Stack>
        </Stack>
      </Box>
    </NextLink>
  );
};

export default EventFeature;
