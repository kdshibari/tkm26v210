import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <motion.header
      className="text-center py-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <motion.span
          className="font-display text-5xl md:text-6xl text-foreground tracking-wider"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          The
        </motion.span>
        <motion.span
          className="font-display text-7xl md:text-8xl font-bold kinky-gradient"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          KINKY
        </motion.span>
        <motion.span
          className="font-display text-5xl md:text-6xl text-foreground tracking-wider"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Map
        </motion.span>
      </div>
      <motion.p
        className="text-muted-foreground text-xs max-w-md mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Take your comprehensive BDSM quiz to explore your desires and connect with your partner.
      </motion.p>
    </motion.header>
  );
};
