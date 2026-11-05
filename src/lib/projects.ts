import pMart from "../assets/p-mart.jpg";
import pFood from "../assets/p-food.jpg";
import pVideo from "../assets/p-video.jpg";

export type Video = { title: string; url?: string };
export type Step = { phase: string; text: string };

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
  process: Step[];
  // url: YouTube link, TikTok link, or direct .mp4 link. Leave empty to show a placeholder.
  videos: Video[];
};

// Add new projects here — the gallery and detail pages render from this array.
export const projects: Project[] = [
  {
    slug: "uyen-uyen-mart",
    title: "Uyên Uyên Mart",
    industry: "FMCG / Retail",
    category: "Content Marketing",
    role: "Content Marketing",
    period: "08/2024 — nay",
    image: pMart,
    tasks: ["Monthly content planning", "Campaign planning", "Short-form video scripting", "Video production", "Graphic design", "Internal MC & hosting", "Basic advertising"],
    result: "~1,900% page growth",
    intro: "Phụ trách toàn bộ nội dung fanpage và kênh video ngắn cho chuỗi tạp hóa Uyên Uyên Mart, từ lên kế hoạch đến sản xuất và chạy quảng cáo cơ bản.",
    process: [
      { phase: "Nghiên cứu", text: "Phân tích insight khách hàng khu vực, đối thủ và các sản phẩm chủ lực để xác định content pillar." },
      { phase: "Lên kế hoạch", text: "Xây dựng content calendar hàng tháng và kế hoạch campaign theo mùa, khuyến mãi." },
      { phase: "Sản xuất", text: "Viết kịch bản short video, quay dựng, thiết kế hình ảnh và trực tiếp làm MC nội bộ." },
      { phase: "Phân phối & tối ưu", text: "Đăng bài, chạy quảng cáo cơ bản, theo dõi số liệu và tối ưu nội dung mỗi tuần." },
    ],
    videos: [{ title: "Video campaign 01" }, { title: "Video campaign 02" }],
  },
  {
    slug: "food-review",
    title: "Food Review Series",
    industry: "F&B",
    category: "Food Review",
    role: "Content Creator",
    period: "Freelance",
    image: pFood,
    tasks: ["Concept & script", "Filming on location", "Storytelling hooks", "TikTok / Reels distribution"],
    result: "Short-form storytelling",
    intro: "Chuỗi video review ẩm thực ngắn, tập trung vào câu chuyện đằng sau mỗi quán ăn.",
    process: [
      { phase: "Ý tưởng", text: "Chọn quán, tìm câu chuyện đặc biệt và viết hook mở đầu." },
      { phase: "Quay", text: "Quay tại chỗ bằng điện thoại và gimbal, ưu tiên ánh sáng tự nhiên." },
      { phase: "Dựng", text: "Dựng trên CapCut, thêm nhạc, phụ đề và nhịp cắt nhanh." },
    ],
    videos: [{ title: "Review 01" }],
  },
  {
    slug: "freelance-video",
    title: "Freelance Video Production",
    industry: "Multi-brand",
    category: "Video Production",
    role: "Editor",
    period: "Freelance",
    image: pVideo,
    tasks: ["Filming", "CapCut editing", "Livestream production", "AI-assisted visuals"],
    result: "+5 freelance projects",
    intro: "Quay dựng video và hỗ trợ livestream cho nhiều thương hiệu nhỏ.",
    process: [
      { phase: "Brief", text: "Trao đổi mục tiêu, đối tượng và phong cách với khách hàng." },
      { phase: "Sản xuất", text: "Quay, dựng, kết hợp công cụ AI để tạo hình ảnh hỗ trợ." },
      { phase: "Bàn giao", text: "Chỉnh sửa theo feedback và bàn giao bản cuối." },
    ],
    videos: [{ title: "Showreel" }],
  },
];

export function embedUrl(url: string): { kind: "iframe" | "video"; src: string } {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  const tt = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
  if (tt) return { kind: "iframe", src: `https://www.tiktok.com/embed/v2/${tt[1]}` };
  return { kind: "video", src: url };
}
