import DeviceInfo from "react-native-device-info";
import { usePermissionsStore } from "stores/global-store/permissions-store/PermissionsStore";

export let isEmulator = false;
DeviceInfo.isEmulator().then((isEmulatorResponse) => {
  isEmulator = isEmulatorResponse;

  if (isEmulator) {
    usePermissionsStore.getState().requestPermissions();
  }
});
