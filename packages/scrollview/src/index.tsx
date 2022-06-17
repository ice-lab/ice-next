import { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import ScrollViewWeb from './web';
import ScrollViewMiniApp from './miniapp';

let ScrollView;

if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  ScrollView = ScrollViewMiniApp;
} else {
  ScrollView = ScrollViewWeb;
}

export default ScrollView;
export * from './types';
