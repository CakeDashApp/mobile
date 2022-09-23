import Agile, { Storage } from "@agile-ts/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reactIntegration from "@agile-ts/react";

export const App = new Agile({ logJobs: true }).use(reactIntegration);

App.configureStorage(
  new Storage({
    async: true,
    methods: {
      get: AsyncStorage.getItem,
      set: AsyncStorage.setItem,
      remove: AsyncStorage.removeItem,
    },
  })
);
