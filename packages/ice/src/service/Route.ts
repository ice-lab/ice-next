import type { DefineExtraRoutes } from '@ice/route-manifest';

export default class Route {
  private defineRoutesFuncs: DefineExtraRoutes[];

  constructor() {
    this.defineRoutesFuncs = [];
  }

  public addDefineRoutesFunc(defineRoutes: DefineExtraRoutes) {
    this.defineRoutesFuncs.push(defineRoutes);
  }

  public getDefineRoutesFuncs() {
    return this.defineRoutesFuncs;
  }
}
