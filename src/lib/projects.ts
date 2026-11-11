import pMart from "../assets/p-mart.jpg";
import pFood from "../assets/p-food.jpg";
import pHT from "../assets/p-hangthu.jpg";
import pKOC from "../assets/p-KOC.jpg";
import pLEO from "../assets/p-LEO.jpg";
import pDental from "../assets/p-dental.avif";

export type Video = {
  title: string;
  platform: "TikTok" | "Facebook" | "YouTube" | "Local";
  orientation?: "portrait" | "landscape";
  subtitle?: string;
  sourceFile?: string;
  url?: string;
  thumbnail?: string;
  stats?: { views?: string; likes?: string; saves?: string };
};
export type ProjectImage = { title: string; url: string; alt?: string };
export type Step = { phase: string; text: string };
export type CaseStudy = {
  title: string;
  companyIntro: string;
  challenge: string;
  responsibilities: string;
  resultDetail: string;
};

export type Project = {
  slug: string;
  title: string;
  industry: string;
  category: string;
  role: string;
  period: string;
  image: string;
  tasks: string[];
  result: string;
  intro: string;
  caseStudy?: CaseStudy;
  resultImages?: ProjectImage[];
  images?: ProjectImage[];
  // sourceFile is the playback file; url is the original platform link.
  videos: Video[];
};

// Add new projects here — the gallery and detail pages render from this array.
export const projects: Project[] = [
  // project 1
  {
    slug: "uyen-uyen-mart",
    title: "Uyên Uyên Mart",
    industry: "FMCG / Retail",
    category: "Content Marketing",
    role: "Content Marketing",
    period: "08/2025 — 09/2026",
    image: pMart,
    tasks: [
      "Lên plan content",
      "Lên kế hoạch chương trình hàng tháng",
      "Viết caption",
      "Viết kịch bản short video",
      "Host",
      "Thiết kế ảnh",
      "Edit video ngắn",
      "Chạy quảng cáo cơ bản",
      "Lên lịch quay cho team",
      "Theo dõi tiến độ",
      "Báo cáo hiệu quả truyền thông",
    ],
    result: "~1.900% tăng trưởng fanpage",
    intro:
      "Uyên Uyên Mart là hệ thống siêu thị FMCG tại Nha Trang, cung cấp đa dạng sản phẩm tiêu dùng thiết yếu cho gia đình. Thương hiệu hướng đến hình ảnh gần gũi, tiện lợi, giá tốt và phù hợp với nhu cầu mua sắm hằng ngày của khách hàng địa phương.",
    resultImages: [
      { title: "", url: "/images/UUM_kq.jpg" },
    ],
    images: [
      {
        title: "",
        url: "https://hoangthihau.my.canva.site/about/_assets/media/20303bd3fa9619bfd7896236a6a4187d.png",
      },
      {
        title: "",
        url: "https://hoangthihau.my.canva.site/about/_assets/media/cf8607e4dc98edcd4240718fa5e056c2.png",
      },
      {
        title: "",
        url: "https://hoangthihau.my.canva.site/about/_assets/media/f8dce59da4d603c160cb2eb1191180bb.png",
      },
      {
        title: "",
        url: "https://hoangthihau.my.canva.site/about/_assets/media/58a0f2a12e506f51c394eecb8cffbce6.png",
      },
      {
        title: "",
        url: "https://hoangthihau.my.canva.site/about/_assets/media/a33e101b1deb763777529d7574d4e2d9.png",
      },
      {
        title: "",
        url: "https://hoangthihau.my.canva.site/about/_assets/media/1de4923154dcfed0069458cc8b052aee.png",
      },
      {
        title: "",
        url: "https://hoangthihau.my.canva.site/about/_assets/media/8c18da6e1349b75f4ae24b6a0fb8f334.png",
      },
    ],
    caseStudy: {
      title: " 📍THẾ GIỚI GIA DUNG UYÊN UYÊN",
      companyIntro:
        "Uyên Uyên Mart là hệ thống siêu thị FMCG tại Nha Trang, cung cấp đa dạng sản phẩm tiêu dùng thiết yếu cho gia đình. Thương hiệu hướng đến hình ảnh gần gũi, tiện lợi, giá tốt và phù hợp với nhu cầu mua sắm hằng ngày của khách hàng địa phương.",
      challenge:
        "Uyên Uyên Mart có nhiều chương trình bán hàng và sản phẩm cần cập nhật thông tin liên tục mỗi tháng. Vì vậy, thương hiệu cần một hệ thống nội dung rõ ràng, đồng bộ và đều đặn để hỗ trợ bán hàng, tăng nhận diện và giữ tương tác với khách hàng trên các nền tảng online.",
      responsibilities:
        "Tôi phụ trách Content Marketing cho Uyên Uyên Mart: lên plan content, kế hoạch chương trình hàng tháng, viết caption, kịch bản short video, host, thiết kế ảnh, edit video ngắn, chạy quảng cáo cơ bản, lên lịch quay cho team, theo dõi tiến độ và báo cáo hiệu quả truyền thông.",
      resultDetail:
        "Từ 08/2025 đến 09/2026, tỷ lệ tăng trưởng của page tăng khoảng 1.900%.",
    },
    videos: [
      {
        title: "Review sản phẩm",
        platform: "TikTok",
        sourceFile: "/UUM_video.mp4",
        url: "https://www.tiktok.com/@giadunguyenuyenmart/video/7561039022370360584",
        stats: { views: "511,4K", saves: "1,169", likes: "7,086" },
      },
      {
        title: "Video ads",
        platform: "Facebook",
        subtitle: "Mục tiêu: Chạy phủ",
        url: "https://www.facebook.com/reel/986738024250121",
      },
      {
        title: "Video trend",
        platform: "Facebook",
        url: "https://www.facebook.com/reel/1990239465221633",
        stats: { views: "72K", likes: "462" },
      },
    ],
  },

  // project 2
  {
    slug: "freelance-video",
    title: "HẰNG THU MEDIA",
    industry: "Agency · Truyền thông",
    category: "Content Marketing",
    role: "Content · Host Livestream",
    period: "Freelance",
    image: pHT,
    tasks: [
      "Lên kế hoạch nội dung hàng tháng",
      "Triển khai kế hoạch nội dung",
      "Viết kịch bản short video",
      "Livestream",
      "Lên kịch bản mega live",
    ],
    result: "Content · Short video · Mega live",
    intro:
      "Tại CT TNHH Hằng Thu Media, đảm nhận hai vai trò Content và Host Livestream: lên kế hoạch nội dung hàng tháng, triển khai kế hoạch, viết kịch bản short video, dẫn livestream và xây dựng kịch bản mega live.",
    images: [{ title: "", url: "" }],
    videos: [],
  },

  //project 3
  {
    slug: "food-review",
    title: "ALIBABA MEDIA",
    industry: "Truyền thông · F&B",
    category: "Content CREATOR",
    role: "Content Creator - Food Review",
    period: "Freelance",
    image: pFood,
    tasks: [
      "Lên plan nội dung hàng tháng",
      "Viết kịch bản",
      "Quay video",
      "Dựng và edit video",
      "Nhận job booking từ khách hàng",
      "Admin Page Lang Thang Nha Trang",
    ],
    result: "Short-form storytelling",
    intro:
      "CT TNHH Truyền Thông Sự kiện ALIBABA MEDIA — đảm nhận vị trí Content Creator - Food Review, phụ trách lên kế hoạch nội dung hàng tháng, sản xuất video review ẩm thực và quản trị Page Lang Thang Nha Trang.",
    images: [],
    videos: [
      {
        title: "Chả Cốm Lạc Thiện",
        platform: "TikTok",
        orientation: "portrait",
        sourceFile: "/LT_video1.mp4",
        url: "https://www.tiktok.com/@langthangnhatrangne/video/7515299647397563666",
        stats: { views: "114k", saves: "581", likes: "1,947" },
      },
      {
        title: "Ốc Cô LuốT",
        platform: "TikTok",
        orientation: "portrait",
        sourceFile: "/LT_video2.mp4",
        url: "https://www.tiktok.com/@langthangnhatrangne/video/7519363185992862984",
        stats: { views: "209.95k", saves: "2,415", likes: "4,993" },
      },
    ],
  },

  // project 4
  {
    slug: "again-group",
    title: "AGAIN GROUP",
    industry: "Giáo dục · Đào tạo",
    category: "Part time - TRỢ LÝ KOC",
    role: "Thư ký - Trợ lý",
    period: "05/2024 — 09/2024",
    image: pKOC,
    tasks: [
      "Tổ chức các buổi đào tạo thành viên",
      "Viết nội dung",
      "Thiết kế poster",
      "Trao đổi với đối tác và học viên",
    ],
    result: "Hỗ trợ đào tạo và vận hành",
    intro:
      "Đảm nhận vai trò Thư ký - Trợ lý tại CT CPĐT AGAIN GROUP, phụ trách tổ chức các buổi đào tạo thành viên, viết nội dung, thiết kế poster và trao đổi với đối tác, học viên.",
    videos: [],
  },

  // project 5
  {
    slug: "Freelance",
    title: "Xưởng cà phê Leo Arabica",
    industry: "F&B",
    category: "FREELANCE - PARTIME",
    role: "Content Marketing",
    period: "Freelance",
    image: pLEO,
    tasks: [
      "Lên kế hoạch content hàng tháng",
      "Thiết kế poster",
      "Triển khai kế hoạch nội dung",
    ],
    result: "Content Marketing & thiết kế poster",
    intro:
      "Phụ trách Content Marketing cho Xưởng cà phê LEO Arabica: lên kế hoạch nội dung hàng tháng, triển khai kế hoạch và thiết kế poster.",
    videos: [],
  },

  // project 6
  {
    slug: "Freelance",
    title: "NHA KHOA V DENTAL",
    industry: "Y tế · Nha khoa",
    category: "FREELANCE - PARTIME",
    role: "Content Marketing",
    period: "Chưa cập nhật",
    image: pDental,
    tasks: ["Viết content", "Thiết kế poster"],
    result: "Content & thiết kế poster",
    intro:
      "Phụ trách Content Marketing cho Nha khoa V Dental, thực hiện viết nội dung và thiết kế poster.",
    videos: [],
  },
  //project 7
   {
    slug: "Freelancer",
    title: "FREELANCE - PARTIME",
    industry: "F&B",
    category: "FREELANCE - PARTIME",
    role: "Content Marketing",
    period: "Freelance",
    image: pLEO,
    tasks: [
      "Admin kênh: Pio Đi Đâu Đấy",
      "Content Marketing - Nha Khoa V Dental",
      "Content Marketing - Xưởng cà phê LEO Arabica",
      "Event Runner - Hộ Kinh Doanh Mai Thanh Hùng",
      "Video editor, VJ",
    ],
    result: "Content Marketing & thiết kế poster",
    intro:
      "Phụ trách Content Marketing cho Xưởng cà phê LEO Arabica: lên kế hoạch nội dung hàng tháng, triển khai kế hoạch và thiết kế poster.",
    videos: [],
  },
  {
    slug: "Pio",
    title: "NHA KHOA V DENTAL",
    industry: "Y tế · Nha khoa",
    category: "FREELANCE - PARTIME",
    role: "Content Marketing",
    period: "Chưa cập nhật",
    image: pDental,
    tasks: ["Viết content", "Thiết kế poster"],
    result: "Content & thiết kế poster",
    intro:
      "Phụ trách Content Marketing cho Nha khoa V Dental, thực hiện viết nội dung và thiết kế poster.",
      images: [
        { title: "", url: "/images/pio_page.jpg" },
        { title: "", url: "/images/pio_di_dau.jpg" },
      ],
    videos: [
      {
        title: "Chợ đêm Nha Trang",
        platform: "TikTok",
        orientation: "portrait",
        sourceFile: "/pio_video1.mp4",
        url: "https://www.tiktok.com/@pio.didau/video/7680482467232386324?is_from_webapp=1&sender_device=pc",
        stats: { views: "34,76K", likes: "471" },
      },
      {
        title: "Mukbang mì khổng lồ",
        platform: "TikTok",
        orientation: "portrait",
        sourceFile: "/pio_video2.mp4",
        url: "https://www.tiktok.com/@pio.didau/video/7696375624700661012?is_from_webapp=1&sender_device=pc",
        stats: { views: "4,993", likes: "85" },
      },
    ],
  },
];

export function embedUrl(url: string): {
  kind: "iframe" | "video";
  src: string;
} {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (yt)
    return { kind: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  const tt = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
  if (tt)
    return { kind: "iframe", src: `https://www.tiktok.com/embed/v2/${tt[1]}` };
  if (/facebook\.com\/(?:reel|watch)\//.test(url)) {
    const cleanUrl = url.split("#")[0];
    return {
      kind: "iframe",
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(cleanUrl)}&show_text=false&adapt_container_width=true&width=560`,
    };
  }
  return { kind: "video", src: url };
}
