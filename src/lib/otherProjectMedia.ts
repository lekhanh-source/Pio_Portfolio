export type OtherProjectImage = {
  title: string;
  url: string;
  alt?: string;
};

export type OtherProjectVideo = {
  title: string;
  subtitle: string;
  url: string;
  embedUrl?: string;
  thumbnail?: string;
  orientation?: "portrait" | "landscape";
};

export const otherProjectImages: OtherProjectImage[] = [
  {
    title: "[Vincom Plaza] Cuộc thi vẽ",
    url: "/images/vincom1.jpg",
    alt: "Description of Project Image 1"
  },
  {
    title: "[Vincom Plaza] Cuộc thi tài năng nhí",
    url: "/images/vincom2.jpg",
    alt: "Description of Project Image 2"
  },
  {
    title: "[Vincom Plaza] Cam kết xanh",
    url: "/images/vincom3.jpg",
    alt: "Description of Project Image 3"
  },
  {
    title: "[Vincom Plaza] Đêm hội Halloween",
    url: "/images/vincom4.JPG",
    alt: "Description of Project Image 4"
  },
  {
    title: "[Vincom Plaza] Phê La",
    url: "/images/vincom5.JPG",
    alt: "Description of Project Image 5"
  },
  {
    title: "[Leo Arabica] Post Facebook",
    url: "/images/leo .png",
    alt: "Description of Project Image 6"
  },
  {
    title: "[Leo Arabica] Post Facebook",
    url: "/images/leo 2.png",
    alt: "Description of Project Image 7"
  },
  {
    title: "[Bách hóa DOCHI] Poster",
    url: "/images/dochi.jpg",
    alt: "Description of Project Image 8"
  }

];

export const otherProjectVideos: OtherProjectVideo[] = [
  {
    title: "[Edit] Video Studio",
    subtitle: "",
    url: "/video_stu1.mp4"
  },
  {
    title: "[Edit] Video Studio",
    subtitle: "",
    url: "/video_stu2.mp4"
  },
  {
    title: "[Edit] Video Bất Động Sản",
    subtitle: "",
    url: "/video_bds.mp4"
  },
  {
    title: "Video CLB",
    subtitle: "",
    url: "/video_clb.mp4"
  },
];
