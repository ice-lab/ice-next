export interface App {
  rootId?: string;
  mountNode?: HTMLElement;
  renderComponent?: ComponentType;
}

export interface AppConfig {
  app?: App;
}
