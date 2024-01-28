import * as React from 'react'
import { Image, StyleSheet, View, Text, ScrollView, Pressable } from 'react-native'

import { Border, Color, FontFamily, FontSize, Padding } from '../utils/GlobalStyles'
import { useAuthStore } from '../stores/AuthStore'
import { deleteIdToken } from '../utils/tokenUtils'
import { useGetUsersQuery } from '../hooks/queries'
const ProfileScreen = ({ navigation }) => {
  const { setIdToken: setAuthToken, idToken: authToken, user, setUser } = useAuthStore()
  const { data: userInfo } = useGetUsersQuery() // this is expected to be fetched from storage
  const handleLogout = () => {
    try {
      deleteIdToken()
      setUser(null)
      navigation.push('Login')
      // navigation.navigate("authStack", { screen: "Details" });
    } catch (error) {
      console.log('error deleting token...')
    }
  }
  return (
    <ScrollView>
      <View style={styles.uiTemplatemobileprofile}>
        <View style={styles.userFlexBox}>
          <Image
            style={styles.logoIconLayout}
            resizeMode="cover"
            source={require('./../assets/images/logo5.png')}
          />
          <View style={[styles.logo1, styles.streakFlexBox]}>
            <Image
              style={styles.logoChild}
              resizeMode="cover"
              source={require('../assets/images/group-16.png')}
            />
          </View>
        </View>
        <View>
          <Pressable
            onPress={() => {
              handleLogout()
            }}
          >
            <Text>Log out</Text>
          </Pressable>
        </View>
        <View style={[styles.sectionTitle, styles.sectionParentFlexBox]}>
          <View style={[styles.sectionTitleBadgesParent, styles.sectionParentFlexBox]}>
            <View style={styles.sectionTitleBadges}>
              <View style={styles.sectionTitleBadgeBg} />
              <Image
                style={[styles.sectionTitleIcons, styles.sectionLayout]}
                resizeMode="cover"
                source={require('../assets/images/section-title-icons5.png')}
              />
            </View>
            <View style={styles.sectionHeading}>
              <Text style={[styles.heading, styles.text3Typo]}>My Profile</Text>
            </View>
          </View>
          <Image
            style={styles.sectionLayout}
            resizeMode="cover"
            source={require('../assets/images/section-title-icons7.png')}
          />
        </View>
        <View style={[styles.userCard, styles.userCardShadowBox]}>
          <View style={[styles.wrapperProfileParent, styles.userFlexBox]}>
            <View style={[styles.wrapperProfile, styles.wrapperFlexBox]}>
              <Image
                style={styles.profileIcon}
                resizeMode="cover"
                source={require('../assets/images/profile6.png')}
              />
            </View>
            <View style={[styles.userName, styles.userFlexBox]}>
              <Text style={[styles.heading1, styles.headingTypo1]}>
                {userInfo?.user?.full_name}
              </Text>
            </View>
          </View>
          <View style={styles.joinedParent}>
            <View style={styles.userFlexBox}>
              <Image
                style={[styles.clockIcon, styles.sectionLayout]}
                resizeMode="cover"
                source={require('../assets/images/clock3.png')}
              />
              <View style={styles.text}>
                <Text style={styles.number}>Joined Oct 2023</Text>
              </View>
            </View>
            <View style={[styles.userName1, styles.userFlexBox]}>
              <Image
                style={[styles.clockIcon, styles.sectionLayout]}
                resizeMode="cover"
                source={require('../assets/images/atsign4.png')}
              />
              <View style={styles.text1}>
                <Text style={styles.number}>oliviarhye1234</Text>
              </View>
            </View>
            <View style={[styles.userName1, styles.userFlexBox]}>
              <Image
                style={[styles.clockIcon, styles.sectionLayout]}
                resizeMode="cover"
                source={require('../assets/images/markerpin045.png')}
              />
              <View style={styles.text1}>
                <Text style={styles.number}>United Kingdom</Text>
              </View>
            </View>
            <View style={styles.miniFlagsParent}>
              <Image
                style={[styles.miniFlagsIcon, styles.miniIconLayout]}
                resizeMode="cover"
                source={require('../assets/images/mini-flags9.png')}
              />
              <Image
                style={[styles.miniFlagsIcon1, styles.miniIconLayout]}
                resizeMode="cover"
                source={require('../assets/images/mini-flags10.png')}
              />
              <Image
                style={[styles.miniFlagsIcon1, styles.miniIconLayout]}
                resizeMode="cover"
                source={require('../assets/images/mini-flags11.png')}
              />
            </View>
          </View>
        </View>
        {/* <CurrentRankCard /> */}
        <View style={styles.totalXpCard}>
          <View style={styles.subsectionFlexBox}>
            <Text style={[styles.heading2, styles.headingTypo]}>Total XP</Text>
          </View>
          <View style={[styles.subsectionSubheadingParent, styles.subsectionShadowBox]}>
            <View style={styles.subsectionFlexBox}>
              <Text style={[styles.heading3, styles.headingTypo]}>Points To Next Rank</Text>
            </View>
            <View style={[styles.progressBar, styles.newParentFlexBox]}>
              <View style={styles.progressBar1}>
                <View style={styles.background} />
                <View style={styles.progress} />
              </View>
            </View>
            <View style={[styles.userName1, styles.userFlexBox]}>
              <View style={[styles.wrapperRankBadgesComponents, styles.miniIconLayout]}>
                <Image
                  style={styles.streakIconPosition}
                  resizeMode="cover"
                  source={require('../assets/images/rank-badges-components8.png')}
                />
              </View>
              <View style={[styles.subsectionSubheading1, styles.subsectionFlexBox]}>
                <Text style={[styles.heading3, styles.headingTypo]}>250/500</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.dailyStreak, styles.userCardShadowBox]}>
          <View style={styles.subsectionFlexBox}>
            <Text style={[styles.heading2, styles.headingTypo]}>Daily Streak</Text>
          </View>
          <View style={[styles.subsectionSubheadingGroup, styles.subsectionShadowBox]}>
            <View style={styles.subsectionFlexBox}>
              <Text style={[styles.heading3, styles.headingTypo]}>23 Days Streak!</Text>
            </View>
            <View style={[styles.streakDaysAndIconParent, styles.sectionParentFlexBox]}>
              <View style={[styles.streakDaysAndIcon, styles.streakFlexBox]}>
                <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                  <Image
                    style={styles.streakIconPosition}
                    resizeMode="cover"
                    source={require('../assets/images/streak-icon35.png')}
                  />
                </View>
                <View style={[styles.streakDays, styles.streakFlexBox]}>
                  <Text style={[styles.heading7, styles.newLayout2]}>Mon</Text>
                </View>
              </View>
              <View style={[styles.streakDaysAndIcon, styles.streakFlexBox]}>
                <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                  <Image
                    style={styles.streakIconPosition}
                    resizeMode="cover"
                    source={require('../assets/images/streak-icon36.png')}
                  />
                </View>
                <View style={[styles.streakDays, styles.streakFlexBox]}>
                  <Text style={[styles.heading7, styles.newLayout2]}>Tue</Text>
                </View>
              </View>
              <View style={[styles.streakDaysAndIcon, styles.streakFlexBox]}>
                <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                  <Image
                    style={styles.streakIconPosition}
                    resizeMode="cover"
                    source={require('../assets/images/streak-icon37.png')}
                  />
                </View>
                <View style={[styles.streakDays, styles.streakFlexBox]}>
                  <Text style={[styles.heading7, styles.newLayout2]}>Wed</Text>
                </View>
              </View>
              <View style={[styles.streakDaysAndIcon, styles.streakFlexBox]}>
                <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                  <Image
                    style={styles.streakIconPosition}
                    resizeMode="cover"
                    source={require('../assets/images/streak-icon38.png')}
                  />
                </View>
                <View style={[styles.streakDays, styles.streakFlexBox]}>
                  <Text style={[styles.heading7, styles.newLayout2]}>Thu</Text>
                </View>
              </View>
              <View style={[styles.streakDaysAndIcon, styles.streakFlexBox]}>
                <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                  <Image
                    style={styles.streakIconPosition}
                    resizeMode="cover"
                    source={require('../assets/images/streak-icon39.png')}
                  />
                </View>
                <View style={[styles.streakDays, styles.streakFlexBox]}>
                  <Text style={[styles.heading7, styles.newLayout2]}>Fri</Text>
                </View>
              </View>
              <View style={[styles.streakDaysAndIcon, styles.streakFlexBox]}>
                <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                  <Image
                    style={styles.streakIconPosition}
                    resizeMode="cover"
                    source={require('../assets/images/streak-icon40.png')}
                  />
                </View>
                <View style={[styles.streakDays, styles.streakFlexBox]}>
                  <Text style={[styles.heading7, styles.newLayout2]}>Sat</Text>
                </View>
              </View>
              <View style={[styles.streakDaysAndIcon, styles.streakFlexBox]}>
                <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                  <Image
                    style={styles.streakIconPosition}
                    resizeMode="cover"
                    source={require('../assets/images/streak-icon41.png')}
                  />
                </View>
                <View style={[styles.streakDays, styles.streakFlexBox]}>
                  <Text style={[styles.heading7, styles.newLayout2]}>Sun</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.newWordsLearnd, styles.userCardShadowBox]}>
          <View style={styles.subsectionFlexBox}>
            <Text style={[styles.heading2, styles.headingTypo]}>New Words Learned</Text>
          </View>
          <View style={[styles.newWordsBoxParent, styles.newParentFlexBox]}>
            <View style={[styles.newWordsBox, styles.newShadowBox]}>
              <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                <Image
                  style={styles.newPosition1}
                  resizeMode="cover"
                  source={require('../assets/images/new-words-learned16.png')}
                />
              </View>
              <View style={[styles.newWordsNumber, styles.newParentFlexBox]}>
                <Text style={[styles.newWordsNumber1, styles.newTypo]}>6</Text>
              </View>
              <View style={[styles.newWordsLearnednewWordsLa, styles.newLayout]}>
                <Text style={[styles.newWordsLabel, styles.newPosition]}>Today</Text>
              </View>
            </View>
            <View style={[styles.newWordsBox1, styles.newShadowBox]}>
              <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                <Image
                  style={styles.newPosition1}
                  resizeMode="cover"
                  source={require('../assets/images/new-words-learned17.png')}
                />
              </View>
              <View style={[styles.newWordsNumber, styles.newParentFlexBox]}>
                <Text style={[styles.newWordsNumber3, styles.newTypo]}>23</Text>
              </View>
              <View style={[styles.newWordsLearnednewWordsLa, styles.newLayout]}>
                <Text style={[styles.newWordsLabel, styles.newPosition]}>Week</Text>
              </View>
            </View>
            <View style={[styles.newWordsBox2, styles.newShadowBox]}>
              <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                <Image
                  style={styles.newPosition1}
                  resizeMode="cover"
                  source={require('../assets/images/new-words-learned18.png')}
                />
              </View>
              <View style={[styles.newWordsNumber, styles.newParentFlexBox]}>
                <Text style={[styles.newWordsNumber5, styles.newTypo]}>47</Text>
              </View>
              <View style={[styles.newWordsLearnednewWordsLa, styles.newLayout]}>
                <Text style={[styles.newWordsLabel, styles.newPosition]}>Month</Text>
              </View>
            </View>
          </View>
          <View style={[styles.newWordsBox3, styles.newShadowBox]}>
            <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
              <Image
                style={styles.newPosition1}
                resizeMode="cover"
                source={require('../assets/images/new-words-learned19.png')}
              />
            </View>
            <View style={styles.newWordsNumber6}>
              <Text style={[styles.newWordsNumber7, styles.newLayout1]}>76</Text>
            </View>
            <View style={[styles.newWordsLearnednewWordsLa3, styles.newLayout]}>
              <Text style={[styles.newWordsLabel, styles.newPosition]}>Total</Text>
            </View>
          </View>
          <View style={styles.buttonsbuttonShadowBox}>
            <Image
              style={[styles.miniFlagsIcon, styles.miniIconLayout]}
              resizeMode="cover"
              source={require('../assets/images/bank4.png')}
            />
            <View style={[styles.textPadding, styles.streakFlexBox]}>
              <Text style={[styles.text3, styles.newLayout2]}>Check Out New Words</Text>
            </View>
            <Image
              style={[styles.alertCircleIcon, styles.miniIconLayout]}
              resizeMode="cover"
              source={require('../assets/images/alertcircle2.png')}
            />
          </View>
        </View>
        <View style={[styles.chatsCompleted, styles.userCardShadowBox]}>
          <View style={styles.subsectionFlexBox}>
            <Text style={[styles.heading2, styles.headingTypo]}>Chats Completed</Text>
          </View>
          <View style={[styles.newWordsBoxParent, styles.newParentFlexBox]}>
            <View style={[styles.chatsCompleted1, styles.newShadowBox]}>
              <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                <Image
                  style={styles.newPosition1}
                  resizeMode="cover"
                  source={require('../assets/images/assistance-level-icons15.png')}
                />
              </View>
              <View style={[styles.newWordsNumber, styles.newParentFlexBox]}>
                <Text style={[styles.newWordsNumber9, styles.newTypo]}>19</Text>
              </View>
              <View style={[styles.newWordsLearnednewWordsLa4, styles.newParentFlexBox]}>
                <Text style={[styles.newWordsLabel4, styles.newTypo]}>Guided</Text>
              </View>
            </View>
            <View style={[styles.chatsCompleted2, styles.newShadowBox]}>
              <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                <Image
                  style={styles.newPosition1}
                  resizeMode="cover"
                  source={require('../assets/images/assistance-level-icons16.png')}
                />
              </View>
              <View style={[styles.newWordsNumber, styles.newParentFlexBox]}>
                <Text style={[styles.newWordsNumber11, styles.newTypo]}>7</Text>
              </View>
              <View style={[styles.newWordsLearnednewWordsLa4, styles.newParentFlexBox]}>
                <Text style={[styles.newWordsLabel5, styles.newTypo]}>Supportive</Text>
              </View>
            </View>
            <View style={[styles.chatsCompleted3, styles.newShadowBox]}>
              <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
                <Image
                  style={styles.newPosition1}
                  resizeMode="cover"
                  source={require('../assets/images/assistance-level-icons17.png')}
                />
              </View>
              <View style={[styles.newWordsNumber, styles.newParentFlexBox]}>
                <Text style={[styles.newWordsNumber13, styles.newTypo]}>2</Text>
              </View>
              <View style={[styles.newWordsLearnednewWordsLa4, styles.newParentFlexBox]}>
                <Text style={[styles.newWordsLabel6, styles.newTypo]}>Independent</Text>
              </View>
            </View>
          </View>
          <View style={[styles.newWordsBox4, styles.newShadowBox]}>
            <View style={[styles.wrapperStreakIcon, styles.wrapperFlexBox]}>
              <Image
                style={styles.newPosition1}
                resizeMode="cover"
                source={require('../assets/images/new-words-learned19.png')}
              />
            </View>
            <View style={styles.newWordsNumber6}>
              <Text style={[styles.newWordsNumber7, styles.newLayout1]}>28</Text>
            </View>
            <View style={[styles.newWordsLearnednewWordsLa3, styles.newLayout]}>
              <Text style={[styles.newWordsLabel, styles.newPosition]}>Total</Text>
            </View>
          </View>
          <View style={styles.buttonsbuttonShadowBox}>
            <Image
              style={[styles.miniFlagsIcon, styles.miniIconLayout]}
              resizeMode="cover"
              source={require('../assets/images/compass024.png')}
            />
            <View style={[styles.textPadding, styles.streakFlexBox]}>
              <Text style={[styles.text3, styles.newLayout2]}>Explore Chats</Text>
            </View>
            <Image
              style={[styles.alertCircleIcon, styles.miniIconLayout]}
              resizeMode="cover"
              source={require('../assets/images/alertcircle2.png')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  streakFlexBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionParentFlexBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  sectionLayout: {
    height: 24,
    width: 24
  },
  text3Typo: {
    fontFamily: FontFamily.textSmSemibold,
    fontWeight: '600',
    textAlign: 'left'
  },
  userCardShadowBox: {
    shadowOpacity: 1,
    elevation: 3,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: 'rgba(16, 24, 40, 0.1)',
    backgroundColor: Color.milaGrayMilaGray25,
    borderRadius: Border.br_base,
    marginTop: 8,
    alignSelf: 'stretch',
    padding: Padding.p_5xs
  },
  userFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  wrapperFlexBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingTypo1: {
    color: Color.milaGray700,
    textAlign: 'left',
    fontFamily: FontFamily.textSmSemibold,
    fontWeight: '600'
  },
  miniIconLayout: {
    height: 20,
    width: 20
  },
  headingTypo: {
    color: Color.milaBlueDefaultMilaBlue950,
    textAlign: 'left',
    fontFamily: FontFamily.textSmSemibold,
    fontWeight: '600'
  },
  subsectionShadowBox: {
    borderRadius: Border.br_5xs,
    elevation: 2,
    shadowRadius: 2,
    marginTop: 8,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1
    },
    backgroundColor: Color.milaGrayMilaGray25,
    alignSelf: 'stretch',
    padding: Padding.p_5xs
  },
  newParentFlexBox: {
    alignSelf: 'stretch',
    marginTop: 8
  },
  subsectionFlexBox: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_9xs,
    borderRadius: Border.br_base,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  newLayout2: {
    lineHeight: 17,
    fontSize: FontSize.textSmSemibold_size
  },
  newShadowBox: {
    padding: Padding.p_base,
    borderRadius: Border.br_5xs,
    elevation: 2,
    shadowRadius: 2,
    shadowColor: 'rgba(16, 24, 40, 0.05)',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1
    },
    justifyContent: 'center',
    alignItems: 'center'
  },
  newTypo: {
    textAlign: 'center',
    top: '0%',
    fontFamily: FontFamily.textSmSemibold,
    fontWeight: '600',
    position: 'absolute'
  },
  newLayout: {
    width: 45,
    height: 17
  },
  newPosition: {
    top: '0%',
    left: '0%',
    textAlign: 'left',
    fontFamily: FontFamily.textSmSemibold,
    fontWeight: '600',
    position: 'absolute'
  },
  newLayout1: {
    lineHeight: 43,
    fontSize: FontSize.displayMdSemibold_size
  },
  logoIconLayout: {
    height: 50,
    width: 50
  },
  logoChild: {
    width: 77,
    height: 29
  },
  logo1: {
    padding: 3,
    marginLeft: 3.34
  },
  sectionTitleBadgeBg: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.milaBlueDefaultMilaBlue500,
    borderColor: Color.milaBrandBlue200,
    borderWidth: 6,
    zIndex: 0,
    borderStyle: 'solid',
    elevation: 2,
    shadowRadius: 2,
    shadowColor: 'rgba(16, 24, 40, 0.05)',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1
    },
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  sectionTitleIcons: {
    marginTop: -12,
    marginLeft: -12,
    top: '50%',
    left: '50%',
    zIndex: 1,
    position: 'absolute',
    width: 24,
    overflow: 'hidden'
  },
  sectionTitleBadges: {
    flexDirection: 'row'
  },
  heading: {
    textAlign: 'left',
    color: Color.milaBrandBlue800,
    lineHeight: 36,
    fontSize: FontSize.displaySmSemibold_size
  },
  sectionHeading: {
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: Padding.p_9xs,
    borderRadius: Border.br_base,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  sectionTitleBadgesParent: {
    width: 224
  },
  sectionTitle: {
    marginTop: 8,
    shadowOpacity: 1,
    elevation: 3,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: 'rgba(16, 24, 40, 0.1)',
    backgroundColor: Color.milaGrayMilaGray25,
    borderRadius: Border.br_base,
    alignSelf: 'stretch',
    padding: Padding.p_5xs
  },
  profileIcon: {
    top: 5,
    transform: [
      {
        scale: 1.22
      }
    ],
    left: 0,
    objectFit: 'contain',
    height: '100%',
    position: 'absolute',
    width: '100%'
  },
  wrapperProfile: {
    height: 50,
    width: 50
  },
  heading1: {
    lineHeight: 36,
    fontSize: FontSize.displaySmSemibold_size
  },
  userName: {
    marginLeft: 16
  },
  wrapperProfileParent: {
    paddingRight: Padding.p_base
  },
  clockIcon: {
    overflow: 'hidden'
  },
  number: {
    fontSize: FontSize.textMdMedium_size,
    lineHeight: 19,
    fontWeight: '500',
    fontFamily: FontFamily.textSmMedium,
    color: Color.milaGray900,
    textAlign: 'left'
  },
  text: {
    width: 130,
    marginLeft: 8,
    flexDirection: 'row'
  },
  text1: {
    marginLeft: 8,
    flexDirection: 'row'
  },
  userName1: {
    marginTop: 8
  },
  miniFlagsIcon: {
    overflow: 'hidden'
  },
  miniFlagsIcon1: {
    marginLeft: 8,
    overflow: 'hidden'
  },
  miniFlagsParent: {
    marginTop: 8,
    flexDirection: 'row'
  },
  joinedParent: {
    marginTop: 16
  },
  userCard: {
    marginTop: 8,
    overflow: 'hidden'
  },
  heading2: {
    fontSize: FontSize.displayXsSemibold_size,
    lineHeight: 29
  },
  heading3: {
    fontSize: FontSize.textXlSemibold_size,
    lineHeight: 24,
    width: 215
  },
  background: {
    right: 0,
    backgroundColor: Color.milaGrayMilaGray200,
    borderRadius: Border.br_9xs,
    top: 0,
    height: 8,
    left: 0,
    position: 'absolute'
  },
  progress: {
    width: '57.49%',
    right: '42.51%',
    backgroundColor: Color.milaBrandBlue600,
    left: '0%',
    borderRadius: Border.br_9xs,
    top: 0,
    height: 8,
    position: 'absolute'
  },
  progressBar1: {
    height: 8,
    borderRadius: Border.br_5xs,
    flex: 1
  },
  progressBar: {
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row'
  },
  streakIconPosition: {
    top: 1,
    transform: [
      {
        scale: 1.22
      }
    ],
    left: 0,
    objectFit: 'contain',
    height: '100%',
    position: 'absolute',
    width: '100%'
  },
  wrapperRankBadgesComponents: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subsectionSubheading1: {
    marginLeft: 8
  },
  subsectionSubheadingParent: {
    shadowColor: 'rgba(2, 6, 23, 0.3)'
  },
  totalXpCard: {
    shadowColor: 'rgba(2, 6, 23, 0.3)',
    elevation: 2,
    shadowRadius: 2,
    marginTop: 8,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1
    },
    backgroundColor: Color.milaGrayMilaGray25,
    borderRadius: Border.br_base,
    alignSelf: 'stretch',
    padding: Padding.p_5xs,
    overflow: 'hidden'
  },
  wrapperStreakIcon: {
    width: 40,
    height: 40
  },
  heading7: {
    color: Color.milaGray700,
    textAlign: 'left',
    fontFamily: FontFamily.textSmSemibold,
    fontWeight: '600'
  },
  streakDays: {
    marginTop: 8,
    flexDirection: 'row'
  },
  streakDaysAndIcon: {
    padding: Padding.p_5xs
  },
  streakDaysAndIconParent: {
    marginTop: 8,
    alignSelf: 'stretch'
  },
  subsectionSubheadingGroup: {
    shadowColor: 'rgba(16, 24, 40, 0.05)',
    borderRadius: Border.br_5xs
  },
  dailyStreak: {
    marginTop: 8,
    overflow: 'hidden'
  },
  newPosition1: {
    top: 0,
    transform: [
      {
        scale: 1.22
      }
    ],
    left: 0,
    objectFit: 'contain',
    height: '100%',
    position: 'absolute',
    width: '100%'
  },
  newWordsNumber1: {
    left: '32.08%',
    lineHeight: 43,
    fontSize: FontSize.displayMdSemibold_size,
    color: Color.milaBrandBlue800
  },
  newWordsNumber: {
    height: 43,
    marginTop: 8
  },
  newWordsLabel: {
    color: Color.milaBrandBlue700,
    lineHeight: 17,
    fontSize: FontSize.textSmSemibold_size
  },
  newWordsLearnednewWordsLa: {
    height: 17,
    marginTop: 8
  },
  newWordsBox: {
    backgroundColor: Color.milaBrandBlue200,
    padding: Padding.p_base,
    flex: 1
  },
  newWordsNumber3: {
    left: '21.69%',
    lineHeight: 43,
    fontSize: FontSize.displayMdSemibold_size,
    color: Color.milaBrandBlue800
  },
  newWordsBox1: {
    backgroundColor: Color.milaBrandBlue200,
    padding: Padding.p_base,
    marginLeft: 8,
    flex: 1
  },
  newWordsNumber5: {
    left: '19.22%',
    lineHeight: 43,
    fontSize: FontSize.displayMdSemibold_size,
    color: Color.milaBrandBlue800
  },
  newWordsBox2: {
    backgroundColor: Color.milaBrandBlue200,
    padding: Padding.p_base,
    marginLeft: 8,
    flex: 1
  },
  newWordsBoxParent: {
    marginTop: 8,
    flexDirection: 'row'
  },
  newWordsNumber7: {
    top: '0%',
    left: '0%',
    textAlign: 'left',
    fontFamily: FontFamily.textSmSemibold,
    fontWeight: '600',
    position: 'absolute',
    color: Color.milaBrandBlue800
  },
  newWordsNumber6: {
    width: 44,
    height: 43,
    marginLeft: 16
  },
  newWordsLearnednewWordsLa3: {
    height: 17,
    marginLeft: 16
  },
  newWordsBox3: {
    backgroundColor: Color.milaBrandBlue200,
    padding: Padding.p_base,
    marginTop: 8,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  text3: {
    color: Color.milaGrayMilaGray50,
    textAlign: 'left',
    fontFamily: FontFamily.textSmSemibold,
    fontWeight: '600'
  },
  textPadding: {
    paddingHorizontal: Padding.p_11xs,
    paddingVertical: 0,
    marginLeft: 4,
    flexDirection: 'row'
  },
  alertCircleIcon: {
    display: 'none',
    marginLeft: 4,
    overflow: 'hidden'
  },
  buttonsbuttonShadowBox: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderWidth: 1,
    borderColor: Color.milaBrandBlue600,
    backgroundColor: Color.milaBrandBlue600,
    borderRadius: Border.br_5xs,
    shadowColor: 'rgba(2, 6, 23, 0.3)',
    borderStyle: 'solid',
    elevation: 2,
    shadowRadius: 2,
    marginTop: 8,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1
    },
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  newWordsLearnd: {
    marginTop: 8,
    overflow: 'hidden'
  },
  newWordsNumber9: {
    left: '25.06%',
    color: Color.milaGreen800,
    lineHeight: 43,
    fontSize: FontSize.displayMdSemibold_size
  },
  newWordsLabel4: {
    left: '14.81%',
    color: Color.milaGreen700,
    lineHeight: 17,
    fontSize: FontSize.textSmSemibold_size
  },
  newWordsLearnednewWordsLa4: {
    height: 17,
    marginTop: 8
  },
  chatsCompleted1: {
    backgroundColor: Color.milaGreen50,
    flex: 1
  },
  newWordsNumber11: {
    left: '35.58%',
    color: Color.milaOrange800,
    lineHeight: 43,
    fontSize: FontSize.displayMdSemibold_size
  },
  newWordsLabel5: {
    left: '-2.6%',
    color: Color.milaOrange700,
    lineHeight: 17,
    fontSize: FontSize.textSmSemibold_size
  },
  chatsCompleted2: {
    backgroundColor: Color.milaOrange50,
    marginLeft: 8,
    flex: 1
  },
  newWordsNumber13: {
    left: '36.62%',
    color: Color.milaPink800,
    lineHeight: 43,
    fontSize: FontSize.displayMdSemibold_size
  },
  newWordsLabel6: {
    left: '-11.82%',
    color: Color.milaPink700,
    lineHeight: 17,
    fontSize: FontSize.textSmSemibold_size
  },
  chatsCompleted3: {
    backgroundColor: Color.milaPink50,
    marginLeft: 8,
    flex: 1
  },
  newWordsBox4: {
    backgroundColor: Color.milaBrandBlue200,
    padding: Padding.p_base,
    marginTop: 8,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  chatsCompleted: {
    marginTop: 8,
    overflow: 'hidden'
  },
  uiTemplatemobileprofile: {
    borderRadius: Border.br_5xl,
    backgroundColor: Color.milaGrayMilaGray50,
    justifyContent: 'flex-end',
    padding: Padding.p_5xs,
    overflow: 'hidden',
    width: '100%',
    flex: 1
  }
})

export default ProfileScreen
