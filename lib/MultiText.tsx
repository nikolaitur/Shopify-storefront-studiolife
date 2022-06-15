import { Text } from "@chakra-ui/react";

declare interface MultiTextProps {
    text: string
    mapKey: string
    fontSize? : string
}

export default function MultiText({text, mapKey, fontSize}:MultiTextProps) {
  return (
    <>
      {text.split("\n").map((str: string, index: number) => (
        <Text fontSize={fontSize} key={`txtStr_${index}_${mapKey}`}>{str}</Text>
      ))}
    </>
  );
}
