export default class PluginData {
  private pluginData: Record<string, any>;

  constructor() {
    this.pluginData = {};
  }
  /**
   * Set plugin data in build step and get the data in runtime.
   */
  public setPluginData(pluginName: string, data: any) {
    this.pluginData[pluginName] = data;
  }

  public getPluginData() {
    return this.pluginData;
  }
}
