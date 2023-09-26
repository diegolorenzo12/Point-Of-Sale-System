import React from 'react'
import Image, { StaticImageData } from 'next/image'

import { Skeleton } from '@nextui-org/react';

export type imageProps = {
  radius: string;
  width: number;
  height: number;
  src: StaticImageData;
};

export default function LoadingImage({radius, width, height, src}: imageProps) {
    const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
        <Image
        radius={radius}
        width={width}
        height={height}
        alt="image"
        className="w-full object-cover h-[140px]"
        src={src}
        onLoad={()=>{setIsLoaded(true)}}
        />
        </Skeleton>
    </>
  )
}
