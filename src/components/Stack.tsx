import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type Ref,
} from "react";
import { technologies } from "../data";

const ease = [0.2, 0.7, 0.2, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

// Icons pop in as a diagonal wave from the top-left corner.
const item: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -14 },
  shown: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 18,
      delay: 0.3 + ((i % 5) + Math.floor(i / 5)) * 0.06,
    },
  }),
};

const column: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const FAR = -9999;
const RADIUS = 220; // px: how far the cursor's pull reaches
const tilts = [-9, 7, -5, 10, -7, 6];

type Tech = (typeof technologies)[number];

type CellProps = {
  tech: Tech;
  index: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  active: boolean;
  blinking: boolean;
  calm: boolean;
  onEnter: () => void;
};

function Cell({
  tech,
  index,
  mx,
  my,
  active,
  blinking,
  calm,
  onEnter,
}: CellProps) {
  const ref = useRef<HTMLLIElement>(null);
  const center = useRef({ x: 0, y: 0 });

  // Remember the cell's centre (relative to the grid) so the cursor's distance can be computed without layout reads.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      center.current = {
        x: el.offsetLeft + el.offsetWidth / 2,
        y: el.offsetTop + el.offsetHeight / 2,
      };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Dock-like field: icons swell the closer the cursor gets.
  const proximity = useTransform(() => {
    if (calm) return 0;
    const d = Math.hypot(
      mx.get() - center.current.x,
      my.get() - center.current.y,
    );
    return Math.max(0, 1 - d / RADIUS);
  });
  const scale = useSpring(
    useTransform(proximity, (p) => 1 + p * p * 0.22),
    { stiffness: 320, damping: 24 },
  );

  const lit = active || blinking;
  const { name, icon, color } = tech;
  const glyph = `size-9 sm:size-12 lg:size-14 ${lit ? "fill-(--brand) text-(--brand)" : "fill-[#3a3a3a] text-[#3a3a3a]"}`;

  return (
    <motion.li
      ref={ref}
      custom={index}
      variants={item}
      title={name}
      onPointerEnter={onEnter}
      className="relative flex aspect-square items-center justify-center"
      style={{ "--brand": icon ? `#${icon.hex}` : color } as CSSProperties}
    >
      <motion.div style={{ scale }} className="relative">
        <motion.div
          animate={
            calm
              ? undefined
              : lit
                ? { y: -5, rotate: tilts[index % tilts.length], scale: 1.08 }
                : { y: 0, rotate: 0, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 520, damping: 14 }}
        >
          {icon ? (
            <svg
              viewBox="0 0 24 24"
              role="img"
              aria-label={name}
              className={`block ${glyph}`}
            >
              <path d={icon.path} />
            </svg>
          ) : (
            <span
              role="img"
              aria-label={name}
              className={`flex items-center justify-center text-4xl leading-none font-bold sm:text-5xl ${glyph}`}
            >
              {name[0]}
            </span>
          )}
        </motion.div>
      </motion.div>
    </motion.li>
  );
}

export default function Stack({ ref }: { ref?: Ref<HTMLElement> }) {
  const calm = !!useReducedMotion();
  const mx = useMotionValue(FAR);
  const my = useMotionValue(FAR);
  const [active, setActive] = useState<number | null>(null);
  const [blink, setBlink] = useState<number | null>(null);

  // While nobody's hovering, a random icon lights up and hops now and then so the grid feels alive.
  useEffect(() => {
    if (calm || active !== null) return;
    let off: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setBlink(Math.floor(Math.random() * technologies.length));
      off = setTimeout(() => setBlink(null), 700);
    }, 2200);
    return () => {
      clearInterval(id);
      clearTimeout(off);
      setBlink(null);
    };
  }, [calm, active]);

  const track = (e: PointerEvent<HTMLUListElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const leave = () => {
    mx.set(FAR);
    my.set(FAR);
    setActive(null);
  };

  return (
    <section
      ref={ref}
      id="o-mnie"
      className="relative z-10 flex min-h-dvh items-center bg-bg py-24 shadow-[0_-24px_60px_-12px_rgb(17_17_17/0.18),0_-2px_8px_-2px_rgb(17_17_17/0.06)] sm:py-32"
    >
      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto grid w-full max-w-[90rem] items-center gap-14 px-4 sm:px-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-20"
      >
        <motion.div variants={rise} className="rounded-lg bg-surface">
          <ul
            onPointerMove={track}
            onPointerLeave={leave}
            className="relative m-0 grid list-none grid-cols-4 p-0 xl:grid-cols-5"
          >
            {technologies.map((tech, i) => (
              <Cell
                key={tech.name}
                tech={tech}
                index={i}
                mx={mx}
                my={my}
                active={active === i}
                blinking={blink === i}
                calm={calm}
                onEnter={() => setActive(i)}
              />
            ))}
          </ul>
        </motion.div>

        <motion.div variants={column}>
          <motion.h2
            variants={rise}
            className="m-0 max-w-[18ch] text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.1] font-normal tracking-[-0.025em] text-balance"
          >
            Od projektu po wdrożenie, w jednych rękach
          </motion.h2>
          <motion.p
            variants={rise}
            className="mt-6 mb-0 max-w-[42ch] text-[1.0625rem] leading-relaxed text-dim"
          >
            Projektuję i buduję strony dla lokalnych firm oraz własne aplikacje
            webowe. Zajmuję się całością: wyglądem, kodem, bazą danych i
            wdrożeniem, więc nie trzeba niczego przekazywać między kilkoma
            osobami.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
