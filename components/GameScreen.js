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
import SpanishConjugator from "spanishconjugator";
import { clean } from "diacritic";
import SubmitButton from "./SubmitButton";
import UserInput from "./UserInput";

const GameScreen = () => {
	const [infinitive, setInfinitive] = useState("");
	const [mood, setMood] = useState("");
	const [performer, setPerformer] = useState("");
	const [tense, setTense] = useState("");
	const [answer, setAnswer] = useState("");
	const [feedback, setFeedback] = useState("");
	const [streak, setStreak] = useState(0);
	const [highestStreak, setHighestStreak] = useState(0);
	const [imperative, setImperative] = useState(false);

	useEffect(() => {
		const newInfinitive = getRandomVerb();
		const newMoodAndTense = getRandomMoodAndTense();
		const newMood = newMoodAndTense.mood;
		const newTense = newMoodAndTense.tense;
		const newPerformer = getRandomPerformer();
		setMood(newMood);
		setInfinitive(newInfinitive);
		setTense(newTense);
		setPerformer(newPerformer);
		setAnswer("");
		setFeedback("");
		setStreak(0);
		setImperative(false);
	}, []);

	const verbs = ["hablar", "comer", "vivir", "andar"];

	const getRandomVerb = () => {
		const randomIndex = Math.floor(Math.random() * verbs.length);
		return verbs[randomIndex];
	};

	const getRandomMoodAndTense = () => {
		const tenses = [
			{
				mood: "indicative",
				tense: "present",
			},
			{
				mood: "indicative",
				tense: "imperfect",
			},
			{
				mood: "indicative",
				tense: "preterite",
			},
			{
				mood: "indicative",
				tense: "future",
			},
			{
				mood: "indicative",
				tense: "present_perfect",
			},
			{
				mood: "indicative",
				tense: "past_perfect",
			},
			// {
			// 	mood: "indicative",
			// 	tense: "past_anterior",
			// },
			// {
			// 	mood: "indicative",
			// 	tense: "future_perfect",
			// },
			{
				mood: "conditional",
				tense: "simple_conditional",
			},
			{
				mood: "conditional",
				tense: "perfect",
			},
			{
				mood: "imperative",
				tense: "affirmative",
			},
			{
				mood: "imperative",
				tense: "negative",
			},
			// {
			// 	mood: "subjunctive",
			// 	tense: "present",
			// },
			// {
			// 	mood: "subjunctive",
			// 	tense: "present_perfect",
			// },
			// {
			// 	mood: "subjunctive",
			// 	tense: "pluperfect",
			// },
			//  {
			// 	"mood": "subjunctive",
			// 	"tense": "future_perfect"
			//  },
			// {
			// 	mood: "subjunctive",
			// 	tense: "imperfect",
			// },
			// {
			// 	mood: "subjunctive",
			// 	tense: "imperfect_se",
			// },
			// {
			// 	mood: "subjunctive",
			// 	tense: "future",
			// },
		];
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
		// const randomIndex = Math.floor(Math.random() * performers.length);
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
			clean(normalisedUserAnswer) === clean(normalisedCorrectAnswer)
		) {
			setFeedback(
				`Almost correct.\nThe correct answer is ${normalisedCorrectAnswer}, you wrote ${normalisedUserAnswer}.`
			);
			setStreak(streak + 1);
		} else {
			setFeedback(`Incorrect.\nThe correct answer is ${correctAnswer}.`);
			setStreak(0);
		}

		const newInfinitive = getRandomVerb();
		const newPerformer = getRandomPerformer();
		const newMoodAndTense = getRandomMoodAndTense();
		const newMood = newMoodAndTense.mood;
		const newTense = newMoodAndTense.tense;
		setMood(newMood);
		setInfinitive(newInfinitive);
		setTense(newTense);
		setPerformer(newPerformer);
		setAnswer("");
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<View style={styles.streakContainer}>
					<Text style={styles.streakText}>{streak}</Text>
				</View>
				<Text style={styles.infinitive}>{infinitive}</Text>
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
