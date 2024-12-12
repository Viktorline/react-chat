import { create } from 'zustand';

interface IUserOSState {
  userOs: string | null;
  detectUserOS: () => void;
}

const detectOS = (): string => {
  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();

  if (platform.includes('win')) return 'Windows';
  if (platform.includes('mac')) return 'MacOS';
  if (platform.includes('linux')) return 'Linux';
  if (/android/.test(userAgent)) return 'Android';
  if (/iphone|ipad|ipod/.test(userAgent)) return 'iOS';

  return 'Unknown';
};

export const useUserOSStore = create<IUserOSState>((set) => ({
  userOs: null,
  detectUserOS: () => {
    const os = detectOS();
    set({ userOs: os });
  },
}));
