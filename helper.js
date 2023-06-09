import { Dimensions } from "react-native";

export const COLORS = {
  BLUE: "#1A5276",
  WHITE: "#fff",
  CYAN: "#5499C7",
  GOLD: "#F1C80D",
  LIGHTBLUE: "#A9CCE3",
  BLACK: "black",
  MAROON: "#800000",
  CYAN2: "#a1bbc4",
  LIGHTGRAY: "#EBF2EE",
  GRAY: "#dcdcdc",
};

export const COLORS2 = {
  PRIMARY: "#329f69",
  SECONDARY: "#fff",
  TERTIARY: "#5499C7",
  NEUTRAL: "#f8f9fa",
};

export const ScreenContainer = {
  // flex: 1,
  backgroundColor: "#f8f9fa",
  justifyContent: "flex-start",
  alignItems: "center",
};

export const DefaultLocation = {
  latitude: 49.280517,
  longitude: -123.115961,
};

export const inputContainer = {
  borderWidth: 0.5,
  padding: 8,
  borderRadius: 10,
  width: "90%",
  fontSize: 18,
  color: COLORS.BLACK,
  fontWeight: "500",
  marginBottom: 5,
  marginTop: 5,
};

export const loginContainer = {
  width: "60%",
  alignItems: "center",
  borderRadius: 10,
  // borderWidth: 2,
  backgroundColor: COLORS2.PRIMARY,
  padding: 8,
  marginBottom: 20,
};

export const addPagePressable = {
  flex: 1,
  alignItems: "center",
  marginHorizontal: 10,
  paddingVertical: 7,
  borderRadius: 3,
  backgroundColor: COLORS2.PRIMARY,
};

export const windowWidth = Dimensions.get("window").width;
