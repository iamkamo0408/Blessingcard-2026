import React, { useState, useRef, useEffect } from "react";
import { RefreshCw, Share2, Heart } from "lucide-react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// 12則天父恩典卡內容資料庫
const BLESSINGS = [
  {
    title: "全新的開始",
    subtitle: "揮別過去",
    content:
      "我心愛的孩子，揮別過去的一年，無論你有多少遺憾、挫折或疲憊，我都已經為你畫下句點。看哪！我正在你的生命中做一件新事。你過往的眼淚我都珍藏，但現在我要在你的曠野開道路，在你的沙漠開江河。不要再被過去的失敗轄制，因為你在我眼中是新造的人。帶著期盼的心，勇敢地邁開步伐吧！我與你同在。",
    verse: "愛你的天父",
  },
  {
    title: "神聖的引導",
    subtitle: "未來的方向",
    content:
      "寶貝孩子，我知道你對前方有時會感到迷惘，但請放心將你的手交給我。我已經為你的新的一年點亮了晨星，我的話語會是你腳前的燈、路上的光。你不需要獨自摸黑前行，因為我已經為你預備了專屬的道路。當你安靜下來，你會聽見我在你後邊說：「這是正路，要行在其間。」你的未來在我的手中，絕對安全！",
    verse: "愛你的天父",
  },
  {
    title: "無條件的接納",
    subtitle: "身分與歸屬",
    content:
      "我珍貴的孩子，在這個歡慶的季節裡，我最想給你的禮物，就是將你緊緊擁抱。世人看重你的成就與表現，但我只在乎你這個人。你不需要為了討好我而證明什麼，因為你在母腹中時，我就已經深深愛上你了。你是我用重價贖回的珍寶，在我的家中，永遠有為你保留的最佳位置。安心地在我愛中休息吧！",
    verse: "愛你的天父",
  },
  {
    title: "屬天的供應",
    subtitle: "豐盛的恩典",
    content:
      "我鍾愛的孩子，新的一年，我要以恩典為你年歲的冠冕，你的路徑都必滴下脂油！不要為明天憂慮，也不要害怕匱乏。我是使無變有的神，我掌管萬有，而我樂意將國度賜給你。你生命中那些看似乾涸的領域，即將迎來春雨的滋潤。張開你的雙手，預備好領受那從天上傾倒下來、甚至無處可容的豐盛祝福！",
    verse: "愛你的天父",
  },
  {
    title: "突破與得勝",
    subtitle: "力量與勇敢",
    content:
      "勇敢的孩子，我知道過去這段時間你面對了許多挑戰，但你比你想像的還要堅強，因為我的靈居住在你裡面！新的一年，我要賜給你如鷹展翅上騰的力量。那些曾經攔阻你前進的高山，都要在你面前成為平地。不要害怕敵人的謊言，穿上我為你預備的軍裝，我已經為你吹響了得勝的號角。去吧！得著我應許給你的產業！",
    verse: "愛你的天父",
  },
  {
    title: "深度的醫治",
    subtitle: "饒恕與恢復",
    content:
      "我疼愛的孩子，來到我這裡，把你心中的重擔和隱藏的傷痛都交給我。我溫柔的雙手正在撫平你靈魂的皺褶。那些別人不理解的委屈，我都懂。我已經用我的愛，為你包紮好每一個傷口。新的一年，我要賜給你自由，讓你能饒恕那些傷害你的人，也饒恕你自己。你將會煥然一新，散發出前所未有的榮美與光芒。",
    verse: "愛你的天父",
  },
  {
    title: "美好的時機",
    subtitle: "等候的盼望",
    content:
      "滿有盼望的孩子，請不要對我的時間表感到灰心。你以為我遲延了，但其實我正在為你編織一個更美麗的計畫。你所付出的每一次禱告、每一滴眼淚，我都沒有忘記。耐心等候我，因為春天已經在不遠處。我為你預備的驚喜即將破土而出，當那個時刻到來，你會明白這一切的等待都是值得的。我是使萬事互相效力的神！",
    verse: "愛你的天父",
  },
  {
    title: "無可取代的呼召",
    subtitle: "使命與價值",
    content:
      "我獨一無二的孩子，你在這個世界上不是一個偶然，你是我精心設計的傑作！新的一年，我要打開你屬靈的眼睛，讓你真知道我對你生命那榮耀的呼召。不要小看自己年輕，也不要覺得自己微不足道。我已經將特殊的恩賜與才華放在你裡面。去發揮你的影響力吧！我要透過你的生命，成為這個世代許多人的祝福與光。",
    verse: "愛你的天父",
  },
  {
    title: "安息與平靜",
    subtitle: "內在的安全感",
    content:
      "我親愛的孩子，外面世界的喧囂與變動，無法奪走我賜給你的平安。當你感到焦慮、思緒混亂時，回到我的同在裡。我為你預備了青草地和可安歇的水邊。你不需要總是急著向前奔跑，有時候，停下來享受與我獨處的時光，是你重新得力的關鍵。在我的愛裡沒有懼怕，你可以完全放鬆，因為我是你堅固的避難所。",
    verse: "愛你的天父",
  },
  {
    title: "關係的修復",
    subtitle: "愛與連結",
    content:
      "充滿愛的孩子，我看見你對真實關係的渴望，也看見你在人際互動中的掙扎。新的一年，我要在你的關係中行奇妙的恢復之工。我要賜給你屬天的智慧和寬廣的心，去愛那些不可愛的人。我也會將那些能與你一起並肩作戰、真實扶持你的屬靈家人帶到你身邊。你不會孤單，我們要在這屬靈的家中一起成長、一起經歷愛。",
    verse: "愛你的天父",
  },
  {
    title: "不變的承諾",
    subtitle: "永恆的盟約",
    content:
      "我立約的孩子，天地都要廢去，但我對你的愛永遠長存。大山可以挪開，小山可以遷移，但我對你施恩的慈愛絕不離開你。當你軟弱時，我的恩典顯得更加完全；當你失信時，我依然是可信的。不要懷疑我對你的承諾，我是創始成終的神，我既然在你心裡動了善工，就必定成全這工，直到耶穌基督的日子！",
    verse: "愛你的天父",
  },
  {
    title: "喜樂的泉源",
    subtitle: "從神而來的滿足",
    content:
      "喜樂的孩子，新的一年，我要將極大的喜樂澆灌在你的生命中！這不是建立在環境順遂上的快樂，而是從聖靈而來、深處的滿足。我要挪去你身上的悲哀，為你披上讚美的衣裳。學習在每個微小的恩典中看見我的手，你的心將會如湧流的泉源般不斷發出讚美。準備好迎接充滿笑聲與奇蹟的一年吧，因為我是你的喜樂！",
    verse: "愛你的天父",
  },
];

// 刮刮卡畫布組件
const ScratchCard = ({ onReveal, isRevealed, width = 300, height = 400 }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // 初始化畫布：銀色塗層
    if (!isRevealed) {
      ctx.fillStyle = "#CCCCCC"; // 銀灰色
      ctx.fillRect(0, 0, width, height);

      // 添加一些裝飾紋理，讓它看起來像刮刮卡
      ctx.fillStyle = "#BBBBBB";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // 隨機畫一些雜訊點或文字
      for (let i = 0; i < 30; i++) {
        ctx.fillText("刮", Math.random() * width, Math.random() * height);
      }

      // 加上「請刮開」的提示
      ctx.fillStyle = "#666666";
      ctx.font = 'bold 24px "Noto Sans TC", sans-serif';
      ctx.fillText("請刮開領受祝福", width / 2, height / 2);
    }
  }, [width, height]);

  // 檢查刮開的比例 (優化版：採樣檢查，避免無限迴圈誤判)
  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // 獲取像素數據
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    // 優化關鍵：採樣率。每 10 個像素檢查 1 個，運算量減少 10 倍，但準確度幾乎不變
    const sampleRate = 10;
    const step = 4 * sampleRate; // 每個像素佔 4 個值 (R,G,B,A)，所以跳 4 * 10 格

    // 迴圈次數大幅減少，不會觸發 CodeSandbox 的保護機制
    for (let i = 3; i < pixels.length; i += step) {
      if (pixels[i] < 128) {
        // Alpha 值小於 128 視為透明
        transparentPixels++;
      }
    }

    // 計算總檢查點數
    const totalPixelsChecked = pixels.length / step;
    const percent = (transparentPixels / totalPixelsChecked) * 100;

    setScratchedPercent(percent);

    if (percent > 45 && !isRevealed) {
      // 刮開超過 45% 就自動全開
      onReveal();
    }
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    checkReveal();
  };

  const draw = (e) => {
    if (!isDrawing && e.type !== "mousedown" && e.type !== "touchstart") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;

    if (e.type.includes("touch")) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      // 防止手機上拖動時畫面滾動
      // 注意：這在某些新版瀏覽器可能需要 passive: false 設定，但在 React 中直接寫 e.preventDefault 可能無效
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI); // 筆刷大小
    ctx.fill();
  };

  if (isRevealed) return null; // 如果已經揭曉，隱藏畫布

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute top-0 left-0 z-10 cursor-crosshair touch-none rounded-xl"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      style={{ touchAction: "none" }} // 關鍵：防止手機滾動
    />
  );
};

export default function App() {
  const [currentCard, setCurrentCard] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showCover, setShowCover] = useState(true);

  // 隨機抽取一張卡片
  const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * BLESSINGS.length);
    setCurrentCard(BLESSINGS[randomIndex]);
    setIsRevealed(false);
    setShowCover(false);
  };

  const reset = () => {
    setCurrentCard(null);
    setIsRevealed(false);
    setShowCover(true);
  };

  // 複製文字功能
  const copyToClipboard = () => {
    if (!currentCard) return;
    const text = `${currentCard.title} - ${currentCard.subtitle}\n\n${currentCard.content}\n\n${currentCard.verse}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("祝福內容已複製！快傳給朋友吧！");
      })
      .catch((err) => {
        console.error("複製失敗:", err);
      });
  };

  // 自動揭曉處理
  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center py-8 px-4 font-sans text-gray-800">
      {/* 標題區 */}
      <div className="text-center mb-8">
        <div className="inline-block p-2 bg-red-600 text-white rounded-lg shadow-lg mb-2">
          <span className="text-sm font-bold tracking-widest">
            2026 新春特輯
          </span>
        </div>
        <h1 className="text-4xl font-bold text-red-800 mb-2 drop-shadow-sm">
          天父恩典刮刮卡
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          每一張卡片，都是天父對你專屬的愛與應許。
          <br />
          憑信心領受，刮出屬於你的年度祝福！
        </p>
      </div>

      {/* 主要互動區 */}
      <div className="relative w-full max-w-[340px] aspect-[3/4] bg-white rounded-2xl shadow-2xl border-4 border-yellow-400 overflow-hidden">
        {/* 1. 封面：尚未抽卡 */}
        {showCover && (
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 flex flex-col items-center justify-center p-6 text-center z-20">
            <Heart className="w-16 h-16 text-yellow-300 mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-white mb-2">準備好了嗎？</h2>
            <p className="text-red-100 mb-8">領受天父為你預備的驚喜</p>
            <button
              onClick={drawCard}
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-red-800 font-bold rounded-full shadow-lg transform transition active:scale-95 text-lg"
            >
              抽取我的恩典卡
            </button>
          </div>
        )}

        {/* 2. 卡片內容層 (底層) */}
        {!showCover && currentCard && (
          <div
            className={`absolute inset-0 p-6 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
              isRevealed ? "opacity-100" : "opacity-100"
            }`}
          >
            {/* 裝飾邊框 */}
            <div className="absolute inset-2 border-2 border-dashed border-red-200 rounded-xl pointer-events-none"></div>

            <div className="text-center z-0 h-full flex flex-col justify-between py-4">
              <div>
                <h3 className="text-red-500 font-bold text-sm tracking-widest mb-1">
                  {currentCard.subtitle}
                </h3>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentCard.title}
                </h2>
              </div>

              <div className="flex-grow flex items-center">
                <p className="text-gray-700 leading-relaxed text-justify text-sm md:text-base px-2">
                  {currentCard.content}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-red-100 w-full">
                <p className="text-right font-handwriting text-red-600 font-bold italic text-lg">
                  {currentCard.verse}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. 刮刮層 (頂層) */}
        {!showCover && !isRevealed && (
          <ScratchCard
            onReveal={handleReveal}
            isRevealed={isRevealed}
            width={340} // 需配合容器寬度
            height={453} // 需配合容器高度 (aspect ratio 3/4)
          />
        )}

        {/* 揭曉後的動畫遮罩 (可選) */}
        {!showCover && isRevealed && (
          <div className="absolute inset-0 pointer-events-none bg-yellow-100 opacity-0 animate-[ping_1s_ease-out]"></div>
        )}
      </div>

      {/* 底部按鈕區 */}
      {!showCover && (
        <div className="mt-8 flex gap-4">
          {isRevealed ? (
            <>
              <button
                onClick={reset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition"
              >
                <RefreshCw size={20} />
                再抽一張
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold shadow-md transition"
              >
                <Share2 size={20} />
                複製祝福
              </button>
            </>
          ) : (
            <p className="text-gray-500 animate-pulse">
              請用手指或滑鼠刮開銀色區域...
            </p>
          )}
        </div>
      )}

      {/* 頁尾版權與教會資訊區 */}
      <footer className="mt-12 mb-6 flex flex-col items-center gap-3">
        {/* Church Name Area (No Image) */}
        <div className="flex flex-col items-center opacity-90">
          <p className="text-red-900 font-bold tracking-widest text-lg">
            武昌學青牧區
          </p>
        </div>

        {/* Copyright/Tagline */}
        <div className="text-xs text-gray-400 text-center space-y-1">
          <p>2026 武昌學青牧區 Design for Blessing</p>
        </div>
      </footer>
      <SpeedInsights />
    </div>
  );
}
