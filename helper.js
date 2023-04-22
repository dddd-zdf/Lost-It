import { Dimensions, StyleSheet } from "react-native";

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
export const windowHeight = Dimensions.get("window").height;

export const GooglePlacesInputStyles = {
    position: "absolute",
    marginTop: 25,
    width: "95%",
    borderRadius: 10,
    zIndex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: "black",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
};

export const textBox = {
  flex: 0, 
  flexGrow: 1,
  paddingTop: windowHeight/3
};

export const textStyle = {
  fontSize: 24, backgroundColor: '#f8f9fa', flexGrow: 1};

export const FlatListStyle = {
  flexGrow: 1,
  paddingBottom: 100,
  paddingTop: 25,
  alignItems: "center",
  width: windowWidth,
}

export const MyInputStyles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.BLUE,
    paddingLeft: 10,
  },
  input: {
    backgroundColor: COLORS.GRAY,
    width: "80%",
    fontWeight: "bold",
    padding: 7,
    color: COLORS.BLACK,
    fontSize: 17,
    marginBottom: 15,
    textAlignVertical: "top",
    textAlign: "left",
    borderRadius: 5,
  },
});

export const NotificationManagerStyle = StyleSheet.create({
  notificationPressable: {
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 3,
    backgroundColor: COLORS2.PRIMARY,
    marginBottom: 20,
    marginTop: 20
  },
});

export const addStyle = StyleSheet.create({
  pressablesContainer: {
    flexDirection: "row",
    marginVertical: 25,
    width: 0.8 * windowWidth,
    height: 40,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  pressableReset: {
    ...addPagePressable,
    backgroundColor: "#FFA24B",
  },
  text: {
    fontSize: 13,
    color: COLORS.WHITE,
    fontWeight: "500",
  },
  utilitiesContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: "90%",
    height: 200,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
  },
  mapButton: {
    width: 0.8 * windowWidth,
    height: 0.8 * windowWidth,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: COLORS.GRAY,
    paddingHorizontal: 3,
    marginVertical: 15,
  },
  imageButtons: {
    width: 0.8 * windowWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: COLORS2.PRIMARY,
    paddingHorizontal: 3,
  },
  imageContainer: {
    width: 0.8 * windowWidth,
    height: 0.8 * windowWidth,
    marginBottom: 25,
  },
  addressContainer: {
    width: 0.8 * windowWidth,
    alignItems: "center",
    marginVertical: 10,
  },
});

export const DetailStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    width: 350,
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  pressablesContainer: {
    flexDirection: "row",
    marginTop: 10,
    width: 260,
    height: 50,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  pressableDelete: {
    ...addPagePressable,
    backgroundColor: "red",
    
  },
  text: {
    fontSize: 15,
    marginVertical: 3,
    fontWeight: "bold",
    color: COLORS.BLACK,
  },
  buttonText: {
    color: COLORS.WHITE,
  },
  utilitiesContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: "90%",
    height: 200,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  utilitiesButtons: {
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 3,
    backgroundColor: COLORS.GOLD,
    paddingHorizontal: 3,
  },
});

export const editStyle = StyleSheet.create({
  pressable: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 3,
    backgroundColor: COLORS.BLUE,
  },
  text: {
    fontSize: 13,
    color: COLORS.WHITE,
    fontWeight: "500",
  },
  utilitiesContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: "90%",
    height: 200,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
  },
  utilitiesButtons: {
    // flex: 1,
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
    paddingVertical: 7,
    borderRadius: 3,
    backgroundColor: COLORS.BLUE,
    paddingHorizontal: 3,
  },
  pressablesContainer: {
    flexDirection: "row",
    marginVertical: 25,
    width: 0.8 * windowWidth,
    height: 40,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  pressableReset: {
    ...addPagePressable,
    backgroundColor: "#FFA24B",
  },
  text: {
    fontSize: 13,
    color: COLORS.WHITE,
    fontWeight: "500",
  },
  utilitiesContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: "90%",
    height: 200,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
  },
  mapButton: {
    width: 0.8 * windowWidth,
    height: 0.8 * windowWidth,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: COLORS.GRAY,
    paddingHorizontal: 3,
    marginVertical: 15,
  },
  imageButtons: {
    width: 0.8 * windowWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: COLORS2.PRIMARY,
    paddingHorizontal: 3,
    // marginTop: 25,
  },
  imageContainer: {
    width: 0.8 * windowWidth,
    height: 0.8 * windowWidth,
    marginBottom: 25,
  },
  addressContainer: {
    width: 0.8 * windowWidth,
    alignItems: "center",
    marginVertical: 10,
  },
});

export const loginStyle = StyleSheet.create({
  topContainer: {
    alignItems: "center",
  },
  middleContainer: {
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    // backgroundColor: "yellow",
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});

export const mapStyle = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  confirmButton: {
    position: "absolute",
    width: 180,
    bottom: 63,
    right: 0,
    left: 100,
    alignItems: "center",
    height: 40,
    // marginBottom: 40,
    backgroundColor: "white",
    opacity: 0.7,
    textAlign: "center",
    paddingTop: 10,
  },
});

export const profileStyle = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    marginTop: 90,
  },
  textStyle: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "700",
  },
  bottomContainer: {
    // backgroundColor: "yellow",
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  signOutPressable: {
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 3,
    backgroundColor: "#FFA24B",
    marginBottom: 20,
    marginTop: 10,
  },
});

export const signupStyle = StyleSheet.create({
  topContainer: {
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    // backgroundColor: "yellow",
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});