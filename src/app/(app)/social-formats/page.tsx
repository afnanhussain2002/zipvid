
import React, { use, useRef, useState } from 'react'

function SocialFormats() {

    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<SocialFormats>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
  return (
    <div>SocialFormats</div>
  )
}

export default SocialFormats