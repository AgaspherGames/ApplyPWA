import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "Apply",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      clientId:
        "160125150249-vh5sb0barejvmr5a3c9ogpk9tvrudeqi.apps.googleusercontent.com",
      androidClientId:
        "160125150249-vh5sb0barejvmr5a3c9ogpk9tvrudeqi.apps.googleusercontent.com",
      serverClientId:
        "160125150249-vh5sb0barejvmr5a3c9ogpk9tvrudeqi.apps.googleusercontent.com",
      iosClientId:
        "160125150249-vh5sb0barejvmr5a3c9ogpk9tvrudeqi.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
