import React, { useState, useEffect } from "react";
import {
	Text,
	TextInput,
	Button,
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpanishConjugator from "spanishconjugator";
import { clean } from "diacritic";
import SubmitButton from "./SubmitButton";
import UserInput from "./UserInput";
import levenshtein from "damerau-levenshtein";
import verbs from "../data/verbs.json";

const GameScreen = ({ selectedTenses }) => {
	const [infinitive, setInfinitive] = useState("");
	const [translation, setTranslation] = useState("");
	const [mood, setMood] = useState("");
	const [performer, setPerformer] = useState("");
	const [tense, setTense] = useState("");
	const [answer, setAnswer] = useState("");
	const [feedback, setFeedback] = useState("");
	const [streak, setStreak] = useState(0);
	const [highestStreak, setHighestStreak] = useState(0);
	const [imperative, setImperative] = useState(false);

	const loadHighestStreak = async () => {
		try {
			const val = await AsyncStorage.getItem("highestStreak");
			if (val !== null) {
				setHighestStreak(val);
			} else {
				setHighestStreak(0);
			}
		} catch (err) {
			alert(err);
		}
	};

	const saveHighestStreak = async () => {
		try {
			await AsyncStorage.setItem("highestStreak", highestStreak.toString());
		} catch (err) {
			alert(err);
		}
		// try {
		// 	await AsyncStorage.setItem("highestStreak", highestStreak);
		// } catch (err) {
		// 	alert(err);
		// }
	};

	useEffect(() => {
		const newVerb = getRandomVerb();
		const newInfinitive = newVerb.name;
		const newTranslation = newVerb.translation;
		const newMoodAndTense = getRandomMoodAndTense();
		const newMood = newMoodAndTense.mood;
		const newTense = newMoodAndTense.tense;
		const newPerformer = getRandomPerformer();
		setMood(newMood);
		setInfinitive(newInfinitive);
		setTranslation(newTranslation);
		setTense(newTense);
		setPerformer(newPerformer);
		setAnswer("");
		setFeedback("");
		setStreak(0);
		setImperative(false);
		loadHighestStreak();
	}, []);

	// const verbs = ["hablar", "comer", "vivir", "andar"];

	const getRandomVerb = () => {
		const randomIndex = Math.floor(Math.random() * verbs.length);
		return verbs[randomIndex];
	};

	const getRandomMoodAndTense = () => {
		const tenses = selectedTenses;
		const randomIndex = Math.floor(Math.random() * tenses.length);
		if (tenses[randomIndex].mood == "imperative") setImperative(true);
		return tenses[randomIndex];
	};

	const getRandomPerformer = () => {
		const performers = [
			"yo",
			"tu",
			"usted",
			"nosotros",
			"vosotros",
			"ustedes",
		];
		const randomIndex = imperative
			? Math.floor(Math.random() * (performers.length - 1) + 1)
			: Math.floor(Math.random() * performers.length);
		return performers[randomIndex];
	};

	const handleSubmit = () => {
		const correctAnswer = SpanishConjugator.SpanishConjugator(
			infinitive,
			tense,
			mood,
			performer
		);
		const normalisedUserAnswer = answer.toLowerCase().trim();
		const normalisedCorrectAnswer = correctAnswer.toLowerCase();
		if (normalisedUserAnswer === normalisedCorrectAnswer) {
			setFeedback(`${answer.trim()} is correct!`);
			setStreak(streak + 1);
		} else if (
			clean(normalisedUserAnswer) === clean(normalisedCorrectAnswer) ||
			levenshtein(normalisedUserAnswer, normalisedCorrectAnswer).similarity >
				0.9
		) {
			setFeedback(
				`Almost correct.\nThe correct answer is ${normalisedCorrectAnswer}, you wrote ${normalisedUserAnswer}.`
			);
			setStreak(streak + 1);
		} else if (
			levenshtein(normalisedUserAnswer, normalisedCorrectAnswer).similarity >
			0.6
		) {
			setFeedback(
				`Sorry, not close enough.\nThe correct answer is ${normalisedCorrectAnswer}, you wrote ${normalisedUserAnswer}.`
			);
			setStreak(0);
		} else {
			setFeedback(`Incorrect.\nThe correct answer is ${correctAnswer}.`);
			setStreak(0);
		}

		const newVerb = getRandomVerb();
		const newInfinitive = newVerb.name;
		const newTranslation = newVerb.translation;
		const newPerformer = getRandomPerformer();
		const newMoodAndTense = getRandomMoodAndTense();
		const newMood = newMoodAndTense.mood;
		const newTense = newMoodAndTense.tense;
		setMood(newMood);
		setInfinitive(newInfinitive);
		setTranslation(newTranslation);
		setTense(newTense);
		setPerformer(newPerformer);
		setAnswer("");
	};

	if (streak > highestStreak) {
		setHighestStreak(streak);
		saveHighestStreak();
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<View style={styles.streakContainer}>
					<Text style={styles.streakText}>{streak}</Text>
				</View>
				<View style={styles.highestStreakContainer}>
					<Text style={styles.highestStreakText}>{highestStreak}</Text>
				</View>
				<View style={styles.verbView}>
					<Text style={styles.infinitive}>{infinitive}</Text>
					{/* <Text style={styles.translation}>{translation}</Text> */}
				</View>

				<Text style={styles.mood_tense}>
					{mood} - {tense.replace(/_/g, " ")}
				</Text>
				<Text style={styles.performer}>{performer}</Text>
				<UserInput setAnswer={setAnswer} answer={answer} />
				<SubmitButton onPress={handleSubmit} />
				<Text style={styles.feedback}>{feedback}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: 20,
	},
	streakContainer: {
		position: "absolute",
		top: 50,
		left: 20,
		padding: 10,
		backgroundColor: "#ff8552",
		zIndex: 1,
	},
	streakText: {
		fontSize: 30,
		color: "#222",
		fontWeight: "bold",
	},
	highestStreakContainer: {
		position: "absolute",
		top: 50,
		right: 20,
		padding: 10,
		backgroundColor: "#aa22aa",
		zIndex: 1,
	},
	highestStreakText: {
		fontSize: 30,
		color: "#222",
		fontWeight: "bold",
	},
	verbView: {
		
	},
	infinitive: {
		backgroundColor: "#39393a",
		color: "#e6e6e6",
		paddingTop: 100,
		paddingBottom: 30,
		fontSize: 46,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	mood_tense: { fontSize: 20, marginBottom: 20, textAlign: "center" },

	performer: { fontSize: 20, marginBottom: 40, textAlign: "center" },

	submit: {},
	feedback: {
		marginTop: 20,
		color: "#297373",
		textAlign: "center",
		fontSize: 18,
	},
});

export default GameScreen;
