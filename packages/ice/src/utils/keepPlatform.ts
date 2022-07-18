export default function keepPlatform(target: string) {
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

  const platform = `is${target.replace(target[0], target[0].toUpperCase)}`;

  env[platform] = 'true';

  return env;
}