"use client"

import { useState, useEffect } from "react"
import { motion, MotionValue, useMotionValue, useTransform } from "motion/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import Link from "next/link"
import { Loader } from "lucide-react"

export default function WatchOsGrid() {
    const [mounted, setMounted] = useState(false)
    // ウィンドウサイズを取得
    const windowSize = useWindowSize()
    
    // クライアントサイドマウント時に設定
    useEffect(() => {
        setMounted(true)
    }, [])
    
    // 動的なデバイスサイズ設定
    const device = {
        width: windowSize.width,
        height: windowSize.height,
    }

    // 初期位置
    const x = useMotionValue(-200)
    const y = useMotionValue(-100)

    // Transform mapping functions (動的に計算)
    const createScreenRange = (axis: keyof typeof device) => [
        -60,
        80,
        device[axis] - (icon.size + icon.margin) / 2 - 80,
        device[axis] - (icon.size + icon.margin) / 2 + 60,
    ]

    const scaleRange = [0, 1, 1, 0]
    const translateRange = [50, 0, 0, -50]
    const xRange = createScreenRange("width")
    const yRange = createScreenRange("height")

    // サーバーサイドレンダリング時の簡単なフォールバック
    if (!mounted) {
        return (
            <div className="device w-screen h-screen relative overflow-hidden flex flex-col items-center justify-center gap-2">
                <Loader className="size-12 text-neutral-500 animate-spin animate-infinite" />
                <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800 mb-4">Chair Hub</div>
                    <div className="text-lg text-gray-600 animate-pulse">Loading...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="device w-screen h-screen relative cursor-grab active:cursor-grabbing overflow-hidden user-select-none touch-none">
            <motion.div
                drag
                // 拖曳邊界設定
                dragConstraints={{
                    left: -200,
                    right: 20,
                    top: -500,
                    bottom: 50,
                }}
                style={{
                    width: device.width*2,
                    height: device.height*2,
                    x,
                    y,
                    background: "transparent",
                    willChange: "transform",
                }}
            >
                {grid.map((rows, rowIndex) =>
                    rows.map((colIndex: number) => (
                        <Item
                            key={`${rowIndex}-${colIndex}`}
                            row={rowIndex}
                            col={colIndex}
                            index={rowIndex * 12 + colIndex}
                            planeX={x}
                            planeY={y}
                            xRange={xRange}
                            yRange={yRange}
                            scaleRange={scaleRange}
                            translateRange={translateRange}
                        />
                    ))
                )}
            </motion.div>
        </div>
    )
}

function Item({ row, col, index, planeX, planeY, xRange, yRange, scaleRange, translateRange }: ItemProps) {
    const xOffset =
        col * (icon.size + icon.margin) +
        (row % 2) * ((icon.size + icon.margin) / 2)
    const yOffset = row * icon.size

    const screenOffsetX = useTransform(() => planeX.get() + xOffset + 20)
    const screenOffsetY = useTransform(() => planeY.get() + yOffset + 20)
    const x = useTransform(screenOffsetX, xRange, translateRange)
    const y = useTransform(screenOffsetY, yRange, translateRange)
    const xScale = useTransform(screenOffsetX, xRange, scaleRange)
    const yScale = useTransform(screenOffsetY, yRange, scaleRange)
    const scale = useTransform(() => Math.min(xScale.get(), yScale.get()))

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="absolute flex justify-center items-center rounded-full bg-neutral-50 contain-strict overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all"
            style={{
                left: `${xOffset}px`,
                top: `${yOffset}px`,
                x,
                y,
                scale,
                width: `${icon.size}px`,
                height: `${icon.size}px`,
                willChange: "transform",
            }}
        >
            <TooltipProvider>
              <Tooltip delayDuration={600}>
                <TooltipTrigger asChild>
                  <Link href={`/chairs/${ChairData[(row * 10 + col) % ChairData.length].slug}`} className="w-full h-full flex justify-center items-center">
                    <Image src={`/chairs/${ChairData[(row * 10 + col) % ChairData.length].image}`} alt={ChairData[(row * 10 + col) % ChairData.length].name_en} width={100} height={100} className="object-cover select-none touch-none" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{ChairData[(row * 12 + col) % ChairData.length].name_en}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </motion.div>
    )
}

// Fill a grid of numbers to represent each app icon
const grid = new Array(10).fill([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

interface ItemProps {
    row: number
    col: number
    index: number
    planeX: MotionValue<number>
    planeY: MotionValue<number>
    xRange: number[]
    yRange: number[]
    scaleRange: number[]
    translateRange: number[]
}

/**
 * ==============   Settings   ================
 */

const icon = {
    margin: 40,
    size: 120,
}


// ウィンドウサイズを監視するカスタムフック
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    })

    useEffect(() => {
        // ウィンドウサイズ変更のハンドラー
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        // リサイズイベントリスナーを追加
        window.addEventListener('resize', handleResize)
        
        // コンポーネントマウント時に一度実行
        handleResize()

        // クリーンアップ
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}

export const ChairData = [
  {
    id: 0,
    slug: "pp503",
    name_en: "The Chair",
    name_jp: "ザ・チェア",
    year: 1950,
    country: "デンマーク",
    style: ["ミッドセンチュリーモダン"],
    designer: "Hans J. Wegner",
    catchphrase: "「椅子」を代表するにふさわしい存在、ウェグナーの最高傑作",
    description: [
      "これまで数多くの名作を生み出したウェグナーのチェアの中でも最も完成度が高いと言われる美しさと、数多くの逸話から世界中から愛されています。",
      "ウェグナーは1949年にこの“ザ・チェア”を発表します。素朴で一見すると何気ないその椅子は、発表当初、“みにくいアヒルの子”と揶揄されました。そんなザ・チェアが世に知られたのは、「1960年のアメリカ大統領選テレビのテレビ討論会でジョン・F・ケネディが座った事」がきっかけでした。",
      "腰痛を持っていたケネディは、楽に座ることができ、それでいて座っている自分が堂々として美しく見える椅子を探した結果、こちらのザ・チェアにたどり着いたといわれています。椅子としての存在感・美しさを持ちつつ、過度に主張しないザ・チェアのデザインは、「椅子だけで存在するときはただただ美しい椅子であり、人が座ると途端に椅子の存在が消える（座った人が主役となり、その人を美しく見せる）」、このような椅子なのです。",
      "アームと背を接合しているフィンガージョイントは他に類を見ない美しさでこの椅子を語る上では重要な部分です。発表当時はウェグナー自身が「みっともない」と籐で隠していたという面白い話があったり、美しさだけではないところも人気の高い理由の一つ。",
      "その後、フィンガージョイントの美しさが再認識され、今ではこのチェアの最大の特徴となっています。",
    ],
    image: "pp503.webp",
  },
  {
    id: 1,
    slug: "ch07",
    name_en: "CH07 Shell Chair",
    name_jp: "CH07 シェルチェア",
    year: 1963,
    country: "デンマーク",
    style: ["スカンジナビアモダン"],
    designer: "Hans J. Wegner",
    catchphrase: "斬新なフォルムを持つ傑作",
    description: [
      "CH07 シェルチェアは、ハンス J. ウェグナーの代表作として知られる、独創的な名作。発表から数十年後に満を持して発表された逸品です。",
      "1963年のその発表当時、その前衛的なデザインから業界で大きな注目を集めました。ところが、その独創的デザインは、一般的には受け入れられませんでした。市場での批判的な意見を反映し、1960年代に数台しか製作されなかったCH07。ところが、1998年、カール・ハンセン＆サンが復刻すると、すぐに大きな反響を呼びました。",
      "広げた羽のようなフォルム、先端にむかってテーパーのついたアーチを描く脚。椅子がまるで浮遊するような軽快さを与えています。そして、この椅子の要ともいえる緩やかなカーブを描く成形合板製の座面と背もたれ。張地が施され、この椅子に優れた使用感を与えています。一枚の合板から一体に成形された2本の前脚、そして、別々に製作される後ろ脚。目を見張る美しいフォルムと安定性を持つユニークな椅子となっています。",
      "CH07 シェルチェアは、ウェグナーが信条とする、どこから見ても美しく、表裏があってはならという考えを見事に体現しています。",
    ],
    image: "ch07.avif",
  },
  {
    id: 2,
    slug: "barcelona-chair",
    name_en: "Barcelona Chair",
    name_jp: "バルセロナチェア",
    year: 1929,
    country: "ドイツ",
    style: ["モダニズム", "バウハウス"],
    designer: "Ludwig Mies van der Rohe",
    catchphrase: "人がゆったりと足を組んだ時の曲線美",
    description: [
      "モダニズム建築の第一人者とされるミースは、1929年にバルセロナで開催された国際博覧会の一環として、ドイツ人デザイナーのリリー・ライヒと共同でドイツ館を設計した。スペイン国王夫妻は博覧会開会訪問中にドイツ館を訪れる予定だったので、ドイツ館内の椅子は当然王室にふさわしいものでなければならなかった。",
      "バルセロナの椅子とそれに付随するスツールは、近代的な玉座と考えられていた。骨組みのはさみのような形は、古代ローマ時代に高位高官向けに考案された、曲がった脚、背もたれのない折りたたみ式の座椅子のデザインからヒントを得たと考えられている。",
      "ミースとライヒのデザインした家具は革新的で、ほとんど装飾されていないものの近代工学が用いられており、形状と機能が完璧に融合している。これは、「少ないことは豊かなこと」というミースの考えとぴったり一致していた。",
      "この椅子は、発表当初のデザインからほとんど変更が加えられていない。スリムなクロムメッキのスチール製フレームがシートの座面の下で曲がって交差しており、独特のX字型を成している。ひじ掛けのないワイドシートは、贅沢な牛革（オリジナルは豚皮だった）で覆われており、背面と座面シートの美しい格子状の深い手触りが特徴的だ。",
    ],
    image: "barcelona-chair.webp",
  },
  {
    id: 3,
    slug: "lcm",
    name_en: "LCM Lounge Chair",
    name_jp: "LCM ラウンジチェア",
    year: 1946,
    country: "ドイツ",
    style: ["バウハウス"],
    designer: "Marcel Breuer",
    description: [
      "アメリカ人デザイナーによって1946年にデザインされたラウンジチェア。実用的でやさしいフォルムをしているのが特徴です。このチェアは成形合板の特性が最大限活かされています。体に沿う形でゆるやかに曲げられ、しなやかな座り心地がとても快適です。座面が低めなので素足でくつろぐ日本の住宅にも最適。長時間座っていても疲れにくいラウンジチェアです。",
    ],
    image: "lcm.webp",
  },
  {
    id: 4,
    slug: "lc4",
    name_en: "LC4 Chaise Lounge",
    name_jp: "LC4 シェーズロング",
    year: 1928,
    country: "フランス",
    style: ["モダニズム"],
    designer: "Le Corbusier",
    description: [
      "人体構造に合わせてデザインされたリクライニングチェア。休息のための機械として、快適な座り心地を提供する。",
    ],
    image: "lc4.webp",
  },
  {
    id: 5,
    slug: "lc3",
    name_en: "LC3 Sofa",
    name_jp: "LC3ソファ",
    year: 1928,
    country: "フランス",
    style: ["モダニズム"],
    designer: "Le Corbusier",
    description: [
      "ミッドセンチュリーの名作として、今なお輝きを放つ正統派デザイン。直線で構成されたフレームと重厚な本革が、品格ある存在感を演出。洗練された空間に、時代を超えた価値を添える逸品です。",
    ],
    image: "lc3.webp",
  },
  {
    id: 6,
    slug: "lc2",
    name_en: "LC2 Sofa",
    name_jp: "LC2 ソファ",
    year: 1928,
    country: "フランス",
    style: ["モダニズム"],
    designer: "Le Corbusier",
    description: [
      "外部に露出したパイプフレームに、レザー張りのクッションをはめ込んだデザイン。快適さと機能性を追求した名作。",
    ],
    image: "lc2.webp",
  },
  {
    id: 7,
    slug: "lc1",
    name_en: "LC1 Arm Chair",
    name_jp: "LC1 アームチェア",
    year: 1928,
    country: "フランス",
    style: ["モダニズム"],
    designer: "Le Corbusier",
    description: [
      "ミッドセンチュリーの洗練された曲線が、空間に静かな華やぎをもたらす。シンプルながら存在感のあるフォルムが、上質なインテリアを格上げする。美しいデザインと機能が調和し、贅沢な時間を演出する一脚。",
    ],
    image: "lc1.webp",
  },
  {
    id: 8,
    slug: "wassily-chair",
    name_en: "Wassily Chair",
    name_jp: "ワシリーチェア",
    year: 1925,
    country: "ドイツ",
    style: ["モダニズム", "バウハウス"],
    designer: "Marcel Breuer",
    description: [
      "1925年、マルセル・ブロイヤーが描いた名作。無駄を削ぎ落とした、美しい構造。ミッドセンチュリーを象徴する一脚。",
      "鉄パイプとキャンバス（またはレザー）で構成された椅子。自転車のハンドルから着想を得ており、家具に初めてスチールパイプを使用。",
    ],
    image: "wassily-chair.webp",
  },
  {
    id: 9,
    slug: "womb-chair",
    name_en: "Womb Chair",
    name_jp: "ウームチェア",
    year: 1948,
    country: "アメリカ",
    style: ["ミッドセンチュリーモダン"],
    designer: "Eero Saarinen",
    description: [
      "エーロ・サーリネンが1948年に生んだ、包容のデザイン。「Womb（子宮）」の名が示すように、包容力あるフォルムが優しく包み込みます。彫刻的でなめらかな曲線は、安心感と温もりを与えるデザインの核心です。背もたれの絶妙なカーブが、体圧を分散し、至高のリラクゼーションを実現します。",
    ],
    image: "womb-chair.webp",
  },
  {
    id: 10,
    slug: "lcw",
    name_en: "LCW Lounge Chair",
    name_jp: "LCWラウンジチェア",
    year: 1945,
    country: "アメリカ",
    style: ["ミッドセンチュリーモダン"],
    designer: "Charles & Ray Eames",
    catchphrase: "現代生活のストレスから逃れるための特別な隠れ家",
    description: [
      "LCW ラウンジチェアは、チャールズ＆レイ・イームズによるモダン家具の代表作で、成形合板技術を生かした曲線美と優れた座り心地が特徴の名作椅子です。",
      "実用的でやさしいフォルムをしているのが特徴です。このチェアは成形合板の特性が最大限活かされています。体に沿う形でゆるやかに曲げられ、しなやかな座り心地がとても快適です。座面が低めなので素足でくつろぐ日本の住宅にも最適。長時間座っていても疲れにくいラウンジチェアです。",
    ],
    image: "lcw.webp",
  },
  {
    id: 11,
    slug: "lachaise",
    name_en: "La Chaise",
    name_jp: "ラ シェーズ",
    year: 1948,
    country: "United States",
    style: ["ミッドセンチュリーモダン"],
    designer: "Charles & Ray Eames",
    catchphrase: "イームズの芸術とも言えるラウンジチェア",
    description: [
      "チャールズ＆レイ・イームズが1948年にデザインしたラウンジチェア「ラ シェーズ」です。",
      "1948年のニューヨーク近代美術館（MoMA）のローコスト家具デザインコンペのためにデザインされたモデル。彫刻家、ガストン・ラシェーズの作品からインスピレーションを得てデザインされたと言われています。独創的な形状のFRP製シートは、正面に座ったり横向きに足を伸ばして寛いだりでき座り心地も快適です。",
      "イームズが手掛けた家具デザインの中でも重要な作品と言えますが、当時は製造コストの問題でハーマンミラー社からも発売されず、幻の作品となってしまいました。それから約40年の時を経て1990年にヴィトラ社が製品化。現在も生産が続けられています。",
      "シェルに目立たない小キズやスレはございますが美観を損なうものではなく、大変清潔なコンディションを保っています。ベースにも特筆すべきダメージは見られず、気持ち良くお使いいただけると思います。",
    ],
    image: "lachaise.webp",
  },
  {
    id: 12,
    slug: "organic-chair",
    name_en: "Organic Chair",
    name_jp: "オーガニック チェア",
    year: 1940,
    country: "United States",
    style: ["ミッドセンチュリーモダン"],
    designer: "Charles Eames & Eero Saarinen",
    catchphrase: "ふたりの伝説的建築家による共作",
    description: [
      "オーガニックチェアはチャールズ・イームズとエーロ・サーリネンの共同デザインの椅子として知られています。ミッドセンチュリー期の伝説二人による初期作品です。",
      "コンパクトで快適な読書用チェアとして開発された「オーガニック チェア」は、1940年にニューヨークのMuseum of Modern Artが主催した「住宅家具のオーガニックデザイン」コンペの一環として、チャールズ・イームズとエーロ・サーリネンによってデザインされました。その際に彼らが発表をしたデザインが6部門中2部門でグランプリをとっています。",
      "Early Plywood Experiments(アーリープライウッドエクスぺリメンツ)と呼ばれたこの椅子は、プライウッドを使用し曲線を活かしたデザインが特徴です。",
      "このデザインは後の彼らの作品作りに活かされています。",
      "もともとこの椅子はアルミニウムの脚にする予定でしたが、戦時中でアルミニウムを使うことが出来ずに木の脚に変更をした経緯があります。",
      "それが結果的に有機的な印象をより強くしコンペで高い評価を得ています。",
    ],
    image: "organic-chair.webp",
  },
  {
    id: 13,
    slug: "heart-cone-chair",
    name_en: "Heart Cone Chair",
    name_jp: "ハートコーンチェア",
    year: 1958,
    country: "デンマーク",
    style: ["モダニズム", "ポップアート"],
    designer: "Verner Panton",
    catchphrase: "ハートがモチーフなのにエレガントな存在感",
    description: [
      "「ハート コーン チェア」は、1950年代後半にヴァーナー・パントンによってデザインされたハートの形をしたチェアです。エレガントなステンレススチール製のベースが、やわらかなクッションの座面を支え、快適な座り心地です。",
      "ホテルや商業空間で当時は並べられて使われました。空間を作る椅子としてはあまりにも特徴的なために、その主張の強さが演出として優れた効果を発揮します。",
    ],
    image: "heart-cone-chair.webp",
  },
  {
    id: 14,
    slug: "panton-chair",
    name_en: "Panton Chair",
    name_jp: "パントンチェア",
    year: 1967,
    country: "デンマーク",
    style: ["モダニズム", "ポップアート"],
    designer: "Verner Panton",
    catchphrase: "世界初のプラスチック一体成型キャンチレバーチェ",
    description: [
      "ヴァーナー・パントンによってデザインされた「パントン チェア」は、パントンとヴィトラが1959年代から開発を始め、1967年に量産化に成功した、世界初のプラスチックによる一体成形型キャンチレバーの椅子です。",
      "ミッドセンチュリーデザインのアイコンであり、その彫刻的なフォルム、快適な座り心地、豊富なカラーバリエーションが特徴です。",
      "パントンチェアは国際的なデザイン賞を多数受賞し、世界中の著名な美術館のコレクションにも所蔵されるなど、20世紀デザインのアイコンともいえる一脚です。パントンチェアは豊富なカラーバリエーションを取り揃えています。",
    ],
    image: "panton-chair.webp",
  },
  {
    id: 15,
    slug: "standard-chair",
    name_en: "Standard Chair",
    name_jp: "スタンダードチェア",
    year: 1934,
    country: "フランス",
    style: ["インダストリアル", "モダニズム"],
    designer: "Jean Prouvé",
    catchphrase: "ジャン・プルーヴェの代表作、合理的で美しい椅子",
    description: [
      "フランスの建築家でありデザイナー、自らを「Constructeur（建設家）」と称したジャン・プルーヴェによる「スタンダード」は、彼のデザイン哲学を象徴する名作チェアです。",
      "スチール製のフレームとプライウッド（成型合板）の座面・背もたれが特徴で、座った時に特に負荷のかかる後脚に太さのある鋼板を使用し、前脚には細い鋼のチューブを用いることで、椅子にかかる重さを床へ逃がす効率的な構造になっています。",
      "シンプルな構造力学のもと設計され、合理的で無駄がなく美しい椅子として知られ、、多くのデザイナーに影響を与え、愛され続ける椅子となっています。",
    ],
    image: "standard-chair.webp",
  },
  {
    id: 16,
    slug: "ch445",
    name_en: "CH445 Wing Chair",
    name_jp: "CH445 ウィングチェア",
    year: 1960,
    country: "デンマーク",
    style: ["スカンジナビアモダン"],
    designer: "Hans J. Wegner",
    catchphrase: "至極のコンフォートを生む複雑なデザイン",
    description: [
      "CH445 ウィングチェアは、ハンス J. ウェグナーの独自の才能と美的センスが映えるラウンジチェア。一見してわかるクラフトマンシップと使い込むほどに実感できるティテールが見事です。脚はステンレスのみになります。",
      "全体を覆う張り加工が美しいラウンジチェア。フレームには無垢のビーチ材、脚には手加工で仕上げたステンレススチールが用いられています。目を見張るドラマチックで、彫刻的なシルエット。素材とフォルムに深い造詣を持つ、ウェグナーの典型的なデザインと言えます。",
      "この椅子におけるウェグナーの洗練されたビジョンは、じっくり見ると分かります。例えば、様々な姿勢で座ることを考慮した背と座。背と肩、そして首と頭を心地よくサポートするようデザインされています。脚は前方を少し高くすることで、この椅子に心地よい理想的な傾斜をつけています。",
    ],
    image: "ch445.png",
  },
  {
    id: 17,
    slug: "ch25",
    name_en: "CH25 Lounge Chair",
    name_jp: "CH25 ラウンジチェア",
    year: 1934,
    country: "デンマーク",
    style: ["スカンジナビアモダン"],
    designer: "Hans J. Wegner",
    catchphrase: "ペーパーコード職人が創り出す耐久性",
    description: [
      "CH25は、ハンス J. ウェグナーが当時のカール・ハンセン＆サンの社長宅に3週間滞在し、開発した最初の椅子シリーズの一つ。1950年に発表されカール・ハンセン＆サンの新しい流れを作ったシリーズです。それまでになかった大胆で彫刻的なフォルムから、当時は革新的なデザインと評価されました。フォルムばかりでなく、素材にもウェグナーは新しい試みをしています。戦時中の物資不足の中で使用されていた、あまり一般に知られていなかったペーパーコードをこの椅子の座と背に使用。この素材にウェグナーは十分な耐久性と美しさを見出しました。その後多くの人々がこのペーパーコードに魅了されたのは言うまではありません。",
      "そしてラウンジチェア CH25は、発表以来人気を博し、途切れることなく生産されています。まさにウェグナーのビジョンが時代よりも先を見据えていたことの証です。",
      "座と背のペーパーコードは熟練した職人でも1脚仕上げるのに、10時間を要します。使用されるペーパーコードは400メートル。2本のペーパーコードで張っていく、耐久に優れた独自の張り方が美しい模様を創り出しています。",
    ],
    image: "ch25.webp",
  },
  {
    id: 18,
    slug: "ch24",
    name_en: "CH24 Y Chair",
    name_jp: "CH24 Y チェア",
    year: 1949,
    country: "デンマーク",
    style: ["スカンジナビアモダン"],
    designer: "Hans J. Wegner",
    catchphrase: "タイムレスな魅力を放つデニッシュモダンの代名詞",
    description: [
      "Yチェアとして知られるCH24、ハンス J. ウェグナーがカール・ハンセン＆サン用にデザインし、1950年からずっと生産されている名作です。その斬新なフォルムからモダンデザインの名作として世界的に知られてきました。",
      "CH24のデザインにおいてウェグナーは、アームと背もたれを一体にするという、それまでの椅子デザインに見られなかった斬新な試みをしています。そしてこの曲木製のアームに安定性と心地よい使用感を与えるのが、印象的なY字形の背もたれ。この形状からYチェアと呼ばれるようになりました。Yチェアの発端は中国の椅子に座るデンマーク商人の肖像画。商人が座る明代の椅子がデザインの起源となっています。素晴らしい使用感と使い勝手、そして特徴的なラインを描く美しいフォルム。椅子に求められる機能性と見た目の美しさを同時に満たす椅子、と多くの人が評価するCH24、Yチェア。まさに、デニッシュモダンの真髄と言えます。",
      "CH24の完成に必要な製作工程は100以上。しかもそのほとんどが職人の手を通して作られています。座面にペーパーコードを張る作業は、熟練した職人でも1時間を要する重要な工程。1脚あたり、120メートルの強度と耐久性に優れたペーパーコードが使用し、長年にわたって使用できる座面を作り上げています。",
    ],
    image: "ch24.png",
  },
  {
    id: 19,
    slug: "wiggle-side-chair",
    name_en: "Wiggle Side Chair",
    name_jp: "ウィグルサイドチェア",
    year: 1972,
    country: "Canada",
    style: ["ミッドセンチュリーモダン"],
    designer: "Frank Gehry",
    description: [
      "「ウィグル サイドチェア」は、1972年にフランク・ゲーリーによってデザインされた家具のシリーズ「Easy Edge's/イージー・エッジズ」の１つです。彼はこのシリーズを通して、段ボール素材を美しく変化させました。彫刻的な椅子でありながら、座り心地も良く、充分な強度があります。",
    ],
    image: "wiggle-side-chair.webp",
  },
  {
    id: 20,
    slug: "papa-bear-chair",
    name_en: "Papa Bear Chair",
    name_jp: "パパ・ベア",
    year: 1951,
    country: "デンマーク",
    style: ["スカンジナビアモダン"],
    designer: "Hans J. Wegner",
    catchphrase: "母熊に抱かれた子熊のようにリラックスできる椅子",
    description: [
      "ベアチェアは、ハンス・ウェグナーが1950年にデザインし、北欧家具の名作として知られるラウンジチェアです。",
      "人を包み込むような大きめサイズと、横座りやアームへの足乗せなど多彩な使い方ができるフリーな設計も魅力です。デザイン、座り心地、耐久性、存在感のすべてで高い評価を受けており、「北欧家具の王様」と呼ばれる象徴的存在で、ウェグナー最高傑作の一つとされています。",
      "パパベアという愛称は、ある記者が「後ろから熊に抱きしめられてるような座り心地だ」と表現したことからそう呼ばれるようになりました。 他にも「ベアチェア」「テディベアチェア」など様々な愛称で呼ばれ親しまれています。",
      "実はウェグナー自身は、自らデザインした作品に名前をつけることは一切なく、品番をつけるのみでした。それは、彼が「家具は愛でるための芸術作品ではなく、人の生活に密着した日常工芸品である」という考えをもっていたからです。",
    ],
    image: "papa-bear-chair.webp",
  },
  {
    id: 21,
    slug: "mama-bear-chair",
    name_en: "Mama Bear Chair",
    name_jp: "ママ・ベア",
    year: 1954,
    country: "デンマーク",
    style: ["スカンジナビアモダン"],
    designer: "Hans J. Wegner",
    catchphrase: "大胆なフォルムに美しい曲線美",
    description: [
      "ママ・ベアの愛称で知られるハンス J. ウェグナーのラウンジチェア。",
      "1954年発表のパパ・ベアの派生モデルで、よりコンパクトで曲線的なシルエット。優しい曲線が特徴で、「CH78」という型番があります。",
      "当時ラウンジチェアの主流が重厚なデザインだったのに対し、ママ・ベアチェアは温くもりのある曲線が創り出す、軽快で優雅なシルエットが大きな特徴となっています。曲線と様々な形状を大胆に混合した独特のフォルム、アームの木製パネルに見られるような洗練されたディテール、軽やかさ。さらに人間工学に基づくデザインの追求が、首、背、体を優しく、そしてしっかりと支える至極のコンフォートをこの椅子に与えています。",
    ],
    image: "mama-bear-chair.avif",
  },
  {
    id: 23,
    slug: "pp112-british-chair",
    name_en: "Easy Chair",
    name_jp: "イージーチェア",
    year: 1978,
    country: "デンマーク",
    style: ["スカンジナビアモダン"],
    designer: "Hans J.Wegner",
    description: [
      "1978年、このチェアはハンス J. ウェグナーによってPP Møblerのためにデザインされました。イギリスの伝統家具ウィンザーチェアや中国の明の時代の椅子「圏椅(クワン・イ」からインスピレーションを得て、 ウェグナーが独自の考えで作り上げたのが「pp112」です。その特徴は、背・アーム・脚部の貫・フレームに至るラインとそれぞれの接合の結果生まれた見事なフォルムとその座り心地にあります。",
    ],
    image: "british-chair.webp",
  },
  {
    id: 24,
    slug: "pp550-peacock-chair",
    name_en: "Peacock Chair",
    name_jp: "ピーコックチェア",
    year: 1947,
    country: "デンマーク",
    style: ["スカンジナビアモダン"],
    designer: "Hans J. Wegner",
    description: [
      "孔雀の羽根を広げた姿のようなデザインの「PP550 ピーコックチェア」は、ウェグナーの代表作の一つ、孔雀の羽根を広げた姿からこのように呼ばれるようになりました。背のスピンドルが矢に似てることから『アローチェア』とも言われます。",
      "ピーコックチェアの名付け親はライバルでもあったフィンユールが付けた事も有名です。イギリスのウィンザーチェアをリ・デザインした美しいプロポーションが最大の魅力で、華やかなデザインの桟をあしらった大きく湾曲した背もたれは、人間工学的な美を上手く表現出来ています。",
      "全体の構造は白木が美しいアッシュ材を使用しているが、汚れやすい肘部分には色の濃いチーク材を選ぶ事も可能で、もちろん肘も含めて全てのマテリアルを統一する事も出来ます。",
    ],
    image: "peacock-chair.png",
  },
  {
    id: 22,
    slug: "pp66-chinese-chair",
    name_en: "Chinese Chair",
    name_jp: "チャイニーズチェア",
    year: 1945,
    country: "デンマーク",
    style: ["スカンジナビアモダン"],
    designer: "Hans J. Wegner",
    description: [
      "「チャイニーズチェア」は、ウェグナーの本格的なデザインの原点とも言えます。デザインの元となったのはアームから背もたれを繋ぐ一筆書きのような優美な曲線を描いた「クワン・イ」と呼ばれる中国明時代のチェアでした。『温故知新』の考えと『クワン・イ』の可能性にインスパイアされたウェグナーは1945年に独自のアレンジを加え、チャイニーズチェアを完成させました。",
      "3つのパーツをフィンガージョイントにより継ぎ、削り出された美しいフォルムの笠木が特徴的で、この椅子の誕生なくして、後の「Yチェア」、「ザ・チェア」も生まれてこなかったと言われるほど重要な作品と言われています。",
      "先人の生み出した名作から、デザインソースを得る効率的な手法『温故知新』を教えるコーア・クリントに従事していたモーエンセンは当時から既に単なる思い付きや個性ではなく、しっかりとした歴史的背景にある様式に基づいたデザインスタイルを確率していました。",
      "高い技術を持ちながらも、家具デザインについて勉強中だったウェグナーは、大きな影響を受けた事により完成した作品です。",
      "チャイニーズチェアは、ウェグナーの本格的なデザインの原点とも言える。デザインの元となったのはアームから背もたれを繋ぐ一筆書きのような優美な曲線を描いた「クワン・イ」と呼ばれる中国明時代のチェアでした。『温故知新』の考えと『クワン・イ』の可能性にインスパイアされたウェグナーは1945年に独自のアレンジを加え、チャイニーズチェアを完成させました。",
      "3つのパーツをフィンガージョイントにより継ぎ、削り出された美しいフォルムの笠木が特徴的で、この椅子の誕生なくして、後の「Yチェア」、「ザ・チェア」も生まれてこなかったと言われるほど重要な作品と言われています。",
      "先人の生み出した名作から、デザインソースを得る効率的な手法『温故知新』を教えるコーア・クリントに従事していたモーエンセンは当時から既に単なる思い付きや個性ではなく、しっかりとした歴史的背景にある様式に基づいたデザインスタイルを確率していました。",
      "高い技術を持ちながらも、家具デザインについて勉強中だったウェグナーは、大きな影響を受けた事により完成した作品です。",
    ],
    image: "pp66-chinese-chair.webp",
  },
  {
    id: 25,
    slug: "eames-lounge-chair",
    name_en: "Eames Lounge Chair",
    name_jp: "イームズラウンジチェア",
    year: 1956,
    country: "アメリカ",
    style: ["ミッドセンチュリーモダン"],
    designer: "Charles & Ray Eames",
    catchphrase: "現代生活のストレスから逃れるための特別な隠れ家",
    description: [
      "高級感と快適性を追求したラウンジチェア。成型合板とレザーを組み合わせたデザインは、現代でも人気の高い名作。",
      "イームズ ラウンジチェアが誕生したきっかけは、チャールズとレイがプライウッドの成型を試みたこと、そして多くの家庭のリビングルームにあるおなじみの家具をもっとよいものにしたいと考えたことにありました。つまり、ラウンジチェアです。英国のクラブチェアにインスピレーションを得たチャールズは、モダンなクラブチェアをデザインしたかったと述べました。「まるで使い込まれた一塁手のミットのように温かく包み込むような外見」を持つものに。発表後ほとんどすぐに、このデザインはアメリカンデザインの象徴になりました。",
      "そして今でもこれに匹敵するものはありません。イームズ夫妻によってモダンに生まれ変わった19世紀のクラブチェアは、50年以上も愛し続けられただけでなく、一目でそれとわかる、時を経ても失われることのない新鮮さで、20世紀を代表するファニチャーデザインの一つになりました。",
      "現在、この作品は美術館に収蔵されているだけでなく、あらゆる場所にスタイルと快適性を届け続けています。",
    ],
    image: "eames-lounge-chair.webp",
  },
  {
    id: 26,
    slug: "egg-chair",
    name_en: "Egg Chair",
    name_jp: "エッグチェア",
    year: 1958,
    country: "デンマーク",
    style: ["モダニズム"],
    designer: "Arne Jacobsen",
    description: [
      "コペンハーゲンのSASロイヤルホテル用にデザインされた。卵を思わせる有機的なフォルムが特徴で、プライベートな空間を作り出す。",
    ],
    image: "egg-chair.png",
  },
  {
    id: 27,
    slug: "chair-one",
    name_en: "Chair One",
    name_jp: "チェアワン",
    year: 2004,
    country: "ドイツ",
    style: ["コンテンポラリー", "インダストリアル"],
    designer: "Konstantin Grcic",
    description: [
      "Chair Oneは、名匠 Konstantin Grcic（コンスタンチン・グルチッチ）の代表的な作品です。三角形をモジュールに立体的に形成されたムダのない斬新なデザインが印象的なこちらのチェアは、レストランやカフェで目にしたことがある方も多いかもしれません。",
    ],
    image: "chair-one.webp",
  },
  {
    id: 28,
    slug: "louis-ghost-chair",
    name_en: "Louis Ghost Chair",
    name_jp: "ルイゴーストチェア",
    year: 2002,
    country: "フランス",
    style: ["コンテンポラリー"],
    designer: "Philippe Starck",
    description: [
      "ルイ15世様式の椅子をポリカーボネートで再構築。クラシックなフォルムを現代の素材で表現し、透明感と軽やかさを実現した。",
    ],
    image: "louis-ghost-chair.webp",
  },
  {
    id: 29,
    slug: "zig-zag-chair",
    name_en: "Zig-Zag Chair",
    name_jp: "ジグザグチェア",
    year: 1934,
    country: "オランダ",
    style: ["デ・ステイル"],
    designer: "Gerrit Rietveld",
    description: [
      "4枚の木板をジグザグに組み合わせて作られた椅子。最小限の材料と単純な構造で、機能と芸術性を追求したデザイン。",
    ],
    image: "zig-zag-chair.webp",
  },
  {
    id: 30,
    slug: "butterfly-stool",
    name_en: "Butterfly Stool",
    name_jp: "バタフライスツール",
    year: 1954,
    country: "日本",
    style: ["モダン", "ジャパニーズモダン"],
    designer: "柳宗理",
    catchphrase: "東洋の美意識と西洋の技術の融合",
    description: [
      "「バタフライスツール」は、戦後の日本を代表する名作椅子として知られている。デザインを担当したのは、日本のプロダクトデザイナーとして名を知られている柳宗理だ。",
      "成形合板技術に興味を持った柳宗理が、成形合板の生みの親でもあるチャールズ・イームズの元を訪れてレッグスプリントの存在を知ったことが、このスツールが生み出されたきっかけとなったといわれる。その後日本に帰国した柳宗理は、チャールズ・イームズの元で見た成形合板でどのようなものが作れるか試行錯誤した結果、このバタフライスツールのデザインに辿り着いたとされている。",
      "この作品の特徴は、「バタフライ」という名前からイメージするように蝶が羽を広げて羽ばたいているかのような形状だ。その見た目が「バタフライスツール」という作品名の由来となったといわれているが、制作現場の職人たちが使っていた呼び名が作品名となった、という話もある。",
    ],
    image: "butterfly-stool.png",
  },
  {
    id: 31,
    slug: "red-and-blue-chair",
    name_en: "Red and Blue Chair",
    name_jp: "赤と青の椅子",
    year: 1918,
    country: "オランダ",
    style: ["デ・ステイル"],
    designer: "Gerrit Rietveld",
    catchphrase: "「デ・ステイル」運動の代表的な作品",
    description: [
      "このチェアは、家具デザイナーであるゲリット・リエヴェルト（Gerrit Rietveld）によってデザインされました。",
      "1917年、オランダのデ・ステイル美術運動の一環として、この椅子が登場しました。",
      "背もたれが赤、座面が青であることから名付けられ、水平・垂直の直線を強調した幾何学的なデザインが特徴で、ピート・モンドリアンの抽象画を三次元空間に投影した最初の試みとも言われています。構造はシンプルですが、部材が交差することで生まれる「空間的なハーモニー」が複雑な表情を生み出し、現在も高い人気を誇る傑作とされています。",
    ],
    image: "red-and-blue-chair.webp",
  },
  {
    id: 32,
    slug: "ball-chair",
    name_en: "Ball Chair",
    name_jp: "ボールチェア",
    year: 1963,
    country: "フィンランド",
    style: ["ポップアート", "スペースエイジ"],
    designer: "Eero Aarnio",
    catchphrase: "部屋の中にあるもうひとつの部屋",
    description: [
      "エーロ・アールニオがデザインしたボールチェアは、1960年代のスペースエイジデザインを代表する作品です。",
      "この椅子の特徴は、その名の通り「ボール」をイメージして作られた非常にシンプルな形状。そして、球体の一部を切り取って椅子のベースとして取り付けるといった、これまでにはなかった印象的なデザインとなっている。球体の中に座ることで、外部の音を遮断し、プライベート空間を作り出します。",
      "その斬新なデザインと高い機能性により、世界中を驚かせ、愛され続けている名作椅子となっている。",
    ],
    image: "ball-chair.webp",
  },
  {
    id: 33,
    slug: "bubble-chair",
    name_en: "Bubble Chair",
    name_jp: "バブルチェア",
    year: 1968,
    country: "フィンランド",
    style: ["ポップアート", "スペースエイジ"],
    designer: "Eero Aarnio",
    catchphrase: "宙に浮いているような感覚",
    description: [
      "このBubble Chair（バブルチェア）の特徴は何と言っても、その独自性と近未来感のある存在感にあると言ってよいだろう。アクリル素材を用いて透明のボウルのような、半球形の型枠を成型し、座るためのクッションを臀部用と背中用にそれぞれ設置。その上で、最長2mの鎖を用いて、部屋の天井や梁などから吊り下げて設置。公園などに設置されているブランコのような要領で腰掛ける仕組みとなっている。",
      "この椅子に腰を下ろした者は、あたかもシャボン玉に包まれ、空中を浮遊しているかのような感覚を満喫できる。まるで宙に浮いているような感覚を味わえる革新的な椅子として人気を博しています。",
    ],
    image: "bubble-chair.webp",
  },
  {
    id: 34,
    slug: "ant-chair",
    name_en: "Ant Chair",
    name_jp: "アントチェア",
    year: 1952,
    country: "デンマーク",
    style: ["スカンジナビアモダン"],
    designer: "Arne Jacobsen",
    description: [
      "アルネ・ヤコブセンがデザインしたアントチェアは、アリのような細いウエストラインが特徴的な成形合板の椅子です。軽量でスタッキングが可能な実用性と美しいフォルムを両立した名作です。",
    ],
    image: "ant-chair.webp",
  },
  {
    id: 35,
    slug: "swan-chair",
    name_en: "Swan Chair",
    name_jp: "スワンチェア",
    year: 1958,
    country: "デンマーク",
    style: ["モダニズム"],
    designer: "Arne Jacobsen",
    description: [
      "エッグチェアと同じくSASロイヤルホテル用にデザインされた椅子。滑らかな曲線とアームレストのない構造が、空間を優雅に見せる。",
    ],
    image: "swan-chair.webp",
  },
];