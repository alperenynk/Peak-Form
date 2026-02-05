import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Layout() {
  return (
    <>
      <StatusBar value="auto" />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: "#1e2124" },
        }}
      >
        
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="home"
                size={24}
                color={focused ? "#ffc107" : "#fff"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="search"
                size={24}
                color={focused ? "#ffc107" : "#fff"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="favourites"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="star"
                size={24}
                color={focused ? "#ffc107" : "#fff"}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
