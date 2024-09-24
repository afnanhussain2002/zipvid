import React,{useState, useEffect, useCallback} from 'react';
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary';
import { Download, Clock, FileDown, FileUp } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {filesize} from 'filesize';
import { Video } from '@prisma/client';

dayjs.extend(relativeTime);


const VideoCard = () => {
    return (
        <div>
            Video Card
        </div>
    );
};

export default VideoCard;