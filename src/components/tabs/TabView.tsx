import React, { FC } from "react";
import { Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import {
  Route,
  TabBar,
  TabBarIndicator,
  TabView as NativeTabView,
  TabViewProps,
} from "react-native-tab-view";
import { StyledView } from "utils/styled";

interface TabViewerProps<T extends Route> extends TabViewProps<T> {}

const TabView: FC<TabViewerProps<Route>> = ({ navigationState, ...rest }) => {
  const theme = useTheme();

  const { index, routes } = navigationState;
  return (
    <NativeTabView
      navigationState={navigationState}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          contentContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: theme.dark ? "#333" : "#EBEDEF",
          }}
          indicatorStyle={{
            backgroundColor: theme.colors.primary,
            height: 3,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          style={{ backgroundColor: theme.colors.onPrimary }}
          labelStyle={{
            fontFamily: "Poppins-Medium",
            textTransform: "none",
            color: theme.colors.primary,
          }}
          renderIcon={(iconProps) => {
            return iconProps.route.icon ? (
              <StyledView style={{ opacity: iconProps.focused ? 1 : 0.7 }}>
                {iconProps.route.icon}
              </StyledView>
            ) : null;
          }}
          renderIndicator={(indicatorProps) => {
            const width =
              indicatorProps.getTabWidth(index) - (200 - routes.length * 35);

            return <TabBarIndicator {...indicatorProps} width={width} />;
          }}
          indicatorContainerStyle={{
            left: (200 - routes.length * 35) / 2,
          }}
        />
      )}
      {...rest}
    />
  );
};

export default TabView;
