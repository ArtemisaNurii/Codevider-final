import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ElementType, ReactNode } from 'react';
import clsx from 'clsx';

type TextAnimationProps = {
  text: string;
  as?: ElementType;
  classname?: string;
  letterAnime?: boolean;
  lineAnime?: boolean;
  direction?: 'left' | 'right';
  variants?: Variants;
};

const defaultVariants: Variants = {
  hidden: { filter: 'blur(10px)', opacity: 0 },
  visible: { filter: 'blur(0px)', opacity: 1 },
};

const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  as: Tag = 'h1',
  classname,
  letterAnime,
  lineAnime,
  direction = 'left',
  variants = defaultVariants,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });

  const getAnimationProps = (index: number) => ({
    variants: variants,
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    transition: {
      delay: lineAnime ? 0 : index * 0.025,
      duration: lineAnime ? 0.5 : 0.25,
      // --- THE FIX IS HERE ---
      // We use `as const` to tell TypeScript this is a literal type, not a generic string.
      ease: 'easeOut' as const,
    },
  });

  const getLineDirection = () => {
    if (direction === 'left') return { x: -100, opacity: 0 };
    if (direction === 'right') return { x: 100, opacity: 0 };
    return { y: 20, opacity: 0 };
  };

  const lineVariants: Variants = {
    hidden: getLineDirection(),
    visible: { x: 0, y: 0, opacity: 1 },
  };

  const renderContent = (): ReactNode => {
    if (lineAnime) {
      return (
        <motion.span
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          // --- ALSO APPLY THE FIX HERE ---
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="block"
        >
          {text}
        </motion.span>
      );
    }
    if (letterAnime) {
      return text
        .split('')
        .map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            {...getAnimationProps(index)}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ));
    }
    

    return text
      .split(' ')
      .map((word, index) => (
        <motion.span key={index} {...getAnimationProps(index)} className="inline-block">
          {word}
          {index < text.split(' ').length - 1 && ' '}
        </motion.span>
      ));
  };

  return (
    <Tag
    ref={ref}
    className={clsx('text-animation whitespace-pre-wrap', classname)}
  >
    {renderContent()}
  </Tag>
  );
};

export default TextAnimation;