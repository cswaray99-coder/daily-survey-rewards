import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const surveys = [
  { id: "1", title: "Your everyday shopping", detail: "Tell us what you buy each week", minutes: 4, points: 120, tag: "Quick survey" },
  { id: "2", title: "Apps you love using", detail: "Share your experience with mobile apps", minutes: 6, points: 180, tag: "Popular" },
  { id: "3", title: "Food and lifestyle", detail: "Help understand everyday choices", minutes: 3, points: 90, tag: "Easy" }
];

export default function HomeScreen() {
  const [tab, setTab] = useState("Home");
  const [completed, setCompleted] = useState<string[]>([]);
  const points = completed.reduce((total, id) => total + (surveys.find((s) => s.id === id)?.points ?? 0), 0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.eyebrow}>DAILY SURVEY REWARDS</Text>
            <Text style={styles.greeting}>Small surveys.{ "\n" }Steady progress.</Text>
          </View>
          <View style={styles.avatar}><Text style={styles.avatarText}>★</Text></View>
        </View>

        {tab === "Home" ? (
          <>
            <View style={styles.balanceCard}>
              <Text style={styles.cardLabel}>YOUR DEMO POINTS</Text>
              <Text style={styles.balance}>{points.toLocaleString()} <Text style={styles.pts}>pts</Text></Text>
              <Text style={styles.balanceHint}>Practice rewards wallet · No cash value yet</Text>
              <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${Math.min(points / 5, 100)}%` }]} /></View>
              <Text style={styles.progressText}>Complete sample surveys to try the app</Text>
            </View>

            <View style={styles.sectionHeader}>
              <View><Text style={styles.sectionTitle}>Available surveys</Text><Text style={styles.sectionSub}>Choose one to earn demo points</Text></View>
              <Text style={styles.count}>{surveys.length - completed.length} available</Text>
            </View>

            {surveys.map((survey) => {
              const isDone = completed.includes(survey.id);
              return (
                <View key={survey.id} style={styles.surveyCard}>
                  <View style={styles.surveyTop}>
                    <View style={styles.surveyIcon}><Text style={styles.surveyIconText}>✦</Text></View>
                    <View style={styles.surveyCopy}>
                      <Text style={styles.surveyTitle}>{survey.title}</Text>
                      <Text style={styles.surveyDetail}>{survey.detail}</Text>
                    </View>
                    <Text style={styles.points}>+{survey.points}</Text>
                  </View>
                  <View style={styles.surveyBottom}>
                    <Text style={styles.tag}>{survey.tag}  ·  {survey.minutes} min</Text>
                    <TouchableOpacity
                      accessibilityRole="button"
                      disabled={isDone}
                      style={[styles.startButton, isDone && styles.doneButton]}
                      onPress={() => setCompleted((old) => [...old, survey.id])}
                    >
                      <Text style={styles.startText}>{isDone ? "Completed ✓" : "Try survey"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
            <View style={styles.notice}><Text style={styles.noticeTitle}>A quick, honest note</Text><Text style={styles.noticeText}>These are demo surveys and points for testing. Real paid surveys or cash-outs will only be enabled after a verified provider and secure reward system are connected.</Text></View>
          </>
        ) : tab === "Wallet" ? (
          <View style={styles.emptyCard}><Text style={styles.emptyIcon}>◈</Text><Text style={styles.sectionTitle}>Your rewards wallet</Text><Text style={styles.sectionSub}>You have {points} demo points from this session. Cash withdrawals are not available in this demo.</Text></View>
        ) : tab === "Activity" ? (
          <View style={styles.emptyCard}><Text style={styles.emptyIcon}>↗</Text><Text style={styles.sectionTitle}>Your activity</Text><Text style={styles.sectionSub}>{completed.length ? `You completed ${completed.length} sample survey(s).` : "Your completed surveys will appear here after you try one."}</Text></View>
        ) : (
          <View style={styles.emptyCard}><Text style={styles.emptyIcon}>☺</Text><Text style={styles.sectionTitle}>Your profile</Text><Text style={styles.sectionSub}>Account sign-in and profile settings will be added in the next build step.</Text></View>
        )}
      </ScrollView>

      <View style={styles.nav}>
        {[
          { name: "Home", icon: "⌂" },
          { name: "Activity", icon: "↗" },
          { name: "Wallet", icon: "◈" },
          { name: "Profile", icon: "☺" }
        ].map((item) => (
          <TouchableOpacity key={item.name} style={styles.navItem} onPress={() => setTab(item.name)} accessibilityRole="button">
            <Text style={[styles.navIcon, tab === item.name && styles.navActive]}>{item.icon}</Text>
            <Text style={[styles.navLabel, tab === item.name && styles.navActive]}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F6F7FB" },
  page: { padding: 22, paddingBottom: 112, maxWidth: 760, width: "100%", alignSelf: "center" },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16, marginBottom: 22 },
  eyebrow: { fontSize: 10, fontWeight: "800", letterSpacing: 1.6, color: "#6A58D8", marginBottom: 10 },
  greeting: { color: "#17172B", fontSize: 29, lineHeight: 35, fontWeight: "800", letterSpacing: -0.8 },
  avatar: { width: 48, height: 48, borderRadius: 17, backgroundColor: "#E7E2FF", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#6652D4", fontSize: 24 },
  balanceCard: { backgroundColor: "#30256D", borderRadius: 25, padding: 23, marginBottom: 28 },
  cardLabel: { color: "#C8C0FF", fontSize: 10, letterSpacing: 1.5, fontWeight: "800" },
  balance: { color: "#FFFFFF", fontSize: 39, fontWeight: "800", marginTop: 8 },
  pts: { fontSize: 16, color: "#D4CFFF", fontWeight: "600" },
  balanceHint: { color: "#D7D2FF", fontSize: 12, marginTop: 5 },
  progressTrack: { height: 6, backgroundColor: "#554B91", borderRadius: 8, marginTop: 22, overflow: "hidden" },
  progressFill: { height: 6, backgroundColor: "#A9F0D1", borderRadius: 8 },
  progressText: { color: "#D7D2FF", fontSize: 11, marginTop: 9 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sectionTitle: { fontSize: 19, color: "#1D1B32", fontWeight: "800" },
  sectionSub: { fontSize: 12, color: "#77768B", marginTop: 5, lineHeight: 18 },
  count: { fontSize: 10, color: "#6A58D8", fontWeight: "800", backgroundColor: "#EAE7FF", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20 },
  surveyCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#ECECF4" },
  surveyTop: { flexDirection: "row", alignItems: "center" },
  surveyIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: "#F0EDFF", alignItems: "center", justifyContent: "center" },
  surveyIconText: { color: "#6A58D8", fontSize: 23 },
  surveyCopy: { flex: 1, marginLeft: 12, marginRight: 8 },
  surveyTitle: { color: "#22213A", fontSize: 14, fontWeight: "800" },
  surveyDetail: { color: "#858499", fontSize: 11, marginTop: 5 },
  points: { color: "#21865E", fontWeight: "800", fontSize: 13 },
  surveyBottom: { marginTop: 16, paddingTop: 13, borderTopWidth: 1, borderTopColor: "#F0EFF6", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  tag: { color: "#858499", fontSize: 10, flexShrink: 1 },
  startButton: { backgroundColor: "#6A58D8", borderRadius: 11, paddingHorizontal: 13, paddingVertical: 10, marginLeft: 8 },
  doneButton: { backgroundColor: "#E5F7EE" },
  startText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  notice: { marginTop: 10, backgroundColor: "#FFF8E8", borderRadius: 16, padding: 15, borderWidth: 1, borderColor: "#F7E9C7" },
  noticeTitle: { color: "#73551B", fontWeight: "800", fontSize: 12, marginBottom: 6 },
  noticeText: { color: "#806A3C", fontSize: 11, lineHeight: 17 },
  emptyCard: { marginTop: 24, backgroundColor: "#FFFFFF", borderRadius: 22, padding: 25, alignItems: "center", borderWidth: 1, borderColor: "#ECECF4" },
  emptyIcon: { fontSize: 35, color: "#6A58D8", marginBottom: 15 },
  nav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: "#EAEAF1", paddingTop: 12, paddingBottom: 18, flexDirection: "row", justifyContent: "space-around" },
  navItem: { alignItems: "center", minWidth: 60 },
  navIcon: { color: "#A4A2B4", fontSize: 22, marginBottom: 4 },
  navLabel: { color: "#A4A2B4", fontSize: 10, fontWeight: "700" },
  navActive: { color: "#6A58D8" }
});