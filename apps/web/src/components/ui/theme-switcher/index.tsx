import { MouseEvent } from 'react';
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

const getThemeSwitchAnimation = (x: number, y: number, isReverse?: boolean) => {
  const clipPath = [
    `circle(0% at ${x}px ${y}px)`,
    `circle(${Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))}px at ${x}px ${y}px)`,
  ];

  return {
    keyframes: {
      clipPath: isReverse ? clipPath.reverse() : clipPath,
      zIndex: [1, 1],
    },
    animation: {
      duration: 500,
      easing: 'cubic-bezier(.76,.32,.29,.99)',
      pseudoElement: isReverse ? '::view-transition-old(root)' : '::view-transition-new(root)',
    },
  };
};

export const ThemeSwitcher = () => {
  const { setColorScheme } = useMantineColorScheme();
  const isLightTheme = useComputedColorScheme() === 'light';

  const handleClick = (event: MouseEvent) => {
    const transition = document.startViewTransition(() => {
      setColorScheme(isLightTheme ? 'dark' : 'light');
    });

    transition.ready.then(() => {
      const { keyframes, animation } = getThemeSwitchAnimation(event.clientX, event.clientY, !isLightTheme);
      document.documentElement.animate(keyframes, animation);
    });
  };

  return (
    <ActionIcon onClick={handleClick} variant="default" size="xl" aria-label="Toggle color scheme">
      <IconSun display={isLightTheme ? 'block' : 'none'} stroke={1.5} />
      <IconMoon display={!isLightTheme ? 'block' : 'none'} stroke={1.5} />
    </ActionIcon>
  );
};
