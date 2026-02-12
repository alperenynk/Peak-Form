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
            backgroundColor: "#171b22",
            borderWidth: 1,
            borderColor: "#2a3140",
            elevation: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.5,
            shadowRadius: 16,
          },
          tabBarItemStyle: {
            paddingTop: 12,
          },
          tabBarActiveTintColor: "#6366f1",
          tabBarInactiveTintColor: "#6b7280",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="home"
                size={28}
                color={focused ? "#6366f1" : "#6b7280"}
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
                color={focused ? "#6366f1" : "#6b7280"}
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
                color={focused ? "#ff4d6a" : "#6b7280"}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}