import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  SectionList,
  Button,
  Alert,
  ActivityIndicator,
  Dimensions,
  Modal,
  TouchableHighlight,
  Pressable,
  Switch,
} from "react-native";
// import { TouchableHighlight } from 'react-native-gesture-handler';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function App() {
  const name = "祁明华";
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState("");
  const [timesPressed, setTimesPressed] = useState(0);
  const getFullName = (firstName, secondName, thirdName) => {
    return firstName + " " + secondName + " " + thirdName;
  };
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const logo = {
    uri: "https://reactnative.dev/img/tiny_logo.png",
    width: 64,
    height: 64,
  };
  const Cat = () => {
    return (
      <View>
        <Text>I am also a {name}!</Text>
      </View>
    );
  };
  const createTwoButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const createThreeButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  let textLog = "";
  if (timesPressed > 1) {
    textLog = timesPressed + "x onPress";
  } else if (timesPressed > 0) {
    textLog = "onPress";
  }
  return (
    <View style={styles.container}>
      {/* <View>
        <Text>{`Window Dimensions: height - ${dimensions.window.height}, width - ${dimensions.window.width}`}</Text>
        <Text>{`Screen Dimensions: height - ${dimensions.screen.height}, width - ${dimensions.screen.width}`}</Text>
      </View> */}
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      ></Switch>
      <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "rgb(210,230,255)" : "white" },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.text}>{pressed ? "Pressed!" : "Press Me"}</Text>
        )}
      </Pressable>
      <View style={styles.logBox}>
        <Text testID="pressable_press_console">{textLog}</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196f3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>隐藏窗口</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>打开弹窗</Text>
      </TouchableHighlight>
      <ScrollView>
        <Text>Hello, I am {getFullName("远华", "中华", "近华")}!</Text>
        <Cat />
        <Cat />
        <Cat />
        <View>
          <Text>Some more text</Text>
          <Image
            source={{
              uri: "https://reactnative.dev/docs/assets/p_cat2.png",
            }}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Text style={{ padding: 10, fontSize: 42 }}>
          {text
            .split(" ")
            .map((word) => word && "🍕")
            .join(" ")}
        </Text>

        <View style={styles.fixToText}>
          <Button
            title="Left button"
            onPress={() => Alert.alert("Left button pressed")}
          />
          <Button
            title="Right button"
            onPress={() => Alert.alert("Right button pressed")}
          />
        </View>

        <View style={styles.container}>
          <Button title={"2-Button Alert"} onPress={createTwoButtonAlert} />
          <Button title={"3-Button Alert"} onPress={createThreeButtonAlert} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
});
