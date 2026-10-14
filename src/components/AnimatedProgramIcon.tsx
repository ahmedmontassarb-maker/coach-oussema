import React from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Dumbbell,
  Zap,
  HeartPulse,
  Trophy,
  Target,
  Apple,
  Shield,
  Activity,
  Timer,
  LucideIcon,
} from 'lucide-react';
import { IconType } from '../types';

interface Props {
  iconName: IconType;
  className?: string;
  size?: number;
}

const ICON_MAP: Record<IconType, LucideIcon> = {
  Flame,
  Dumbbell,
  Zap,
  HeartPulse,
  Trophy,
  Target,
  Apple,
  Shield,
  Activity,
  Timer,
};

export const AnimatedProgramIcon: React.FC<Props> = ({
  iconName,
  className = 'w-7 h-7 text-amber-400',
  size = 28,
}) => {
  const IconComponent = ICON_MAP[iconName] || Trophy;

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full pointer-events-none" />
      <IconComponent size={size} className={`${className} relative z-10 transition-colors`} />
    </motion.div>
  );
};
