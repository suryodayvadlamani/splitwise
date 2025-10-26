import React from 'react';
import { SafeAreaView, Text, View, FlatList, StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: '600' }}>Splitwise-like Mobile</Text>
        <Text style={{ marginTop: 8 }}>Hello from React Native</Text>
      </View>
    </SafeAreaView>
  );
}
