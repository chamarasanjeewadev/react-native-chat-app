import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import {
  Color,
  FontFamily,
  Border,
  Padding,
  FontSize,
} from "../../utils/GlobalStyles";

const CurrentRankCard = () => {
  return (
    <View style={styles.currentRankCard}>
      <View style={styles.subsectionFlexBox}>
        <Text style={[styles.heading, styles.headingTypo]}>Current Rank</Text>
      </View>
      <View style={[styles.currentRankComponents, styles.rankShadowBox]}>
        <Image
          style={styles.rankBadgesComponents}
          resizeMode="cover"
          source={require("../../assets/images/sizelarge-ranknovice-level14.png")}
        />
        <View style={styles.currentSpaceBlock}>
          <View style={[styles.currentRank, styles.rankFlexBox]}>
            <Text style={[styles.text, styles.textTypo]}>Novice I</Text>
          </View>
          <View style={[styles.rankTitle, styles.rankFlexBox]}>
            <Text style={[styles.number, styles.numberTypo]}>
              Language Learner
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.subsectionSubheading, styles.subsectionFlexBox]}>
        <Text style={[styles.heading1, styles.headingTypo]}>Next Rank</Text>
      </View>
      <View style={[styles.nextRankComponents, styles.rankShadowBox]}>
        <View style={[styles.nextRankTitle, styles.rankFlexBox]}>
          <Image
            style={styles.rankBadgesComponents1}
            resizeMode="cover"
            source={require("../../assets/images/rank-badges-components1.png")}
          />
          <View style={[styles.currentRank1, styles.currentSpaceBlock]}>
            <Text
              style={[styles.text1, styles.text1Layout]}
            >{`Novice II `}</Text>
          </View>
          <View style={[styles.currentRank1, styles.currentSpaceBlock]}>
            <Text style={[styles.number1, styles.numberTypo]}>
              Vocabulary Voyager
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingTypo: {
    textAlign: "left",
    color: Color.milaBlueDefaultMilaBlue950,
    fontFamily: FontFamily.textLgSemibold,
    fontWeight: "600",
  },
  rankShadowBox: {
    borderRadius: Border.br_5xs,
    marginTop: 8,
    alignSelf: "stretch",
    shadowOpacity: 1,
    elevation: 2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: "rgba(2, 6, 23, 0.3)",
    backgroundColor: Color.colorWhite,
  },
  rankFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  textTypo: {
    color: Color.milaPinkMilaPink500,
    textAlign: "left",
    fontFamily: FontFamily.textLgSemibold,
    fontWeight: "600",
  },
  numberTypo: {
    fontFamily: FontFamily.textSmMedium,
    fontWeight: "500",
    textAlign: "left",
  },
  subsectionFlexBox: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: 0,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_base,
  },
  currentSpaceBlock: {
    marginLeft: 8,
    justifyContent: "center",
  },
  text1Layout: {
    lineHeight: 22,
    fontSize: FontSize.textLgSemibold_size,
  },
  heading: {
    fontSize: FontSize.displayXsSemibold_size,
    lineHeight: 29,
  },
  rankBadgesComponents: {
    width: 76,
    height: 76,
  },
  text: {
    fontSize: FontSize.displaySmSemibold_size,
    letterSpacing: -0.6,
    lineHeight: 36,
    textTransform: "capitalize",
  },
  currentRank: {
    justifyContent: "center",
  },
  number: {
    letterSpacing: -0.4,
    color: Color.colorMilaPinkPink600,
    lineHeight: 22,
    fontSize: FontSize.textLgSemibold_size,
    textTransform: "capitalize",
  },
  rankTitle: {
    marginTop: 8,
    justifyContent: "center",
  },
  currentRankComponents: {
    height: 92,
    paddingLeft: Padding.p_9xs,
    paddingTop: Padding.p_5xs,
    paddingRight: Padding.p_xl,
    paddingBottom: Padding.p_5xs,
    marginTop: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  heading1: {
    fontSize: FontSize.textXlSemibold_size,
    lineHeight: 24,
  },
  subsectionSubheading: {
    marginTop: 8,
  },
  rankBadgesComponents1: {
    width: 20,
    height: 20,
  },
  text1: {
    color: Color.milaPinkMilaPink500,
    textAlign: "left",
    fontFamily: FontFamily.textLgSemibold,
    fontWeight: "600",
  },
  currentRank1: {
    alignItems: "center",
    flexDirection: "row",
  },
  number1: {
    fontSize: FontSize.textSmMedium_size,
    lineHeight: 17,
    color: Color.milaPinkMilaPink700,
  },
  nextRankTitle: {
    flexWrap: "wrap",
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: 0,
  },
  nextRankComponents: {
    paddingHorizontal: Padding.p_9xs,
    paddingVertical: Padding.p_5xs,
    marginTop: 8,
    justifyContent: "center",
  },
  currentRankCard: {
    width: 411,
    overflow: "hidden",
    padding: Padding.p_5xs,
    shadowOpacity: 1,
    elevation: 2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: "rgba(2, 6, 23, 0.3)",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_base,
  },
});

export default CurrentRankCard;
