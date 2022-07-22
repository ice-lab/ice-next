import { ALI_MINIAPP, WECHAT_MINIPROGRAM, BYTEDANCE_MICROAPP, BAIDU_SMARTPROGRAM, KUAISHOU_MINIPROGRAM, MINIAPP_PLATFORMS } from '../constant.js';

export default function keepPlatform(target: string) {
  // config for swc transform
  // https://swc.rs/docs/configuration/compilation#jsctransformconstmodules
  const env = {
    isWeex: 'false',
    isWeb: 'false',
    isMiniApp: 'false',
    isNode: 'false',
    isWeChatMiniProgram: 'false',
    isByteDanceMicroApp: 'false',
    isBaiduSmartProgram: 'false',
    isKuaiShouMiniProgram: 'false',
  };

  if (MINIAPP_PLATFORMS.includes(target)) {
    switch (target) {
      case ALI_MINIAPP:
        env.isMiniApp = 'true';
        break;
      case WECHAT_MINIPROGRAM:
        env.isWeChatMiniProgram = 'true';
        break;
      case BYTEDANCE_MICROAPP:
        env.isByteDanceMicroApp = 'true';
        break;
      case BAIDU_SMARTPROGRAM:
        env.isBaiduSmartProgram = 'true';
        break;
      case KUAISHOU_MINIPROGRAM:
        env.isKuaiShouMiniProgram = 'true';
        break;
    }
  } else {
    const platform = `is${target[0].toUpperCase()}${target.slice(1)}`;
    env[platform] = 'true';
  }
  return env;
}
