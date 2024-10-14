interface Window {
  electron : {
    saveUserData: (
      username: string,
      password: string
    ) => Promise<boolean>;
  },
  testApi : () => void;
}
