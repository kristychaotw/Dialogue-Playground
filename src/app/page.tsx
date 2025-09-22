"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RefreshCw } from "lucide-react";
import { BreathingBar } from "@/components/breathingBar";

interface Topic {
  id: string;
  title: string;
}

interface Role {
  id: string;
  label: string;
  context: string;
  seed_line: string;
  attitude: string;
}

interface PracticeCard {
  topic: Topic;
  role: Role;
}

const topics: Topic[] = [
  { id: "topic-001", title: "政黨介入罷免會如何影響民主運作與社會觀感？" },
  {
    id: "topic-002",
    title: "罷免在不同政黨間的適用情況如何？可能帶來哪些政治互動影響？",
  },
  {
    id: "topic-003",
    title: "媒體在罷免過程中可能扮演哪些角色？這些角色對民主有何影響？",
  },
  { id: "topic-004", title: "罷免對台灣社會的凝聚與分歧可能造成哪些影響？" },
  {
    id: "topic-005",
    title: "文化界與草根公民參與罷免會對民主運作帶來哪些影響？",
  },
  {
    id: "topic-006",
    title: "外部勢力是否會影響台灣的罷免政治？可能的方式有哪些？",
  },
  {
    id: "topic-007",
    title: "罷免制度的門檻設計有哪些優缺點？是否應考慮調整？",
  },
];

const roles: Role[] = [
  {
    id: "role-001",
    label: "小美，中小企業老闆",
    context:
      "你是小美，經營一家有50名員工的本地製造公司。環保法規和各種政策直接影響你的成本和營運，你必須在理想和現實之間找平衡。",
    seed_line: "我也想做對的事，但公司倒了，員工怎麼辦？",
    attitude:
      "她關注政策是否實際，認為政治對話應以解決方案為導向。對罷免，傾向保留態度，擔心動盪影響經濟與勞工穩定。",
  },
  {
    id: "role-002",
    label: "阿翔，16歲高中生",
    context:
      "你是阿翔，16歲，社群媒體是你社交生活和身份認同的重要部分。你的父母和老師經常擔心你的螢幕使用時間，但你覺得他們不懂你們這一代。",
    seed_line: "大人們不懂，這就是我們和朋友聯繫的方式啊。",
    attitude:
      "他對政治沒太多關注，但社群媒體會影響他對罷免的印象。他可能會跟著話題或KOL情緒表達立場，但對制度運作沒有清楚理解。",
  },
  {
    id: "role-003",
    label: "陳老師，退休國小教師",
    context:
      "你是陳老師，在公立學校教書35年剛退休，勤儉儲蓄，相信努力工作和個人責任的價值。你看著社會變化，有時感到困惑。",
    seed_line: "我們那個年代，靠自己努力就能過好日子。",
    attitude:
      "他尊重體制、重視秩序，對過度對立和激進行為感到不安。對罷免，他可能覺得應該謹慎，不宜被輕率使用。",
  },
  {
    id: "role-004",
    label: "佳玲，新任部門主管",
    context:
      "你是佳玲，最近升職成為部門主管，正在努力建立團隊凝聚力，同時管理遠距和辦公室的員工。你發現管理比想像中複雜。",
    seed_line: "我擔心大家不在一起工作，會失去一些重要的東西。",
    attitude:
      "她對溝通與協調很敏感，也希望制度設計能促進團隊凝聚，而非分裂。對於罷免會思考其影響是否具建設性。",
  },
  {
    id: "role-005",
    label: "志豪，資工系大學生",
    context:
      "你是志豪，正在讀資訊工程，對新科技充滿熱忱。你認為AI和科技能解決很多問題，但周圍的人對此有不同看法。",
    seed_line: "為什麼不用最好的工具來讓生活變得更好？",
    attitude:
      "他認為資訊應公開透明，對民主制度有基本信任，但對政黨操作有些不信任。關心的是資訊正確與決策理性。",
  },
  {
    id: "role-006",
    label: "麗華，單親媽媽",
    context:
      "你是麗華，獨自撫養兩個小孩，在便利商店打工。你關心孩子的教育和未來，但經濟壓力讓你必須務實考慮每個決定。",
    seed_line: "我只希望孩子能有更好的機會，不要像我這麼辛苦。",
    attitude:
      "她沒有時間深入理解政治細節，但對社會福利、物價、教育資源等政策是否實際有強烈感受。若覺得罷免無助於生活改善，可能會冷感。",
  },
  {
    id: "role-007",
    label: "建國，計程車司機",
    context:
      "你是建國，開計程車20年，每天接觸各種乘客，聽到很多不同的故事和觀點。你對社會變化有自己的觀察。",
    seed_line: "我載過各種人，大家想的都不一樣啊。",
    attitude:
      "他透過聽乘客聊天吸收各種觀點，並累積一套自己的判斷。對罷免，他可能重視『是不是替人民出氣』，但不一定關心法律細節。",
  },
  {
    id: "role-mandela",
    label: "納爾遜・曼德拉",
    context:
      "南非反種族隔離領袖，曾被囚禁27年，後成為總統，以寬恕與和解化解深刻社會撕裂。",
    seed_line: "我們不能以仇恨來回應仇恨，那樣永遠不會有未來。",
    attitude:
      "他相信真正的改變來自於傾聽與寬容，即使面對不公，也應以團結與共同未來為目標。",
  },
  {
    id: "role-ghandi",
    label: "甘地",
    context: "印度獨立運動領袖，堅持非暴力與公民不服從，成為和平抗爭的象徵。",
    seed_line: "真正的勝利，不是擊倒對方，而是讓對方願意坐下來聽你說話。",
    attitude:
      "他會鼓勵人們以愛與堅持來改變制度，堅持原則但避免製造敵人，並不輕易放棄對話。",
  },
  {
    id: "role-mlk",
    label: "馬丁・路德・金恩",
    context:
      "美國民權運動領袖，以非暴力理念爭取黑人平權，名言是「我有一個夢」。",
    seed_line: "我夢想有一天，我的孩子將不被膚色定義，而是由他們的品格被認識。",
    attitude:
      "他相信道德正義終將勝利，強調和平抗爭與價值對話，會重視制度改革勝於短期報復。",
  },
  {
    id: "role-tsai",
    label: "理想中的總統",
    context: "一位設身處地思考所有族群、超越政黨利益的民主領導人。",
    seed_line: "如果我是一位真正的全民總統，我會怎麼看待這場罷免？",
    attitude:
      "她會嘗試在多方之間尋找共識，強調民主的制度精神與責任，並呼籲社會理性討論。",
  },
  {
    id: "role-malala",
    label: "瑪拉拉",
    context:
      "巴基斯坦人權倡議者，爭取女性教育權，因公開發聲而遭受塔利班槍擊仍持續倡議。",
    seed_line: "當別人試圖讓我們沉默，就是我們更要發聲的時刻。",
    attitude:
      "她會鼓勵年輕人與弱勢群體發聲，主張言論自由、教育平權與和平爭取權益。",
  },
  {
    id: "role-unknown-peacemaker",
    label: "和平中介者",
    context:
      "一位不被歷史記錄的無名者，總是在衝突現場拉住對立雙方，提醒他們：你們曾經是朋友。",
    seed_line: "你們爭論的，其實只是你們都在乎的東西不同名稱而已。",
    attitude:
      "他會試圖翻譯雙方語言，引導他們看見彼此的共同點，而非陷入標籤與情緒之中。",
  },
];

// 聖杯皇后風格：低門檻、中性、可直接續寫的句首
// logic/sentenceStarters.ts
export const getSentenceStarters = (
  topicId: string,
  mode: "play" | "respond"
): string[] => {
  const s: Record<string, Record<"play" | "respond", string[]>> = {
    "topic-001": {
      play: [
        "我會先看參與的方式…",
        "我在意程序是否清楚…",
        "對我來說重點是透明…",
        "我擔心外界的觀感…",
        "我希望界線能被說明…",
      ],
      respond: [
        "我聽見你在意政黨角色…",
        "我同意需要界線，但…",
        "我好奇你怎麼定義介入…",
        "或許我們先談流程…",
        "我不同意的其實是範圍…",
      ],
    },
    "topic-002": {
      play: [
        "我想先釐清判準是什麼…",
        "我在意是否一體適用…",
        "我會找對等的案例…",
        "我擔心被解讀成偏向…",
        "我希望標準被說清…",
      ],
      respond: [
        "我理解你對公正的在意…",
        "我想問你心中的標準…",
        "或許可以比對時間與條件…",
        "我同意一致性重要，但…",
        "我不同意的點在於推論…",
      ],
    },
    "topic-003": {
      play: [
        "我會先看資訊來源…",
        "我在意呈現是否平衡…",
        "我好奇編排的用意…",
        "我關注更正與追蹤…",
        "我希望多元聲音並列…",
      ],
      respond: [
        "我聽見你對媒體的期待…",
        "我想補充比對多家報導…",
        "或許我們看原始資料…",
        "我同意責任重大，但…",
        "我好奇你怎麼判定可信度…",
      ],
    },
    "topic-004": {
      play: [
        "我會先找可對話的部分…",
        "我在意彼此的安全感…",
        "我想知道共識在哪裡…",
        "我擔心語氣造成距離…",
        "我希望有緩衝的空間…",
      ],
      respond: [
        "我聽見你對撕裂的擔憂…",
        "或許我們先定義差異…",
        "我同意要降溫語言，但…",
        "我想提一個可對話點…",
        "我好奇你最在意的是…",
      ],
    },
    "topic-005": {
      play: [
        "我會先看參與的方式…",
        "我在意是否開放多元…",
        "我好奇實際帶來什麼…",
        "我關注誰被代表了…",
        "我希望門檻更友善…",
      ],
      respond: [
        "我聽見你重視參與…",
        "我想問影響如何衡量…",
        "或許先談資源落點…",
        "我同意要擴圈，但…",
        "我好奇不同群體的感受…",
      ],
    },
    "topic-006": {
      play: [
        "我會先看證據與來源…",
        "我在意資訊可被驗證…",
        "我好奇影響的路徑…",
        "我關注應對的機制…",
        "我希望說明風險等級…",
      ],
      respond: [
        "我聽見你對外部因素的擔心…",
        "或許我們先對齊事實…",
        "我同意要透明，但…",
        "我想問需要哪些佐證…",
        "我好奇可行的防護是…",
      ],
    },
    "topic-007": {
      play: [
        "我會先列出設計目標…",
        "我在意參與與防濫用的衡量…",
        "我好奇不同門檻的效果…",
        "我關注成本與可執行性…",
        "我希望審議流程更清楚…",
      ],
      respond: [
        "我聽見你對門檻的看法…",
        "或許我們比對他國經驗…",
        "我同意要平衡，但…",
        "我想問你優先的指標…",
        "我好奇何時需要調整…",
      ],
    },
  };

  const fallbackPlay = [
    "對我來說重點是…",
    "我此刻最在意的是…",
    "我會先從這裡開始…",
    "我有一個顧慮是…",
    "我希望能先釐清…",
  ];
  const fallbackRespond = [
    "我聽見你在意的是…",
    "我先確認一下重點…",
    "或許我們可以先…",
    "我同意這一部分，但…",
    "我好奇你怎麼看…",
  ];

  return (
    s[topicId]?.[mode] ?? (mode === "play" ? fallbackPlay : fallbackRespond)
  );
};

type Mode = "play" | "respond" | null;
type Phase =
  | "initial"
  | "card-drawn"
  | "mode-selected"
  | "role-guidance"
  | "input"
  | "output-generated";

export const isHighTension = (text: string) => {
  const bad = /(白痴|垃圾|去死|敗類|低能|廢物)/i;
  const multiBang = /[!?]{3,}/;
  const allCaps = /[A-Z]{6,}/;
  const blame = /^(你(們)?就是|明明就是|根本就是)/;
  return (
    bad.test(text) ||
    multiBang.test(text) ||
    allCaps.test(text) ||
    blame.test(text.trim())
  );
};

export default function PerspectivePractice() {
  const [phase, setPhase] = useState<Phase>("initial");
  const [currentCard, setCurrentCard] = useState<PracticeCard | null>(null);
  const [selectedMode, setSelectedMode] = useState<Mode>(null);
  const [userInput, setUserInput] = useState("");
  const [reflection, setReflection] = useState("");

  const drawCard = () => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    setCurrentCard({
      topic: randomTopic,
      role: randomRole,
    });
    setPhase("card-drawn");
    setSelectedMode(null);
    setUserInput("");
    setReflection("");
  };

  const selectMode = (mode: Mode) => {
    setSelectedMode(mode);
    setPhase("role-guidance");
  };

  const proceedToInput = () => {
    setPhase("input");
  };

  const handleStarterClick = (starter: string) => {
    setUserInput(starter);
    setPhase("input");
  };

  const generateOutput = () => {
    if (userInput.trim()) {
      setPhase("output-generated");
    }
  };

  const reset = () => {
    setPhase("initial");
    setCurrentCard(null);
    setSelectedMode(null);
    setUserInput("");
    setReflection("");
  };

  if (phase === "initial") {
    return (
      <div className="h-screen bg-stone-50 flex items-center justify-center p-3">
        <div className="w-full max-w-md text-center space-y-3">
          <div className="space-y-2">
            <h1 className="text-xl font-light text-stone-800 tracking-wide">
              觀點練習所
            </h1>
            <h6 className="font-light text-stone-800 tracking-wide">
              Dialogue Playground
            </h6>
            <p className="text-stone-600 leading-relaxed font-light">
              透過角色扮演練習，學習從不同角度看待事物
            </p>
          </div>

          <Card className="bg-white border-0 shadow-sm rounded-2xl">
            <CardContent className="p-3">
              <Button
                onClick={drawCard}
                className="w-full bg-stone-700 hover:bg-stone-800 text-white border-0 rounded-xl py-2 text-base font-light tracking-wide transition-all duration-300"
              >
                開始練習
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (phase === "output-generated" && currentCard) {
    return (
      <div className="h-screen bg-stone-50 p-3">
        <div className="max-w-2xl mx-auto space-y-2">
          {/* Practice Card Output */}
          <Card
            className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden"
            id="practice-output"
          >
            <CardHeader className="bg-stone-100 border-b border-stone-200 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-light text-stone-800 tracking-wide">
                  練習成果
                </CardTitle>
                <Badge className="bg-stone-200 text-stone-700 border-0 rounded-full px-3 py-1 font-light">
                  {selectedMode === "play" ? "角色扮演" : "觀點回應"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              <div className="space-y-2">
                {/* 2. 主題 - 第二層級 */}
                <div>
                  <h3 className="text-base font-medium text-stone-700 mb-2 tracking-wide uppercase">
                    討論主題
                  </h3>
                  <p className="text-stone-700 text-base leading-relaxed font-light">
                    {currentCard.topic.title}
                  </p>
                </div>

                <Separator className="bg-stone-200" />
                {/* 1. 回應 - 最高層級 */}
                <div>
                  <h3 className="text-lg font-medium text-stone-800 mb-3 tracking-wide">
                    {selectedMode === "play"
                      ? "你作為這個角色的觀點"
                      : "你的回應"}
                  </h3>
                  <blockquote className="border-l-4 border-stone-400 pl-4 text-stone-800 text-lg leading-relaxed font-light">
                    「{userInput}」
                  </blockquote>
                </div>
                {reflection && (
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-3 tracking-wide uppercase">
                      反思
                    </h3>
                    <p className="border-l-4 border-stone-400 pl-4 text-stone-800 text-lg leading-relaxed font-light">
                      {reflection}
                    </p>
                  </div>
                )}

                <Separator className="bg-stone-200" />

                {/* 3. 角色 - 第三層級 */}
                <div>
                  <p className="text-stone-600 font-medium mb-2">卡片角色</p>
                  <p className="text-xs font-medium text-stone-500 mb-1 tracking-wide uppercase">
                    {currentCard.role.label}
                  </p>
                  <p className="text-stone-500 text-xs font-light leading-relaxed">
                    {currentCard.role.context}
                  </p>
                  <div className="mt-2">
                    <p className="text-xs font-medium text-stone-500 mb-1 tracking-wide uppercase">
                      對此議題的態度
                    </p>
                    <p className="text-stone-500 text-xs font-light leading-relaxed">
                      {currentCard.role.attitude}
                    </p>
                  </div>
                </div>

                {/* 4. 想法 - 最低層級 (只在回應模式顯示) */}
                {selectedMode === "respond" && (
                  <div>
                    <h3 className="text-xs font-medium text-stone-500 mb-1 tracking-wide uppercase">
                      角色的想法
                    </h3>
                    <blockquote className="border-l-4 border-stone-300 pl-4 text-stone-500 italic font-light text-xs">
                      「{currentCard.role.seed_line}」
                    </blockquote>
                  </div>
                )}

                <Separator className="bg-stone-200" />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
                <p className="text-amber-800 text-sm text-center font-light">
                  這是觀點練習，並非真實意見
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={drawCard}
              className="bg-stone-700 hover:bg-stone-800 text-white border-0 rounded-xl px-4 py-2 font-light"
            >
              再次練習
            </Button>
            <Button
              variant="outline"
              disabled
              className="border-stone-300 text-stone-600 rounded-xl px-4 py-2 font-light bg-transparent"
            >
              分享成果
            </Button>
            <Button
              onClick={reset}
              variant="ghost"
              className="text-stone-500 hover:text-stone-700 rounded-xl px-4 py-2 font-light"
            >
              重新開始
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-stone-50 p-3">
      <div className="max-w-2xl mx-auto space-y-2">
        {/* Topic and Role Cards */}
        {currentCard && (
          <div className="space-y-2">
            {/* Topic Card */}
            <Card className="bg-white border-0 shadow-sm rounded-2xl">
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium text-stone-500 tracking-wide uppercase">
                    討論主題
                  </h3>
                  <Button
                    onClick={drawCard}
                    variant="ghost"
                    size="sm"
                    className="text-stone-400 hover:text-stone-600 rounded-lg font-light"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    重新抽取
                  </Button>
                </div>
                <p className="text-stone-800 text-base leading-relaxed font-light">
                  {currentCard.topic.title}
                </p>
              </CardContent>
            </Card>

            {/* Role Card */}
            <Card className="bg-white border-0 shadow-sm rounded-2xl">
              <CardContent className="p-3 space-y-2">
                <h3 className="text-sm font-medium text-stone-500 tracking-wide uppercase">
                  你的角色
                </h3>
                <div className="space-y-3">
                  <p className="text-stone-800 text-base font-medium">
                    {currentCard.role.label}
                  </p>
                  <p className="text-stone-600 leading-relaxed font-light">
                    {currentCard.role.context}
                  </p>
                  <div className="bg-stone-50 rounded-xl p-3 border-l-4 border-stone-300">
                    <p className="text-stone-700 italic font-light">
                      「{currentCard.role.seed_line}」
                    </p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 border-l-4 border-amber-300">
                    <p className="text-sm font-medium text-amber-700 mb-1">
                      對此議題的態度
                    </p>
                    <p className="text-amber-800 font-light leading-relaxed">
                      {currentCard.role.attitude}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mode Selection */}
        {phase === "card-drawn" && (
          <Card className="bg-white border-0 shadow-sm rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-light text-stone-800 tracking-wide">
                選擇練習方式
              </CardTitle>
              <CardDescription className="text-stone-600 font-light">
                請選擇一種方式來探索這個觀點
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() => selectMode("play")}
                variant="outline"
                className="w-full justify-start h-auto p-3 border-stone-200 hover:bg-stone-50 rounded-xl transition-all duration-300"
              >
                <div className="text-left space-y-2">
                  <div className="font-medium text-stone-800 text-base">
                    扮演這個角色
                  </div>
                  <div className="text-stone-600 font-light">
                    從這個角色的觀點對主題發表看法
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => selectMode("respond")}
                variant="outline"
                className="w-full justify-start h-auto p-3 border-stone-200 hover:bg-stone-50 rounded-xl transition-all duration-300"
              >
                <div className="text-left space-y-2">
                  <div className="font-medium text-stone-800 text-base">
                    回應這個角色
                  </div>
                  <div className="text-stone-600 font-light">
                    對這個角色的想法寫一個回應
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Role Guidance Section */}
        {phase === "role-guidance" && currentCard && selectedMode && (
          <Card className="bg-white border-0 shadow-sm rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-light text-stone-800 tracking-wide">
                引導思考
              </CardTitle>
              <CardDescription className="text-stone-600 font-light">
                {selectedMode === "play"
                  ? "讓我們幫你進入這個角色"
                  : "準備好回應這個角色"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {selectedMode === "play" ? (
                <div className="space-y-2">
                  <div className="bg-stone-50 rounded-xl p-3 border-l-4 border-stone-400">
                    <p className="text-stone-700 leading-relaxed font-light">
                      想像你就是這個人。對你來說什麼最重要？當談到這個主題時，你會有什麼情緒？
                    </p>
                  </div>
                  <BreathingBar />
                  <div className="space-y-3">
                    <p className="text-stone-600 font-medium">
                      你可以這樣開始：
                    </p>
                    <div className="space-y-2">
                      {getSentenceStarters(currentCard.topic.id, "play").map(
                        (starter, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            onClick={() => handleStarterClick(starter)}
                            className="w-full justify-start text-left h-auto p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-stone-700 font-light transition-all duration-300"
                          >
                            {starter}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="bg-stone-50 rounded-xl p-3 border-l-4 border-stone-400">
                    <p className="text-stone-700 leading-relaxed font-light mb-2">
                      你剛得知這個人的近況：
                    </p>
                    <blockquote className="bg-white rounded-lg p-3 border-l-4 border-stone-300 text-stone-800 italic font-light">
                      「{currentCard.role.seed_line}」
                    </blockquote>
                    <p className="text-stone-700 leading-relaxed font-light mt-2">
                      對於議題，你會誠實地對他們說什麼？
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-stone-600 font-medium">
                      你可以這樣開始：
                    </p>
                    <div className="space-y-2">
                      {getSentenceStarters(currentCard.topic.id, "respond").map(
                        (starter, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            onClick={() => handleStarterClick(starter)}
                            className="w-full justify-start text-left h-auto p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-stone-700 font-light transition-all duration-300"
                          >
                            {starter}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button
                  onClick={proceedToInput}
                  variant="outline"
                  className="border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xl px-4 py-2 font-light bg-transparent"
                >
                  或者自己寫
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Input Section */}
        {phase === "input" && currentCard && (
          <div className="space-y-2">
            {/* Context reminder */}
            <Card className="bg-stone-100 border-0 shadow-sm rounded-2xl">
              <CardContent className="p-3">
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-stone-500 font-medium">主題：</span>
                    <span className="text-stone-700 font-light">
                      {currentCard.topic.title}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">角色：</span>
                    <span className="text-stone-700 font-light">
                      {currentCard.role.label}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">想法：</span>
                    <span className="text-stone-700 italic font-light">
                      「{currentCard.role.seed_line}」
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">態度：</span>
                    <span className="text-stone-700 font-light">
                      {currentCard.role.attitude}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Input Card */}
            <Card className="bg-white border-0 shadow-sm rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-light text-stone-800 tracking-wide">
                  {selectedMode === "play" ? "表達角色觀點" : "寫下你的回應"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-3">
                  <label className="text-stone-600 font-medium">你的想法</label>
                  <Textarea
                    placeholder={
                      selectedMode === "play"
                        ? "從這個角色的觀點對主題發表看法..."
                        : "寫下你對這個角色想法的回應..."
                    }
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="min-h-[50px] border-stone-200 focus:border-stone-400 rounded-xl resize-none font-light leading-relaxed"
                  />
                  <p className="text-stone-400 text-sm font-light">
                    一句話就足夠了。即使沒有完成也沒關係。
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-stone-600 font-medium">
                    反思（選填）
                  </label>
                  <Textarea
                    placeholder="透過這個角色，我意識到了什麼？"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="min-h-[50px] border-stone-200 focus:border-stone-400 rounded-xl resize-none font-light leading-relaxed"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={generateOutput}
                    disabled={!userInput.trim()}
                    className="flex-1 bg-stone-700 hover:bg-stone-800 text-white border-0 rounded-xl py-2 font-light"
                  >
                    完成練習
                  </Button>
                  <Button
                    onClick={() => setPhase("role-guidance")}
                    variant="outline"
                    className="border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xl px-4 py-2 font-light"
                  >
                    返回
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
