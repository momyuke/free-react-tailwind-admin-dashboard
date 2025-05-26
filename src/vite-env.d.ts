/// <reference types="vite/client" />

export const zustandHmrFix = (name: string, useStore: UseBoundStore<any>) => {
  if (import.meta.hot) {
    const state = import.meta.hot!.data[name];
    if (state) {
      useStore.setState(import.meta.hot!.data[name]);
    }
    useStore.subscribe((state: any) => {
      import.meta.hot!.data[name] = state;
    });
    import.meta.hot!.accept((newModule) => {
      if (newModule) {
        useStore.setState(import.meta.hot!.data[name]);
      }
    });
  }
};
