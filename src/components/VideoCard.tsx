import React,{useState, useEffect, useCallback} from 'react';
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary';
import { Download, Clock, FileDown, FileUp } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {filesize} from 'filesize';
import { Video } from '@prisma/client';
import { get } from 'http';

dayjs.extend(relativeTime);

interface VideoCardProps {
    video: Video;
    onDownload: (url: string, title: string) => void;
}
const VideoCard: React.FC<VideoCardProps> = ({video, onDownload}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [previewError, setPreviewError] = useState(false);

    const getThumbnailUrl = useCallback((publicId: string) => {

        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: "fill",
            quality: "auto",
            format: "jpg",
            assetType: "video",
        })
        
    },[])
    return (
        <div>
            Video Card
        </div>
    );
};

export default VideoCard;