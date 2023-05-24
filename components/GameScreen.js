/*
	The GameScreen component is responsible for managing the game logic and rendering the game interface.

		State variables are used to store various game-related information such as the infinitive, translation, mood, tense, answer, feedback, streak, highest streak, and imperative flag.
		The component uses useEffect to set initial values and load the highest streak from AsyncStorage.
		Helper functions are defined to get a random verb, random mood and tense, and random performer based on the imperative mood.
		The handleSubmit function handles the user's submission. It compares the user's answer with the correct conjugation and provides feedback. It also generates new random values for the next question.
		The highest streak is updated and saved to AsyncStorage if it exceeds the previous highest streak.
		The component renders the game interface using various React Native components such as TouchableWithoutFeedback, View, Text, TextInput, Button, and custom components SubmitButton and UserInput.
		Styles for the game interface are defined using StyleSheet.create.

	In summary, the GameScreen component manages the game state, handles user input, provides feedback, and renders the game interface.
*/

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
	// State variables
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

	// Load the highest streak from AsyncStorage
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

	// Save the highest streak to AsyncStorage
	const saveHighestStreak = async () => {
		try {
			await AsyncStorage.setItem("highestStreak", highestStreak.toString());
		} catch (err) {
			alert(err);
		}
	};

	// Set initial values and load the highest streak
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

	// Get a random verb from the list of verbs
	const getRandomVerb = () => {
		const randomIndex = Math.floor(Math.random() * verbs.length);
		return verbs[randomIndex];
	};

	// Get a random mood and tense from the selected tenses
	const getRandomMoodAndTense = () => {
		const tenses = selectedTenses;
		const randomIndex = Math.floor(Math.random() * tenses.length);
		if (tenses[randomIndex].mood == "imperative") setImperative(true);
		return tenses[randomIndex];
	};

	// Get a random performer based on the imperative mood
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
		// Handle the user's submission
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

		// Get new random values for the next question
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

	// Update the highest streak and save it to AsyncStorage
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
	verbView: {},
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
