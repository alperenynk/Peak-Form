import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { FontAwesome } from "@expo/vector-icons";

export default function Layout() {
  return (
    <>
      <StatusBar value="auto" />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            height: 70,
            marginHorizontal: 15,
            borderRadius: 30,
            backgroundColor: "#3a3a3a",
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.4,
            shadowRadius: 10,
          },
          tabBarItemStyle: {
            paddingTop: 14,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="home"
                size={28}
                color={focused ? "#ffc107" : "#aaa"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="search"
                size={28}
                color={focused ? "#ffc107" : "#aaa"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="favourites"
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="heart"
                size={28}
                color={focused ? "#ffc107" : "#aaa"}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
